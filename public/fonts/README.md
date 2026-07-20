# Self-hosted Helvetica Neue (licensed)

Drop the licensed web-font files here and every visitor (not just macOS/iOS)
gets the real face. The CSS in app/globals.css already references them:

- HelveticaNeue-Roman.woff2   (weights 400–500)
- HelveticaNeue-Bold.woff2    (weights 700–900)

Until the files are present the site falls back to Inter / Archivo — the build
is unaffected. To use a different cut, edit the @font-face `src` in
app/globals.css. Only ship fonts you are licensed to embed on the web.
