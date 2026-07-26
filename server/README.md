# Convertisseur URL → audio

Site autonome : colle une URL YouTube / YouTube Music, choisis WAV / MP3 / FLAC,
le fichier se télécharge automatiquement.

C'est **un seul service** — l'interface et l'API sont servies par le même
serveur, sur la même URL. Rien à configurer entre les deux, pas de CORS.
Il est totalement indépendant du site DJ (projet Next.js à la racine du dépôt).

Il a besoin d'un serveur persistant avec `yt-dlp` et `ffmpeg` — donc Railway,
Render ou une VM, **pas** Vercel.

## Déploiement (Railway ou Render)

Le `Dockerfile` à la **racine du dépôt** installe ffmpeg + yt-dlp et démarre le
service. Aucun réglage de « Root Directory » n'est nécessaire.

1. Nouveau projet → déployer depuis ce dépôt GitHub
2. Générer un domaine public (Railway : *Settings → Networking → Generate Domain*)
3. Ouvrir ce domaine : l'interface s'affiche

Variables d'environnement — **toutes optionnelles** :

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `PORT` | injecté par l'hébergeur | port d'écoute |
| `CONVERT_TIMEOUT_MS` | `120000` | abandon d'une conversion trop longue |
| `CORS_ORIGIN` | `*` | utile seulement si l'UI est servie ailleurs |

## Vérifier que tout va bien

`GET /health` :

```json
{ "ok": true, "ytdlp": true, "ffmpeg": true, "allowedOrigins": ["*"] }
```

`ok: false` indique lequel des deux binaires manque dans le conteneur.

## API

`POST /api/convert` → `{ "url": "...", "format": "wav" | "mp3" | "flac" }`

Succès : les octets audio avec un `Content-Disposition` de téléchargement.
Erreurs : `{ "error": "<code>" }` — `invalid_url` / `invalid_format` (400),
`unavailable` (422), `timeout` (504), `convert_failed` (500).

Les fichiers temporaires sont écrits dans un dossier par requête, supprimé dès
la fin du téléchargement ou en cas d'erreur.

## En local

Nécessite `yt-dlp` et `ffmpeg` sur le PATH.

```bash
cd server
npm install
npm start
# http://localhost:4000
```
