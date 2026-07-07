# Ajouter du contenu au site (sans toucher au code de layout)

Le site est **piloté par la donnée**. Ajouter une production = déposer des images
au bon endroit + retoucher une entrée dans un fichier de données. La mise en
page s'adapte seule, et reste belle à moitié remplie (les entrées `placeholder`
s'affichent comme des cadres « À venir » intentionnels).

---

## 1. Où déposer les visuels — convention

```
public/
├── works/
│   └── <slug>/          ← un dossier par projet (ex. adonis, le-cercle)
│       ├── cover.jpg    ← LE visuel principal (obligatoire pour publier)
│       ├── 01.jpg       ← visuels additionnels, dans l'ordre
│       ├── 02.jpg
│       └── …
├── journey/             ← visuels de la timeline (optionnel)
└── portrait/            ← photos de Pablo
```

**Formats conseillés :**
- **cover** : ratio **4:5** (portrait), **1600 px de large minimum**, JPG qualité 80-85 (ou WebP). Poids cible ≤ 500 Ko.
- **visuels additionnels** : 1600-2000 px de large, JPG/WebP. PNG uniquement pour les aplats graphiques (flyers) si le JPG bave.
- **vidéos** : ne pas déposer de MP4 > 5 Mo dans le repo. Préférer une version compressée courte (teaser ≤ 5 Mo) ou un lien YouTube/Vimeo non répertorié (le champ `media` acceptera bientôt les liens).

## 2. Comment déposer (2 méthodes)

**A. Via GitHub (recommandé, sans outil)** : ouvre
`github.com/pabloassad/Pablo` → branche `claude/hopeful-darwin-oaplv4` →
navigue vers `public/works/<slug>/` → **Add file → Upload files** → glisse tes
images → **Commit**. Le site se redéploie automatiquement (~1 min).

**B. En me donnant l'accès réseau** : si la politique réseau de l'environnement
Claude Code autorise `drive.google.com` + `drive.usercontent.google.com` +
`lh3.googleusercontent.com`, Claude peut aspirer le Drive, optimiser (resize,
compression) et ranger tout seul.

## 3. Publier un projet

**Fichier :** `data/projects.ts` — trouve l'entrée du projet et :

```ts
{
  slug: "adonis",
  // …
  cover: "/works/adonis/cover.jpg",          // ← ajoute le chemin
  media: [
    { src: "/works/adonis/01.jpg" },
    { src: "/works/adonis/02.jpg" },
  ],
  status: "published",                        // ← passe de "placeholder" à "published"
}
```

Tant que `status` vaut `"placeholder"`, la carte affiche un cadre élégant
« À venir » et la modale un aperçu propre — jamais un trou cassé.

## 4. Timeline, outils, textes

- **Parcours** : `data/journey.ts` (ordre du tableau = ordre affiché ;
  `emphasis: 3` = jalon à la une).
- **Outils** : `data/tools.ts` (`{ name, group }` ; groupes dans `toolGroups`).
- **Textes d'interface** (FR + EN) : `lib/i18n/translations.ts` — tout est typé,
  une langue oubliée fait échouer le build.
- **Règle typographique** : pas de « & » dans les textes affichés — écrire
  « et » (FR) / « and » (EN).
