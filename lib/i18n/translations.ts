export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];

export const translations = {
  en: {
    nav: {
      home: "Home",
      music: "Music",
      projects: "Projects",
      live: "Live",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    home: {
      kicker: "DJ / Producer",
      heroTagline: "Creating connection through sound",
      heroCta: "Discover the universe",
      scroll: "Scroll",
      manifestoLabel: "Philosophy",
      manifestoQuote:
        "I am not just a DJ. I create social connection through music — moments of encounter, dance and collective emotion.",
      manifestoBody:
        "Every set is a journey built in real time, a dialogue between the room and the booth. Pablito designs sonic landscapes where strangers become a crowd, and a crowd becomes one heartbeat.",
      pillarsLabel: "Focus",
      pillars: [
        {
          title: "Club & Festival",
          text: "Immersive sets engineered for the dancefloor — depth, groove and narrative arcs across the night.",
        },
        {
          title: "Artist & Producer",
          text: "Original productions and edits that carry a distinct sonic signature, from intimate to expansive.",
        },
        {
          title: "Premium Events",
          text: "Bespoke musical direction for private, corporate and brand experiences — refined, adaptive, flawless.",
        },
      ],
      musicLabel: "Latest sounds",
      musicTitle: "Sound Gallery",
      musicCta: "Explore the music",
      projectsLabel: "Selected work",
      projectsTitle: "Projects & Experience",
      projectsCta: "View all projects",
      liveLabel: "On stage",
      liveTitle: "Pablito performs in clubs, festivals and premium private events",
      liveCta: "Inquire for bookings",
      ctaTitle: "Let's create something together",
      ctaBody:
        "For bookings, collaborations or press, get in touch — every project starts with a conversation.",
      ctaButton: "Get in touch",
    },
    music: {
      kicker: "Music",
      title: "Sound Gallery",
      intro:
        "A curated selection of productions, edits and live recordings — built for headphones, clubs and everything in between.",
      platforms: "Listen on",
      latestSets: "Latest sets",
      releases: "Releases",
      tracks: [
        {
          title: "Nocturne I",
          type: "Original Mix",
          platform: "SoundCloud",
        },
        {
          title: "Le Cercle — Live Set",
          type: "Live Recording",
          platform: "YouTube",
        },
        {
          title: "Afterglow EP",
          type: "Release",
          platform: "Spotify",
        },
        {
          title: "Drift",
          type: "Original Mix",
          platform: "SoundCloud",
        },
        {
          title: "Midnight Frequencies",
          type: "Mix Series Vol. 4",
          platform: "SoundCloud",
        },
        {
          title: "Reverie",
          type: "Single",
          platform: "Spotify",
        },
      ],
      embedTitle: "Featured mix",
      embedNote: "Streaming preview — connect platform links to enable playback.",
    },
    projects: {
      kicker: "Projects & Experience",
      title: "A story told through sound and stage",
      intro:
        "From club residencies to festival main stages, every project carries the same intention: turning a room into a shared moment.",
      details: "Discover the project",
      back: "Back to projects",
      backToProject: "Back to overview",
      venuesLabel: "Stages & Venues",
      venuesTitle: "Clubs & festivals",
      venuesIntro:
        "A selection of the rooms and stages where Pablito has shared his sound.",
      items: [
        {
          slug: "le-cercle",
          title: "Le Cercle",
          tag: "Signature Project",
          short: "An ongoing artistic gathering built around sound, light and human connection.",
          description:
            "Le Cercle is more than an event — it's a recurring ritual. A circular dancefloor, low light, a sound system tuned for warmth. No stage, no separation between artist and crowd. Just a shared frequency.",
          role: "Founder, curator & resident",
          body: [
            "Le Cercle was born from a simple observation: the best nights are the ones where everyone forgets who's behind the decks. So Pablito designed a format without a stage — a circular room where the booth sits at the heart of the crowd, surrounded on every side.",
            "Each edition follows a slow-burn musical arc, often six hours or more, moving from deep, textured openers to euphoric peaks and tender, melodic closings. Lighting is minimal and warm — designed to disappear rather than perform.",
            "Beyond the music, Le Cercle has become a meeting point for a community of dancers, artists and selectors who return edition after edition. It's a project about belonging as much as it is about sound.",
          ],
          impact:
            "Today, Le Cercle operates as both a touring concept and a home base — a recognizable signature that clubs and festivals invite to recreate the same intimacy on their own floors.",
        },
        {
          slug: "club-residency",
          title: "Club Residency",
          tag: "Club",
          short: "A recurring monthly residency exploring deep, melodic and progressive sounds.",
          description:
            "A long-term residency built on trust between artist, venue and audience — a space to take risks, develop a sound, and build a loyal following night after night.",
          role: "Resident DJ",
          body: [
            "Residencies are where artistic identity is forged. Over more than two years, Pablito has held a monthly slot that became a fixture for the local scene — a night where the unexpected is welcome.",
            "The format allows for deep musical exploration: extended sets, guest collaborations, and a constantly evolving sound that reflects both the room's character and Pablito's own progression as an artist.",
          ],
          impact:
            "The residency built a loyal, engaged audience and became a reference point for the venue's identity within the local club circuit.",
        },
        {
          slug: "festival-mainstage",
          title: "Festival Appearances",
          tag: "Festival",
          short: "Main stage and sunset slots across European festivals — big rooms, bigger emotion.",
          description:
            "Festival sets demand a different language: immediacy, scale, and an ability to read tens of thousands of people in real time while staying true to an artistic signature.",
          role: "Performing Artist",
          body: [
            "On festival stages, Pablito brings the intimacy of Le Cercle's storytelling to a much larger canvas — building energy in waves, leaving space for emotion, and never losing the human thread that runs through every set.",
            "Each appearance is treated as a complete performance: collaboration with stage and lighting teams, a tailored set structure for the time slot, and full technical autonomy from soundcheck to teardown.",
          ],
          impact:
            "These performances extended Pablito's reach to international audiences and opened doors to recurring festival bookings.",
        },
        {
          slug: "studio-sessions",
          title: "Studio & Productions",
          tag: "Artist",
          short: "Original tracks, remixes and a growing catalogue with a distinct sonic identity.",
          description:
            "The studio is where the live experience is distilled into something permanent — tracks that carry Le Cercle's atmosphere into headphones and home systems worldwide.",
          role: "Producer",
          body: [
            "Production work runs in parallel with the live shows, feeding ideas back and forth: a melodic motif tested on the dancefloor becomes a track; a track becomes the centerpiece of a new set.",
            "The catalogue spans deep, melodic and progressive territories — always built around warmth, texture and a sense of forward motion.",
          ],
          impact:
            "A growing body of work that defines Pablito's signature sound across streaming platforms and DJ sets worldwide.",
        },
      ],
      venues: [
        "Concrete",
        "Rex Club",
        "Output",
        "Tresor",
        "Printworks",
        "Razzmatazz",
        "Watergate",
        "fabric",
      ],
    },
    live: {
      kicker: "Live",
      title: "Pablito performs in clubs, festivals and premium private events",
      intro:
        "A live experience built on adaptability, emotional intelligence and total technical mastery — designed to fit any room, any audience, any moment.",
      experienceLabel: "Experience",
      experienceTitle: "A musical journey, every time",
      experienceBody:
        "Whether it's an intimate private gathering, a club night until sunrise or a festival main stage, Pablito reads the room and builds a journey in real time — never a fixed setlist, always a living conversation between the music and the crowd.",
      capabilitiesLabel: "Capabilities",
      capabilitiesTitle: "Technical mastery, total autonomy",
      capabilities: [
        {
          title: "Sound Design",
          text: "Deep knowledge of sound systems and room acoustics, ensuring every set translates with clarity and warmth.",
        },
        {
          title: "Full Setup & Teardown",
          text: "Complete technical autonomy — equipment, routing and rider management handled end-to-end.",
        },
        {
          title: "Lighting Integration",
          text: "Close collaboration with lighting and visual teams to build a cohesive sensory experience.",
        },
        {
          title: "Adaptive Programming",
          text: "Sets tailored in real time to the venue, audience and moment — from warm-up to peak time.",
        },
      ],
      testimonialsLabel: "Words from the field",
      testimonials: [
        {
          quote:
            "Pablito doesn't just play music — he reads the room and builds something that feels inevitable in hindsight.",
          author: "Artistic Director, club venue",
        },
        {
          quote:
            "The most professional and seamless technical setup we've worked with. Total peace of mind from start to finish.",
          author: "Festival Production Team",
        },
        {
          quote:
            "Our guests are still talking about that night. He found exactly the right tone for the room.",
          author: "Private Client, brand event",
        },
      ],
      ctaTitle: "Let's plan your event",
      ctaBody: "For club nights, festival slots or private events — get in touch to discuss the project.",
      ctaButton: "Inquire for bookings",
    },
    about: {
      kicker: "About",
      title: "A life shaped by sound",
      intro:
        "Pablito's story starts on dancefloors — not behind the decks, but in the crowd, discovering what music can do to a room of strangers.",
      paragraphs: [
        "Long before the first booking, there was the floor: nights spent losing track of time, watching how a single transition could shift the mood of an entire room. That fascination — for the invisible architecture of a great night — became the foundation of everything that followed.",
        "Pablito's approach to DJing is rooted in club culture: respect for the dancefloor, for the history of the music, and for the unspoken contract between artist and audience. Every set is built live, shaped by the energy in the room rather than imposed on it.",
        "As a producer, the studio became an extension of the booth — a place to refine ideas born on the dancefloor into tracks that carry the same emotion into headphones and home systems.",
        "Today, that vision lives across club residencies, festival stages and a signature project — Le Cercle — built entirely around the idea that music's highest purpose is connection. Not performance for its own sake, but a shared frequency between everyone in the room.",
      ],
      quote: "\"The booth is just a vantage point. The night belongs to everyone in the room.\"",
      valuesLabel: "Approach",
      values: [
        { title: "Connection", text: "Every set begins and ends with the room — never with an ego." },
        { title: "Craft", text: "Years of obsessive attention to transitions, tone and pacing." },
        { title: "Integrity", text: "A sound that stays true to its roots, refined without compromise." },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let's create something together",
      intro:
        "For bookings, collaborations, press or anything in between — reach out. Every great night starts with a conversation.",
      formName: "Name",
      formEmail: "Email",
      formSubject: "Subject",
      formMessage: "Message",
      formSubmit: "Send message",
      formSubjectOptions: ["Booking inquiry", "Collaboration", "Press", "Other"],
      sending: "Sending…",
      success: "Thank you — your message has been sent. Pablito's team will be in touch shortly.",
      error: "Something went wrong. Please try again or email us directly.",
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
      },
      directLabel: "Direct contact",
      socialLabel: "Follow",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      credits: "Design & development",
      copyLink: "Copy link",
      linkCopied: "Link copied",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      music: "Musique",
      projects: "Projets",
      live: "Live",
      about: "À propos",
      contact: "Contact",
      menu: "Menu",
      close: "Fermer",
    },
    home: {
      kicker: "DJ / Producteur",
      heroTagline: "Créer du lien à travers le son",
      heroCta: "Découvrir l'univers",
      scroll: "Défiler",
      manifestoLabel: "Philosophie",
      manifestoQuote:
        "Je ne suis pas seulement un DJ. Je crée du lien social à travers la musique — des moments de rencontre, de danse et d'émotion collective.",
      manifestoBody:
        "Chaque set est un voyage construit en temps réel, un dialogue entre la salle et la cabine. Pablito façonne des paysages sonores où des inconnus deviennent une foule, et une foule devient un seul battement de cœur.",
      pillarsLabel: "Univers",
      pillars: [
        {
          title: "Club & Festival",
          text: "Des sets immersifs pensés pour le dancefloor — profondeur, groove et narration sur toute une nuit.",
        },
        {
          title: "Artiste & Producteur",
          text: "Des productions et edits originaux portant une signature sonore singulière, de l'intime à l'ample.",
        },
        {
          title: "Événements Premium",
          text: "Direction musicale sur-mesure pour expériences privées, corporate et de marque — raffinée, adaptative, sans faille.",
        },
      ],
      musicLabel: "Derniers sons",
      musicTitle: "Galerie sonore",
      musicCta: "Explorer la musique",
      projectsLabel: "Travaux sélectionnés",
      projectsTitle: "Projets & Expérience",
      projectsCta: "Voir tous les projets",
      liveLabel: "Sur scène",
      liveTitle: "Pablito se produit en clubs, festivals et événements privés premium",
      liveCta: "Demander une date",
      ctaTitle: "Créons quelque chose ensemble",
      ctaBody:
        "Pour des bookings, collaborations ou demandes presse, contactez-nous — chaque projet commence par une conversation.",
      ctaButton: "Prendre contact",
    },
    music: {
      kicker: "Musique",
      title: "Galerie sonore",
      intro:
        "Une sélection de productions, edits et enregistrements live — pensée pour le casque, le club, et tout ce qui se trouve entre les deux.",
      platforms: "Écouter sur",
      latestSets: "Derniers sets",
      releases: "Sorties",
      tracks: [
        {
          title: "Nocturne I",
          type: "Original Mix",
          platform: "SoundCloud",
        },
        {
          title: "Le Cercle — Live Set",
          type: "Enregistrement live",
          platform: "YouTube",
        },
        {
          title: "Afterglow EP",
          type: "Sortie",
          platform: "Spotify",
        },
        {
          title: "Drift",
          type: "Original Mix",
          platform: "SoundCloud",
        },
        {
          title: "Midnight Frequencies",
          type: "Mix Series Vol. 4",
          platform: "SoundCloud",
        },
        {
          title: "Reverie",
          type: "Single",
          platform: "Spotify",
        },
      ],
      embedTitle: "Mix à la une",
      embedNote: "Aperçu de streaming — connectez les liens des plateformes pour activer la lecture.",
    },
    projects: {
      kicker: "Projets & Expérience",
      title: "Une histoire racontée par le son et la scène",
      intro:
        "Des résidences en club aux scènes principales de festivals, chaque projet porte la même intention : transformer une salle en un moment partagé.",
      details: "Découvrir le projet",
      back: "Retour aux projets",
      backToProject: "Retour à l'aperçu",
      venuesLabel: "Scènes & Salles",
      venuesTitle: "Clubs & festivals",
      venuesIntro: "Une sélection des salles et scènes où Pablito a partagé son univers.",
      items: [
        {
          slug: "le-cercle",
          title: "Le Cercle",
          tag: "Projet signature",
          short: "Un rassemblement artistique continu autour du son, de la lumière et du lien humain.",
          description:
            "Le Cercle est plus qu'un événement — c'est un rituel récurrent. Un dancefloor circulaire, une lumière tamisée, un système son calibré pour la chaleur. Pas de scène, pas de séparation entre l'artiste et la foule. Juste une fréquence partagée.",
          role: "Fondateur, curateur & résident",
          body: [
            "Le Cercle est né d'un constat simple : les meilleures soirées sont celles où tout le monde oublie qui se trouve derrière les platines. Pablito a donc imaginé un format sans scène — une salle circulaire où la cabine se trouve au cœur de la foule, entourée de tous côtés.",
            "Chaque édition suit un arc musical lent, souvent plus de six heures, passant d'ouvertures profondes et texturées à des pics euphoriques et des clôtures mélodiques et tendres. La lumière est minimale et chaude — pensée pour disparaître plutôt que pour se mettre en scène.",
            "Au-delà de la musique, Le Cercle est devenu un point de rencontre pour une communauté de danseurs, d'artistes et de sélecteurs qui reviennent édition après édition. Un projet autant centré sur l'appartenance que sur le son.",
          ],
          impact:
            "Aujourd'hui, Le Cercle fonctionne à la fois comme un concept itinérant et une base — une signature reconnaissable que clubs et festivals invitent pour recréer cette même intimité sur leurs propres pistes.",
        },
        {
          slug: "club-residency",
          title: "Résidence Club",
          tag: "Club",
          short: "Une résidence mensuelle explorant des sonorités deep, mélodiques et progressives.",
          description:
            "Une résidence de longue durée construite sur la confiance entre l'artiste, le lieu et le public — un espace pour prendre des risques, développer un son et fidéliser un public soir après soir.",
          role: "DJ résident",
          body: [
            "Les résidences sont le terrain où se forge une identité artistique. Pendant plus de deux ans, Pablito a tenu un rendez-vous mensuel devenu un repère pour la scène locale — une soirée où l'inattendu est bienvenu.",
            "Le format permet une exploration musicale en profondeur : sets longs, collaborations invitées, et un son en constante évolution reflétant à la fois le caractère de la salle et la propre progression artistique de Pablito.",
          ],
          impact:
            "La résidence a fidélisé un public engagé et est devenue un repère dans l'identité du lieu au sein du circuit club local.",
        },
        {
          slug: "festival-mainstage",
          title: "Apparitions Festivals",
          tag: "Festival",
          short: "Main stage et sunset sets à travers des festivals européens — grandes salles, plus grandes émotions.",
          description:
            "Les sets de festival demandent un autre langage : l'immédiateté, l'échelle, et la capacité de lire des dizaines de milliers de personnes en temps réel tout en restant fidèle à une signature artistique.",
          role: "Artiste",
          body: [
            "Sur les scènes de festival, Pablito porte l'intimité narrative du Cercle sur une toile bien plus grande — construisant l'énergie par vagues, laissant de la place à l'émotion, sans jamais perdre le fil humain qui traverse chaque set.",
            "Chaque apparition est traitée comme une performance complète : collaboration avec les équipes scène et lumière, structure de set adaptée au créneau, et autonomie technique totale du soundcheck au démontage.",
          ],
          impact:
            "Ces performances ont étendu la portée de Pablito à un public international et ouvert la voie à des bookings festivaliers récurrents.",
        },
        {
          slug: "studio-sessions",
          title: "Studio & Productions",
          tag: "Artiste",
          short: "Titres originaux, remixes et un catalogue grandissant à l'identité sonore singulière.",
          description:
            "Le studio est l'endroit où l'expérience live se distille en quelque chose de permanent — des morceaux qui portent l'atmosphère du Cercle jusque dans les casques et les systèmes du monde entier.",
          role: "Producteur",
          body: [
            "Le travail de production avance en parallèle des shows live, dans un dialogue constant : un motif mélodique testé sur le dancefloor devient un titre ; un titre devient la pièce maîtresse d'un nouveau set.",
            "Le catalogue explore des territoires deep, mélodiques et progressifs — toujours construits autour de la chaleur, de la texture et d'un sentiment de mouvement vers l'avant.",
          ],
          impact:
            "Un corpus en constante évolution qui définit la signature sonore de Pablito sur les plateformes de streaming et dans ses sets à travers le monde.",
        },
      ],
      venues: [
        "Concrete",
        "Rex Club",
        "Output",
        "Tresor",
        "Printworks",
        "Razzmatazz",
        "Watergate",
        "fabric",
      ],
    },
    live: {
      kicker: "Live",
      title: "Pablito se produit en clubs, festivals et événements privés premium",
      intro:
        "Une expérience live fondée sur l'adaptabilité, l'intelligence émotionnelle et une maîtrise technique totale — pensée pour s'adapter à toute salle, tout public, tout instant.",
      experienceLabel: "Expérience",
      experienceTitle: "Un voyage musical, à chaque fois",
      experienceBody:
        "Qu'il s'agisse d'une réception privée intime, d'une nuit en club jusqu'au levée du jour ou d'une scène principale de festival, Pablito lit la salle et construit un voyage en temps réel — jamais de setlist figée, toujours une conversation vivante entre la musique et la foule.",
      capabilitiesLabel: "Savoir-faire",
      capabilitiesTitle: "Maîtrise technique, autonomie totale",
      capabilities: [
        {
          title: "Sound Design",
          text: "Une connaissance approfondie des systèmes son et de l'acoustique des salles, pour une restitution claire et chaleureuse.",
        },
        {
          title: "Installation & démontage complets",
          text: "Autonomie technique totale — matériel, routing et gestion de la fiche technique de bout en bout.",
        },
        {
          title: "Intégration lumière",
          text: "Collaboration étroite avec les équipes lumière et visuelles pour une expérience sensorielle cohérente.",
        },
        {
          title: "Programmation adaptative",
          text: "Des sets ajustés en temps réel au lieu, au public et au moment — de l'ouverture au peak time.",
        },
      ],
      testimonialsLabel: "Ils en parlent",
      testimonials: [
        {
          quote:
            "Pablito ne se contente pas de jouer de la musique — il lit la salle et construit quelque chose qui semble évident a posteriori.",
          author: "Directeur artistique, salle de club",
        },
        {
          quote:
            "L'installation technique la plus professionnelle et fluide avec laquelle nous ayons travaillé. Une tranquillité d'esprit totale du début à la fin.",
          author: "Équipe de production, festival",
        },
        {
          quote:
            "Nos invités parlent encore de cette soirée. Il a trouvé exactement le bon ton pour la salle.",
          author: "Client privé, événement de marque",
        },
      ],
      ctaTitle: "Organisons votre événement",
      ctaBody: "Pour des soirées club, des dates de festival ou des événements privés — contactez-nous pour en discuter.",
      ctaButton: "Demander une date",
    },
    about: {
      kicker: "À propos",
      title: "Une vie façonnée par le son",
      intro:
        "L'histoire de Pablito commence sur les dancefloors — non pas derrière les platines, mais dans la foule, à découvrir ce que la musique peut faire à une salle d'inconnus.",
      paragraphs: [
        "Bien avant le premier booking, il y avait la piste : des nuits passées à perdre la notion du temps, à observer comment une seule transition pouvait faire basculer l'ambiance de toute une salle. Cette fascination — pour l'architecture invisible d'une grande soirée — est devenue le socle de tout ce qui a suivi.",
        "L'approche de Pablito du DJing est ancrée dans la culture club : respect du dancefloor, de l'histoire de la musique, et du contrat tacite entre l'artiste et le public. Chaque set se construit en direct, façonné par l'énergie de la salle plutôt qu'imposé à elle.",
        "En tant que producteur, le studio est devenu le prolongement de la cabine — un lieu pour affiner des idées nées sur le dancefloor en morceaux qui portent la même émotion jusque dans les casques et les systèmes du monde entier.",
        "Aujourd'hui, cette vision se déploie à travers des résidences club, des scènes de festival et un projet signature — Le Cercle — entièrement construit autour de l'idée que la plus haute vocation de la musique est de créer du lien. Pas une performance pour elle-même, mais une fréquence partagée entre toutes les personnes présentes.",
      ],
      quote: "« La cabine n'est qu'un point de vue. La nuit appartient à tous ceux qui sont dans la salle. »",
      valuesLabel: "Approche",
      values: [
        { title: "Connexion", text: "Chaque set commence et se termine avec la salle — jamais avec un ego." },
        { title: "Exigence", text: "Des années d'attention obsessionnelle portées aux transitions, au ton et au rythme." },
        { title: "Intégrité", text: "Un son fidèle à ses racines, affiné sans compromis." },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Créons quelque chose ensemble",
      intro:
        "Pour des bookings, collaborations, demandes presse ou toute autre demande — écrivez-nous. Toute grande soirée commence par une conversation.",
      formName: "Nom",
      formEmail: "Email",
      formSubject: "Sujet",
      formMessage: "Message",
      formSubmit: "Envoyer",
      formSubjectOptions: ["Demande de booking", "Collaboration", "Presse", "Autre"],
      sending: "Envoi…",
      success: "Merci — votre message a été envoyé. L'équipe de Pablito vous répondra rapidement.",
      error: "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.",
      validation: {
        required: "Ce champ est requis",
        email: "Merci d'entrer une adresse email valide",
      },
      directLabel: "Contact direct",
      socialLabel: "Suivre",
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      credits: "Design & développement",
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
