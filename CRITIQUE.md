# CRITIQUE — Site portfolio Pablo Assad
*Verdict du jury · build prod mesuré 2026-07 (localhost), commit afb8cf9 · Next 15 / Tailwind v4 / Framer Motion / Lenis*

---

## 1. Verdict global

**Une phrase honnête :** Une coquille suisse élégante avec deux vraies idées ownables (le conceit « composer des marques » et la Table d'écoute à waveforms scrubbables), mais posée sur des fondations qui se cassent en 30 secondes devant un jury — polices 404 sur *chaque* page, 302 MB de vidéo sur mobile, un Répertoire qui ouvre sur un vide, et deux projets réels seulement — de sorte que le talent visuel est réel mais la preuve et l'ingénierie ne le sont pas.

**Note globale : 53 / 100.**

*Calcul : moyenne des 14 dimensions pondérée par l'impact sur les objectifs (décrocher un stage/alternance en agence, entrer en Master Stratégie, convaincre un client). Performance, première impression, Répertoire et contenu pèsent le plus ; SEO et qualité de code le moins.*

| # | Dimension | Note /10 | Poids | Contribution |
|---|-----------|:---:|:---:|:---:|
| 1 | Première impression / wow 30 s | 6 | 12 | 72 |
| 2 | Identité & différenciation (anti-slop) | 6 | 8 | 48 |
| 3 | UX / navigation / IA | 5 | 8 | 40 |
| 4 | UI / système visuel | 5 | 7 | 35 |
| 5 | Layout / composition / grille | 6 | 6 | 36 |
| 6 | Motion / interactions / scrollytelling | 7 | 5 | 35 |
| 7 | Répertoire / catalogue | 5 | 10 | 50 |
| 8 | Table d'écoute / feature son | 7 | 6 | 42 |
| 9 | Contenu / copy / storytelling | 6 | 10 | 60 |
| 10 | Performance | 3 | 12 | 36 |
| 11 | Accessibilité | 4 | 5 | 20 |
| 12 | Responsive / mobile | 4 | 6 | 24 |
| 13 | SEO / Open Graph | 6 | 3 | 18 |
| 14 | Qualité du code / maintenabilité | 6 | 2 | 12 |
| | **Total pondéré** | | **100** | **528 → 52,8** |

**Moyenne brute non pondérée : 5,4/10.** La pondération par impact ne remonte pas la note : les points forts (motion, son) pèsent peu sur la décision d'un recruteur, les points faibles (perf, Répertoire, contenu) pèsent lourd.

---

## 2. Cinq vraies forces (à garder absolument)

1. **La Table d'écoute est le seul élément à la fois singulier ET top-tier.** Waveform à vrais pics RMS décodés une fois et cachés, dessinée sur canvas DPR-scaled avec nombre de barres adaptatif (`Waveform.tsx:45-49,69-85,102-137`) ; transport complet click-to-seek + drag-scrub + slider clavier réel `role=slider` avec flèches et Enter (`Waveform.tsx:148-189`) ; un-son-à-la-fois garanti par construction via un unique élément Audio global qui arbitre contre les vidéos (`AudioProvider.tsx:52-70,79,99-102`) ; mini-player persistant cross-route avec sa propre waveform live (`MiniPlayer.tsx:13-63`). C'est ce qui fait mériter un regard à Pablo — un étudiant en comm qui compose est un vrai différenciateur.

2. **Le conceit musical est authentique et cohérent, pas du template.** Le fil « Je compose des marques » (double sens : Pablo compose réellement), la section Craft construite comme un « silence » musical avec vrai glyphe double-barre ‖ (`Craft.tsx:30`), « La Table d'écoute », le registre console-studio « mono » (`translations.ts:97,132`). C'est reconnaissablement Pablo. Les marqueurs d'IA-slop sont largement absents de la copy visible : em-dashes uniquement dans les commentaires de code, zéro « not X but Y » / « n'est pas… mais ».

3. **Le motion design est ambitieux, utile et propre en reduced-motion.** Parallaxe sur nom/plaque, révélation clip-path avec Ken Burns sur le portrait About (`About.tsx:30-35`), reveals mot-à-mot (`RevealText.tsx:13-16`), rail Journey scroll-driven en spring qui se lit comme une progression (`Journey.tsx:57`). Chaque composant respecte `useReducedMotion` (`Hero.tsx:42,81 ; About.tsx:50,54 ; Catalogue.tsx:453`). CLS excellent (0.008 home / 0.0002 rep, EVIDENCE:5-6).

4. **Le moteur de grille justifiée est de la vraie ingénierie, pas du template.** `justifyRows()` remplit les rangées à leur ratio natif sans crop, gère les orphelins par emprunt d'un voisin (`Catalogue.tsx:256-269`), et une rangée feature plus haute (HERO=1.42). Le rail + les dots Journey partagent une seule variable `--axis` pour garder l'alignement à travers les breakpoints (`Journey.tsx:69`). C'est sophistiqué.

5. **La copy qui existe est bien écrite, humaine et bilingue non-littérale.** Voix FR juste (« toujours du côté où l'on fabrique », « j'aime que les idées tiennent debout ») ; l'EN est une adaptation délibérée (« with non profits, and as a founder » vs « l'associatif et l'entrepreneuriat », `translations.ts:200-203`), pas un miroir machine. Contact réel et actionnable : email, mobile FR, LinkedIn, téléchargement CV tous présents (`translations.ts:160-174`).

---

## 3. Cinq faiblesses majeures (par ordre d'impact)

1. **Performance disqualifiante sur l'appareil du recruteur : 302 MB / 32 requêtes mp4 sur un chargement mobile de `/repertoire`** (EVIDENCE:7). Cause structurelle : 15 éléments `<video>` (adonis 4 + le-cercle 6 + 4 pièces + hero) tous montés d'un coup (`Catalogue.tsx:361` `rows.map` sans windowing), chacun `preload="metadata"` sans poster (`Catalogue.tsx:497`, zéro `poster` dans le tsx), plus le rewind `currentTime=0` + loop qui re-déclenche des Range fetches (`Catalogue.tsx:455-460`). Sur 4G réelle, la page time-out avant que la grille peigne. C'est le plus gros disqualifiant, seul.

2. **Le Répertoire — la page dont c'est tout le métier — ouvre sur un vide.** Toute la première fenêtre est une seule vidéo `hero.mp4` 22,3 MB, sans poster, `preload="metadata"` (`Catalogue.tsx:19,137,497`). Le titre « PORTFOLIO » est blanc-sur-pâle car le seul fond sombre est un gradient bas-seulement `from-ink/55` qui dépend de la vidéo en train de peindre (`Catalogue.tsx:140`). Les quatre screenshots (bp-rep-desk/tablet/xs/ultrawide) montrent la tuile vide et le titre à peine lisible. Single point of failure « by design ».

3. **Le fond est mince : deux projets réels seulement, l'un est son propre club, le corpus penche « teen-nightlife ».** `data/projects.ts` = exactement `adonis` + `le-cercle` (`status:published`), Le Cercle étant sa propre marque événementielle « Fondateur » et Adonis daté 2026. Le reste = 11 pièces détachées majoritairement des flyers de soirée (Rosa Summer Party, Miami Game, La Nuit du Bac, Boss Lady, Flashback). **Aucun case-study** : chaque projet ne porte que catégorie · année · un mot descripteur, zéro brief/décision/résultat (`Catalogue.tsx:307-311`). Pour un candidat qui vend « la rigueur d'un stratège » et « Je compose des marques », la preuve du stratège est absente et l'échelle du travail lit « promo lycée », pas « brand direction agence ».
   - **Risque crédibilité aggravant :** la fiche du projet phare Le Cercle affiche `le-cercle/09.webp` — lettrage ballon rose « LOCK UP YOUR DAUGHTERS », sticker « PARENTAL ADVISORY » et co-brand « Avec Durex ® » (`projects.ts:56-73`). Devant un jury d'admission Master et des agences, ce visuel lit misogyne-nightlife et détruit le positionnement premium. C'est le frame le plus décrédibilisant du site.

4. **Le système typographique est une fiction avec erreurs console.** `@font-face` « Helvetica Neue Web » pointe vers `/fonts/HelveticaNeue-Roman.woff2` et `-Bold.woff2` qui **n'existent pas** (`public/fonts/` ne contient que README.md), d'où **404 + erreur console sur chaque page** (`globals.css:29-40`, EVIDENCE:8). Le commentaire du code prétend « no-op … build never breaks » (`globals.css:27-28`) — faux : c'est une erreur runtime persistante maquillée. L'identité « Helvetica-first » n'est livrée qu'à macOS/iOS ; Windows/Android tombent sur Inter/Archivo — donc les screenshots ne montrent même pas la police revendiquée. N'importe quel juré qui ouvre devtools 5 s voit un build cassé.

5. **Accessibilité systémique : le token `--faint #a3a3a3` échoue AA et porte l'information.** 2,52:1 sur blanc / 2,23:1 sur paper-2 (EVIDENCE:20), appliqué à l'année/catégorie/descripteur des projets (`Catalogue.tsx:307`), la note pièces (`Catalogue.tsx:85`), figcaptions PORTRAIT/PARIS, TOOLS — soit exactement l'info qu'un juré doit lire pour savoir ce qu'il regarde. Les timecodes de la section sombre `paper/45` ≈ 4,22:1 échouent aussi (`SoundLibrary.tsx:91`, EVIDENCE:22). Et sous `prefers-reduced-motion` + absence de poster, les 15 tuiles vidéo deviennent des rectangles gris vides (`Catalogue.tsx:453,365`) : le Répertoire visuel disparaît entièrement pour ces utilisateurs.

---

## 4. Liste critique priorisée

### P0 — Bloquant / décrédibilise en 30 s

- **Polices 404 sur chaque page.** *Preuve :* `globals.css:29-40` → fichiers absents, `public/fonts/` = README.md seul, 2 erreurs console (EVIDENCE:8). *Reco :* livrer les vrais woff2 Helvetica sous licence, OU supprimer le `@font-face` mort et assumer un grotesque licencié distinctif — zéro 404. *Effort : S.*

- **302 MB / 32 mp4 au chargement mobile du Répertoire.** *Preuve :* EVIDENCE:7 ; `Catalogue.tsx:361` (tout monté), `:497` (`preload=metadata`, no poster), `:455-460` (rewind+loop refetch). *Reco :* poster webp ~20 KB par clip ; lazy-mount tout ce qui est sous la première rangée visible ; compresser les mp4 (16 fichiers = 207,6 MB, hero 22,3 MB) ; plafonner le transfert mobile initial < ~8 MB. *Effort : L.*

- **Répertoire ouvre sur un vide dépendant d'une seule vidéo 22,3 MB.** *Preuve :* `Catalogue.tsx:19,137,140,497` ; bp-rep-*.png. *Reco :* poster/still dark en fond, titre « PORTFOLIO » sur un backing sombre indépendant de la vidéo, découpler le layout de la disponibilité média. *Effort : M.*

- **Visuel « LOCK UP YOUR DAUGHTERS » + Durex sur le projet phare.** *Preuve :* `public/works/le-cercle/09.webp`, `projects.ts:56-73`. *Reco :* retirer ce frame du grid public (ou recadrer sans le sticker et le co-brand condom). *Effort : S.*

- **Deux projets réels, zéro case-study.** *Preuve :* `data/projects.ts` = adonis + le-cercle ; `Catalogue.tsx:307-311` métadonnées seules. *Reco :* convertir en 4-6 vraies études de cas avec route dédiée (rôle, contexte, problème, 2-3 décisions, résultat) — pas une lightbox. *Effort : L.*

- **Overflow horizontal 16px @360px sur la home.** *Preuve :* EVIDENCE:9, plaque portrait hero `figure` / `img.-scale-x-100`. *Reco :* clip/overflow-hidden sur le conteneur, corriger la largeur de la plaque. *Effort : S.*

### P1 — Sérieux, coûte des points

- **`--faint #a3a3a3` échoue AA sur du contenu informatif.** *Preuve :* 2,52/2,23:1 (EVIDENCE:20) sur `Catalogue.tsx:307,85`, Hero/About/Journey/Contact/Craft. *Reco :* plancher à ~#767676 (≥4,5:1) pour tout texte. *Effort : S.*

- **Timecodes section sombre `paper/45` échouent AA.** *Preuve :* ≈4,22:1 (EVIDENCE:22), `SoundLibrary.tsx:91,133,152,179`. *Reco :* remonter à paper/70+. *Effort : S.*

- **Grid vidéo invisible sous reduced-motion.** *Preuve :* `Catalogue.tsx:453+365`, pas de poster. *Reco :* les posters P0 règlent aussi ceci ; afficher le still même sans autoplay. *Effort : S* (dépend des posters).

- **Deep-linking absent + CTA contact disparu sur mobile.** *Preuve :* pas de hash par projet (`Catalogue.tsx:294-317`), seulement `#visuel/#son` ; « Get in touch » `md:inline-block` (`Nav.tsx:82`). *Reco :* ancres/routes par projet ; CTA contact persistant sur mobile. *Effort : M.*

- **Lightbox sans focus-trap, focus-return, ni prev/next.** *Preuve :* `Lightbox.tsx` (aucun handler next/prev), vidéo agrandie sans son ni scrub (`:74-82`). *Reco :* trap focus, retour focus, navigation clavier prev/next. *Effort : M.*

- **`robots.ts` pointe le sitemap sur le mauvais domaine.** *Preuve :* `robots.ts:6` `pabloassad.vercel.app` vs `lib/site.ts:6` `pablo-portfolio-alpha.vercel.app`. *Reco :* utiliser `siteUrl`. *Effort : S.*

- **Carte OG du Répertoire régresse sur Twitter.** *Preuve :* `app/repertoire/page.tsx:9-14` redéfinit `openGraph` (merge shallow → perd siteName/locale/type) sans redéfinir `twitter`, donc le lien /repertoire rend le titre/description **home** sur X. *Reco :* compléter openGraph, définir twitter par page, image OG dédiée work-grid. *Effort : S.*

- **LCP home 2196 ms sur localhost.** *Preuve :* EVIDENCE:5 ; le wordmark LCP est animé depuis opacity:0 delay 0.24s + 0.9s (`Hero.tsx:25-34,80-92`). *Reco :* ne pas retenir le plus grand paint derrière une anim ; preload portrait. *Effort : M.*

- **Waveform `role=slider` sans `aria-valuenow` quand inactif.** *Preuve :* `Waveform.tsx:152,156`. *Reco :* fournir valuenow=0 par défaut. *Effort : S.* **`/repertoire` sans h1** (`Catalogue.tsx:143` h2, `:301` h3) : ajouter un h1. *Effort : S.*

### P2 — Finitions

- **`crazyfunk` livré en .wav 4,3 MB** dans une lib sinon mp3, et c'est la 1re piste / une commande client (`data/audio.ts:15`, EVIDENCE:15). *Reco :* encoder mp3. *Effort : S.*
- **og.png 584 KB pour 1200×630** (EVIDENCE:16). *Reco :* recompresser < 100 KB. *Effort : S.*
- **Bande morte ultrawide** : home @2560 grand vide entre nav et nom ; /repertoire ~700px de paper-2 vide avec « PORTFOLIO » collé au bas (bp-*-ultrawide.png). *Reco :* `max-width` + recentrage vertical. *Effort : M.*
- **`--color-muted` duplique `--color-mute`** (`globals.css:46-47`) ; **scaffolding ResizeObserver dupliqué** MediaMosaic vs PieceWall (`Catalogue.tsx:339-345` vs `616-622`). *Reco :* dédupliquer. *Effort : M.*
- **Cliché Saint-Exupéry comme unique statement créatif** (`translations.ts:151-153`, `craft.body: []`) + tagline antithèse-machine (`:98`). *Reco :* remplacer par des mots originaux qui montrent la pensée. *Effort : S.*
- **`next.config.ts:4-8`** configure les formats image mais zéro stratégie pour 207 MB de vidéo. *Reco :* pipeline de compression/poster. *Effort : M.*

---

## 5. Quick wins (impact élevé / effort faible)

- Supprimer/remplacer le `@font-face` mort → tue les 404 et les 2 erreurs console site-wide (`globals.css:29-40`). **[le plus rentable]**
- Retirer `le-cercle/09.webp` du grid public (frame « lock up your daughters » + Durex).
- Passer `--faint` à ~#767676 et remonter les timecodes paper/45 → toute l'accessibilité contraste réglée en un token.
- Corriger l'overflow 16px @360px (clip sur la plaque hero).
- Corriger `robots.ts:6` sur le bon domaine ; compléter l'openGraph/twitter du Répertoire.
- Encoder `crazyfunk` en mp3 ; recompresser og.png < 100 KB.
- Ajouter un h1 sur `/repertoire` ; `aria-valuenow=0` par défaut sur la waveform.

---

## 6. Feuille de route ordonnée

1. **Réparer les deux disqualifiants d'abord** (sinon tout le reste est invisible) : polices (zéro 404) + posters/lazy-mount/compression vidéo pour passer sous ~8 MB mobile. Ceci seul fait passer le site de « auto-rejeté » à « dans la conversation ».
2. **Découpler le Répertoire de la vidéo** : backing sombre indépendant pour « PORTFOLIO », stills visibles même en reduced-motion, retirer le frame Durex.
3. **Transformer la galerie en 4-6 études de cas** (routes dédiées, rôle/contexte/décisions/résultat) — c'est ce qui convertit recruteur, école et client.
4. **Passer le contraste et tuer l'overflow** : `--faint` ≥ 4,5:1, timecodes, 360px.
5. **Mettre le son au centre**, pas en footnote : la Table d'écoute + continuité audio cross-page comme colonne vertébrale de l'expérience — c'est le seul mouvement signature ownable.
6. **Remesurer sur un vrai téléphone throttlé 4G**, viser LCP home < 1,5 s ; puis finitions P2 (ultrawide, dédup code, statement Craft, SEO/OG image dédiée, JSON-LD).

---

## Trois verdicts cibles

**Recruteur agence (screen 30 s, stage/alternance) — RÉPONDRAIT quand même :** « Le hero home vend le positionnement en une seconde et le contact est réel — ça achète un scroll. Puis je clique Portfolio et je tombe sur un écran vide qui tente 300 MB de vidéo, et le travail c'est deux projets — son club et un "client" daté 2026 — plus ses flyers. Fonts 404 partout sous une signature "rigueur d'un stratège". Présentation digne d'un stage ; substance et ingénierie, pas encore. Un junior prometteur qui se survend. »

**Panel d'admission Master Stratégie — N'ADMETTRAIT PAS sur cette base :** « Vrai signal fondateur et vraie transdisciplinarité (image + vidéo + son composé), mais c'est un folio design/event-promo déguisé en stratégie. Le mot "stratège" est dans la copy et nulle part dans le travail : aucun brief, aucune audience, aucun résultat, deux projets, une section Craft qui sous-traite sa seule idée à Saint-Exupéry. Le 302 MB mobile et les fonts 404 démentent activement la "rigueur" vendue. Œil impressionnant ; esprit non prouvé. Shortlist pour un entretien qui teste si la stratégie existe derrière l'esthétique. »

**Client payant (design/brand/son, scan adversarial 30 s) — 5/10, contacterait :** « Le hero me convainc en une seconde qu'il a du goût — puis le portfolio ouvre sur un vide gris (vidéo 22,8 MB) et pèse 302 MB sur mobile, donc sa preuve n'arrive jamais. Derrière : deux études de cas d'une ligne, tout daté 2026, et une marque Helvetica qui livre des Helvetica en 404. Le goût est réel et l'angle sound design vraiment intéressant ; la discipline d'ingénierie non. Il sait art-diriger un flyer, pas encore piloter une marque. »

---

## Benchmark top-1%

**Ce que font les sites SOTD que ce site ne fait pas :**
- LCP < 2 s throttlé et quelques MB de transfert initial car chaque asset lourd est lazy-loaded, poster-framé et streamé à la demande — jamais de vide blanc en attente de vidéo. Ici : 32 mp4 / ~302 MB, no poster (EVIDENCE:7 ; `Catalogue.tsx:497`).
- Zéro erreur console / zéro requête échouée. Ici : 404 fonts sur chaque page (EVIDENCE:8).
- Identité typo réelle, pas aspirationnelle : la woff2 sous licence est livrée. Ici l'esthétique revendiquée diffère de l'esthétique livrée (fallback Inter/Archivo).
- Contraste impeccable, tout passe AA. Ici `--faint` 2,52:1 (EVIDENCE:20).
- Profondeur : 4-8 études de cas rôle/contexte/process/résultat. Ici 2 projets, une lightbox, zéro narratif.
- Une interaction signature mémorable — la Table d'écoute EST ce candidat, mais elle est enterrée en dernier mouvement d'une page au lieu d'être l'identité du site.

**Gap principal :** deux fautes de fondation disqualifiantes attrapées en 30 s (fonts 404 + 302 MB no-poster) + un Répertoire « plomberie impressionnante, maison vide » (moteur justifié sophistiqué tournant sur 2 projets) + une dépendance totale à de la vidéo non orchestrée. La CLS (0.008/0.0002) est, elle, réellement top-tier.

**Mouvements décisifs (3-5) :**
1. Réparer les deux disqualifiants (zéro 404 ; posters + lazy-load + < 8 MB mobile) — passe de « auto-rejeté » à « dans la conversation ».
2. Convertir la galerie en 4-6 vraies études de cas avec routes dédiées — la profondeur gagne jurys ET stages.
3. Mettre le son au centre : faire de la continuité audio cross-page et de l'identité de compositeur la colonne vertébrale, pas la note de bas de page — le seul move signature.
4. Passer le contraste (`--faint` → ≥4,5:1, timecodes) et clipper l'overflow 360px — une esthétique suisse ne se mérite qu'en étant pixel- et contraste-honnête.
5. Tester sur un vrai téléphone throttlé, LCP home < 1,5 s (2196 ms localhost est le plafond, pas le plancher).