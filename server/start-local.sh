#!/usr/bin/env bash
# Lance le convertisseur sur cette machine.
#
# Tourner en local règle le blocage de YouTube : la requête part de ta
# connexion internet (que YouTube ne bloque pas) au lieu d'une IP de
# datacenter, et yt-dlp lit les cookies directement dans ton navigateur —
# rien à exporter, aucun identifiant stocké nulle part.
#
#   ./start-local.sh            # cookies lus depuis Chrome
#   ./start-local.sh firefox    # ...ou un autre navigateur
#   ./start-local.sh none       # sans cookies du tout

set -euo pipefail
cd "$(dirname "$0")"

BROWSER="${1:-chrome}"

echo "→ Vérification des outils requis"

missing=()
command -v node >/dev/null 2>&1 || missing+=("node")
command -v ffmpeg >/dev/null 2>&1 || missing+=("ffmpeg")
command -v yt-dlp >/dev/null 2>&1 || missing+=("yt-dlp")

if [ ${#missing[@]} -gt 0 ]; then
  echo
  echo "Il manque : ${missing[*]}"
  echo
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Sur macOS, avec Homebrew (https://brew.sh) :"
    echo "    brew install ${missing[*]}"
  else
    echo "Sur Debian/Ubuntu :"
    echo "    sudo apt install -y ${missing[*]}"
    echo "(yt-dlp est souvent plus à jour via : pipx install yt-dlp)"
  fi
  echo
  exit 1
fi

# yt-dlp casse dès que YouTube change quelque chose : une version récente est
# la première chose à vérifier quand une extraction échoue.
echo "→ yt-dlp $(yt-dlp --version)"

if [ ! -d node_modules ]; then
  echo "→ Installation des dépendances"
  npm install --omit=dev --silent
fi

if [ "$BROWSER" != "none" ]; then
  export YTDLP_COOKIES_FROM_BROWSER="$BROWSER"
  echo "→ Cookies lus depuis : $BROWSER"
fi

export PORT="${PORT:-4000}"

echo
echo "  Convertisseur prêt →  http://localhost:$PORT"
echo "  (Ctrl+C pour arrêter)"
echo

node index.js
