# Ajouter du contenu au site (sans toucher au code de layout)

Le site est **piloté par la donnée**. Pour ajouter une production ou un jalon de
parcours, tu modifies un fichier de données et tu déposes tes médias. La mise en
page s'adapte toute seule — et reste belle même à moitié remplie (les entrées
`placeholder` s'affichent comme des cadres élégants « À venir »).

---

## 1. Ajouter une production au catalogue

**Fichier :** `data/projects.ts`

1. Dépose tes médias dans `public/works/<slug>/` (ex. `public/works/rosa-summer-party/cover.jpg`).
   - Images : **JPG/PNG, ≥ 2000px de large**, optimisées.
   - `<slug>` = identifiant en minuscules-avec-tirets, unique.
2. Trouve l'entrée correspondante (ou crée-en une) et complète-la :

```ts
{
  slug: "rosa-summer-party",
  category: "design",              // "design" | "video" | "sound"
  title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
  client: "Rosa Paris",
  year: "2024",
  role: { fr: "Direction artistique", en: "Art direction" },
  blurb: { fr: "Trois lignes max.", en: "Three lines max." },
  cover: "/works/rosa-summer-party/cover.jpg",   // ← chemin du visuel
  status: "published",             // ← passe de "placeholder" à "published"
}
```

3. Tant que `status` est `"placeholder"` (ou qu'il n'y a pas de `cover`), la carte
   s'affiche comme un emplacement élégant. Dès que tu mets `cover` + `status:
   "published"`, le visuel apparaît.

**Catégories disponibles :** `design`, `video`, `sound` (modifiables dans
`categoryLabels` en haut du fichier).

---

## 2. Ajouter un jalon au parcours

**Fichier :** `data/journey.ts` — les jalons sont affichés dans l'ordre du tableau.

```ts
{
  id: "mon-jalon",
  year: "2025",
  title: { fr: "Titre", en: "Title" },
  place: { fr: "Contexte / lieu", en: "Context / place" },
  kind: "agency",        // "school" | "agency" | "venture" | "goal"
  blurb: { fr: "Optionnel.", en: "Optional." },
  emphasis: 2,           // 1 = normal · 2 = notable · 3 = à la une (plus gros)
}
```

---

## 3. Ajouter / modifier un outil

**Fichier :** `data/tools.ts` — ajoute une entrée `{ name, group }`.
Groupes : `design`, `motion`, `sound`, `ai` (voir `toolGroups`).
Pour afficher un vrai logo monochrome plus tard : dépose un SVG dans
`public/logos/<nom>.svg` et ajoute `logo: "/logos/<nom>.svg"` à l'entrée.

---

## 4. Le portrait (particules)

Dépose ta photo dans `public/portrait/` (visage net, fond uni, ≥ 2000px). Le
composant `PortraitPlate` sera remplacé par le canvas de particules qui en dérive
un nuage de points.

---

## Textes de l'interface

Les libellés et le peu de texte des sections vivent dans
`lib/i18n/translations.ts` (FR + EN). Tout est typé : si tu oublies une langue,
le build le signale.
