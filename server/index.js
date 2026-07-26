// URL -> audio extraction service.
//
// Runs yt-dlp to pull the best audio from a YouTube / YouTube Music URL, then
// ffmpeg to transcode it to the requested container (WAV / MP3 / FLAC), and
// streams the finished file back with a Content-Disposition so the browser
// downloads it. Temp files live in an isolated per-request directory that is
// always removed, whatever the outcome.
//
// This must run on a host with a persistent filesystem and both `yt-dlp` and
// `ffmpeg` on PATH (Railway / Render / a plain VM) — not on Vercel serverless.

import express from "express";
import cors from "cors";
import { spawn } from "node:child_process";
import { mkdtemp, rm, readdir, stat } from "node:fs/promises";
import { createReadStream, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4000;

// Comma-separated allowlist of frontend origins. Defaults to permissive for
// local dev; set CORS_ORIGIN in production to the deployed site origin.
// A trailing slash is easy to paste in by accident and would never match the
// browser's Origin header, so normalise it away here.
const ORIGINS = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

// Hard ceiling on how long one conversion may run before we give up.
const TIMEOUT_MS = Number(process.env.CONVERT_TIMEOUT_MS || 120_000);

// Accepted output formats -> ffmpeg encoding args + mime type.
const FORMATS = {
  wav: { args: ["-f", "wav"], mime: "audio/wav" },
  mp3: { args: ["-f", "mp3", "-b:a", "320k"], mime: "audio/mpeg" },
  flac: { args: ["-f", "flac"], mime: "audio/flac" },
};

// Same recognised-URL gate as the frontend, re-checked server-side.
const URL_RE =
  /^https?:\/\/(www\.|music\.|m\.)?(youtube\.com\/(watch\?|shorts\/|live\/)|youtu\.be\/)\S+$/i;

const app = express();
app.use(express.json({ limit: "16kb" }));

// The converter UI ships with the service and is served from the same origin,
// so the browser's fetch to /api/convert is never a cross-origin request.
app.use(express.static(join(here, "public")));
app.use(
  cors({
    origin: ORIGINS.includes("*") ? true : ORIGINS,
    methods: ["POST", "GET"],
  })
);

// Health check doubles as a deployment diagnostic: it reports whether the two
// required binaries are actually present in the running container, which is
// the difference between "service is down" and "image built without ffmpeg".
app.get("/health", async (_req, res) => {
  const [ytdlp, ffmpeg] = await Promise.all([
    run("yt-dlp", ["--version"], { timeout: 5000 }).then(
      () => true,
      () => false
    ),
    run("ffmpeg", ["-version"], { timeout: 5000 }).then(
      () => true,
      () => false
    ),
  ]);
  res.json({
    ok: ytdlp && ffmpeg,
    ytdlp,
    ffmpeg,
    // Whether a cookies file was supplied — the deciding factor when YouTube
    // blocks this host's IP range.
    cookies: cookiesReady,
    cookiesFromBrowser: COOKIES_FROM_BROWSER || false,
    proxy: Boolean(PROXY),
    allowedOrigins: ORIGINS,
  });
});

// Run a command, rejecting on non-zero exit, missing binary, or timeout.
function run(cmd, args, { timeout } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    let timer;

    if (timeout) {
      timer = setTimeout(() => {
        child.kill("SIGKILL");
        const err = new Error("timeout");
        err.code = "timeout";
        reject(err);
      }, timeout);
    }

    child.stderr.on("data", (d) => {
      // Keep only the tail — some tools are very chatty.
      stderr = (stderr + d.toString()).slice(-4000);
    });

    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else {
        const err = new Error(`${cmd} exited ${code}`);
        err.stderr = stderr;
        reject(err);
      }
    });
  });
}

// YouTube refuses its default web client from datacenter IP ranges, which is
// exactly where this service runs. Each of these clients answers under
// different conditions, so we try them in turn before giving up.
const PLAYER_CLIENTS = ["default", "tv", "web_embedded", "android_vr", "ios"];

// Netscape-format cookies exported from a logged-in browser. This is the only
// reliable way past YouTube's bot check; supplied via env so no credentials
// live in the repository.
const COOKIES_PATH = join(tmpdir(), "yt-cookies.txt");
let cookiesReady = false;
if (process.env.YTDLP_COOKIES) {
  try {
    writeFileSync(COOKIES_PATH, process.env.YTDLP_COOKIES, "utf8");
    cookiesReady = true;
  } catch (e) {
    console.error("could not write cookies file:", e.message);
  }
}

// When the service runs on a personal machine, yt-dlp can read the cookies
// straight out of an installed browser — no export, no credentials stored
// anywhere. Set to a browser name such as "chrome", "firefox" or "safari".
const COOKIES_FROM_BROWSER = process.env.YTDLP_COOKIES_FROM_BROWSER || "";

// Routing through a residential proxy is the alternative to cookies: it fixes
// the same problem (a datacenter IP) without handing the service any account
// credentials.
const PROXY = process.env.YTDLP_PROXY || "";

// "YouTube is refusing us" — a service-side problem we can sometimes route
// around — as opposed to a video that genuinely cannot be fetched by anyone.
function isBlocked(stderr = "") {
  return /sign in to confirm|not a bot|failed to extract any player response|unable to extract|please sign in|429|too many requests|cookies/i.test(
    stderr
  );
}

// The video itself is gone or restricted; no amount of retrying helps.
function isUnavailable(stderr = "") {
  return /private video|video unavailable|has been removed|does not exist|is not available|age.?restricted|members-only|copyright/i.test(
    stderr
  );
}

