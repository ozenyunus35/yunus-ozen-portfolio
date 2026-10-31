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
    interface: "Interface",
    liveDemo: "Live demo",
    sourceCode: "Source code",
    screenshotsAlt: "screenshots on a MacBook and an iPhone",
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
      "Products I have designed and built, from the first idea to a live release.",
    footerCopyright: "Personal site",
    projectNames: {
      bisevk: "Bi-Sevk",
      tavuk: "Tavuk da Tavuk",
    },
  },

  site: {
    name: "Yunus Ozen",
    title: "Yunus Ozen — AI Product Engineer",
    description:
      "AI Product Engineer and final-year Software Engineering student. Products I have designed and built, from the first idea to a live release. Based in İzmir, Türkiye.",
    url: getSiteUrl(),
    locale: "en_US",
    location: "İzmir, Türkiye",
    role: "AI Product Engineer · Full-Stack",
    focus: ["Product Engineering", "Full-Stack Development", "AI Tools"],
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
      "I build products from the first idea to a live release: requirements, user flows, UI and code.",
    supporting:
      "AI Product Engineer and final-year Software Engineering student at Fırat University. Open to Software, AI and Product Engineer roles, remote or on-site.",
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
    indexHeadline: "Projects across logistics, hospitality, AI, and business tools.",
  },

  approach: {
    sectionLabel: "Approach",
    statement: [
      "I don't just think about how a product is built.",
      "I care about why it should be built.",
    ],
    columns: [
      { title: "PRODUCT", items: ["Strategy", "Requirements", "UX"] },
      { title: "ENGINEERING", items: ["Web & Mobile", "Backend & APIs", "Testing"] },
      { title: "AI", items: ["LLM APIs", "Claude Code", "Automation"] },
    ],
  },

  tech: {
    sectionLabel: "Technology",
    headline: "Engineering tools across my projects.",
    intro:
      "The tools I use to design, build and ship products, from the interface to the server and the release.",
    stackLabel: "Core stack",
    byProjectLabel: "By project",
    involvementLabel: "Engineering role",
    categories: [
      {
        label: "Frontend",
        items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
      },
      {
        label: "Backend & Data",
        items: ["Node.js", "Python", "Kotlin", "Spring Boot", "PostgreSQL", "MongoDB"],
      },
      {
        label: "AI & Tools",
        items: ["LLM APIs", "Claude Code", "Docker", "GitHub Actions", "Playwright", "Figma"],
      },
    ],
  },

  openSource: {
    sectionLabel: "Open Source",
    headline: "Code merged into projects other teams depend on.",
    intro:
      "Since October 2026 I fix bugs and add features in public repositories, each change with tests and reviewed by the maintainers.",
    mergedLabel: "merged PRs",
    totalLabel: "merged pull requests in 33 public repositories",
    alsoLabel: "Also merged in",
    descriptions: {
      "repowise-dev/repowise": "Code ingestion, tsconfig project references, HTTP route detection for Ktor and Javalin.",
      "stephenh/ts-proto": "Protobuf to TypeScript code generator: grpc-web async iterables and option fixes.",
      "uutils/coreutils": "GNU compatibility fixes in sort, od, join, split, csplit and nl.",
      "cachix/devenv": "Developer environments: TUI process manager and task startup fixes.",
      "Automattic/harper": "Grammar checker: fewer false positives in English rules.",
      "oxc-project/oxc": "JavaScript toolchain: minifier and ESLint rule fixes.",
    } as Record<string, string>,
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
    supporting: "What I am learning and building next.",
    statusLearning: "Learning",
    statusDeveloping: "Developing",
    areas: [
      { label: "AI AGENTS", status: "Developing" as const },
      { label: "RETRIEVAL (RAG)", status: "Developing" as const },
      { label: "LLM EVALUATION", status: "Learning" as const },
      { label: "PRODUCT ANALYTICS", status: "Learning" as const },
      { label: "PROCESS AUTOMATION", status: "Developing" as const },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    headline: ["CONTACT", "DETAILS."],
    intro:
      "Open to Software, AI and Product Engineer roles, remote or on-site, and open to relocation. The fastest way to reach me is email or LinkedIn.",
    actions: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Download CV",
    },
  },

  about: {
    sectionLabel: "About",
    headline: ["Product thinking,", "shipped as code."],
    paragraphs: [
      "I'm a final-year Software Engineering student at Fırat University (graduating 2027) and I like owning a product end to end: the problem, the flows, the interface and the code.",
      "I have worked on a logistics marketplace, an education management panel and a restaurant website, and I build demos of AI support, booking and business tools.",
      "I use AI tools such as Claude Code and LLM APIs across the whole cycle, from research and specs to code, tests and release.",
    ],
    focusStatement:
      "I care about why a product should exist as much as how it is built, so I scope small, ship early and improve with real feedback.",
    meta: [
      { label: "Based In", value: "İzmir, Türkiye" },
      { label: "Education", value: "B.Sc. Software Engineering, Fırat University" },
      { label: "Focus", value: "AI Product Engineering" },
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
          "B.Sc. in Software Engineering at Fırat University, expected 2027.",
        type: "education" as const,
      },
      {
        id: "nasa-2022",
        period: "2022",
        title: "NASA Space Apps Challenge",
        context: "Elazığ",
        description:
          "1st place in Elazığ with team Innosoft: built Wink to the Future, a Flutter app, in 48 hours.",
        type: "event" as const,
        href: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
      },
      {
        id: "bisevk",
        period: formatProjectPeriod("bisevk", "en"),
        title: "Bi-Sevk",
        context: "Logistics / Marketplace",
        description:
          "Logistics marketplace connecting cargo owners with truck drivers. Led the product and coordinated the web, admin and mobile apps.",
        type: "project" as const,
        href: "/work#bisevk",
      },
      {
        id: "tavuk-da-tavuk",
        period: formatProjectPeriod("tavuk-da-tavuk", "en"),
        title: "Tavuk da Tavuk",
        context: "Corporate / Hospitality",
        description:
          "Corporate web presence and QR menu platform — responsive interface design and development.",
        type: "project" as const,
        href: "/work#tavuk-da-tavuk",
      },
      {
        id: "lead-scraper",
        period: formatProjectPeriod("lead-scraper", "en"),
        title: "Lead Scraper",
        context: "Web Scraping / Lead Generation",
        description:
          "Daily scraper that turns a business directory into a clean, de-duplicated lead list.",
        type: "project" as const,
        href: "/work#lead-scraper",
      },
      {
        id: "pdf-to-excel",
        period: formatProjectPeriod("pdf-to-excel", "en"),
        title: "PDF to Excel Extractor",
        context: "Data Extraction / Automation",
        description:
          "Browser tool that turns tables in PDF reports into clean Excel files.",
        type: "project" as const,
        href: "/work#pdf-to-excel",
      },
      {
        id: "atlas-portal",
        period: formatProjectPeriod("atlas-portal", "en"),
        title: "Atlas Portal",
        context: "Admin Dashboard / Client Portal",
        description:
          "Admin dashboard and client file portal demo with two roles and a mock backend.",
        type: "project" as const,
        href: "/work#atlas-portal",
      },
      {
        id: "relay",
        period: formatProjectPeriod("relay", "en"),
        title: "Relay",
        context: "AI / Customer Support",
        description:
          "AI support assistant demo — answers with sources, hands off to a person when unsure, admin console for the team.",
        type: "project" as const,
        href: "/work#relay",
      },
      {
        id: "fieldline",
        period: formatProjectPeriod("fieldline", "en"),
        title: "Fieldline",
        context: "Mobile / Field Service",
        description:
          "Flutter app for service technicians — route, checklists, parts, signature and invoice, works offline and syncs later.",
        type: "project" as const,
        href: "/work#fieldline",
      },
      {
        id: "cadence",
        period: formatProjectPeriod("cadence", "en"),
        title: "Cadence",
        context: "Booking / Scheduling",
        description:
          "Online booking demo for a salon — live availability, reschedule or cancel online, staff calendar with drag to move.",
        type: "project" as const,
        href: "/work#cadence",
      },
    ],
  },

  nasa: {
    sectionLabel: "NASA Space Apps",
    title: "NASA International Space Apps Challenge",
    year: "2022",
    location: "Elazığ",
    description:
      "1st place in the Elazığ round of the NASA International Space Apps Challenge 2022 with team Innosoft. We built Wink to the Future, a Flutter app, in 48 hours.",
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
        "A logistics marketplace that matches truck drivers with cargo owners. I owned the product from strategy and requirements to UI/UX, and coordinated the web, admin and mobile apps, including real-time shipment tracking.",
      roles: ["Product Ownership", "UI/UX", "Team Coordination", "Development"],
      technologies: ["React", "Flutter", "Kotlin", "Spring Boot", "MongoDB", "WebSockets", "Figma"],
      techInvolvement: "Product strategy, requirements and UI/UX; coordinated the web, admin and mobile apps and contributed code",
      href: "/work#bisevk",
      status: "completed" as const,
      visual: "logistics-vertical" as const,
    },
    {
      slug: "fieldline",
      title: "Fieldline",
      displayTitle: "FIELDLINE",
      tier: "secondary" as const,
      period: formatProjectPeriod("fieldline", "en"),
      industry: "MOBILE / FIELD SERVICE",
      tagline: "Mobile app for a field technician's day",
      description:
        "Demo Flutter app for a fictional heating and plumbing company: the day's route and next job, required checklists, parts from the van, photos, the customer's signature and the invoice. Changes are saved on the phone and sync when the signal is back.",
      roles: ["Product Design", "Mobile Development", "UI/UX", "Testing"],
      technologies: ["Flutter", "Dart", "Material 3", "shared_preferences", "Playwright"],
      techInvolvement: "Designed and built end to end: job flow, offline queue and sync, signature pad, invoice and browser tests",
      href: "/work#fieldline",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "cadence",
      title: "Cadence",
      displayTitle: "CADENCE",
      tier: "secondary" as const,
      period: formatProjectPeriod("cadence", "en"),
      industry: "BOOKING / SCHEDULING",
      tagline: "Online booking page and staff calendar for a salon",
      description:
        "Demo booking system for a fictional hair salon: clients book only times that are really free, then reschedule or cancel online. The team works from a calendar with a column per person and drag to reschedule.",
      roles: ["Product Design", "Full-Stack Development", "UI/UX", "Testing"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Vitest", "Playwright"],
      techInvolvement: "Designed and built end to end: availability engine, booking flow, staff calendar and browser tests",
      href: "/work#cadence",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "relay",
      title: "Relay",
      displayTitle: "RELAY",
      tier: "secondary" as const,
      period: formatProjectPeriod("relay", "en"),
      industry: "AI / CUSTOMER SUPPORT",
      tagline: "AI support assistant with a chat widget and an admin console",
      description:
        "Demo help center for a fictional outdoor store: the assistant answers from help articles with sources and hands the chat to a person when it isn't sure. The team follows every conversation in an admin console.",
      roles: ["Product Design", "Full-Stack Development", "UI/UX", "Testing"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "BM25 Retrieval", "Recharts", "Playwright"],
      techInvolvement: "Designed and built end to end: retrieval engine, chat widget, admin console and browser tests",
      href: "/work#relay",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "atlas-portal",
      title: "Atlas Portal",
      displayTitle: "ATLAS PORTAL",
      tier: "secondary" as const,
      period: formatProjectPeriod("atlas-portal", "en"),
      industry: "ADMIN DASHBOARD / CLIENT PORTAL",
      tagline: "Admin dashboard and client file portal",
      description:
        "Internal tool demo with two roles: admins see KPIs, users, projects and an activity log, and each client gets a private file portal with previews. Runs in the browser on synthetic data.",
      roles: ["Product Design", "Full-Stack Development", "UI/UX", "Testing"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PDF.js", "Playwright"],
      techInvolvement: "Designed and built end to end: role-based screens, mock backend, file previews and tests",
      href: "/work#atlas-portal",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "pdf-to-excel",
      title: "PDF to Excel Extractor",
      displayTitle: "PDF TO EXCEL EXTRACTOR",
      tier: "secondary" as const,
      period: formatProjectPeriod("pdf-to-excel", "en"),
      industry: "DATA EXTRACTION / AUTOMATION",
      tagline: "Turns tables in PDF reports into clean Excel files",
      description:
        "Finds the table on every page of a PDF, drops titles and repeated headers, and exports a formatted Excel workbook. Everything runs in the browser, so files are never uploaded.",
      roles: ["Development", "UI/UX"],
      technologies: ["TypeScript", "Vite", "pdf.js", "ExcelJS"],
      techInvolvement: "Built the table detection, cleanup rules and Excel export",
      href: "/work#pdf-to-excel",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "lead-scraper",
      title: "Lead Scraper",
      displayTitle: "LEAD SCRAPER",
      tier: "secondary" as const,
      period: formatProjectPeriod("lead-scraper", "en"),
      industry: "WEB SCRAPING / LEAD GENERATION",
      tagline: "Daily scraper that turns a business directory into a clean lead list",
      description:
        "Crawls a business directory, cleans phone numbers and addresses, merges duplicates and publishes an Excel file. A GitHub Actions job runs it again every day.",
      roles: ["Development", "Data Cleaning", "Automation"],
      technologies: ["Python", "Requests", "BeautifulSoup", "openpyxl", "GitHub Actions"],
      techInvolvement: "Built the crawler, data cleaning, Excel export and the daily automation",
      href: "/work#lead-scraper",
      status: "completed" as const,
      visual: "screenshots" as const,
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
        "Website and QR menu for a restaurant in Elazığ. Mobile-first, designed and built by me and used every day by staff and guests.",
      roles: ["Web Design & Development", "Responsive UI/UX"],
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "QR Menu"],
      techInvolvement: "Design and development of the corporate website and QR menu platform",
      href: "/work#tavuk-da-tavuk",
      status: "completed" as const,
      visual: "mobile-qr" as const,
    },
  ],

  pages: {
    home: {
      title: "Yunus Ozen — AI Product Engineer",
      description:
        "AI Product Engineer and Software Engineering student. Projects in logistics, AI support, booking and business tools.",
    },
    work: {
      title: "Projects",
      description:
        "Digital products in logistics, hospitality, AI support, and business tools — with live demos where available.",
    },
    about: {
      title: "About",
      description:
        "Who I am, how I work and what I am looking for.",
    },
    journey: {
      title: "Journey",
      description:
        "Education, projects, and milestones — a chronological record including NASA Space Apps Challenge.",
    },
    contact: {
      title: "Contact",
      description: "Email, LinkedIn, GitHub and CV.",
    },
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
