# Root-level build for the converter service (server/).
#
# Railway and Render look for a Dockerfile at the repository root by default,
# so keeping this here means the service deploys with no "Root Directory"
# setting to configure. The Next.js site is unaffected — Vercel uses its own
# builder and ignores this file.
FROM node:20-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg ca-certificates curl python3 \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get purge -y curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev

COPY server/ ./

ENV PORT=4000
EXPOSE 4000

CMD ["node", "index.js"]
