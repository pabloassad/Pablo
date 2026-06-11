# Photos

Every slot is mapped in `lib/data.ts` (`images`, `cercleGallery`, `cercleLiveSets`, `liveSetsMusic`).
One photo per slot per page: no image appears twice on the same page.

A shared colorimetry filter (`contrast(1.08) saturate(0.88) brightness(0.97)`) is
applied to every photo via `ArtImage`. Logos and icons are excluded.

- `pablito-amber.jpg`       — crystal tee portrait, warm backdrop (Home hero)
- `pablito-beige.jpg`       — beige suit, seated editorial (Home profile)
- `pablito-red.jpg`         — red light, club energy (Home universe Club, Music sets live Yardland)
- `pablito-street.jpg`      — beige suit, street daylight (Contact)
- `pablito-club.png`        — hands up in the booth (Projects, Le Cercle case study)
- `pablito-crowd.png`       — black and white crowd (Projects hero)
- `cercle-room.png`         — full room under the beams (Home, Cercle band)
- `cercle-01..05.jpg`       — one shot per recorded Cercle edition (Le Cercle carousel)
- `cover-bsb.png`           — crowd, hands up (Projects clubs section, Music sets live BSB League)
- `cover-rinse.jpg`         — square portrait "Pablito carré" (Music sets live Rinse Radio, Contact)
- `cover-opening.png`       — Le Cercle Opening set cover (Music sets live)
- `live-violet.png`         — violet beams over the floor (Music)
- `live-champagne.png`      — champagne pour in the dark (Music)
- `studio-session.jpg`      — hands on the keyboard, studio (Home universe, Producer)
- `studio-composition.jpg`  — at the DAW, studio (Music header)

`extra/` holds the unused reserve shots. Venue logos live in `/public/logos`.
