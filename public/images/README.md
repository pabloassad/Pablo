# Photos

Every slot is mapped in `lib/data.ts` (`images`, `cercleGallery`, `cercleLiveSets`, `liveSetsMusic`).
One photo per slot, site wide: no image appears twice anywhere on the site.

A shared colorimetry filter (`contrast(1.08) saturate(0.88) brightness(0.97)`) is
applied to every photo via `ArtImage`. The Service window uses the softer
`tone="soft"` variant (`contrast(1.05) saturate(0.92) brightness(1.02)`).
Logos and icons are excluded.

- `pablito-amber.jpg`       — crystal tee portrait, warm backdrop (Home hero)
- `pablito-beige.jpg`       — beige suit, seated editorial (Home profile)
- `pablito-red.png`         — red light, club energy (Music sets BSB League)
- `pablito-club.png`        — hands up in the booth (Projects, Le Cercle case study)
- `pablito-crowd.png`       — black and white crowd (Projects hero)
- `cercle-room.png`         — full room under the beams (Home, Cercle band)
- `cercle-01..04.jpg`, `cercle-05.png` — one shot per recorded Cercle edition (Le Cercle carousel)
- `cover-club.png`          — DJ from behind, crowd lit in pink (Projects, crowd divider)
- `cover-bsb.png`           — crowd, hands up (Home universe Club)
- `cover-radio.jpg`         — profile at the DAW (Music sets Rinse Radio)
- `cover-yardland.png`      — mic in hand, black and white (Music sets Yardland)
- `cover-opening.png`       — Le Cercle Opening set cover (Le Cercle carousel, last)
- `cover-rinse.jpg`         — square portrait "Pablito carré" (Contact)
- `live-violet.png`         — violet beams over the floor (Music sets, Cercle highlight)
- `live-champagne.png`      — champagne pour in the dark (Music, YouTube banner)
- `studio-session.jpg`      — hands on the keyboard, studio (Music header)
- `studio-composition.jpg`  — at the DAW, studio (Home universe, Producer)
- `studio-flstudio.jpg`     — at the FL Studio rig (Service, compositions)
- `premium-portrait.jpg`    — beige suit, daylight portrait (Service header)
- `service-lounge.jpg`      — denim outfit, seated on the couch (Service, private events)

`extra/` holds the unused reserve shots. Venue logos live in `/public/logos`.
