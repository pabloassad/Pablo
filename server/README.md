# Converter service

Extraction backend for the `/converter` page. Takes a YouTube / YouTube Music
URL and a target format, runs **yt-dlp** then **ffmpeg**, and streams back the
audio file for direct download.

It needs a persistent filesystem and both `yt-dlp` and `ffmpeg` available — so
it runs as a long-lived container (Railway / Render / a VM), **not** on Vercel
serverless.

## API

`POST /api/convert`

```json
{ "url": "https://www.youtube.com/watch?v=...", "format": "wav" }
```

- `format` — one of `wav`, `mp3`, `flac`.
- Success → `200` with the audio bytes and a `Content-Disposition` attachment
  header.
- Errors → JSON `{ "error": "<code>" }` with a matching status:
  `invalid_url` / `invalid_format` (400), `unavailable` (422),
  `timeout` (504), `convert_failed` (500).

`GET /health` → `{ "ok": true }`.

Temp files are written to a per-request directory and removed once the download
finishes (or on any error), so nothing accumulates on disk.

## Local run

Requires `yt-dlp` and `ffmpeg` on your PATH.

```bash
npm install
cp .env.example .env
npm start
```

## Deploy (Railway / Render)

Both platforms build the included `Dockerfile`, which installs ffmpeg and the
yt-dlp binary. Point the service's root at this `server/` directory and set:

- `CORS_ORIGIN` → your deployed site origin (e.g. `https://djpablito.vercel.app`).
- `CONVERT_TIMEOUT_MS` → optional, defaults to `120000`.

## Wiring the frontend

Set `NEXT_PUBLIC_CONVERTER_API` on the Next.js app to this service's public URL
(e.g. `https://converter.up.railway.app`). The `/converter` page posts to
`${NEXT_PUBLIC_CONVERTER_API}/api/convert`.
