import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { fmdCaseStudy } from "@/lib/data/case-studies/fmd";

export const fmdCaseStudyTr = {
  ...fmdCaseStudy,
  meta: {
    title: "FMD Eğitim Portalı — Ürün Vaka Çalışması",
    description:
      "Bilgi mimarisi, kullanıcı akışları ve tasarım-geliştirme iş birliğine odaklanan FMD Eğitim Portalı UI/UX vaka çalışması.",
  },
  hero: {
    ...fmdCaseStudy.hero,
    subtitle: "Yönetim Paneli",
    roles: ["UI/UX", "Panel Yapısı", "Kullanıcı Akışları", "Teknik Ekip İş Birliği"],
  },
  overview: {
    ...fmdCaseStudy.overview,
    title: "Genel Bakış",
    content:
      "FMD Eğitim Portalı, eğitim operasyonları için bir yönetim panelidir. Çalışma; bilginin nasıl organize edildiği, kullanıcıların sistemde nasıl gezindiği ve arayüz tasarımının teknik ekibin uygulamasıyla nasıl hizalandığı üzerine odaklandı.",
  },
  problem: {
    ...fmdCaseStudy.problem,
    title: "Problem",
    content:
      "Eğitim operasyonları; kullanıcıları, içeriği ve raporlamayı tek bir arayüzden yönetmeyi gerektirir. Net bilgi mimarisi ve tanımlı kullanıcı akışları olmadan yönetim panelleri gezinmesi zor ve genişletilmesi maliyetli hale gelir.",
  },
  focus: {
    ...fmdCaseStudy.focus,
    title: "Odak Alanları",
    intro: "Vaka çalışması, uygulama sahipliğinden ziyade tasarım ve yapısal kararlara odaklanır.",
    items: [
      {
        id: "ia",
        label: "Bilgi Mimarisi",
        description: "Eğitim yönetimi iş akışları için panel bölümleri, navigasyon hiyerarşisi ve içerik gruplamaları.",
      },
      {
        id: "flows",
        label: "Kullanıcı Akışları",
        description: "Yöneticilerin genel bakıştan spesifik yönetim eylemlerine nasıl ilerlediğinin haritalanması.",
      },
      {
        id: "dashboard",
        label: "Panel Yapısı",
        description: "Operasyonel görünürlük ve modül erişimi için düzen ve bileşen yapısının tanımlanması.",
      },
      {
        id: "collaboration",
        label: "Tasarım–Geliştirme İş Birliği",
        description: "Arayüz kararlarını uygulanabilir planlara dönüştürmek için teknik ekiple çalışma.",
      },
    ],
  },
  role: {
    ...fmdCaseStudy.role,
    title: "Rolüm",
    intro: "UI/UX tasarımı ve panel yapılandırmasıyla katkı sağladım — geliştirmeyi yönetmek yerine teknik ekiple iş birliği yaptım.",
    areas: [
      {
        area: "Tasarım",
        responsibilities: [
          "Panel yapısını ve navigasyon hiyerarşisini tanımladım",
          "Yönetim görevleri için kullanıcı akışlarını tasarladım",
          "Eğitim operasyonları için arayüz sistemleri oluşturdum",
        ],
      },
      {
        area: "İş Birliği",
        responsibilities: [
          "Uygulanabilirlik ve teslim için teknik ekiple çalıştım",
          "Tasarım kararlarını uygulama kısıtlarıyla hizaladım",
        ],
      },
    ],
  },
  process: {
    ...fmdCaseStudy.process,
    title: "Süreç",
    intro: "Çalışma, yönetim ihtiyaçlarını anlamaktan yapılandırılmış arayüz teslimatına ilerledi.",
    steps: [
      { id: "research", label: "Araştırma", description: "Yönetim gereksinimlerini ve mevcut operasyon kalıplarını anladık." },
      { id: "architecture", label: "Mimari", description: "Panel için bilgi mimarisi ve navigasyon yapısını tanımladık." },
      { id: "flows", label: "Akışlar", description: "Yönetim görevleri ve modül erişimi boyunca kullanıcı yolculuklarını haritaladık." },
      { id: "handoff", label: "Teslim", description: "Tasarımdan geliştirmeye geçişte teknik ekiple iş birliği yaptık." },
    ],
  },
  outcome: {
    ...fmdCaseStudy.outcome,
    title: "Sonuç",
    content: "Yönetim paneli yapısı ve arayüz sistemi, 2024 boyunca teknik ekiple birlikte tanımlanıp teslim edildi.",
  },
  learnings: {
    ...fmdCaseStudy.learnings,
    title: "Edinimler",
    intro: "Anlatılan tasarım odaklı çalışmaya dayanan yansımalar.",
    items: [
      {
        id: "l1",
        text: "Yönetim panelleri, arayüz detayından önce verilen bilgi mimarisi kararlarından fayda görür — navigasyon yapısı kullanılabilirliği belirler.",
      },
      {
        id: "l2",
        text: "Erken dönemde teknik ekiple yakın iş birliği, uygulanması zor tasarım kararlarını önledi.",
      },
    ],
  },
  nextProject: {
    ...fmdCaseStudy.nextProject,
    title: "Sonraki Proje",
    description: "Kurumsal web sitesi ve QR menü platformu",
  },
} as CompactCaseStudy;
