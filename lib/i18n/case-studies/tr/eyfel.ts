import type { CompactCaseStudy } from "@/lib/data/case-studies/compact-types";
import { eyfelCaseStudy } from "@/lib/data/case-studies/eyfel";

export const eyfelCaseStudyTr = {
  ...eyfelCaseStudy,
  meta: {
    title: "Eyfel Kurye — Ürün Vaka Çalışması",
    description:
      "Online platformlarla entegre restoran ve kurye operasyon sistemi Eyfel Kurye için ürün ve proje vaka çalışması.",
  },
  hero: {
    ...eyfelCaseStudy.hero,
    subtitle: "Restoran & Kurye Operasyonları",
    roles: [
      "Ürün & Proje Yönetimi",
      "Ürün Yapısı",
      "Kullanıcı Deneyimi",
      "Geliştirme Süreci",
      "Ekip Koordinasyonu",
    ],
  },
  overview: {
    ...eyfelCaseStudy.overview,
    title: "Genel Bakış",
    content:
      "Eyfel Kurye, restoran ve kurye ekipleri için online sipariş platformlarıyla entegre bir operasyon sistemidir. Ürün, gelen siparişlerden restoran hazırlığına, kurye sevkından teslimata kadar yolu koordine eder.",
  },
  problem: {
    ...eyfelCaseStudy.problem,
    title: "Problem",
    content:
      "Birden fazla online platformdan sipariş alan restoranlar; gelen talepleri, mutfak iş akışını ve kurye atamasını tek bir yerden yönetmek zorundadır. Yapılandırılmış bir sistem olmadan restoran personeli ile teslimat ekipleri arasındaki koordinasyon parçalanır ve takibi zorlaşır.",
  },
  productFlow: {
    ...eyfelCaseStudy.productFlow,
    title: "Ürün Akışı",
    intro: "Platform, sipariş alımından müşteri teslimatına operasyonel sırayı izler.",
    steps: [
      { id: "order", label: "Sipariş", annotation: "Platform girişi" },
      { id: "restaurant", label: "Restoran", annotation: "Mutfak hazırlığı" },
      { id: "courier", label: "Kurye", annotation: "Sevk" },
      { id: "delivery", label: "Teslimat", annotation: "Teslim" },
    ],
  },
  role: {
    ...eyfelCaseStudy.role,
    title: "Rolüm",
    intro:
      "Çalışmalar ürün yapısı ve proje koordinasyonu etrafında yoğunlaştı — sistemin nasıl işlemesi gerektiğini tanımlamak ve ekibin net sorumluluklarla ilerlemesini sağlamak.",
    areas: [
      {
        area: "Ürün",
        responsibilities: [
          "Ürün yapısını ve operasyonel mantığı tanımladım",
          "Restoran ve kurye akışlarında kullanıcı deneyimini şekillendirdim",
        ],
      },
      {
        area: "Proje",
        responsibilities: [
          "Geliştirme sürecini ve ekip koordinasyonunu yönettim",
          "Ürün kapsamını teslimat takvimleriyle hizaladım",
        ],
      },
    ],
  },
  process: {
    ...eyfelCaseStudy.process,
    title: "Süreç",
    intro: "Proje, ürün tanımı ile geliştirme arasında sürekli koordinasyonla yapılandırılmış aşamalardan geçti.",
    steps: [
      { id: "scope", label: "Kapsam", description: "Restoran ve kurye ihtiyaçlarına göre operasyonel gereksinimleri tanımladık." },
      { id: "structure", label: "Yapı", description: "Sistemin her iki tarafındaki ürün mimarisi ve kullanıcı akışlarını haritaladık." },
      { id: "development", label: "Geliştirme", description: "Ekibi düzenli hizalama noktalarıyla geliştirme aşamalarından geçirdik." },
      { id: "delivery", label: "Teslimat", description: "Operasyonel geri bildirime göre devreye alma ve iterasyonu destekledik." },
    ],
  },
  outcome: {
    ...eyfelCaseStudy.outcome,
    title: "Sonuç",
    content:
      "Proje 2025'te tamamlandı. Operasyon sistemi, online sipariş platformlarıyla entegre restoran ve kurye kullanımı için yapılandırılıp teslim edildi.",
  },
  learnings: {
    ...eyfelCaseStudy.learnings,
    title: "Edinimler",
    intro: "Anlatılan çalışmaya dayanan yansımalar — nicel sonuçlar olarak sunulmamıştır.",
    items: [
      {
        id: "l1",
        text: "Restoran ve kurye olmak üzere iki operasyonel tarafı koordine etmek, geliştirme verimli ilerlemeden önce net ürün yapısı gerektirdi.",
      },
      {
        id: "l2",
        text: "Harici sipariş platformlarıyla entegrasyon, gelen siparişlerin nasıl normalize edilip işleneceği konusunda karmaşıklık ekledi.",
      },
    ],
  },
  nextProject: {
    ...eyfelCaseStudy.nextProject,
    title: "Sonraki Proje",
    description: "Eğitim operasyonları için yönetim paneli",
  },
} as CompactCaseStudy;
