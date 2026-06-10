export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];

export const translations = {
  en: {
    nav: {
      home: "Home",
      music: "Music",
      projects: "Projects",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    home: {
      kicker: "DJ / Producer",
      heroTagline: "Bringing dancefloors to life.",
      heroPlay: "Play the sound",
      heroProjects: "View projects",
      collabsExtra:
        "And also: Les Bains Douches, Pavillon Tilsitt, Hôtel Carlton's, Folie's Pigalle and other private collaborations.",
      scroll: "Scroll",
      manifestoLabel: "Philosophy",
      manifestoQuote:
        "Music's highest purpose is connection — strangers becoming one crowd, one heartbeat.",
      duoLabel: "Universe",
      duo: [
        {
          title: "Club & Festival",
          line: "Immersive sets engineered for the dancefloor.",
          href: "/projects",
        },
        {
          title: "Artist & Producer",
          line: "Original productions with a distinct signature.",
          href: "/music",
        },
      ],
      cercleLabel: "Signature project",
      cercleTitle: "Le Cercle",
      cercleLine: "No stage. No separation. One shared frequency.",
      cercleCta: "Enter the circle",
      cerclePlay: "Play the latest set",
      listenLabel: "Now streaming",
      listenTitle: "Listen while you browse",
      listenLine: "Launch the player — the music follows you across the site.",
      ctaTitle: "Let's build something together",
      ctaButton: "Get in touch",
    },
    music: {
      kicker: "Music",
      title: "Sound Gallery",
      intro: "Productions, edits and live recordings.",
      play: "Play",
      playInPlayer: "Listen on the site",
      openPlatform: "Open",
      spotifyTitle: "Releases",
      soundcloudTitle: "Mixes & edits",
      youtubeTitle: "Live sets",
      youtubeLine: "Full recordings — Le Cercle and beyond.",
      platforms: "Listen on",
    },
    projects: {
      kicker: "Projects",
      title: "Sound, stage & vision",
      intro: "Three territories, one intention: turning a room into a shared moment.",
      clubsLabel: "Booking",
      clubsTitle: "Clubs & stages",
      cercleLabel: "Signature project",
      cercleTitle: "Le Cercle",
      cercleIntro:
        "A recurring ritual: a circular dancefloor, the booth at the heart of the crowd, warm light tuned to disappear.",
      cercleBody:
        "Born from a simple observation — the best nights are the ones where everyone forgets who's behind the decks. Edition after edition, Le Cercle became a community.",
      cercleTags: ["Circular floor", "Extended sets", "Community"],
      cercleInstagram: "Follow Le Cercle",
      statsParticipants: "Participants per edition",
      statsEditions: "Editions",
      statsViews: "Cumulative views",
      statsPartners: "Major partners",
      setsLabel: "Live archive",
      setsTitle: "Cercle Sets",
      setsIntro: "Every edition, recorded. A living archive of the project.",
      setsPlay: "Play this edition",
      nowPlaying: "Now playing",
      premiumLabel: "Beyond the club",
      premiumTitle: "Premium & Private Events",
      premiumIntro:
        "Weddings, corporate nights, brand activations and festivals — the same energy, tailored to any space.",
      premiumPoints: [
        {
          title: "Full production",
          line: "Own sound system and lighting design, set up and struck without friction.",
        },
        {
          title: "Total autonomy",
          line: "From load-in to teardown, every technical detail is handled in-house.",
        },
        {
          title: "Any audience",
          line: "Sets shaped for the room — corporate, festival or intimate celebration.",
        },
      ],
      battleLabel: "Performance",
      battleTitle: "Battle / All-Style DJing",
      battleIntro: "Live reaction as an art form.",
      battlePoints: [
        {
          title: "All-style battles",
          line: "Official DJ for all-style dance battles — every round a different language.",
        },
        {
          title: "Reading the floor",
          line: "Music adapted live to the dancers' energy, second by second.",
        },
        {
          title: "Improvised, precise",
          line: "Reactive performance where selection and timing decide everything.",
        },
      ],
      ctaTitle: "Book Pablito",
      ctaButton: "Get in touch",
    },
    contact: {
      kicker: "Contact",
      title: "Let's build something together",
      intro: "Bookings, collaborations, press — every project starts with a conversation.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      socialLabel: "Follow",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send message",
      sending: "Sending…",
      success: "Thank you — your message has been sent.",
      error: "Something went wrong. Please try again or email directly.",
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
      },
    },
    player: {
      nowPlaying: "Now playing",
      play: "Play",
      pause: "Pause",
      next: "Next",
      previous: "Previous",
      expand: "Expand player",
      collapse: "Collapse player",
      close: "Close player",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      copyLink: "Copy link",
      linkCopied: "Link copied",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      music: "Musique",
      projects: "Projets",
      contact: "Contact",
      menu: "Menu",
      close: "Fermer",
    },
    home: {
      kicker: "DJ / Producteur",
      heroTagline: "Faire vivre le dancefloor.",
      heroPlay: "Lancer le son",
      heroProjects: "Voir les projets",
      collabsExtra:
        "Et également : Les Bains Douches, Pavillon Tilsitt, Hôtel Carlton's, Folie's Pigalle et d'autres collaborations privées.",
      scroll: "Défiler",
      manifestoLabel: "Philosophie",
      manifestoQuote:
        "La plus haute vocation de la musique : créer du lien — des inconnus qui deviennent une foule, un seul battement.",
      duoLabel: "Univers",
      duo: [
        {
          title: "Club & Festival",
          line: "Des sets immersifs pensés pour le dancefloor.",
          href: "/projects",
        },
        {
          title: "Artiste & Producteur",
          line: "Des productions originales à la signature singulière.",
          href: "/music",
        },
      ],
      cercleLabel: "Projet signature",
      cercleTitle: "Le Cercle",
      cercleLine: "Pas de scène. Pas de séparation. Une fréquence partagée.",
      cercleCta: "Entrer dans le cercle",
      cerclePlay: "Écouter le dernier set",
      listenLabel: "En écoute",
      listenTitle: "Écoutez en naviguant",
      listenLine: "Lancez le player — la musique vous suit sur tout le site.",
      ctaTitle: "Construisons quelque chose ensemble",
      ctaButton: "Prendre contact",
    },
    music: {
      kicker: "Musique",
      title: "Galerie sonore",
      intro: "Productions, edits et enregistrements live.",
      play: "Écouter",
      playInPlayer: "Écouter sur le site",
      openPlatform: "Ouvrir",
      spotifyTitle: "Sorties",
      soundcloudTitle: "Mixes & edits",
      youtubeTitle: "Sets live",
      youtubeLine: "Enregistrements complets — Le Cercle et au-delà.",
      platforms: "Écouter sur",
    },
    projects: {
      kicker: "Projets",
      title: "Le son, la scène & la vision",
      intro: "Trois territoires, une intention : transformer une salle en moment partagé.",
      clubsLabel: "Booking",
      clubsTitle: "Clubs & scènes",
      cercleLabel: "Projet signature",
      cercleTitle: "Le Cercle",
      cercleIntro:
        "Un rituel récurrent : un dancefloor circulaire, la cabine au cœur de la foule, une lumière chaude pensée pour disparaître.",
      cercleBody:
        "Né d'un constat simple — les meilleures soirées sont celles où l'on oublie qui est derrière les platines. Édition après édition, Le Cercle est devenu une communauté.",
      cercleTags: ["Format circulaire", "Sets longs", "Communauté"],
      cercleInstagram: "Suivre Le Cercle",
      statsParticipants: "Participants par édition",
      statsEditions: "Éditions",
      statsViews: "Vues cumulées",
      statsPartners: "Partenaires majeurs",
      setsLabel: "Archive live",
      setsTitle: "Les sets du Cercle",
      setsIntro: "Chaque édition, enregistrée. Une archive vivante du projet.",
      setsPlay: "Écouter cette édition",
      nowPlaying: "En lecture",
      premiumLabel: "Au-delà du club",
      premiumTitle: "Événements Premium & Privés",
      premiumIntro:
        "Mariages, soirées d'entreprise, activations de marque et festivals — la même énergie, adaptée à chaque lieu.",
      premiumPoints: [
        {
          title: "Production complète",
          line: "Système son et lumière propres, installation et démontage sans accroc.",
        },
        {
          title: "Autonomie totale",
          line: "Du chargement au rangement, chaque détail technique est géré en interne.",
        },
        {
          title: "Tout type de public",
          line: "Des sets pensés pour la salle — corporate, festival ou célébration intime.",
        },
      ],
      battleLabel: "Performance",
      battleTitle: "Battle / All-Style DJing",
      battleIntro: "La réaction live comme forme d'art.",
      battlePoints: [
        {
          title: "Battles all-style",
          line: "DJ officiel de battles de danse all-style — chaque round, un langage différent.",
        },
        {
          title: "Lire le floor",
          line: "Une musique adaptée en direct à l'énergie des danseurs, seconde par seconde.",
        },
        {
          title: "Improvisé, précis",
          line: "Une performance réactive où la sélection et le timing décident de tout.",
        },
      ],
      ctaTitle: "Booker Pablito",
      ctaButton: "Prendre contact",
    },
    contact: {
      kicker: "Contact",
      title: "Construisons quelque chose ensemble",
      intro: "Bookings, collaborations, presse — chaque projet commence par une conversation.",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      socialLabel: "Suivre",
      formName: "Nom",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Envoyer",
      sending: "Envoi…",
      success: "Merci — votre message a été envoyé.",
      error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
      validation: {
        required: "Ce champ est requis",
        email: "Merci d'entrer une adresse email valide",
      },
    },
    player: {
      nowPlaying: "En lecture",
      play: "Lecture",
      pause: "Pause",
      next: "Suivant",
      previous: "Précédent",
      expand: "Agrandir le player",
      collapse: "Réduire le player",
      close: "Fermer le player",
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié",
    },
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Translations = Widen<typeof translations.en>;
