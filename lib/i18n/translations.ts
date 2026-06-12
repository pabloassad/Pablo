export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];

export const translations = {
  en: {
    nav: {
      home: "Home",
      music: "Music",
      projects: "Projects",
      service: "Service",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    home: {
      kicker: "DJ / Producer",
      heroTagline: "Creating connection through sound.",
      heroPlay: "Play the sound",
      heroProjects: "View projects",
      heroBooking: "Booking",
      scroll: "Scroll",
      profileIntro: "About",
      profileQuote: "« Holà Pablito Que Pasa ? »",
      profileSubQuote: "Me, at 12, recording my first vocal signature.",
      profileParas: [
        "Born into the world of **hip-hop dance**, I discovered **deejaying** almost naturally, from childhood.",
        "From middle school on, between **beatmaking** and **piano** lessons, I sat in on my first **studio** sessions. Curiosity did the rest.",
        "Today, every **set** I build is an extension of that story. A way of **connecting people** through sound.",
        "Pablito is available for **bookings** in clubs, private events and festivals.",
      ],
      duoLabel: "Universe",
      duo: [
        {
          title: "Club",
          line: "Club sets, residencies and festivals.",
          href: "/projects",
        },
        {
          title: "Producer",
          line: "Compositions, remixes and edits made on FL Studio.",
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
      listenLine: "Launch the player. The music follows you across the site.",
      ctaTitle: "Let's build something together",
      ctaButton: "Get in touch",
    },
    music: {
      kicker: "Music",
      title: "Sound Gallery",
      intro: "Productions, edits and live recordings.",
      flStudioIntro:
        "Pablito creates his own **remixes**, **mashups** and **edits** on **FL Studio**. This production practice shapes a **singular musical identity**. Every set is built on original creations heard nowhere else.",
      play: "Play",
      openPlatform: "Open",
      spotifyTitle: "Releases",
      soundcloudTitle: "Mixes and edits",
      youtubeTitle: "Live sets",
      youtubeLine: "Full recordings, Le Cercle and beyond.",
      platforms: "Listen on",
      setsLiveLabel: "Sets live",
      setsLiveTitle: "Listen",
      setsLiveIntro: "A glimpse of a few recorded sets.",
      nowPlaying: "Now playing",
    },
    projects: {
      kicker: "Projects",
      title: "The sound, the stage and the eye",
      intro: "Three territories, one intention: turning a room into a shared moment.",
      clubsLabel: "Booking",
      clubsTitle: "Clubs and stages",
      collabsExtra:
        "Including Hôtel Carlton's, Les Bains Douches, Paradisio, Folie's Pigalle, Pavillon Tilsitt, Vincennes Estival Club and many more.",
      cercleLabel: "Signature project",
      cercleTitle: "Le Cercle",
      cercleSetsNote: "Sets recorded during **official Le Cercle editions**.",
      cercleIntro:
        "Le Cercle is a festive event concept I built around one simple idea: **bringing people together** in an **elegant, convivial** setting where **music** is at the heart of the experience.",
      cercleBody:
        "Since 2023, every edition rests on a **strong theme**, a carefully chosen **venue** and a musical atmosphere designed **to measure**.",
      cercleInstagram: "Follow Le Cercle",
      statsParticipants: "Participants per edition",
      statsEditions: "Editions",
      statsViews: "Cumulative views",
      statsPartners: "Major partners",
      setsLabel: "Live archive",
      setsTitle: "Live sets",
      setsIntro: "Every date, recorded. A living archive.",
      setsPlay: "Play this set",
      nowPlaying: "Now playing",
      ctaTitle: "Book Pablito",
      ctaButton: "Get in touch",
    },
    service: {
      kicker: "Service",
      title: "Made to measure",
      intro:
        "DJ sets for your events and original music for your projects. Two offers, one same requirement.",
      eventsLabel: "Beyond the club",
      eventsAxis: "The sound, the stage and the eye.",
      eventsTitle: "Private events",
      eventsIntro:
        "Pablito performs at your **weddings**, **private** parties, **corporate** events and **galas**. Every performance is designed to measure, to match your vision and your audience exactly.",
      eventsPoints: [
        {
          title: "Full equipment provided",
          line: "Professional sound system and stage lighting included in every performance. No external provider needed.",
        },
        {
          title: "Tailor-made music selection",
          line: "Every playlist is built around your wishes, your story and the atmosphere you want.",
        },
        {
          title: "Room reading",
          line: "Whether the audience is 20 or 500 people, young or intergenerational, Pablito adapts in real time.",
        },
      ],
      compositionsLabel: "Production",
      compositionsTitle: "Custom compositions",
      compositionsIntro:
        "Pablito composes and produces **custom music** for **live shows**, **audiovisual productions** and **artists**. Every project is shaped by the universe, the audience and the artistic intentions of its commissioner.",
      compositionsPoints: [
        {
          title: "Original compositions",
          line: "Every creation is produced from scratch on FL Studio, shaped to the identity of the project.",
        },
        {
          title: "Every format",
          line: "Jingle, opening theme, sound design, background music, long form creation.",
        },
        {
          title: "Built together",
          line: "Exchanges with the commissioner are part of every step of the process.",
        },
      ],
      ctaTitle: "Let's talk about your project",
      ctaButton: "Get in touch",
    },
    contact: {
      kicker: "Contact",
      title: "Let's build something together",
      intro: "Bookings, collaborations, press: every project starts with a conversation.",
      bookingIntro:
        "For a **booking**, a **performance** or a **collaboration**, get in touch with Pablito directly.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      socialLabel: "Follow",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send message",
      sending: "Sending…",
      success: "Thank you, your message has been sent.",
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
      service: "Service",
      contact: "Contact",
      menu: "Menu",
      close: "Fermer",
    },
    home: {
      kicker: "DJ / Producteur",
      heroTagline: "Créer du lien à travers le son.",
      heroPlay: "Lancer le son",
      heroProjects: "Voir les projets",
      heroBooking: "Booking",
      scroll: "Défiler",
      profileIntro: "À propos",
      profileQuote: "« Holà Pablito Que Pasa ? »",
      profileSubQuote: "Moi, à 12 ans, en train d'enregistrer ma première signature vocale.",
      profileParas: [
        "Né dans l'univers de la **danse hip-hop**, j'ai découvert le **deejaying** presque naturellement, dès l'enfance.",
        "Dès le collège, entre **beatmaking** et cours de **piano**, j'ai ouvert mes premières sessions en **studio**. La curiosité a fait le reste.",
        "Aujourd'hui, chaque **set** que je construis est une extension de cette histoire. Une façon de **relier les gens** à travers le son.",
        "Pablito est disponible pour des **bookings** en club, événements privés et festivals.",
      ],
      duoLabel: "Univers",
      duo: [
        {
          title: "Club",
          line: "Sets en club, résidences et festivals.",
          href: "/projects",
        },
        {
          title: "Producteur",
          line: "Compositions, remixes et edits produits sur FL Studio.",
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
      listenLine: "Lancez le player. La musique vous suit sur tout le site.",
      ctaTitle: "Construisons quelque chose ensemble",
      ctaButton: "Prendre contact",
    },
    music: {
      kicker: "Musique",
      title: "Galerie sonore",
      intro: "Productions, edits et enregistrements live.",
      flStudioIntro:
        "Pablito compose ses propres **remixes**, **mashups** et **edits** sur **FL Studio**. Cette pratique de production forge une **identité musicale singulière**. Chaque set s'appuie sur des créations originales qu'on n'entend nulle part ailleurs.",
      play: "Écouter",
      openPlatform: "Ouvrir",
      spotifyTitle: "Sorties",
      soundcloudTitle: "Mixes et edits",
      youtubeTitle: "Sets live",
      youtubeLine: "Enregistrements complets, Le Cercle et au-delà.",
      platforms: "Écouter sur",
      setsLiveLabel: "Sets live",
      setsLiveTitle: "En écoute",
      setsLiveIntro: "Un aperçu de quelques sets enregistrés.",
      nowPlaying: "En lecture",
    },
    projects: {
      kicker: "Projets",
      title: "Le son, la scène et le regard",
      intro: "Trois territoires, une intention : transformer une salle en moment partagé.",
      clubsLabel: "Booking",
      clubsTitle: "Clubs et scènes",
      collabsExtra:
        "Dont Hôtel Carlton's, Les Bains Douches, Paradisio, Folie's Pigalle, Pavillon Tilsitt, Vincennes Estival Club et bien d'autres.",
      cercleLabel: "Projet signature",
      cercleTitle: "Le Cercle",
      cercleSetsNote: "Les sets enregistrés lors des **éditions officielles du Cercle**.",
      cercleIntro:
        "Le Cercle est un concept d'événement festif que j'ai pensé autour d'une idée simple : **réunir des personnes** dans un cadre **élégant et convivial**, où la **musique** est au cœur de l'expérience.",
      cercleBody:
        "Depuis 2023, chaque édition repose sur un **thème fort**, un **lieu** soigneusement choisi et une ambiance musicale pensée **sur mesure**.",
      cercleInstagram: "Suivre Le Cercle",
      statsParticipants: "Participants par édition",
      statsEditions: "Éditions",
      statsViews: "Vues cumulées",
      statsPartners: "Partenaires majeurs",
      setsLabel: "Archive live",
      setsTitle: "Les sets",
      setsIntro: "Chaque date, enregistrée. Une archive vivante.",
      setsPlay: "Écouter ce set",
      nowPlaying: "En lecture",
      ctaTitle: "Booker Pablito",
      ctaButton: "Prendre contact",
    },
    service: {
      kicker: "Service",
      title: "Sur mesure",
      intro:
        "Des sets DJ pour vos événements et des créations musicales pour vos projets. Deux offres, une même exigence.",
      eventsLabel: "Au-delà du club",
      eventsAxis: "Le son, la scène et le regard.",
      eventsTitle: "Événements privés",
      eventsIntro:
        "Pablito intervient pour vos **mariages**, soirées **privées**, événements **corporate** et **galas**. Chaque prestation est pensée sur mesure pour correspondre exactement à votre vision et à votre public.",
      eventsPoints: [
        {
          title: "Matériel complet fourni",
          line: "Sono professionnelle et éclairage scénique inclus dans chaque prestation. Aucun prestataire externe nécessaire.",
        },
        {
          title: "Sélection musicale sur mesure",
          line: "Chaque playlist est construite en fonction de vos envies, de votre histoire et de l'ambiance souhaitée.",
        },
        {
          title: "Lecture de salle",
          line: "Qu'il s'agisse d'un public de 20 ou 500 personnes, jeune ou intergénérationnel, Pablito s'adapte en temps réel.",
        },
      ],
      compositionsLabel: "Production",
      compositionsTitle: "Compositions sur mesure",
      compositionsIntro:
        "Pablito compose et produit des créations musicales **sur mesure** pour des **spectacles**, des **productions audiovisuelles** et des **artistes**. Chaque projet est pensé en fonction de l'univers, du public et des intentions artistiques du commanditaire.",
      compositionsPoints: [
        {
          title: "Compositions originales",
          line: "Chaque création est produite de zéro sur FL Studio, adaptée à l'identité du projet.",
        },
        {
          title: "Tous formats",
          line: "Jingle, générique, habillage sonore, musique de fond, création longue durée.",
        },
        {
          title: "Travail en co-construction",
          line: "Les échanges avec le commanditaire sont intégrés à chaque étape du processus.",
        },
      ],
      ctaTitle: "Parlons de votre projet",
      ctaButton: "Prendre contact",
    },
    contact: {
      kicker: "Contact",
      title: "Construisons quelque chose ensemble",
      intro: "Bookings, collaborations, presse : chaque projet commence par une conversation.",
      bookingIntro:
        "Pour un **booking**, une **prestation** ou une **collaboration**, contactez directement Pablito.",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      socialLabel: "Suivre",
      formName: "Nom",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Envoyer",
      sending: "Envoi…",
      success: "Merci, votre message a été envoyé.",
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