// Condense yt-dlp's output to the one ERROR line worth showing a human.
function briefReason(stderr = "") {
  const line = stderr
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^error/i.test(l))
    .pop();
  return (line || stderr.trim().split("\n").pop() || "").slice(0, 300);
}

app.post("/api/convert", async (req, res) => {
  const { url, format } = req.body ?? {};

  if (typeof url !== "string" || !URL_RE.test(url.trim())) {
    return res.status(400).json({ error: "invalid_url" });
  }
  const fmt = FORMATS[format];
  if (!fmt) {
    return res.status(400).json({ error: "invalid_format" });
  }

  const workdir = await mkdtemp(join(tmpdir(), "convert-"));
  const deadline = Date.now() + TIMEOUT_MS;
  const remaining = () => Math.max(1000, deadline - Date.now());

  try {
    // 1) Extract best available audio into the workdir. Restrict output naming
    //    so the transcode step can find it deterministically.
    const source = join(workdir, "source.%(ext)s");
    const base = [
      "--no-playlist",
      "--no-warnings",
      "--no-progress",
      "-f",
      "bestaudio/best",
      "-o",
      source,
      ...(COOKIES_FROM_BROWSER
        ? ["--cookies-from-browser", COOKIES_FROM_BROWSER]
        : cookiesReady
          ? ["--cookies", COOKIES_PATH]
          : []),
      ...(PROXY ? ["--proxy", PROXY] : []),
    ];

    // Cookies only authenticate the browser-shaped clients; the mobile ones
    // ignore them, so trying those would just waste the timeout budget.
    const clients =
      cookiesReady || COOKIES_FROM_BROWSER
        ? ["default", "tv", "web_embedded"]
        : PLAYER_CLIENTS;

    // Walk the client list until one succeeds. A video that is genuinely gone
    // fails identically on all of them, so stop early in that case rather than
    // burning the whole timeout budget.
    let lastErr;
    let fetched = false;
    for (const client of clients) {
      const extra =
        client === "default"
          ? []
          : ["--extractor-args", `youtube:player_client=${client}`];
      try {
        await run("yt-dlp", [...base, ...extra, url.trim()], {
          timeout: remaining(),
        });
        fetched = true;
        break;
      } catch (e) {
        lastErr = e;
        if (e.code === "timeout" || e.code === "ENOENT") throw e;
        if (isUnavailable(e.stderr)) throw e;
        console.warn(`yt-dlp client "${client}" failed:`, briefReason(e.stderr));
      }
    }
    if (!fetched) throw lastErr ?? new Error("extraction failed");

    // Find whatever extension yt-dlp actually wrote.
    const files = await readdir(workdir);
    const downloaded = files.find((f) => f.startsWith("source."));
    if (!downloaded) throw new Error("no output from yt-dlp");
    const inputPath = join(workdir, downloaded);

    // 2) Transcode to the requested format.
    const outPath = join(workdir, `output.${format}`);
    await run(
      "ffmpeg",
      ["-y", "-i", inputPath, "-vn", ...fmt.args, outPath],
      { timeout: remaining() }
    );

    const info = await stat(outPath);
    const filename = `audio-${Date.now()}.${format}`;

    res.setHeader("Content-Type", fmt.mime);
    res.setHeader("Content-Length", info.size);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
    );

    // Stream to the client, then clean up once fully sent.
    const stream = createReadStream(outPath);
    stream.pipe(res);
    stream.on("close", () => cleanup(workdir));
    stream.on("error", () => cleanup(workdir));
    res.on("close", () => cleanup(workdir));
    return;
  } catch (err) {
    await cleanup(workdir);
    if (err.code === "timeout") {
      return res.status(504).json({ error: "timeout" });
    }
    if (err.code === "ENOENT") {
      // A required binary (yt-dlp / ffmpeg) isn't installed.
      console.error("Missing binary:", err.path || err.message);
      return res.status(500).json({ error: "convert_failed" });
    }
    if (isUnavailable(err.stderr)) {
      return res
        .status(422)
        .json({ error: "unavailable", reason: briefReason(err.stderr) });
    }
    // Every client was refused: YouTube is blocking this host, not the video.
    // Surfacing the reason keeps this from looking like a generic failure.
    if (isBlocked(err.stderr)) {
      console.error("blocked by YouTube:", briefReason(err.stderr));
      return res.status(403).json({
        error: "blocked",
        reason: briefReason(err.stderr),
        cookies: cookiesReady,
      });
    }
    console.error("convert failed:", err.stderr || err.message);
    return res
      .status(500)
      .json({ error: "convert_failed", reason: briefReason(err.stderr || err.message) });
  }
});

// Best-effort recursive removal; ignore if already gone. Safe to call more
// than once (the download-finished and connection-closed handlers may both
// fire) since force:true ignores an already-removed directory.
async function cleanup(dir) {
  await rm(dir, { recursive: true, force: true }).catch(() => {});
}

const server = app.listen(PORT, () => {
  console.log(`✓ Convertisseur démarré → http://localhost:${PORT}`);
});

// Otherwise the process dies on a raw stack trace and the only visible symptom
// is a browser that cannot connect.
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\n✗ Le port ${PORT} est déjà utilisé.\n  Relance avec un autre port :  PORT=4001 ./start-local.sh\n`
    );
  } else {
    console.error("\n✗ Le serveur n'a pas pu démarrer :", err.message, "\n");
  }
  process.exit(1);
});
