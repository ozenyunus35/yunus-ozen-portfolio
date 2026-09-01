import { CV_PUBLIC_PATH } from "@/lib/data/cv";
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
    processFlow: "Süreç akışı",
    systemSchematic: "Sistem şeması",
    fullWorkIndex: "Proje listesi",
    contactPage: "Bağlantılar",
    getInTouch: "Bağlantılar",
    viewSelectedWork: "Tüm projeler",
    relatedWork: "İlgili projeler",
    channels: "Kanallar",
    next: "Sonraki",
    skipToContent: "Ana içeriğe atla",
    language: "Dil",
    footerNav: {
      work: "Projeler",
      about: "Hakkımda",
      journey: "Yolculuk",
      contact: "İletişim",
    },
    footerTagline:
      "Üzerinde çalıştığım dijital ürünler, süreçler ve öğrenme notları — yalnızca kayıt ve paylaşım amaçlı.",
    footerCopyright: "Kişisel site",
    projectNames: {
      bisevk: "Bi-Sevk",
      eyfel: "Eyfel Kurye",
      fmd: "FMD Eğitim Portalı",
      tavuk: "Tavuk da Tavuk",
    },
  },

  site: {
    name: "Yunus Emre Özen",
    title: "Yunus Emre Özen — Kişisel Site",
    description:
      "Yazılım mühendisliği öğrencisi. Projelerim, süreçlerim ve öğrenme yolculuğum hakkında bilgilendirici bir site. İzmir, Türkiye.",
    url: getSiteUrl(),
    locale: "tr_TR",
    location: "İzmir, Türkiye",
    role: "Yazılım Mühendisliği · Ürün & Proje",
    focus: ["Ürün Yönetimi", "Proje Yönetimi", "Yazılım Mühendisliği"],
    initials: "YÖ",
    portfolioYear: "2026",
    cv: cvAvailable ? CV_PUBLIC_PATH : null,
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

  hero: {
    tagline:
      "Ürün ve proje süreçlerini, üzerinde çalıştığım gerçek sistemler üzerinden belgeliyorum.",
    supporting:
      "Bu site; projelerimi, düşünce yapımı ve öğrenme yolculuğumu paylaşmak için var — iş veya müşteri arayışı olmadan.",
    viewWork: "Projeleri Gör",
  },

  work: {
    sectionLabel: "Projeler",
    headline: "Gerçek ihtiyaçlardan doğan dijital ürünler.",
    table: {
      no: "No.",
      project: "Proje",
      industry: "Sektör",
      period: "Dönem",
    },
    indexHeadline: "Lojistik, operasyon ve eğitim alanlarındaki projeler.",
    caseStudyBtn: "Vaka çalışması",
  },

  approach: {
    sectionLabel: "Yaklaşım",
    statement: [
      "Bir ürünün nasıl inşa edildiğini düşünmekle yetinmem.",
      "Neden inşa edilmesi gerektiğine önem veririm.",
    ],
    columns: [
      { title: "ÜRÜN", items: ["Strateji", "Gereksinimler", "UX"] },
      { title: "PROJE", items: ["Koordinasyon", "Planlama", "Teslimat"] },
      { title: "MÜHENDİSLİK", items: ["Teknik Altyapı", "Web & Mobil", "Sistem Düşüncesi"] },
    ],
  },

  tech: {
    sectionLabel: "Teknoloji",
    headline: "Projelerde kullandığım mühendislik araçları.",
    intro:
      "Ürün ve proje rollerimin yanında, yazılım mühendisliği perspektifinden dokunduğum teknolojiler — geliştirmeden teknik iş birliğine.",
    stackLabel: "Genel yığın",
    byProjectLabel: "Projeye göre",
    involvementLabel: "Mühendislik rolü",
    categories: [
      {
        label: "Frontend",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML/CSS"],
      },
      {
        label: "Backend & Veri",
        items: ["Node.js", "REST API", "PostgreSQL"],
      },
      {
        label: "Tasarım & Süreç",
        items: ["Figma", "Git", "GitHub", "Agile"],
      },
    ],
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
    heading: "İLGİ ALANLARIM",
    supporting: "Ürün düşüncesini genişletmek için şu an merak ettiğim konular.",
    statusLearning: "Öğreniyorum",
    statusDeveloping: "Geliştiriyorum",
    areas: [
      { label: "ÜRÜN ANALİTİĞİ", status: "Learning" as const },
      { label: "BÜYÜME", status: "Learning" as const },
      { label: "A/B TESTİ", status: "Learning" as const },
      { label: "KULLANICI DAVRANIŞI", status: "Learning" as const },
      { label: "SÜREÇ OTOMASYONU", status: "Developing" as const },
    ],
  },

  contact: {
    sectionLabel: "İletişim",
    headline: ["İLETİŞİM", "BİLGİLERİ."],
    intro:
      "Bu site bilgilendirme amaçlıdır. Merak ettikleriniz için aşağıdaki kanallardan ulaşabilirsiniz.",
    actions: {
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "CV İndir",
    },
  },

  about: {
    sectionLabel: "Hakkımda",
    headline: ["Mühendislik derinliğiyle", "ürün düşüncesi."],
    paragraphs: [
      "Kodun ötesinde sistemlerin nasıl kurulduğuyla ilgilenen bir yazılım mühendisliği öğrencisiyim.",
      "Geliştirme, arayüz tasarımı ve proje koordinasyonu deneyimlerim, ürün düşüncesine olan ilgimi şekillendirdi.",
      "Bu sitede üzerinde çalıştığım projeleri, süreçleri ve öğrendiklerimi paylaşıyorum.",
    ],
    focusStatement:
      "Teknik altyapım; ürünleri nasıl kapsamlayacağımı, teslimatı nasıl koordine edeceğimi ve gerçek kısıtlar içinde nelerin mümkün olduğunu değerlendirmemi şekillendiriyor.",
    meta: [
      { label: "Konum", value: "İzmir, Türkiye" },
      { label: "Eğitim", value: "Yazılım Mühendisliği" },
      { label: "Odak", value: "Ürün & Proje Yönetimi" },
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
          "Ürün yönetimi, proje koordinasyonu ve sistem düşüncesine odaklanarak yazılım mühendisliği okuyorum.",
        type: "education" as const,
      },
      {
        id: "nasa-2022",
        period: "2022",
        title: "NASA Space Apps Challenge",
        context: "Elazığ",
        description:
          "NASA Uluslararası Space Apps Challenge'a katıldım — ekip projesi üzerinde iş birliği yaptım. İlgili depo GitHub'da mevcut.",
        type: "event" as const,
        href: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
      },
      {
        id: "eyfel",
        period: formatProjectPeriod("eyfel", "tr"),
        title: "Eyfel Kurye",
        context: "Operasyon / Teslimat",
        description:
          "Restoran ve kurye ekipleri için operasyon sistemi, online sipariş platformlarıyla entegre.",
        type: "project" as const,
        href: "/work/eyfel-kurye",
      },
      {
        id: "fmd",
        period: formatProjectPeriod("fmd", "tr"),
        title: "FMD Eğitim Portalı",
        context: "Eğitim / Yönetim",
        description:
          "Eğitim operasyonlarını yapılandıran yönetim paneli — panel mimarisi, kullanıcı akışları ve arayüz sistemleri.",
        type: "project" as const,
        href: "/work/fmd-egitim",
      },
      {
        id: "bisevk",
        period: formatProjectPeriod("bisevk", "tr"),
        title: "Bi-Sevk",
        context: "Lojistik / Pazar Yeri",
        description:
          "Yük sahiplerini taşıyıcılarla buluşturan lojistik pazar yeri — devam eden platformda ürün ve proje süreçlerinde çalışma.",
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
    ],
  },

  nasa: {
    sectionLabel: "NASA Space Apps",
    title: "NASA Uluslararası Space Apps Challenge",
    year: "2022",
    location: "Elazığ",
    description:
      "2022 Elazığ'da NASA Uluslararası Space Apps Challenge'a katıldım — ekip projesi üzerinde iş birliği yaptım. İlgili GitHub deposu orijinal ekip deposunun bir fork'udur.",
    githubLinkLabel: "Proje Deposunu Gör",
  },

  projects: [
    {
      slug: "bisevk",
      title: "Bi-Sevk",
      displayTitle: "BI-SEVK",
      tier: "primary" as const,
      period: formatProjectPeriod("bisevk", "tr"),
      industry: "LOJİSTİK / PAZAR YERİ",
      tagline: "Yük verenleri taşıyıcılarla buluşturan lojistik platform",
      description:
        "Yük sahiplerini ve göndericileri taşıyıcılar ve kamyon sürücüleriyle buluşturan lojistik platform — yük ilanından teslimata kadar akışı yapılandırır.",
      roles: ["Ürün Yönetimi", "Proje Yönetimi", "Ekip Koordinasyonu", "UI/UX", "Teknik İş Birliği"],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Git", "Figma"],
      techInvolvement: "Geliştirme katılımı, teknik iş birliği ve arayüz kararları",
      href: "/work/bisevk",
      status: "ongoing" as const,
      visual: "logistics-vertical" as const,
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
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "QR Menu"],
      techInvolvement: "Kurumsal web sitesi ve QR menü platformunun tasarımı ve geliştirmesi",
      href: "/work/tavuk-da-tavuk",
      status: "completed" as const,
      visual: "mobile-qr" as const,
    },
    {
      slug: "fmd",
      title: "FMD Eğitim Portalı",
      displayTitle: "FMD EĞİTİM PORTALI",
      tier: "secondary" as const,
      period: formatProjectPeriod("fmd", "tr"),
      industry: "EĞİTİM / YÖNETİM",
      tagline: "Eğitim operasyonları için yönetim paneli",
      description:
        "Eğitim operasyonlarını yapılandıran yönetim paneli — teknik ekip ile birlikte panel mimarisi, kullanıcı akışları ve arayüz sistemleri.",
      roles: ["UI/UX", "Panel Yapısı", "Kullanıcı Akışları", "Teknik İş Birliği"],
      technologies: ["Figma", "React", "UI Systems", "User Flow Design"],
      techInvolvement: "Panel mimarisi, arayüz sistemleri ve geliştirme ekibiyle iş birliği",
      href: "/work/fmd-egitim",
      status: "completed" as const,
      visual: "dashboard" as const,
    },
    {
      slug: "eyfel",
      title: "Eyfel Kurye",
      displayTitle: "EYFEL KURYE",
      tier: "secondary" as const,
      period: formatProjectPeriod("eyfel", "tr"),
      industry: "OPERASYON / TESLİMAT",
      tagline: "Restoran ve kurye operasyon platformu",
      description:
        "Restoran ve kurye ekipleri için operasyon sistemi, online sipariş platformlarıyla entegre — sipariş alımından teslimata koordinasyon.",
      roles: ["Ürün & Proje Yönetimi", "Ürün Yapısı", "Kullanıcı Deneyimi", "Geliştirme Süreci", "Ekip Koordinasyonu"],
      technologies: ["React", "TypeScript", "REST API", "Git", "Figma"],
      techInvolvement: "Ürün yapısı, geliştirme koordinasyonu ve teknik karar süreçleri",
      href: "/work/eyfel-kurye",
      status: "completed" as const,
      visual: "delivery-chain" as const,
    },
  ],

  pages: {
    home: {
      title: "Yunus Emre Özen — Kişisel Site",
      description:
        "Yazılım mühendisliği öğrencisi. Projelerim, süreçlerim ve öğrenme yolculuğum hakkında bilgilendirici bir site.",
    },
    work: {
      title: "Projeler",
      description:
        "Lojistik, operasyon ve eğitim alanlarındaki dijital ürünler — süreç, yapı ve bağlam üzerine vaka çalışmaları.",
    },
    about: {
      title: "Hakkımda",
      description:
        "Kim olduğum, neyle ilgilendiğim ve bu sitede neleri belgelediğim hakkında kısa bir özet.",
    },
    journey: {
      title: "Yolculuk",
      description:
        "Eğitim, projeler ve dönüm noktaları — NASA Space Apps Challenge dahil kronolojik kayıt.",
    },
    contact: {
      title: "İletişim",
      description: "E-posta, LinkedIn ve GitHub bağlantıları. Bilgilendirme amaçlı iletişim kanalları.",
    },
  },

  caseStudyUi: {
    label: "Vaka Çalışması",
    problem: "Problem",
    myRole: "Rolüm",
    engineering: "Mühendislik",
    learnings: "Edinimler",
    nextProject: "Sonraki",
    marketplaceBody:
      "İlan edilen yükler, kapasitelerine ve rotalarına uygun yük arayan taşıyıcılara görünür hale gelir.",
    selectionBody:
      "Taşıyıcılar ilan edilen yükler için teklif verir. Bir teklif seçilir ve gönderici–taşıyıcı bağlantısı kurulur.",
    transportBody:
      "Eşleşme sağlandıktan sonra yük, teslimata doğru taşıma koordinasyonundan geçer.",
    beats: [
      { id: "problem", kicker: "Problem", title: "Yapısız\nyük eşleştirme." },
      { id: "load", kicker: "Yük oluşturuldu", title: "Sisteme\nbir yük girer." },
      { id: "marketplace", kicker: "Pazar yeri", title: "Pazar yeri\naçılır." },
      { id: "carriers", kicker: "Taşıyıcılar", title: "Taşıyıcılar\ngirer ve teklif verir." },
      { id: "match", kicker: "Seçim", title: "Bir teklif\nseçilir." },
      { id: "transport", kicker: "Taşıma", title: "Rota\nilerler." },
      { id: "delivery", kicker: "Teslimat", title: "Teslim\nedildi." },
    ],
  },
} as const;
