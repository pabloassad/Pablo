#!/usr/bin/env bash
#
# Rapatrie la vidéo du profil depuis Vercel Blob, la compresse, et la dépose
# dans public/video/ pour qu'elle soit servie par le CDN Vercel.
#
# Pourquoi : Blob facture le transfert de données (10 Go/mois inclus sur le
# palier gratuit) alors que les fichiers statiques de public/ passent sur le
# quota Fast Data Transfer (100 Go). Déplacer la vidéo, c'est 10x de marge —
# et la compression divise encore le poids par 5 environ.
#
# Usage :
#   ./scripts/optimize-profile-video.sh [url_source]
#
set -euo pipefail

SRC_URL="${1:-https://nedkcj0yzoauflft.public.blob.vercel-storage.com/FINALE%20PABLITO%20%281%29.mp4}"
OUT_DIR="public/video"
OUT_FILE="$OUT_DIR/profile.mp4"
TMP_FILE="$(mktemp -t profile-video-XXXXXX).mp4"
trap 'rm -f "$TMP_FILE"' EXIT

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg est introuvable." >&2
  if command -v brew >/dev/null 2>&1; then
    echo "Installe-le avec :  brew install ffmpeg" >&2
  else
    echo "Installe d'abord Homebrew (https://brew.sh), puis :  brew install ffmpeg" >&2
  fi
  exit 1
fi

echo "→ Téléchargement depuis $SRC_URL"
curl -fSL --progress-bar "$SRC_URL" -o "$TMP_FILE"

# 720 px sur la largeur en portrait, 1280 px en paysage : la vidéo s'affiche
# dans un bloc aspect-[3/4] large d'au plus 50vw, donc au-delà on paierait du
# transfert pour des pixels que personne ne voit.
# -an : la balise <video> est muette, la piste audio est du poids mort.
# +faststart : place l'index en tête du fichier pour que la lecture démarre
# avant la fin du téléchargement.
echo "→ Compression"
ffmpeg -hide_banner -loglevel warning -y -i "$TMP_FILE" \
  -vf "scale='if(gt(iw,ih),1280,720)':-2" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
  -an -movflags +faststart \
  "$TMP_FILE.out.mp4"

mkdir -p "$OUT_DIR"
mv "$TMP_FILE.out.mp4" "$OUT_FILE"

before=$(du -h "$TMP_FILE" | cut -f1)
after=$(du -h "$OUT_FILE" | cut -f1)
echo
echo "✓ $OUT_FILE"
echo "  avant : $before   après : $after"
echo
echo "Étapes suivantes :"
echo "  1. git add $OUT_FILE && git commit -m 'Servir la vidéo du profil depuis le CDN'"
echo "  2. dans lib/data.ts, remplacer l'URL Blob par \"/video/profile.mp4\""
echo "     (ou définir NEXT_PUBLIC_PROFILE_VIDEO_URL=/video/profile.mp4 sur Vercel)"
echo "  3. git push, puis supprimer le fichier du Blob store dans le dashboard Vercel"
