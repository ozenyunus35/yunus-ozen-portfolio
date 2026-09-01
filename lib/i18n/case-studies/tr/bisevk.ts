import { bisevkCaseStudy } from "@/lib/data/case-studies/bisevk";
import { formatProjectPeriod } from "@/lib/data/project-periods";

export const bisevkCaseStudyTr = {
  ...bisevkCaseStudy,
  meta: {
    title: "Bi-Sevk — Ürün Vaka Çalışması",
    description:
      "Türkiye'de yük sahiplerini taşıyıcılarla buluşturan lojistik pazar yeri Bi-Sevk için ürün ve proje vaka çalışması.",
  },
  hero: {
    ...bisevkCaseStudy.hero,
    subtitle: "Lojistik Pazar Yeri",
    roles: [
      "Ürün Yönetimi",
      "Proje Yönetimi",
      "Ekip Koordinasyonu",
      "UI/UX",
      "Geliştirme",
    ],
    period: formatProjectPeriod("bisevk", "tr"),
  },
  overview: {
    ...bisevkCaseStudy.overview,
    title: "Genel Bakış",
    content:
      "Bi-Sevk, yük sahiplerini ve göndericileri taşıyıcılar ve kamyon sürücüleriyle buluşturan bir lojistik pazar yeri platformudur. Ürün; yük ilanı, fırsat keşfi, teklif verme ve teslimata kadar taşımayı koordine etmek için dijital bir iş akışı oluşturur.",
  },
  problem: {
    ...bisevkCaseStudy.problem,
    title: "Problem",
    content:
      "Yük sahipleri yükleri için güvenilir taşımacılığa ihtiyaç duyar. Taşıyıcılar ve kamyon sürücüleri kapasitelerine ve rotalarına uygun yükler arar. Yapılandırılmış dijital iş akışı olmadan arz-talep eşleşmesi parçalı iletişime dayanır. Bi-Sevk her iki tarafı tek platformda buluşturarak bunu çözer.",
  },
  discovery: {
    ...bisevkCaseStudy.discovery,
    title: "Keşif",
    intro:
      "Proje gerçek bir müşteri talebiyle başladı. Geliştirmeden önce odak; ne istendiğini, pazarda neyin var olduğunu ve ilk ürün kapsamının ne olması gerektiğini anlamaktı.",
    items: bisevkCaseStudy.discovery.items.map((item) => ({
      ...item,
      label:
        item.id === "client-requirements"
          ? "Müşteri Gereksinimleri"
          : item.id === "competitor-research"
            ? "Rakip Araştırması"
            : item.id === "market-analysis"
              ? "Pazar Analizi"
              : "İlk Ürün Kapsamı",
      description:
        item.id === "client-requirements"
          ? "İlk proje talebini değerlendirdim ve beklenti ve kısıtları anlamak için müşteriyle doğrudan iletişim sürdürdüm."
          : item.id === "competitor-research"
            ? "Özellikle Türkiye'de faaliyet gösteren rakiplere odaklanarak mevcut lojistik ve pazar yeri platformlarını araştırdım."
            : item.id === "market-analysis"
              ? "Benzer ürünlerin gönderici–taşıyıcı ilişkisini nasıl yapılandırdığını ve yerel pazardaki kalıpları analiz ettim."
              : "Geliştirmeye başlamadan önce ürünün ilk sürümünde neler olması gerektiğini tanımlamaya çalıştım.",
    })),
  },
  productDefinition: {
    ...bisevkCaseStudy.productDefinition,
    title: "Ürün Tanımı",
    intro:
      "İlk kapsam geliştirme başlamadan tanımlandı — müşteri gereksinimleri ve araştırma bulguları ekibin uygulayabileceği yapılandırılmış bir plana dönüştürüldü.",
    flow: [
      { id: "requirements", label: "Gereksinimler", annotation: "Müşteri & araştırma" },
      { id: "prioritization", label: "Önceliklendirme", annotation: "Kapsam kararları" },
      { id: "mvp", label: "MVP", annotation: "İlk sürüm" },
      { id: "dev-plan", label: "Geliştirme Planı", annotation: "Zaman & maliyet" },
    ],
    note: "MVP kapsamı, proje zaman çizelgesi ve maliyet değerlendirmeleri geliştirme başladıktan sonra değil, bu tanım aşamasının parçası olarak ele alındı.",
  },
  userTypes: {
    ...bisevkCaseStudy.userTypes,
    title: "Kullanıcı Tipleri",
    intro:
      "Platform pazar yerinin iki birincil tarafına hizmet eder. Aktör tanımları ürünün temel pazar yeri yapısına dayanır.",
    actors: [
      {
        id: "load-owner",
        label: "Yük Sahibi",
        description: "Yük ilan eden ve taşıyıcıların yüklerini taşımasına ihtiyaç duyan göndericiler.",
      },
      {
        id: "carrier",
        label: "Taşıyıcı",
        description: "Uygun yükleri arayan ve teklif veren kamyon sürücüleri ve taşıyıcı operatörleri.",
      },
    ],
  },
  coreFlow: {
    ...bisevkCaseStudy.coreFlow,
    title: "Temel Ürün Akışı",
    intro: "Platform iş akışı, ilandan teslimata yapılandırılmış bir sırayla yük sahiplerini taşıyıcılarla bağlar.",
    steps: [
      { id: "load-owner", label: "Yük Sahibi", annotation: "Pazar yeri katılımcısı" },
      { id: "load-listing", label: "Yük İlanı", annotation: "İlan edilen yük" },
      { id: "carrier-discovery", label: "Taşıyıcı Keşfi", annotation: "Mevcut yükler" },
      { id: "offer", label: "Teklif", annotation: "Taşıyıcı teklifi" },
      { id: "selection", label: "Seçim", annotation: "Eşleşme onaylandı" },
      { id: "transportation", label: "Taşıma", annotation: "Yolda" },
      { id: "delivery", label: "Teslimat", annotation: "Tamamlandı" },
    ],
  },
  myRole: {
    ...bisevkCaseStudy.myRole,
    title: "Rolüm",
    intro:
      "Sorumluluklar ürün tanımı, proje koordinasyonu, arayüz tasarımı ve uygulamalı geliştirmeyi kapsadı — çoğu zaman izole değil, örtüşerek ilerledi.",
    areas: [
      {
        area: "Ürün",
        responsibilities: [
          "İlk müşteri talebini değerlendirdim",
          "Özellikle Türkiye'deki rakipleri araştırdım",
          "Gereksinimler ve MVP kapsamını tanımlamaya katkı sağladım",
        ],
      },
      {
        area: "Proje",
        responsibilities: [
          "Proje zaman çizelgesi ve maliyetini değerlendirdim",
          "Geliştirme ekibini oluşturdum",
          "Sorumlulukları koordine ettim ve süreçleri yönettim",
        ],
      },
      {
        area: "UX",
        responsibilities: ["Ürün genelinde UI/UX çalışmalarına katıldım"],
      },
      {
        area: "Teknik",
        responsibilities: [
          "Gerektiğinde geliştirmeye katıldım",
          "Ürün kararları ile uygulama arasında köprü kurdum",
        ],
      },
    ],
    intersection:
      "Ürün kapsamı proje planlamasını şekillendirdi. Proje koordinasyonu tasarım ve geliştirmeyi müşteri gereksinimleriyle hizalı tuttu. UX kararları uygulama kısıtları gözetilerek alındı. Teknik katılım tanımlanan kapsamın zaman ve maliyet içinde mümkün olup olmadığını doğrulamaya yardımcı oldu.",
  },
  developmentProcess: {
    ...bisevkCaseStudy.developmentProcess,
    title: "Geliştirme Süreci",
    intro:
      "Çalışma, müşterinin ihtiyaçları ile ekibin inşa ettiği arasında hizalamayı koruyarak yapılandırılmış aşamalardan geçti.",
    steps: [
      { id: "requirement", label: "Gereksinim", description: "Müşteri ihtiyaçları ve tanımlı kapsamı uygulanabilir iş kalemlerine dönüştürme." },
      { id: "design", label: "Tasarım", description: "Ürün yapısı ve kullanıcı akışlarıyla hizalı UI/UX keşfi." },
      { id: "development", label: "Geliştirme", description: "Ekip genelinde sürekli koordinasyonla platform özelliklerini inşa etme." },
      { id: "testing", label: "Test", description: "Yayın öncesi işlevselliği tanımlı gereksinimlere göre doğrulama." },
      { id: "iteration", label: "İterasyon", description: "Geri bildirim ve devam eden proje ihtiyaçlarına göre ürünü iyileştirme." },
    ],
    coordination:
      "Müşteri gereksinimleri süreç boyunca referans noktası kaldı — tasarım ve geliştirme tanımlı MVP kapsamı ve proje zaman çizelgesi içinde kalacak şekilde koordine edildi.",
  },
  productDecisions: {
    ...bisevkCaseStudy.productDecisions,
    title: "Ürün Kararları",
    intro:
      "Doğrulanmış ürün kararları içerik hazır oldukça eklenecektir. Aşağıdaki yapı bireysel karar kayıtları için hazırlanmıştır.",
  },
  challenges: {
    ...bisevkCaseStudy.challenges,
    title: "Zorluklar",
    intro:
      "Doğrulanmış zorluklar burada belgelenecektir. İçerik bekliyor — yer tutucular kasıtlı olarak boş bırakılmıştır.",
  },
  currentStatus: {
    ...bisevkCaseStudy.currentStatus,
    title: "Güncel Durum",
    content: "Proje devam ediyor. Platform geliştikçe geliştirme ve ürün çalışmaları sürüyor.",
  },
  learnings: {
    ...bisevkCaseStudy.learnings,
    title: "Edindiklerim",
    intro: "Anlatılan sorumluluklara dayanan yansımalar — nicel sonuçlar olarak sunulmamıştır.",
    items: [
      {
        id: "learning-01",
        text: "Gerçek bir müşteri talebinden başlamak, ürün hedefleri ile zaman ve maliyet kısıtlarını sürekli dengelemeyi gerektirdi.",
      },
      {
        id: "learning-02",
        text: "Türkiye pazarına odaklanan rakip araştırması, geliştirme taahhütlerinden önce ilk kapsamı çerçevelemeye yardımcı oldu.",
      },
      {
        id: "learning-03",
        text: "Geliştirme ekibini oluşturmak ve koordine etmek, devam eden ürün hizalamasıyla birlikte net sorumluluk ataması gerektirdi.",
      },
      {
        id: "learning-04",
        text: "Hem ürün/UX hem geliştirme çalışmalarına katılmak, kapsam ve uygulanabilirlik kararları için pratik bağlam sağladı.",
      },
    ],
  },
  nextProject: {
    ...bisevkCaseStudy.nextProject,
    title: "Sonraki Proje",
    description: "Restoran ve kurye operasyon platformu",
  },
};
