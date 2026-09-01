import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { tavukCaseStudy } from "@/lib/data/case-studies/tavuk-da-tavuk";

export const tavukCaseStudyTr = {
  ...tavukCaseStudy,
  meta: {
    title: "Tavuk da Tavuk — Vaka Çalışması",
    description:
      "Duyarlı UI/UX ile kurumsal tanıtım web sitesi ve QR menü platformu Tavuk da Tavuk için tasarım ve geliştirme vaka çalışması.",
  },
  hero: {
    ...tavukCaseStudy.hero,
    subtitle: "Kurumsal Web & QR Menü",
    roles: ["Web Tasarım & Geliştirme", "Duyarlı UI/UX"],
  },
  overview: {
    ...tavukCaseStudy.overview,
    title: "Genel Bakış",
    content:
      "Tavuk da Tavuk, mekân içi yemek için kurumsal tanıtım web sitesi ile QR menü platformunu bir araya getirir. Proje; marka varlığı ve pratik menü erişimi için duyarlı arayüz tasarımı ve geliştirme gerektirdi.",
  },
  problem: {
    ...tavukCaseStudy.problem,
    title: "Problem",
    content:
      "İşletme hem kurumsal bir web varlığına hem de QR kodlarla mekân içinde erişilebilen dijital bir menüye ihtiyaç duyuyordu. Müşteriler telefonlarından taramayı ve gezinmeyi beklerken, marka sitesi masaüstü ve mobil görünümlerde kimliği iletmeliydi.",
  },
  productFlow: {
    ...tavukCaseStudy.productFlow,
    title: "QR'dan Menüye Yolculuk",
    intro: "Mekân içi deneyim, fiziksel temas noktasından dijital menüye doğrudan bir yol izler.",
    steps: [
      { id: "scan", label: "Tara", annotation: "Mekândaki QR kod" },
      { id: "menu", label: "Menü", annotation: "Dijital katalog" },
      { id: "browse", label: "Gezin", annotation: "Mobil arayüz" },
      { id: "select", label: "Seç", annotation: "Ürün seçimi" },
    ],
  },
  role: {
    ...tavukCaseStudy.role,
    title: "Rolüm",
    intro: "Kurumsal site ve QR menü platformunda duyarlı deneyime odaklanarak web tasarımı ve geliştirmesini üstlendim.",
    areas: [
      {
        area: "Tasarım",
        responsibilities: [
          "Web ve mobil görünümler için duyarlı UI/UX tasarladım",
          "Kurumsal web sitesi ve menü arayüzünü yapılandırdım",
        ],
      },
      {
        area: "Geliştirme",
        responsibilities: [
          "Duyarlı web deneyimini inşa edip uyguladım",
          "Gerçek mekân kullanımı için QR menü platformunu geliştirdim",
        ],
      },
    ],
  },
  process: {
    ...tavukCaseStudy.process,
    title: "Süreç",
    intro: "Çalışma marka ve UX tanımından duyarlı uygulamaya ilerledi.",
    steps: [
      { id: "structure", label: "Yapı", description: "Mobil öncelikli erişim için site mimarisi ve QR menü düzenini tanımladık." },
      { id: "design", label: "Tasarım", description: "Kurumsal ve menü deneyimleri için duyarlı arayüz tasarımları oluşturduk." },
      { id: "build", label: "Geliştirme", description: "Cihazlar arası tutarlılığa dikkat ederek her iki platformu geliştirdik." },
      { id: "deploy", label: "Yayın", description: "Kurumsal site ve mekân içi QR menüler için gerçek işletme kullanımına aldık." },
    ],
  },
  outcome: {
    ...tavukCaseStudy.outcome,
    title: "Sonuç",
    content: "Kurumsal web sitesi ve QR menü platformu 2023–2024 boyunca gerçek işletme kullanımı için teslim edildi.",
  },
  learnings: {
    ...tavukCaseStudy.learnings,
    title: "Edinimler",
    intro: "Anlatılan tasarım ve geliştirme çalışmasına dayanan yansımalar.",
    items: [
      {
        id: "l1",
        text: "QR menü deneyimleri mobil öncelikli düşünmeyi gerektirir — birincil etkileşim telefonda gerçekleşir.",
      },
      {
        id: "l2",
        text: "Kurumsal site ile işlevsel menü platformunu birleştirmek, marka sunumu ile pratik kullanılabilirliği dengelemeyi gerektirdi.",
      },
    ],
  },
  nextProject: {
    ...tavukCaseStudy.nextProject,
    title: "Sonraki Proje",
    description: "Lojistik pazar yeri platformu",
  },
} as CompactCaseStudy;
