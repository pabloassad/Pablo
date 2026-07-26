"use client";

import { useRef, useState } from "react";

// The heavy lifting (yt-dlp + ffmpeg) lives in a separate persistent service,
// not in a Vercel serverless function. Point this at that service's origin.
const API_BASE = process.env.NEXT_PUBLIC_CONVERTER_API ?? "";

type Format = "wav" | "mp3" | "flac";
const FORMATS: Format[] = ["wav", "mp3", "flac"];

type Phase = "idle" | "working" | "error";

// Basic client-side gate: a recognised YouTube / YouTube Music link.
const URL_RE =
  /^https?:\/\/(www\.|music\.|m\.)?(youtube\.com\/(watch\?|shorts\/|live\/)|youtu\.be\/)\S+$/i;

// Server error codes -> terse terminal messages (art direction: minimal text).
const ERRORS: Record<string, string> = {
  invalid_url: "URL NON RECONNUE",
  unavailable: "VIDÉO INDISPONIBLE",
  timeout: "DÉLAI DÉPASSÉ",
  convert_failed: "ÉCHEC DE CONVERSION",
  network: "SERVEUR INJOIGNABLE",
};

export default function ConverterPage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>("wav");
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = phase === "working";

  function reset() {
    setUrl("");
    setFormat("wav");
    setPhase("idle");
    setErrorCode(null);
    inputRef.current?.focus();
  }

  // Extract the download filename the server proposes, falling back sanely.
  function filenameFrom(res: Response): string {
    const cd = res.headers.get("Content-Disposition") ?? "";
    const star = /filename\*=UTF-8''([^;]+)/i.exec(cd);
    if (star) return decodeURIComponent(star[1]);
    const plain = /filename="?([^";]+)"?/i.exec(cd);
    if (plain) return plain[1];
    return `audio.${format}`;
  }

  async function convert() {
    const trimmed = url.trim();
    if (!URL_RE.test(trimmed)) {
      setErrorCode("invalid_url");
      setPhase("error");
      return;
    }

    setPhase("working");
    setErrorCode(null);

    try {
      const res = await fetch(`${API_BASE}/api/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, format }),
      });

      if (!res.ok) {
        let code = "convert_failed";
        try {
          const data = await res.json();
          if (typeof data?.error === "string") code = data.error;
        } catch {
          /* non-JSON error body */
        }
        setErrorCode(code);
        setPhase("error");
        return;
      }

      // Stream the audio to a blob and trigger the download automatically.
      const blob = await res.blob();
      const name = filenameFrom(res);
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);

      // Straight back to a blank slate, ready for the next URL.
      reset();
    } catch {
      setErrorCode("network");
      setPhase("error");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!busy) convert();
  }

  return (
    <div className="term">
      <form className="panel" onSubmit={onSubmit}>
        <h1 className="title">
          CONVERT
          <span className="caret" aria-hidden="true" />
        </h1>

        <div className="field">
          <input
            ref={inputRef}
            className="input"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="> coller une URL"
            value={url}
            disabled={busy}
            onChange={(e) => {
              setUrl(e.target.value);
              if (phase === "error") {
                setPhase("idle");
                setErrorCode(null);
              }
            }}
            aria-label="URL"
          />

          <div className="formats" role="group" aria-label="Format">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                className="format"
                aria-pressed={format === f}
                disabled={busy}
                onClick={() => setFormat(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit" disabled={busy || !url.trim()}>
          {busy ? "..." : "CONVERTIR"}
        </button>

        {busy && (
          <div className="progress" aria-hidden="true">
            <span />
          </div>
        )}

        <div
          className="status"
          role="status"
          aria-live="polite"
          data-kind={phase === "error" ? "error" : "info"}
        >
          {phase === "working" && "EXTRACTION EN COURS…"}
          {phase === "error" &&
            (ERRORS[errorCode ?? ""] ?? "ERREUR")}
        </div>

        {phase === "error" && (
          <button type="button" className="retry" onClick={reset}>
            réinitialiser
          </button>
        )}
      </form>
    </div>
  );
}
