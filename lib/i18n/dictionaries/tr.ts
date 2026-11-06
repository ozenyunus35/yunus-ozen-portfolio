import { getCvPublicUrl } from "@/lib/data/cv";
import { formatProjectPeriod } from "@/lib/data/project-periods";
import { getSiteUrl } from "@/lib/data/site-url";

const cvAvailable = process.env.NEXT_PUBLIC_CV_AVAILABLE === "true";

export const dictionaryTr = {
  common: {
    contact: "İletişim",
    email: "E-posta",
    cv: "CV",
    downloadCv: "CV İndir",
    caseStudy: "Vaka çalışması",
    viewWork: "Projeleri Gör",
    ongoing: "Devam ediyor",
    completed: "Tamamlandı",
    interface: "Arayüz",
    liveDemo: "Canlı demo",
    liveSite: "Canlı site",
    sourceCode: "Kaynak kod",
    screenshotsAlt: "MacBook ve iPhone'da ekran görüntüleri",
    fullWorkIndex: "Proje listesi",
    contactPage: "Bağlantılar",
    getInTouch: "Bağlantılar",
    viewSelectedWork: "Tüm projeler",
    relatedWork: "İlgili projeler",
    channels: "Kanallar",
    next: "Sonraki",
    all: "Tümü",
    copy: "Kopyala",
    copied: "Kopyalandı",
    skipToContent: "Ana içeriğe atla",
    language: "Dil",
    backToProjects: "Tüm projeler",
    previous: "Önceki",
    whatIDid: "Neler yaptım",
    stack: "Teknolojiler",
    roles: "Roller",
    period: "Dönem",
    field: "Alan",
    projectCount: "proje",
    pages: "Sayfalar",
    footerNav: {
      work: "Projeler",
      about: "Hakkımda",
      journey: "Yolculuk",
      contact: "İletişim",
    },
    footerTagline:
      "Fikirden canlı ürüne kadar tasarlayıp geliştirdiğim ürünler.",
    footerCopyright: "Kişisel site",
    projectNames: {
      bisevk: "Bi-Sevk",
      tavuk: "Tavuk da Tavuk",
    },
  },

  site: {
    name: "Yunus Ozen",
    title: "Yunus Ozen — Yazılım Mühendisi",
    description:
      "Yazılım mühendisi ve AI Product Engineer, Yazılım Mühendisliği son sınıf öğrencisi. Fikirden canlı ürüne kadar geliştirdiğim projeler. İzmir, Türkiye.",
    url: getSiteUrl(),
    locale: "tr_TR",
    location: "İzmir, Türkiye",
    role: "Yazılım Mühendisi · AI Product Engineer",
    focus: ["Ürün Mühendisliği", "Full-Stack Geliştirme", "Yapay Zekâ Araçları"],
    initials: "YO",
    portfolioYear: "2026",
    cv: cvAvailable ? getCvPublicUrl() : null,
    email: "ozenyunusemre@outlook.com",
    social: {
      linkedin: "https://www.linkedin.com/in/yunus-ozen/",
      github: "https://github.com/ozenyunus35",
    },
  },

  nav: [
    { label: "Projeler", href: "/work" },
    { label: "Hakkımda", href: "/about" },
    { label: "Yolculuk", href: "/journey" },
    { label: "İletişim", href: "/contact" },
  ],

  routes: [
    { index: "00", label: "ANA SAYFA", href: "/", mode: "home" as const },
    { index: "01", label: "PROJELER", href: "/work", mode: "work" as const },
    { index: "02", label: "HAKKIMDA", href: "/about", mode: "about" as const },
    { index: "03", label: "YOLCULUK", href: "/journey", mode: "journey" as const },
    { index: "04", label: "İLETİŞİM", href: "/contact", mode: "contact" as const },
  ],

  command: {
    open: "Sitede ara",
    hint: "ile her yere atla",
    placeholder: "Sayfa, proje veya işlem ara…",
    empty: "Sonuç yok.",
    home: "Ana Sayfa",
    copyEmail: "E-posta adresini kopyala",
    copied: "E-posta adresi kopyalandı",
    switchLanguage: "Switch to English",
    theme: "Açık / koyu temaya geç",
    navigate: "gezin",
    select: "aç",
    groups: { pages: "Sayfalar", projects: "Projeler", actions: "İşlemler", links: "Bağlantılar" },
  },

  hero: {
    tagline:
      "Ürünleri fikirden canlıya kadar geliştiriyorum: gereksinimler, kullanıcı akışları, arayüz ve kod.",
    supporting:
      "Yazılım mühendisi ve Fırat Üniversitesi Yazılım Mühendisliği son sınıf öğrencisiyim; full-stack ve yapay zekâ ürünleri geliştiriyorum. Software, AI ve Product Engineer rollerine açığım; uzaktan, hibrit veya ofiste.",
    viewWork: "Projeleri Gör",
  },

  work: {
    sectionLabel: "Projeler",
    headline: "Bugün açıp deneyebileceğiniz ürünler.",
    table: {
      no: "No.",
      project: "Proje",
      industry: "Sektör",
      period: "Dönem",
    },
    indexHeadline: "Lojistik, restoran, yapay zekâ ve iş araçları alanlarındaki projeler.",
    filters: { all: "Tümü", ai: "Yapay zekâ", web: "Web", mobile: "Mobil", automation: "Otomasyon" },
  },

  approach: {
    sectionLabel: "Yaklaşım",
    statement: [
      "Bir ürünün nasıl inşa edildiğini düşünmekle yetinmem.",
      "Neden inşa edilmesi gerektiğine önem veririm.",
    ],
    columns: [
      { title: "ÜRÜN", items: ["Strateji", "Gereksinimler", "UX"] },
      { title: "MÜHENDİSLİK", items: ["Web & Mobil", "Backend & API", "Test"] },
      { title: "YAPAY ZEKÂ", items: ["LLM API", "Claude Code", "Otomasyon"] },
    ],
  },

  tech: {
    sectionLabel: "Teknoloji",
    headline: "Ürün çıkardığım teknolojiler.",
    intro:
      "Ürünleri tasarlamak, geliştirmek ve yayına almak için kullandığım araçlar: arayüzden sunucuya ve yayına kadar.",
    stackLabel: "Genel yığın",
    byProjectLabel: "Projeye göre",
    involvementLabel: "Mühendislik rolü",
    categories: [
      {
        label: "Frontend",
        items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
      },
      {
        label: "Backend & Veri",
        items: ["Node.js", "Python", "Kotlin", "Spring Boot", "PostgreSQL", "MongoDB"],
      },
      {
        label: "Yapay Zekâ & Araçlar",
        items: ["LLM API", "Claude Code", "Docker", "GitHub Actions", "Playwright", "Figma"],
      },
    ],
  },

  live: {
    sectionLabel: "Canlı",
    headline: "Ürünlerin nasıl göründüğünü değil, nasıl çalıştığını görün.",
    intro: "Her kart, ekrandayken ürünün yaptığı işi yeniden oynatır: fatura okumak, tek mesajdaki iki soruyu cevaplamak, dosya paylaşmak, potansiyel müşteri listesi çıkarmak.",
    note: "Uydurma verilerle oynatılır. Proje sayfalarında gerçek demoların bağlantısı var.",
    open: "Projeyi aç",
    cards: {
      tally: { title: "Tally", caption: "Faturayı okur, KDV'yi ve toplamları kontrol eder, ödendiği banka hareketiyle eşleştirir." },
      relay: { title: "Relay", caption: "Mesajdaki her soruyu cevaplar, kaynağını gösterir ve politikada yazmayan hiçbir şeyi vaat etmez." },
      atlas: { title: "Atlas Portal", caption: "Müşteri için dosya yükler, paylaşır ve müşterinin ne zaman açtığını gösterir." },
      scraper: { title: "Lead Scraper", caption: "Her gün çalışır, tekrarları ayıklar ve temiz bir müşteri listesi kaydeder." },
    },
  },

  process: {
    sectionLabel: "Süreç",
    headline: "İlk fikirden canlı yayına.",
    steps: [
      { title: "Gereksinimler", text: "Kullanıcının yapması gereken işten başlarım ve bunu ürünün geçmesi gereken kontroller olarak yazarım; asla yapmaması gerekenler dahil." },
      { title: "Akışlar ve ekranlar", text: "Sonra ürün içindeki yol: hangi ekran sonra gelir, bir bilgi eksikse ne olur, bir insan nerede devralır." },
      { title: "Kod ve testler", text: "Her kuralın bir testi olur ve ürün, hiç ayar yapılmamış sorularla ölçülür; böylece sayılar bir şey ifade eder." },
      { title: "Yayın", text: "Her yayından önce lint, tip kontrolü, build ve tarayıcı testleri çalışır; sonuç herkesin deneyebileceği açık bir bağlantıdır." },
    ],
  },

  stats: {
    merged: "birleştirilmiş pull request",
    repos: "açık kaynak depo",
    products: "geliştirilen ürün",
  },

  home: {
    headline: { lead: "Ürünleri fikirden", accent: "canlıya", tail: "taşıyan yazılım mühendisi." },
    marqueeLabel: "Kodumun birleştirildiği projeler",
    status: "Yeni rollere açığım",
    education: "Yazılım Mühendisliği lisans · Fırat Üniversitesi · 2027",
    statsLabel: "Rakamlarla",
    statsNotes: {
      merged: "Açık kaynak projelerin bakımcıları tarafından incelenip birleştirildi.",
      repos: "Aralarında Grafana, Nuxt, OpenTelemetry ve oxc var.",
      products: "Her birinin canlı demosu ya da yayındaki sitesi var.",
    },
    tourHint: "Bir ürün seçin ya da turun oynamasına izin verin.",
    techCenter: "Her proje bunların bir kısmını kullanır",
    projectsCta: "Tüm projeler",
    faq: {
      sectionLabel: "SSS",
      headline: "İşe alımcıların sorduğu sorular.",
      items: [
        { q: "Hangi rolleri arıyorsun?", a: "Software, AI ve Product Engineer rolleri; uzaktan, hibrit veya ofiste." },
        { q: "Taşınmaya açık mısın?", a: "Evet: ABD, Avrupa, Körfez ülkeleri ya da başka bir yere." },
        { q: "Ne zaman mezun oluyorsun?", a: "Fırat Üniversitesi Yazılım Mühendisliği son sınıf öğrencisiyim, 2027'de mezun oluyorum." },
        { q: "Hangi teknolojileri kullanıyorsun?", a: "Arayüz için TypeScript, React ve Next.js; arkada PostgreSQL veya MongoDB ile Node.js, Python, Kotlin ve Spring Boot; mobil için Flutter." },
        { q: "İşinde yapay zekâyı nasıl kullanıyorsun?", a: "Claude Code ve LLM API'leri gibi yapay zekâ araçlarını araştırma ve gereksinimlerden koda, testlere ve yayına kadar tüm süreçte kullanıyorum." },
        { q: "Projelerini deneyebilir miyim?", a: "Evet. Her proje sayfasında canlı demo ya da yayındaki site bağlantısı var; demolar kaynak kodlarına da bağlanıyor." },
      ],
    },
    cta: {
      lead: "Birlikte",
      accent: "çalışan",
      tail: "bir ürün geliştirelim.",
      text: "Bana ulaşmanın en hızlı yolu e-posta ya da LinkedIn.",
    },
  },

  inner: {
    overview: "Genel bakış",
    details: "Detaylar",
    links: "Bağlantılar",
    seeItWork: "Çalışırken görün",
    glance: "Kısaca",
    story: "Hikâye",
    stack: "Teknolojiler",
    milestones: "Dönüm noktaları",
    highlight: "Öne çıkan",
    channels: "Kanallar",
    status: "Durum",
    moreProjects: "Diğer projeler",
    problem: "Problem",
    approach: "Yaklaşım",
    features: "Neler yapıyor",
    quality: "Test ve kalite",
    screens: "Ekranlar",
    viewGrid: "Izgara",
    viewList: "Liste",
    byKind: "Türe göre",
    compose: {
      title: "Bana yazın",
      name: "Adınız",
      topic: "Konu",
      topics: ["Uygun olabileceğim bir rol", "Bir proje", "Başka bir konu"],
      message: "Mesaj",
      send: "E-posta uygulamanızda açın",
      note: "Mesaj dolu olarak kendi e-posta uygulamanızda açılır. Bu sayfadan hiçbir şey gönderilmez.",
    },
  },

  openSource: {
    sectionLabel: "Açık Kaynak",
    headline: "Başka ekiplerin kullandığı projelere merge edilen kod.",
    intro:
      "Ekim 2026'dan beri açık kaynak projelerde hata düzeltip özellik ekliyorum; her değişiklik testli ve proje sahiplerinin incelemesinden geçiyor.",
    mergedLabel: "merge edilen PR",
    totalLabel: "merge edilen pull request, {repos} açık kaynak projede",
    updatedLabel: "GitHub'dan {date} tarihinde sayıldı",
    alsoLabel: "Ayrıca",
    descriptions: {
      "repowise-dev/repowise": "Kod içe aktarma, tsconfig proje referansları, Ktor ve Javalin için HTTP rota tespiti.",
      "stephenh/ts-proto": "Protobuf'tan TypeScript üreten araç: grpc-web async iterable ve seçenek düzeltmeleri.",
      "uutils/coreutils": "sort, od, join, split, csplit ve nl komutlarında GNU uyumluluğu düzeltmeleri.",
      "cachix/devenv": "Geliştirme ortamları: TUI süreç yöneticisi ve görev başlatma düzeltmeleri.",
      "Automattic/harper": "Dilbilgisi denetleyicisi: İngilizce kurallarda yanlış uyarıları azaltma.",
      "oxc-project/oxc": "JavaScript araç zinciri: minifier ve ESLint kuralı düzeltmeleri.",
    } as Record<string, string>,
  },

  method: {
    sectionLabel: "Ürün × Mühendislik",
    headline: ["ÜRÜN DÜŞÜNCESİ.", "MÜHENDİSLİK ZİHNİYETİ."],
    product: {
      title: "ÜRÜN",
      nodes: [
        { id: "ux", label: "UX", description: "Kullanıcı ihtiyaçlarını net akışlara, arayüzlere ve etkileşim kalıplarına dönüştürmek." },
        { id: "business", label: "İŞ", description: "Bir ürünün neden var olması gerektiğini anlamak — değer, kısıtlar ve öncelikler." },
        { id: "data", label: "VERİ", description: "Varsayımlar yerine kanıt ve geri bildirimle karar vermek." },
      ],
    },
    engineering: {
      title: "MÜHENDİSLİK",
      nodes: [
        { id: "api", label: "API", description: "Sistemlerin nasıl iletişim kurduğu — uç noktalar, sözleşmeler ve entegrasyon sınırları." },
        { id: "frontend", label: "Frontend", description: "Kullanıcı deneyimini uygulama mantığına bağlayan duyarlı arayüzler." },
        { id: "backend", label: "Backend", description: "Sunucu tarafı yapı, iş mantığı ve arayüzün arkasındaki sistemler." },
        { id: "database", label: "Veritabanı", description: "Veri modelleme ve depolama — bilginin nasıl organize edildiği." },
        { id: "ui-ux", label: "UI/UX", description: "Tasarım kararlarının uygulama kısıtlarıyla buluştuğu kesişim." },
        { id: "system-design", label: "Sistem Tasarımı", description: "Bileşenler, bağımlılıklar ve parçaların bir üründe nasıl bağlandığı." },
      ],
    },
  },

  exploring: {
    sectionLabel: "Şu An Keşfettiklerim",
    heading: "İlgi alanlarım",
    supporting: "Şu an öğrendiğim ve geliştirdiğim konular.",
    statusLearning: "Öğreniyorum",
    statusDeveloping: "Geliştiriyorum",
    areas: [
      { label: "Yapay zekâ ajanları", status: "Developing" as const },
      { label: "Retrieval (RAG)", status: "Developing" as const },
      { label: "LLM değerlendirme", status: "Learning" as const },
      { label: "Ürün analitiği", status: "Learning" as const },
      { label: "Süreç otomasyonu", status: "Developing" as const },
    ],
  },

  contact: {
    sectionLabel: "İletişim",
    headline: ["Hadi", "konuşalım."],
    intro:
      "Software, AI ve Product Engineer rollerine açığım; uzaktan, hibrit veya ofiste. ABD, Avrupa, Körfez ülkeleri veya başka bir ülkeye taşınmaya da açığım. En hızlı ulaşım e-posta veya LinkedIn.",
    actions: {
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "CV İndir",
    },
  },

  about: {
    sectionLabel: "Hakkımda",
    headline: ["Ürün düşüncesi,", "koda dönüşmüş hâliyle."],
    paragraphs: [
      "Fırat Üniversitesi Yazılım Mühendisliği son sınıf öğrencisiyim (mezuniyet 2027). Bir ürünü baştan sona sahiplenmeyi seviyorum: problem, akışlar, arayüz ve kod.",
      "Bir lojistik pazar yeri, bir eğitim yönetim paneli ve bir restoran sitesi üzerinde çalıştım; yapay zekâ destek, randevu ve iş araçları demoları geliştiriyorum.",
      "Claude Code ve LLM API'leri gibi yapay zekâ araçlarını araştırmadan koda, teste ve yayına kadar her aşamada kullanıyorum.",
    ],
    focusStatement:
      "Bir ürünün neden var olması gerektiğini, nasıl yapıldığı kadar önemsiyorum; küçük başlayıp erken yayınlıyor, gerçek geri bildirimle geliştiriyorum.",
    meta: [
      { label: "Konum", value: "İzmir, Türkiye" },
      { label: "Eğitim", value: "Yazılım Mühendisliği Lisans, Fırat Üniversitesi" },
      { label: "Odak", value: "AI Product Engineering" },
    ],
    cta: "Bağlantılar",
  },

  journey: {
    sectionLabel: "Yolculuk",
    headline: ["Eğitim,", "projeler", "ve dönüm noktaları."],
    intro:
      "Okul, projeler ve katıldığım etkinlikler — kronolojik bir kayıt.",
    types: {
      education: "Eğitim",
      project: "Projeler",
      event: "Etkinlikler",
    },
    milestones: [
      {
        id: "education",
        period: "Devam ediyor",
        title: "Yazılım Mühendisliği",
        context: "Eğitim",
        description:
          "Fırat Üniversitesi Yazılım Mühendisliği lisans, beklenen mezuniyet 2027.",
        type: "education" as const,
      },
      {
        id: "nasa-2022",
        period: "2022",
        title: "NASA Space Apps Challenge",
        context: "Elazığ",
        description:
          "Innosoft ekibiyle Elazığ birinciliği: 48 saatte Flutter uygulaması Wink to the Future'ı geliştirdik.",
        type: "event" as const,
        href: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
      },
      {
        id: "bisevk",
        period: formatProjectPeriod("bisevk", "tr"),
        title: "Bi-Sevk",
        context: "Lojistik / Pazar Yeri",
        description:
          "Yük sahiplerini tır sürücüleriyle buluşturan lojistik pazar yeri. Ürünü yönettim; web, yönetim paneli ve mobil uygulamaları koordine ettim.",
        type: "project" as const,
        href: "/work/bisevk",
      },
      {
        id: "tavuk-da-tavuk",
        period: formatProjectPeriod("tavuk-da-tavuk", "tr"),
        title: "Tavuk da Tavuk",
        context: "Kurumsal / Konaklama",
        description:
          "Kurumsal web varlığı ve QR menü platformu — duyarlı arayüz tasarımı ve geliştirme.",
        type: "project" as const,
        href: "/work/tavuk-da-tavuk",
      },
      {
        id: "folio",
        period: formatProjectPeriod("folio", "tr"),
        title: "Folio",
        context: "Fintek / Muhasebe",
        description:
          "Tarayıcıda çift taraflı muhasebe: yevmiye, büyük defter, mali tablolar, faturalar, KDV, döviz değerlemesi ve yıl sonu kapanışı; iki hesap planıyla.",
        type: "project" as const,
        href: "/work/folio",
      },
      {
        id: "quarry",
        period: formatProjectPeriod("quarry", "tr"),
        title: "Quarry",
        context: "Veri Analitiği / Metinden SQL",
        description:
          "Veritabanına Türkçe ya da İngilizce soru sorup okunur SQL, grafik ve cevap alan; SQL kontrolleri ve panosuyla tarayıcıda çalışan uygulama.",
        type: "project" as const,
        href: "/work/quarry",
      },
      {
        id: "tally",
        period: formatProjectPeriod("tally", "tr"),
        title: "Tally",
        context: "Fintek / Belge Okuma",
        description:
          "KDV ve bakiye kontrolü, ödeme eşleştirme ve Excel çıktısıyla tarayıcıda çalışan fatura, fiş ve banka ekstresi okuyucu.",
        type: "project" as const,
        href: "/work/tally",
      },
      {
        id: "lead-scraper",
        period: formatProjectPeriod("lead-scraper", "tr"),
        title: "Lead Scraper",
        context: "Web Scraping / Müşteri Adayı",
        description:
          "Bir firma rehberini temiz ve tekrarsız bir müşteri adayı listesine dönüştüren günlük tarayıcı.",
        type: "project" as const,
        href: "/work/lead-scraper",
      },
      {
        id: "pdf-to-excel",
        period: formatProjectPeriod("pdf-to-excel", "tr"),
        title: "PDF to Excel Extractor",
        context: "Veri Çıkarma / Otomasyon",
        description:
          "PDF raporlarındaki tabloları temiz Excel dosyalarına dönüştüren tarayıcı aracı.",
        type: "project" as const,
        href: "/work/pdf-to-excel",
      },
      {
        id: "atlas-portal",
        period: formatProjectPeriod("atlas-portal", "tr"),
        title: "Atlas Portal",
        context: "Yönetim Paneli / Müşteri Portalı",
        description:
          "İki rollü, sahte arka uçlu yönetim paneli ve müşteri dosya portalı demosu.",
        type: "project" as const,
        href: "/work/atlas-portal",
      },
      {
        id: "relay",
        period: formatProjectPeriod("relay", "tr"),
        title: "Relay",
        context: "Yapay Zekâ / Müşteri Desteği",
        description:
          "Yapay zekâ destek asistanı demosu — kaynak göstererek yanıtlar, emin değilse kişiye devreder, ekip için yönetim paneli.",
        type: "project" as const,
        href: "/work/relay",
      },
      {
        id: "fieldline",
        period: formatProjectPeriod("fieldline", "tr"),
        title: "Fieldline",
        context: "Mobil / Saha Servisi",
        description:
          "Saha teknisyenleri için Flutter uygulaması — rota, kontrol listeleri, parça, imza ve fatura; çevrimdışı çalışır, sonra senkronize olur.",
        type: "project" as const,
        href: "/work/fieldline",
      },
      {
        id: "cadence",
        period: formatProjectPeriod("cadence", "tr"),
        title: "Cadence",
        context: "Randevu / Planlama",
        description:
          "Kuaför için online randevu demosu — canlı uygunluk, online değiştirme ve iptal, sürükle-bırak personel takvimi.",
        type: "project" as const,
        href: "/work/cadence",
      },
    ],
  },

  nasa: {
    sectionLabel: "NASA Space Apps",
    title: "NASA Uluslararası Space Apps Challenge",
    year: "2022",
    location: "Elazığ",
    description:
      "NASA Uluslararası Space Apps Challenge 2022 Elazığ etabında Innosoft ekibiyle birinci olduk. 48 saatte Flutter uygulaması Wink to the Future'ı geliştirdik.",
    githubLinkLabel: "Proje Deposunu Gör",
  },

  projects: [
    {
      slug: "folio",
      title: "Folio",
      displayTitle: "FOLIO",
      tier: "secondary" as const,
      period: formatProjectPeriod("folio", "tr"),
      industry: "FİNTEK / MUHASEBE",
      tagline: "Tarayıcıda çift taraflı muhasebe; uluslararası ya da Tekdüzen hesap planıyla",
      description:
        "Her kaydın kuruşu kuruşuna denk olduğu bir defter motoru: taslaklar, numaralanarak işlenen kayıtlar, değişiklik yerine ters kayıt, dönem kilidi ve denetim izi. Üzerinde tahsilat, ödeme ve gerçekleşen kur farklarıyla satış ve alış faturaları, euro ve dolar bakiyelerinin ay sonu kur değerlemesi, devreden KDV ile KDV mahsubu ve geçmiş yıllar kârlarına yıl sonu kapanışı vardır. Raporlar mizan, gelir tablosu, bilanço ve tutan bir dolaylı nakit akış tablosudur; hepsi Excel çalışma kitabına aktarılır. Türkçe ya da İngilizce biçimdeki yevmiye ve banka CSV'leri, her kayıt önce kontrol edilerek içe aktarılır. Türkçe ve İngilizce arayüz, sunucu yok.",
      roles: ["Ürün", "Geliştirme", "Test"],
      technologies: ["TypeScript", "Next.js", "Recharts", "ExcelJS", "Vitest", "Playwright"],
      techInvolvement: "Defter motoru, iki hesap planı, raporlar, CSV içe aktarıcı, arayüz ve testler",
      href: "/work/folio",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "quarry",
      title: "Quarry",
      displayTitle: "QUARRY",
      tier: "secondary" as const,
      period: formatProjectPeriod("quarry", "tr"),
      industry: "VERİ ANALİTİĞİ / METİNDEN SQL",
      tagline: "Veritabanına sade Türkçe ya da İngilizce soru sorun; okunabilen, çalıştırılabilen, grafiğe ve Excel'e dökülebilen SQL alın",
      description:
        "Kural tabanlı bir metinden SQL motoru ile SQLite (WebAssembly) tarayıcıda yan yana çalışır. Sorular; birleştirme, filtre, tarih aralığı, ilk N ve karşılaştırma içeren SQL'e dönüşür, takip soruları bir önceki cevabın üzerine kurulur. Her cevap sorunun nasıl anlaşıldığını, grafiği, SQL'i ve sade bir açıklamayı gösterir. Ayrıca yaygın hataları işaretleyen bir SQL editörü, finans panosu, veri sözlüğü ve kendi CSV, Excel, JSON ya da SQLite dosyanızı yükleme vardır. Yapay zekâ servisi, API anahtarı ya da sunucu yoktur.",
      roles: ["Ürün", "Geliştirme", "Test"],
      technologies: ["TypeScript", "Next.js", "sql.js (SQLite)", "Recharts", "ExcelJS", "Playwright"],
      techInvolvement: "Ayrıştırıcı, anlam modeli, SQL açıklayıcı ve kontrolleri, arayüz ve doğruluk testleri",
      href: "/work/quarry",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "tally",
      title: "Tally",
      displayTitle: "TALLY",
      tier: "secondary" as const,
      period: formatProjectPeriod("tally", "tr"),
      industry: "FİNTEK / BELGE OKUMA",
      tagline: "Fatura, fiş ve banka ekstresini tarayıcıda okur, sonra rakamları kontrol eder",
      description:
        "PDF'leri ve telefon fotoğraflarını tarayıcıdaki OCR ile kontrol edilmiş veriye çevirir: satıcı, tarihler, kalemler, KDV ve toplamlar ya da ekstredeki her işlem. KDV'yi, toplamları ve bakiye zincirini doğrular, faturaları onları ödeyen banka hareketleriyle eşleştirir, mükerrer ve vadesi geçmiş faturaları işaretler ve tek bir Excel dosyasına aktarır. Hiçbir şey yüklenmez, API yoktur.",
      roles: ["Ürün", "Geliştirme", "Test"],
      technologies: ["TypeScript", "Next.js", "tesseract.js", "pdf.js", "ExcelJS", "Playwright"],
      techInvolvement: "Çıkarma kuralları, ekstre mutabakatı, inceleme arayüzü ve test altyapısı",
      href: "/work/tally",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "bisevk",
      title: "Bi-Sevk",
      displayTitle: "BI-SEVK",
      tier: "primary" as const,
      period: formatProjectPeriod("bisevk", "tr"),
      industry: "LOJİSTİK / PAZAR YERİ",
      tagline: "Yük verenleri taşıyıcılarla buluşturan lojistik platform",
      description:
        "Tır sürücülerini yük sahipleriyle buluşturan lojistik pazar yeri. Stratejiden gereksinimlere ve UI/UX'e kadar ürünü sahiplendim; canlı yük takibi dahil web, yönetim paneli ve mobil uygulamaları koordine ettim.",
      roles: ["Ürün Sahipliği", "UI/UX", "Ekip Koordinasyonu", "Geliştirme"],
      technologies: ["React", "Flutter", "Kotlin", "Spring Boot", "MongoDB", "WebSockets", "Figma"],
      techInvolvement: "Ürün stratejisi, gereksinimler ve UI/UX; web, yönetim paneli ve mobil uygulamaların koordinasyonu ve kod katkısı",
      href: "/work/bisevk",
      status: "completed" as const,
      visual: "logistics-vertical" as const,
    },
    {
      slug: "fieldline",
      title: "Fieldline",
      displayTitle: "FIELDLINE",
      tier: "secondary" as const,
      period: formatProjectPeriod("fieldline", "tr"),
      industry: "MOBİL / SAHA SERVİSİ",
      tagline: "Bir saha teknisyeninin günü için mobil uygulama",
      description:
        "Kurgusal bir ısıtma ve tesisat firması için demo Flutter uygulaması: günün rotası ve sıradaki iş, zorunlu kontrol listeleri, araçtan parça, fotoğraflar, müşteri imzası ve fatura. Değişiklikler telefonda saklanıyor, bağlantı gelince senkronize oluyor.",
      roles: ["Ürün Tasarımı", "Mobil Geliştirme", "UI/UX", "Test"],
      technologies: ["Flutter", "Dart", "Material 3", "shared_preferences", "Playwright"],
      techInvolvement: "Uçtan uca tasarım ve geliştirme: iş akışı, çevrimdışı kuyruk ve senkronizasyon, imza alanı, fatura ve tarayıcı testleri",
      href: "/work/fieldline",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "cadence",
      title: "Cadence",
      displayTitle: "CADENCE",
      tier: "secondary" as const,
      period: formatProjectPeriod("cadence", "tr"),
      industry: "RANDEVU / PLANLAMA",
      tagline: "Bir kuaför için online randevu sayfası ve personel takvimi",
      description:
        "Kurgusal bir kuaför için demo randevu sistemi: müşteriler yalnızca gerçekten boş saatleri görüp randevu alıyor, sonra online değiştirip iptal edebiliyor. Ekip, kişi başına sütunlu ve sürükle-bırak takvimden çalışıyor.",
      roles: ["Ürün Tasarımı", "Full-Stack Geliştirme", "UI/UX", "Test"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Vitest", "Playwright"],
      techInvolvement: "Uçtan uca tasarım ve geliştirme: uygunluk motoru, randevu akışı, personel takvimi ve tarayıcı testleri",
      href: "/work/cadence",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "relay",
      title: "Relay",
      displayTitle: "RELAY",
      tier: "secondary" as const,
      period: formatProjectPeriod("relay", "tr"),
      industry: "YAPAY ZEKÂ / MÜŞTERİ DESTEĞİ",
      tagline: "Sohbet widget'ı ve yönetim paneli olan yapay zekâ destek asistanı",
      description:
        "Kurgusal bir outdoor mağazası için demo yardım merkezi: asistan yardım makalelerinden kaynak göstererek yanıtlıyor, emin olmadığında sohbeti bir kişiye devrediyor. Ekip tüm konuşmaları yönetim panelinden takip ediyor.",
      roles: ["Ürün Tasarımı", "Full-Stack Geliştirme", "UI/UX", "Test"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "BM25 Retrieval", "Recharts", "Playwright"],
      techInvolvement: "Uçtan uca tasarım ve geliştirme: arama motoru, sohbet widget'ı, yönetim paneli ve tarayıcı testleri",
      href: "/work/relay",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "atlas-portal",
      title: "Atlas Portal",
      displayTitle: "ATLAS PORTAL",
      tier: "secondary" as const,
      period: formatProjectPeriod("atlas-portal", "tr"),
      industry: "YÖNETİM PANELİ / MÜŞTERİ PORTALI",
      tagline: "Yönetim paneli ve müşteri dosya portalı",
      description:
        "İki rollü iç araç demosu: yöneticiler KPI'ları, kullanıcıları, projeleri ve aktivite kaydını görüyor, her müşterinin önizlemeli kendi dosya portalı var. Tarayıcıda sentetik verilerle çalışır.",
      roles: ["Ürün Tasarımı", "Full-Stack Geliştirme", "UI/UX", "Test"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PDF.js", "Playwright"],
      techInvolvement: "Uçtan uca tasarım ve geliştirme: rol bazlı ekranlar, sahte arka uç, dosya önizleme ve testler",
      href: "/work/atlas-portal",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "pdf-to-excel",
      title: "PDF to Excel Extractor",
      displayTitle: "PDF TO EXCEL EXTRACTOR",
      tier: "secondary" as const,
      period: formatProjectPeriod("pdf-to-excel", "tr"),
      industry: "VERİ ÇIKARMA / OTOMASYON",
      tagline: "PDF raporlarındaki tabloları temiz Excel dosyalarına dönüştürür",
      description:
        "PDF'in her sayfasındaki tabloyu bulur, başlıkları ve tekrar eden sütun başlıklarını ayıklar, biçimlendirilmiş bir Excel dosyası olarak dışa aktarır. Her şey tarayıcıda çalışır; dosyalar hiçbir yere yüklenmez.",
      roles: ["Geliştirme", "UI/UX"],
      technologies: ["TypeScript", "Vite", "pdf.js", "ExcelJS"],
      techInvolvement: "Tablo tespiti, temizleme kuralları ve Excel dışa aktarımı",
      href: "/work/pdf-to-excel",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "lead-scraper",
      title: "Lead Scraper",
      displayTitle: "LEAD SCRAPER",
      tier: "secondary" as const,
      period: formatProjectPeriod("lead-scraper", "tr"),
      industry: "WEB SCRAPING / MÜŞTERİ ADAYI",
      tagline: "Bir firma rehberini her gün temiz bir müşteri adayı listesine dönüştürür",
      description:
        "Bir firma rehberini tarar, telefon numaralarını ve adresleri temizler, tekrarları birleştirir ve sonucu Excel dosyası olarak yayınlar. Bir GitHub Actions işi her gün yeniden çalıştırır.",
      roles: ["Geliştirme", "Veri Temizleme", "Otomasyon"],
      technologies: ["Python", "Requests", "BeautifulSoup", "openpyxl", "GitHub Actions"],
      techInvolvement: "Tarayıcı, veri temizleme, Excel dışa aktarımı ve günlük otomasyon",
      href: "/work/lead-scraper",
      status: "completed" as const,
      visual: "screenshots" as const,
    },
    {
      slug: "tavuk-da-tavuk",
      title: "Tavuk da Tavuk",
      displayTitle: "TAVUK DA TAVUK",
      tier: "secondary" as const,
      period: formatProjectPeriod("tavuk-da-tavuk", "tr"),
      industry: "KURUMSAL / KONAKLAMA",
      tagline: "Kurumsal web sitesi ve QR menü platformu",
      description:
        "Kurumsal web varlığı ve QR menü platformu — mekân içi ve mobil yemek deneyimleri için duyarlı arayüz tasarımı ve geliştirme.",
      roles: ["Web Tasarım & Geliştirme", "Duyarlı UI/UX"],
      technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel", "QR Menu"],
      techInvolvement: "Kurumsal web sitesi ve QR menü platformunun tasarımı ve geliştirmesi",
      href: "/work/tavuk-da-tavuk",
      status: "completed" as const,
      visual: "mobile-qr" as const,
    },
  ],

  pages: {
    home: {
      title: "Yunus Ozen — Yazılım Mühendisi",
      description:
        "Yazılım mühendisi ve AI Product Engineer. Lojistik, yapay zekâ destek, randevu ve iş araçları projeleri.",
    },
    work: {
      title: "Projeler",
      description:
        "Lojistik, restoran, yapay zekâ destek ve iş araçları alanlarındaki dijital ürünler — mümkün olanlarda canlı demolarla.",
    },
    about: {
      title: "Hakkımda",
      description:
        "Kim olduğum, nasıl çalıştığım ve ne aradığım.",
    },
    journey: {
      title: "Yolculuk",
      description:
        "Eğitim, projeler ve dönüm noktaları — NASA Space Apps Challenge dahil kronolojik kayıt.",
    },
    contact: {
      title: "İletişim",
      description: "E-posta, LinkedIn, GitHub ve CV.",
    },
  },

  diagrams: {
    bisevk: {
      caption: "PAZAR YERİ AKIŞI · YÜK → EŞLEŞME → TESLİMAT",
      matchZone: "EŞLEŞME ALANI",
      nodes: {
        shipper: "GÖNDERİCİ",
        load: "YÜK İLANI",
        offers: "TEKLİFLER",
        carrier: "TAŞIYICI",
        transport: "TAŞIMA",
        delivery: "TESLİMAT",
      },
    },
    tavuk: {
      caption: "MEKÂN İÇİ AKIŞ · TARA → MOBİL MENÜ",
      qr: "QR KOD",
      scan: "TARA",
      menu: "MOBİL MENÜ",
      web: "KURUMSAL WEB",
      touchpoint: "FİZİKSEL TEMAS NOKTASI",
    },
  },
} as const;
