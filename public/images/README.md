# Photos

Every slot is mapped in `lib/data.ts` (`images`, `cercleGallery`, `cercleLiveSets`, `liveSetsMusic`).
One photo per slot, site wide: no image appears twice anywhere on the site.

A shared colorimetry filter (`contrast(1.08) saturate(0.88) brightness(0.97)`) is
applied to every photo via `ArtImage`. Logos and icons are excluded.

- `pablito-amber.jpg`       — crystal tee portrait, warm backdrop (Home hero)
- `pablito-beige.jpg`       — beige suit, seated editorial (Home profile)
- `pablito-red.png`         — red light, club energy (Home universe Club; temporarily also Yardland cover)
- `pablito-club.png`        — hands up in the booth (Projects, Le Cercle case study)
- `pablito-crowd.png`       — black and white crowd (Projects hero)
- `cercle-room.png`         — full room under the beams (Home, Cercle band)
- `cercle-01..04.jpg`, `cercle-05.png` — one shot per recorded Cercle edition (Le Cercle carousel)
- `cover-bsb.png`           — crowd, hands up (Music sets live BSB League; temporarily also Projects clubs module)
- `cover-rinse.jpg`         — square portrait "Pablito carré" (Contact)
- `cover-radio.jpg`         — profile at the DAW (Music sets live Rinse Radio)
- `cover-opening.png`       — Le Cercle Opening set cover (Le Cercle carousel)
- `live-violet.png`         — violet beams over the floor (Music)
- `live-champagne.png`      — champagne pour in the dark (Music)
- `studio-session.jpg`      — hands on the keyboard, studio (Music header)
- `studio-composition.jpg`  — at the DAW, studio (Home universe, Producer)

Two slots await dedicated uploads to clear the last duplicates: a wide energetic
crowd shot for the Projects clubs module, and a Yardland or festival shot for
the Yardland set cover.

`extra/` holds the unused reserve shots. Venue logos live in `/public/logos`.
