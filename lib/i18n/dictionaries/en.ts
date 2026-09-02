import { getCvPublicUrl } from "@/lib/data/cv";
import { formatProjectPeriod } from "@/lib/data/project-periods";
import { getSiteUrl } from "@/lib/data/site-url";

const cvAvailable = process.env.NEXT_PUBLIC_CV_AVAILABLE === "true";

export const dictionaryEn = {
  common: {
    contact: "Contact",
    email: "Email",
    cv: "CV",
    downloadCv: "Download CV",
    caseStudy: "Case study",
    viewWork: "View Projects",
    ongoing: "Ongoing",
    completed: "Completed",
    processFlow: "Process flow",
    systemSchematic: "System schematic",
    fullWorkIndex: "Project index",
    contactPage: "Links",
    getInTouch: "Links",
    viewSelectedWork: "All projects",
    relatedWork: "Related projects",
    channels: "Channels",
    next: "Next",
    all: "All",
    copy: "Copy",
    copied: "Copied",
    skipToContent: "Skip to main content",
    language: "Language",
    pages: "Pages",
    footerNav: {
      work: "Projects",
      about: "About",
      journey: "Journey",
      contact: "Contact",
    },
    footerTagline:
      "Digital products, processes, and learning notes from my work — shared for documentation, not for hiring or client outreach.",
    footerCopyright: "Personal site",
    projectNames: {
      bisevk: "Bi-Sevk",
      eyfel: "Eyfel Kurye",
      fmd: "FMD Eğitim Portalı",
      tavuk: "Tavuk da Tavuk",
    },
  },

  site: {
    name: "Yunus Emre Özen",
    title: "Yunus Emre Özen — Personal Site",
    description:
      "Software engineering student. An informational site about my projects, processes, and learning path. Based in İzmir, Türkiye.",
    url: getSiteUrl(),
    locale: "en_US",
    location: "İzmir, Türkiye",
    role: "Software Engineering · Product & Project",
    focus: ["Product Management", "Project Management", "Software Engineering"],
    initials: "YÖ",
    portfolioYear: "2026",
    cv: cvAvailable ? getCvPublicUrl() : null,
    email: "ozenyunusemre@outlook.com",
    social: {
      linkedin: "https://www.linkedin.com/in/yunus-ozen/",
      github: "https://github.com/ozenyunus35",
    },
  },

  nav: [
    { label: "Projects", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Journey", href: "/journey" },
    { label: "Contact", href: "/contact" },
  ],

  routes: [
    { index: "00", label: "INDEX", href: "/", mode: "home" as const },
    { index: "01", label: "PROJECTS", href: "/work", mode: "work" as const },
    { index: "02", label: "ABOUT", href: "/about", mode: "about" as const },
    { index: "03", label: "JOURNEY", href: "/journey", mode: "journey" as const },
    { index: "04", label: "CONTACT", href: "/contact", mode: "contact" as const },
  ],

  hero: {
    tagline:
      "Documenting product and project work through real systems I've been involved in.",
    supporting:
      "This site exists to share my projects, thinking, and learning — not to seek work or clients.",
    viewWork: "View Projects",
  },

  work: {
    sectionLabel: "Projects",
    headline: "Digital products shaped by real needs.",
    table: {
      no: "No.",
      project: "Project",
      industry: "Industry",
      period: "Period",
    },
    indexHeadline: "Projects across logistics, operations, and education.",
    caseStudyBtn: "Case study",
  },

  approach: {
    sectionLabel: "Approach",
    statement: [
      "I don't just think about how a product is built.",
      "I care about why it should be built.",
    ],
    columns: [
      { title: "PRODUCT", items: ["Strategy", "Requirements", "UX"] },
      { title: "PROJECT", items: ["Coordination", "Planning", "Delivery"] },
      { title: "ENGINEERING", items: ["Technical Background", "Web & Mobile", "Systems Thinking"] },
    ],
  },

  tech: {
    sectionLabel: "Technology",
    headline: "Engineering tools across my projects.",
    intro:
      "Alongside product and project work, the technologies I've touched from a software engineering perspective — from hands-on development to technical collaboration.",
    stackLabel: "Core stack",
    byProjectLabel: "By project",
    involvementLabel: "Engineering role",
    categories: [
      {
        label: "Frontend",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML/CSS"],
      },
      {
        label: "Backend & Data",
        items: ["Node.js", "REST API", "PostgreSQL"],
      },
      {
        label: "Design & Process",
        items: ["Figma", "Git", "GitHub", "Agile"],
      },
    ],
  },

  method: {
    sectionLabel: "Product × Engineering",
    headline: ["PRODUCT THINKING.", "ENGINEERING MINDSET."],
    product: {
      title: "PRODUCT",
      nodes: [
        { id: "ux", label: "UX", description: "Translating user needs into clear flows, interfaces, and interaction patterns." },
        { id: "business", label: "BUSINESS", description: "Understanding why a product should exist — value, constraints, and priorities." },
        { id: "data", label: "DATA", description: "Using evidence and feedback to inform decisions rather than assumptions." },
      ],
    },
    engineering: {
      title: "ENGINEERING",
      nodes: [
        { id: "api", label: "API", description: "How systems communicate — endpoints, contracts, and integration boundaries." },
        { id: "frontend", label: "Frontend", description: "Building responsive interfaces that connect user experience to application logic." },
        { id: "backend", label: "Backend", description: "Server-side structure, business logic, and the systems behind the interface." },
        { id: "database", label: "Database", description: "Data modeling and storage — how information is organized and retrieved." },
        { id: "ui-ux", label: "UI/UX", description: "The overlap where design decisions meet implementation constraints." },
        { id: "system-design", label: "System Design", description: "Thinking in components, dependencies, and how parts connect in a product." },
      ],
    },
  },

  exploring: {
    sectionLabel: "Currently Exploring",
    heading: "AREAS OF INTEREST",
    supporting: "Topics I'm currently curious about as I broaden my product thinking.",
    statusLearning: "Learning",
    statusDeveloping: "Developing",
    areas: [
      { label: "PRODUCT ANALYTICS", status: "Learning" as const },
      { label: "GROWTH", status: "Learning" as const },
      { label: "A/B TESTING", status: "Learning" as const },
      { label: "USER BEHAVIOR", status: "Learning" as const },
      { label: "PROCESS AUTOMATION", status: "Developing" as const },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    headline: ["CONTACT", "DETAILS."],
    intro:
      "This site is for information only. You can reach me through the channels below if you have questions.",
    actions: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Download CV",
    },
  },

  about: {
    sectionLabel: "About",
    headline: ["Product thinking", "with engineering depth."],
    paragraphs: [
      "I'm a software engineering student interested in what happens beyond the code — how systems are structured and why.",
      "Experience across development, interface design, and project coordination shaped my interest in product thinking.",
      "On this site I share the projects I've worked on, the processes involved, and what I've learned along the way.",
    ],
    focusStatement:
      "Technical background informs how I scope products, coordinate delivery, and evaluate what is feasible within real constraints.",
    meta: [
      { label: "Based In", value: "İzmir, Türkiye" },
      { label: "Education", value: "Software Engineering" },
      { label: "Focus", value: "Product & Project Management" },
    ],
    cta: "Links",
  },

  journey: {
    sectionLabel: "Journey",
    headline: ["Education,", "projects,", "and milestones."],
    intro:
      "School, projects, and events I've taken part in — a chronological record.",
    types: {
      education: "Education",
      project: "Projects",
      event: "Events",
    },
    milestones: [
      {
        id: "education",
        period: "Ongoing",
        title: "Software Engineering",
        context: "Education",
        description:
          "Studying software engineering while focusing on product management, project coordination, and systems thinking.",
        type: "education" as const,
      },
      {
        id: "nasa-2022",
        period: "2022",
        title: "NASA Space Apps Challenge",
        context: "Elazığ",
        description:
          "Participated in the NASA International Space Apps Challenge — collaborating on a team project. Related repository available on GitHub.",
        type: "event" as const,
        href: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
      },
      {
        id: "eyfel",
        period: formatProjectPeriod("eyfel", "en"),
        title: "Eyfel Kurye",
        context: "Operations / Delivery",
        description:
          "Operations system for restaurants and courier teams, integrated with online ordering platforms.",
        type: "project" as const,
        href: "/work/eyfel-kurye",
      },
      {
        id: "fmd",
        period: formatProjectPeriod("fmd", "en"),
        title: "FMD Eğitim Portalı",
        context: "Education / Management",
        description:
          "Management panel structuring education operations — panel architecture, user flows, and interface systems.",
        type: "project" as const,
        href: "/work/fmd-egitim",
      },
      {
        id: "bisevk",
        period: formatProjectPeriod("bisevk", "en"),
        title: "Bi-Sevk",
        context: "Logistics / Marketplace",
        description:
          "Logistics marketplace connecting load owners with carriers — product and project work on an ongoing platform.",
        type: "project" as const,
        href: "/work/bisevk",
      },
      {
        id: "tavuk-da-tavuk",
        period: formatProjectPeriod("tavuk-da-tavuk", "en"),
        title: "Tavuk da Tavuk",
        context: "Corporate / Hospitality",
        description:
          "Corporate web presence and QR menu platform — responsive interface design and development.",
        type: "project" as const,
        href: "/work/tavuk-da-tavuk",
      },
    ],
  },

  nasa: {
    sectionLabel: "NASA Space Apps",
    title: "NASA International Space Apps Challenge",
    year: "2022",
    location: "Elazığ",
    description:
      "Participated in the NASA International Space Apps Challenge in Elazığ, 2022 — collaborating on a team project. The related GitHub repository is a fork of the original team repository.",
    githubLinkLabel: "View Project Repository",
  },

  projects: [
    {
      slug: "bisevk",
      title: "Bi-Sevk",
      displayTitle: "BI-SEVK",
      tier: "primary" as const,
      period: formatProjectPeriod("bisevk", "en"),
      industry: "LOGISTICS / MARKETPLACE",
      tagline: "Logistics platform connecting shippers with carriers",
      description:
        "A logistics platform connecting load owners and shippers with carriers and truck drivers — structuring the flow from load posting to delivery.",
      roles: ["Product Management", "Project Management", "Team Coordination", "UI/UX", "Technical Collaboration"],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Git", "Figma"],
      techInvolvement: "Development contribution, technical collaboration, and interface decisions",
      href: "/work/bisevk",
      status: "ongoing" as const,
      visual: "logistics-vertical" as const,
    },
    {
      slug: "tavuk-da-tavuk",
      title: "Tavuk da Tavuk",
      displayTitle: "TAVUK DA TAVUK",
      tier: "secondary" as const,
      period: formatProjectPeriod("tavuk-da-tavuk", "en"),
      industry: "CORPORATE / HOSPITALITY",
      tagline: "Corporate website and QR menu platform",
      description:
        "Corporate web presence and QR menu platform — responsive interface design and development for on-site and mobile dining experiences.",
      roles: ["Web Design & Development", "Responsive UI/UX"],
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "QR Menu"],
      techInvolvement: "Design and development of the corporate website and QR menu platform",
      href: "/work/tavuk-da-tavuk",
      status: "completed" as const,
      visual: "mobile-qr" as const,
    },
    {
      slug: "fmd",
      title: "FMD Eğitim Portalı",
      displayTitle: "FMD EĞİTİM PORTALI",
      tier: "secondary" as const,
      period: formatProjectPeriod("fmd", "en"),
      industry: "EDUCATION / MANAGEMENT",
      tagline: "Management panel for education operations",
      description:
        "Management panel structuring education operations — defining panel architecture, user flows, and interface systems in collaboration with the technical team.",
      roles: ["UI/UX", "Panel Structure", "User Flows", "Technical Collaboration"],
      technologies: ["Figma", "React", "UI Systems", "User Flow Design"],
      techInvolvement: "Panel architecture, interface systems, and collaboration with the development team",
      href: "/work/fmd-egitim",
      status: "completed" as const,
      visual: "dashboard" as const,
    },
    {
      slug: "eyfel",
      title: "Eyfel Kurye",
      displayTitle: "EYFEL KURYE",
      tier: "secondary" as const,
      period: formatProjectPeriod("eyfel", "en"),
      industry: "OPERATIONS / DELIVERY",
      tagline: "Restaurant and courier operations platform",
      description:
        "Operations system for restaurants and courier teams, integrated with online ordering platforms — coordinating orders from intake to delivery.",
      roles: ["Product & Project Management", "Product Structure", "User Experience", "Development Process", "Team Coordination"],
      technologies: ["React", "TypeScript", "REST API", "Git", "Figma"],
      techInvolvement: "Product structure, development coordination, and technical decision-making",
      href: "/work/eyfel-kurye",
      status: "completed" as const,
      visual: "delivery-chain" as const,
    },
  ],

  pages: {
    home: {
      title: "Yunus Emre Özen — Personal Site",
      description:
        "Software engineering student. An informational site about my projects, processes, and learning path.",
    },
    work: {
      title: "Projects",
      description:
        "Digital products in logistics, operations, and education — case studies on process, structure, and context.",
    },
    about: {
      title: "About",
      description:
        "A brief overview of who I am, what interests me, and what this site documents.",
    },
    journey: {
      title: "Journey",
      description:
        "Education, projects, and milestones — a chronological record including NASA Space Apps Challenge.",
    },
    contact: {
      title: "Contact",
      description: "Email, LinkedIn, and GitHub links. Informational contact channels only.",
    },
  },

  caseStudyUi: {
    label: "Case Study",
    problem: "The problem",
    myRole: "My role",
    engineering: "Engineering",
    learnings: "Learnings",
    nextProject: "Next",
    marketplaceBody:
      "Posted freight becomes visible to carriers seeking suitable loads that match their capacity and routes.",
    selectionBody:
      "Carriers submit offers on posted loads. One offer is selected, establishing the shipper–carrier connection for transport.",
    transportBody:
      "Once matched, the load moves through transport coordination toward delivery completion.",
    beats: [
      { id: "problem", kicker: "Problem", title: "Freight matching\nwithout structure." },
      { id: "load", kicker: "Load created", title: "A load\nenters the system." },
      { id: "marketplace", kicker: "Marketplace", title: "The marketplace\nopens." },
      { id: "carriers", kicker: "Carriers", title: "Carriers\nenter and bid." },
      { id: "match", kicker: "Selection", title: "One offer\nis selected." },
      { id: "transport", kicker: "Transport", title: "Route\nstretches forward." },
      { id: "delivery", kicker: "Delivery", title: "Delivered." },
    ],
  },

  diagrams: {
    bisevk: {
      caption: "MARKETPLACE FLOW · LOAD → MATCH → DELIVERY",
      matchZone: "MATCH ZONE",
      nodes: {
        shipper: "SHIPPER",
        load: "LOAD POST",
        offers: "OFFERS",
        carrier: "CARRIER",
        transport: "TRANSPORT",
        delivery: "DELIVERY",
      },
    },
    eyfel: {
      caption: "DISPATCH PIPELINE · ORDER → DELIVERY",
      route: "LIVE ROUTE",
      nodes: {
        order: "ORDER",
        restaurant: "RESTAURANT",
        courier: "COURIER",
        delivery: "DELIVERY",
      },
    },
    fmd: {
      caption: "ADMIN PANEL · MODULAR IA",
      nodes: {
        overview: "OVERVIEW",
        users: "USERS",
        content: "CONTENT",
        modules: "MODULES",
        reports: "REPORTS",
      },
    },
    tavuk: {
      caption: "ON-SITE FLOW · SCAN → MOBILE MENU",
      qr: "QR CODE",
      scan: "SCAN",
      menu: "MOBILE MENU",
      web: "CORPORATE WEB",
      touchpoint: "PHYSICAL TOUCHPOINT",
    },
  },
} as const;
