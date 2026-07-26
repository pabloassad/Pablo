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
import { createReadStream } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

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
  res.json({ ok: ytdlp && ffmpeg, ytdlp, ffmpeg, allowedOrigins: ORIGINS });
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

// yt-dlp stderr fingerprints that mean "this video can't be fetched" rather
// than "our service is broken".
function isUnavailable(stderr = "") {
  return /private video|video unavailable|removed|does not exist|not available|age.?restricted|sign in to confirm|members-only/i.test(
    stderr
  );
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
    await run(
      "yt-dlp",
      [
        "--no-playlist",
        "--no-warnings",
        "-f",
        "bestaudio/best",
        "-o",
        source,
        url.trim(),
      ],
      { timeout: remaining() }
    );

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
      return res.status(422).json({ error: "unavailable" });
    }
    console.error("convert failed:", err.stderr || err.message);
    return res.status(500).json({ error: "convert_failed" });
  }
});

// Best-effort recursive removal; ignore if already gone. Safe to call more
// than once (the download-finished and connection-closed handlers may both
// fire) since force:true ignores an already-removed directory.
async function cleanup(dir) {
  await rm(dir, { recursive: true, force: true }).catch(() => {});
}

app.listen(PORT, () => {
  console.log(`converter service listening on :${PORT}`);
});
