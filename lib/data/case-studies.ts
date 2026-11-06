import type { Locale } from "@/lib/i18n/config";

/**
 * Case-study sections for each project page. Everything here comes from the project's own README and code;
 * the two client projects (Bi-Sevk, Tavuk da Tavuk) only restate what their summaries already say.
 * Gallery images are the screenshots from each repository's docs/ folder.
 */

type Text = { en: string; tr: string };
type List = { en: string[]; tr: string[] };

export type CaseStudy = {
  problem: Text;
  approach: Text;
  features: List;
  quality: List;
  gallery: { src: string; w: number; h: number; caption: Text; phone?: boolean }[];
};

const g = (name: string, caption: Text, w = 1600, h = 1000, phone = false) => ({ src: `/projects/gallery/${name}.jpg`, w, h, caption, phone });

export const CASE_STUDIES: Record<string, CaseStudy> = {
  quarry: {
    problem: {
      en: "Most people who need numbers from a database don't write SQL, and the people who do spend their day answering the same questions. Text-to-SQL tools that guess give confident wrong answers, and a wrong revenue figure is worse than none.",
      tr: "Veritabanından rakam isteyen çoğu kişi SQL yazmaz; yazanlar da gününü aynı soruları cevaplayarak geçirir. Tahmin yürüten metinden SQL araçları kendinden emin yanlış cevaplar verir ve yanlış bir ciro rakamı, hiç olmamasından kötüdür.",
    },
    approach: {
      en: "A rule-based parser over a semantic model instead of a language model: tables, columns, values and business measures in English and Turkish, each measure with its exact SQL. The question is read into a plan (measure, groups, filters, dates, top N), the plan becomes SQL, and the card shows every piece of that reading. When it can't map a question it says so instead of guessing.",
      tr: "Dil modeli yerine bir anlam modeli üzerinde çalışan kural tabanlı ayrıştırıcı: İngilizce ve Türkçe tablolar, sütunlar, değerler ve iş ölçüleri; her ölçünün tam SQL tanımı var. Soru bir plana (ölçü, gruplar, filtreler, tarihler, ilk N) çevrilir, plan SQL'e dönüşür ve kart bu okumanın her parçasını gösterir. Soruyu eşleyemediğinde tahmin etmek yerine bunu söyler.",
    },
    features: {
      en: [
        "Questions in English or Turkish, with Turkish suffixes, typos, 10k / 5 bin style numbers and date phrases like last quarter or son 6 ay.",
        "Follow-up questions such as what about last year? or only Germany keep everything the new words don't change.",
        "Answer cards with a one-sentence answer, computed observations, a chart you can switch, the table, the SQL and an explanation.",
        "A SQL editor with tabs, completion that knows aliases, a formatter, the query plan and checks for = NULL, double counting and missing GROUP BY columns.",
        "A finance dashboard of pinned answers, a data dictionary with every measure's SQL, and words you can teach it.",
        "Your own CSV, TSV, Excel, JSON or SQLite files, with types, roles and relations inferred; PDFs and images are refused with a reason.",
      ],
      tr: [
        "Türkçe ekler, yazım hataları, 10k / 5 bin gibi sayılar ve geçen çeyrek ya da last 6 months gibi tarih ifadeleriyle Türkçe veya İngilizce sorular.",
        "Peki geçen yıl? ya da sadece Almanya gibi takip soruları, yeni kelimelerin değiştirmediği her şeyi korur.",
        "Tek cümlelik cevap, hesaplanmış gözlemler, türü değiştirilebilen grafik, tablo, SQL ve açıklama içeren cevap kartları.",
        "Sekmeler, takma adları bilen otomatik tamamlama, biçimlendirici, sorgu planı ve = NULL, çift sayma, eksik GROUP BY sütunu kontrolleri olan SQL editörü.",
        "Sabitlenen cevaplardan oluşan finans panosu, her ölçünün SQL'ini gösteren veri sözlüğü ve ona öğretebileceğiniz kelimeler.",
        "Kendi CSV, TSV, Excel, JSON ya da SQLite dosyalarınız; türler, roller ve ilişkiler çıkarılır, PDF ve görseller gerekçesiyle reddedilir.",
      ],
    },
    quality: {
      en: [
        "Every answer is checked by running the engine's SQL and a hand-written reference query and comparing the results.",
        "82% right on the first run of 56 questions written after tuning and never seen; 98 to 99% on random questions from unseen seeds. The full log is in the repository.",
        "Unit tests for the parser, dates, imports and the SQL explainer; Playwright on desktop Chrome, desktop Safari, iPhone and Android.",
      ],
      tr: [
        "Her cevap, motorun SQL'i ile elle yazılmış bir referans sorgu çalıştırılıp sonuçlar karşılaştırılarak kontrol edilir.",
        "Ayardan sonra yazılmış, hiç görülmemiş 56 sorunun ilk çalıştırmasında %82 doğru; görülmemiş tohumlardan rastgele sorularda %98-99. Tam kayıt depoda.",
        "Ayrıştırıcı, tarihler, dosya yükleme ve SQL açıklayıcı için birim testleri; masaüstü Chrome, masaüstü Safari, iPhone ve Android'de Playwright.",
      ],
    },
    gallery: [
      g("quarry-ask", { en: "An answer card: how the question was read, the answer, an observation and the chart", tr: "Bir cevap kartı: sorunun nasıl anlaşıldığı, cevap, bir gözlem ve grafik" }),
      g("quarry-dash", { en: "Finance dashboard: revenue against last year, receivables and pinned charts", tr: "Finans panosu: geçen yıla göre ciro, alacaklar ve sabitlenmiş grafikler" }),
      g("quarry-sql", { en: "SQL editor running a receivables aging query from the worked examples", tr: "Örnek sorgulardan alacak yaşlandırmasını çalıştıran SQL editörü" }),
    ],
  },

  tally: {
    problem: {
      en: "Bookkeeping starts with a pile of PDFs and phone photos. Typing invoices and statements in by hand is slow, and the mistakes (a wrong total, a VAT rate that does not match, an invoice paid twice) are found late.",
      tr: "Muhasebe bir yığın PDF ve telefon fotoğrafıyla başlar. Fatura ve ekstreleri elle girmek yavaştır; yanlış toplam, tutmayan KDV oranı ya da iki kez ödenmiş fatura gibi hatalar geç fark edilir.",
    },
    approach: {
      en: "A reading pipeline in plain TypeScript, with no machine-learning service and nothing uploaded. Words are regrouped into visual rows after the page tilt is measured, each document is classified before any field is read, and every value keeps the row it came from so a reviewer can see where it was read.",
      tr: "Makine öğrenmesi servisi olmadan, düz TypeScript ile yazılmış bir okuma hattı; hiçbir dosya yüklenmez. Sayfanın eğimi ölçüldükten sonra kelimeler görsel satırlara yeniden gruplanır, alan okunmadan önce belgenin türü belirlenir ve her değer okunduğu satırı saklar; böylece kontrol eden kişi değerin nereden okunduğunu görür.",
    },
    features: {
      en: [
        "Reads phone photos, scans, PDFs, Word, Excel, CSV and e-mails; text PDFs use their own text layer, the rest goes through OCR in a Web Worker.",
        "Invoices and receipts in English, German and Turkish, with both 1,234.56 and 1.234,56 number styles.",
        "Bank statements: every transaction, wrapped descriptions joined, signs worked out from the running balance.",
        "Checks a bookkeeper would do: line items, subtotal + VAT = total, VAT against its rate, every balance against the one before.",
        "Matches invoices to the bank lines that paid them, flags overdue invoices and possible duplicates.",
        "Exports one Excel workbook with Invoices, Line items and Transactions sheets, plus CSV and JSON.",
        "English and Turkish interface down to the checks, error messages and Excel headers, a ⌘K palette to reach any document or action, and a link to each document.",
      ],
      tr: [
        "Telefon fotoğrafı, tarama, PDF, Word, Excel, CSV ve e-posta okur; metin içeren PDF'ler kendi metin katmanından, diğerleri Web Worker içinde OCR ile okunur.",
        "İngilizce, Almanca ve Türkçe fatura ve fişler; hem 1,234.56 hem 1.234,56 sayı biçimi.",
        "Banka ekstreleri: her hareket, birden fazla satıra bölünmüş açıklamalar birleştirilir, işaretler yürüyen bakiyeden çıkarılır.",
        "Bir muhasebecinin yapacağı kontroller: kalemler, ara toplam + KDV = toplam, KDV ile oranı, her bakiye bir öncekiyle.",
        "Faturaları onları ödeyen banka hareketiyle eşleştirir, geciken faturaları ve olası mükerrerleri işaretler.",
        "Faturalar, Kalemler ve Hareketler sayfalarıyla tek bir Excel dosyası; ayrıca CSV ve JSON.",
        "Kontroller, hata mesajları ve Excel başlıkları dahil İngilizce ve Türkçe arayüz; her belgeye ve işleme ulaşan ⌘K paleti ve her belge için bir link.",
      ],
    },
    quality: {
      en: [
        "Measured on a generated corpus of 125 documents, each read as a text PDF, a page image and a phone photo; the full report, failures included, is in the repository.",
        "Invoices with every field right: 100% from text PDFs, 93% from phone photos.",
        "Unit tests for parsing, dates, VAT and statements; Playwright on desktop Chrome, desktop Safari, iPhone and Android.",
      ],
      tr: [
        "Üretilmiş 125 belgelik bir derlemle ölçüldü; her belge metin PDF'i, sayfa görüntüsü ve telefon fotoğrafı olarak okunur. Başarısız olanlar dahil tam rapor depoda.",
        "Tüm alanları doğru okunan faturalar: metin PDF'lerinde %100, telefon fotoğraflarında %93.",
        "Ayrıştırma, tarih, KDV ve ekstre için birim testleri; masaüstü Chrome, masaüstü Safari, iPhone ve Android'de Playwright.",
      ],
    },
    gallery: [
      g("tally-statement", { en: "Bank statement with balance chart, transactions and reconciliation checks", tr: "Bakiye grafiği, hareketler ve mutabakat kontrolleriyle banka ekstresi" }),
      g("tally-overview", { en: "Overview: payment status, spend by vendor, VAT summary and cash flow", tr: "Genel bakış: ödeme durumu, tedarikçiye göre harcama, KDV özeti ve nakit akışı" }),
      g("tally-check", { en: "A failed check: line items that do not add up to the printed subtotal", tr: "Başarısız bir kontrol: basılı ara toplamı tutmayan kalemler" }),
      g("tally-turkish", { en: "The bank statement with the interface in Turkish", tr: "Arayüzü Türkçe olan banka ekstresi" }),
    ],
  },

  relay: {
    problem: {
      en: "A store's support team answers the same questions every day, and a chatbot that guesses does more harm than none. The answer has to come from the help center, show its source, and stop when it is not sure.",
      tr: "Bir mağazanın destek ekibi her gün aynı soruları cevaplar; tahmin yürüten bir sohbet botu hiç olmamasından daha zararlıdır. Cevap yardım merkezinden gelmeli, kaynağını göstermeli ve emin olmadığında durmalıdır.",
    },
    approach: {
      en: "BM25 retrieval over help-center sections, with typo fixes, synonyms and the customer's intent weighed in. Confidence comes from how much of the question the best article covers and how clearly it wins; below the threshold the chat goes to a person with a clear message.",
      tr: "Yardım merkezi bölümleri üzerinde BM25 arama; yazım hataları, eş anlamlılar ve müşterinin niyeti hesaba katılır. Güven, en iyi makalenin sorunun ne kadarını karşıladığından ve ne kadar net öne çıktığından hesaplanır; eşiğin altında sohbet anlaşılır bir mesajla bir kişiye devredilir.",
    },
    features: {
      en: [
        "Chat widget with linked sources that open the article at the cited section.",
        "Hand-off to a person below the confidence threshold, or whenever the customer asks.",
        "Order lookup with a status card: packed, shipped, out for delivery, delivered.",
        "Admin inbox with filters, transcripts showing the confidence and sources of every AI answer, and replies that appear in the widget at once.",
        "Knowledge gaps: unanswered questions grouped and counted, with a button that opens the article editor.",
        "Answer playground that shows every step from normalisation to ranking and the final reply.",
        "English and Turkish console, rules and charts included, a ⌘K palette across pages, articles and conversations, and links to a single conversation or article. Northfold's help center and replies stay in English.",
      ],
      tr: [
        "Kaynakları bağlantılı sohbet penceresi; kaynağa tıklayınca makale ilgili bölümde açılır.",
        "Güven eşiğinin altında ya da müşteri istediğinde bir kişiye devir.",
        "Sipariş sorgulama ve durum kartı: hazırlanıyor, kargoda, dağıtımda, teslim edildi.",
        "Filtreli yönetim gelen kutusu; her yapay zekâ cevabının güveni ve kaynakları görünür, ekibin cevabı pencereye anında düşer.",
        "Bilgi açıkları: cevaplanamayan sorular gruplanıp sayılır, bir düğme makale düzenleyiciyi açar.",
        "Normalleştirmeden sıralamaya ve son cevaba kadar her adımı gösteren cevap test alanı.",
        "Kurallar ve grafikler dahil İngilizce ve Türkçe yönetim paneli; sayfalar, makaleler ve konuşmalar arasında ⌘K paleti; tek bir konuşmaya ya da makaleye link. Northfold'un yardım merkezi ve cevaplar İngilizce kalır.",
      ],
    },
    quality: {
      en: [
        "No server and no API key: answers are produced in the browser from the help-center articles.",
        "Unit tests with Vitest; end-to-end tests against the static build on desktop Chrome, desktop Safari, iPhone and Android.",
      ],
      tr: [
        "Sunucu ve API anahtarı yok: cevaplar tarayıcıda, yardım merkezi makalelerinden üretilir.",
        "Vitest ile birim testleri; statik derleme üzerinde masaüstü Chrome, masaüstü Safari, iPhone ve Android'de uçtan uca testler.",
      ],
    },
    gallery: [
      g("relay-widget", { en: "Chat widget on the help center, with cited sources", tr: "Yardım merkezinde, kaynak gösteren sohbet penceresi" }),
      g("relay-inbox", { en: "Admin inbox with the hand-off queue and transcripts", tr: "Devir kuyruğu ve konuşma kayıtlarıyla yönetim gelen kutusu" }),
      g("relay-playground", { en: "Answer playground: every step from the question to the reply", tr: "Cevap test alanı: sorudan cevaba her adım" }),
      g("relay-turkish", { en: "Answer playground with the console in Turkish", tr: "Panel Türkçeyken cevap test alanı" }),
    ],
  },

  cadence: {
    problem: {
      en: "Salons lose bookings to phone tag and double bookings. Clients need to see only times that are really free, and the team needs one calendar that stays right when plans change.",
      tr: "Kuaförler telefon trafiği ve çakışan randevular yüzünden müşteri kaybeder. Müşteri yalnızca gerçekten boş saatleri görmeli, ekip de planlar değiştiğinde doğru kalan tek bir takvimle çalışmalıdır.",
    },
    approach: {
      en: "One availability engine decides what is bookable: each person's hours, breaks, time off, clean-up buffers, existing bookings and the salon's notice rules. Times are minutes in the salon's own time zone, so the result never depends on the visitor's clock.",
      tr: "Neyin rezerve edilebileceğine tek bir müsaitlik motoru karar verir: kişinin çalışma saatleri, molaları, izinleri, temizlik payları, mevcut randevular ve salonun bildirim kuralları. Saatler salonun kendi saat diliminde dakika olarak tutulur; sonuç ziyaretçinin saatine bağlı değildir.",
    },
    features: {
      en: [
        "Booking page with services, a professional picker (or 'any professional') and free times grouped by part of day.",
        "Confirmation with a reference and an .ics calendar file; reschedule or cancel online until the window closes.",
        "Notices when someone else takes the chosen time in another tab.",
        "Staff calendar with a column per person; drag to move, with a preview that says why a slot does not work.",
        "Dashboard with revenue, no-show rate and team load; editors for services, hours, time off and booking rules.",
        "English and Turkish salon console with 24-hour times, and a ⌘K palette to open any client, service or team member. The public booking pages stay in English for the Brooklyn salon.",
      ],
      tr: [
        "Hizmetler, uzman seçimi (ya da 'herhangi bir uzman') ve günün bölümlerine göre gruplanmış boş saatlerle rezervasyon sayfası.",
        "Referans numarası ve .ics takvim dosyasıyla onay; süre dolana kadar online değiştirme ya da iptal.",
        "Seçilen saat başka bir sekmede alınırsa bunu fark edip başka saat seçtirir.",
        "Her kişi için bir sütunlu ekip takvimi; sürükleyerek taşıma, uymayan saat için nedenini söyleyen önizleme.",
        "Gelir, gelmeme oranı ve ekip yükünü gösteren pano; hizmet, saat, izin ve rezervasyon kuralları düzenleyicileri.",
        "24 saat biçimiyle İngilizce ve Türkçe salon paneli; herhangi bir müşteriyi, hizmeti ya da ekip üyesini açan ⌘K paleti. Brooklyn'deki salonun herkese açık rezervasyon sayfaları İngilizce kalır.",
      ],
    },
    quality: {
      en: ["Availability rules live in one module with unit tests (Vitest); browser tests with Playwright."],
      tr: ["Müsaitlik kuralları birim testli (Vitest) tek bir modülde; Playwright ile tarayıcı testleri."],
    },
    gallery: [
      g("cadence-booking", { en: "Booking page: service, professional and free times", tr: "Rezervasyon sayfası: hizmet, uzman ve boş saatler" }),
      g("cadence-calendar", { en: "Staff calendar with a column per person", tr: "Kişi başına sütunlu ekip takvimi" }),
      g("cadence-dashboard", { en: "Dashboard: revenue, appointments, no-shows and team load", tr: "Pano: gelir, randevular, gelmeyenler ve ekip yükü" }),
      g("cadence-turkish", { en: "Dashboard with the console in Turkish", tr: "Panel Türkçeyken pano" }),
    ],
  },

  fieldline: {
    problem: {
      en: "A service technician's day happens in basements and on roads with no signal: the route, the checklist, the parts, the signature and the invoice still have to be right when the phone reconnects.",
      tr: "Bir servis teknisyeninin günü çekmeyen bodrumlarda ve yollarda geçer: rota, kontrol listesi, parçalar, imza ve fatura telefon yeniden bağlandığında yine doğru olmalıdır.",
    },
    approach: {
      en: "Every change is saved on the device first and joins a queue while offline; the queue syncs when the connection is back, and the sync status is shown on every screen. All business rules live in one state class.",
      tr: "Her değişiklik önce cihaza kaydedilir ve çevrimdışıyken bir kuyruğa girer; bağlantı gelince kuyruk senkronize olur ve durum her ekranda görünür. Tüm iş kuralları tek bir durum sınıfında.",
    },
    features: {
      en: [
        "Today: progress for the day, the next job with one primary action, and the route as a timeline.",
        "Job flow from scheduled to completed; required checks and the signature are enforced before sign-off.",
        "Parts from the van's stock with low-stock badges and restock requests.",
        "Invoice with call-out fee, labour in 15-minute steps and tax on parts; signature drawn on a custom painter.",
        "Labels on every control, so screen readers and the browser tests can use the app.",
        "English and Turkish on every screen, toast and sync message, with 24-hour times; switch in Profile or open a link with ?lang=tr.",
      ],
      tr: [
        "Bugün: günün ilerlemesi, tek ana eylemli sıradaki iş ve zaman çizelgesi olarak rota.",
        "Planlanandan tamamlanana iş akışı; zorunlu kontroller ve imza tamamlanmadan iş kapanmaz.",
        "Araçtaki stoktan parça; azalan stok rozetleri ve yenileme talebi.",
        "Çıkış ücreti, 15 dakikalık adımlarla işçilik ve parçalara vergiyle fatura; imza özel bir çizim alanında atılır.",
        "Her kontrolde etiket var; ekran okuyucular ve tarayıcı testleri uygulamayı kullanabilir.",
        "Her ekran, bildirim ve senkron mesajında İngilizce ve Türkçe, 24 saat biçimiyle; Profil'den ya da ?lang=tr linkiyle değiştirilir.",
      ],
    },
    quality: {
      en: ["Unit and widget tests with flutter test; Playwright tests run against the web build."],
      tr: ["flutter test ile birim ve widget testleri; web derlemesi üzerinde Playwright testleri."],
    },
    gallery: [
      g("fieldline-today", { en: "Today: the next job and the route", tr: "Bugün: sıradaki iş ve rota" }, 536, 900, true),
      g("fieldline-job", { en: "Job detail in the dark theme", tr: "Koyu temada iş detayı" }, 536, 900, true),
      g("fieldline-complete", { en: "Sign-off: invoice and signature", tr: "Kapanış: fatura ve imza" }, 536, 900, true),
      g("fieldline-turkish", { en: "Today in Turkish", tr: "Türkçe Bugün ekranı" }, 536, 900, true),
    ],
  },

  "atlas-portal": {
    problem: {
      en: "Agencies exchange files with clients over e-mail attachments and shared drives, and nobody knows who saw what. An internal tool needs roles, a private space per client and a record of every action.",
      tr: "Ajanslar müşterileriyle dosyaları e-posta ekleri ve paylaşılan klasörlerle değiştirir; kimin neyi gördüğünü kimse bilmez. İç araçta roller, her müşteriye özel bir alan ve her işlemin kaydı gerekir.",
    },
    approach: {
      en: "Two roles on one mock backend in the browser: records in localStorage, files in IndexedDB. Uploads are checked before they start, previews go by a file's content rather than its name, and every share, download and edit lands in the activity log.",
      tr: "Tarayıcıda tek bir sahte arka uç üzerinde iki rol: kayıtlar localStorage'da, dosyalar IndexedDB'de. Yüklemeler başlamadan kontrol edilir, önizleme dosyanın adına değil içeriğine göre yapılır; her paylaşım, indirme ve düzenleme etkinlik kaydına düşer.",
    },
    features: {
      en: [
        "Dashboard with sparklines, uploads and sign-ins over 7, 14 or 30 days, projects due soon and storage per client.",
        "Users table with search, filters, sorting, pagination and CSV export.",
        "Client file portal: folders, drag-and-drop upload with progress, 25 MB limit and storage quota.",
        "Previews for images, PDFs (with PDF.js, also on phones), CSV and text; uploaded SVG and HTML cannot run script.",
        "Share links with 1, 7 or 30-day expiry, a download counter and revoke.",
        "Command palette (⌘K) across pages, clients, projects, people and files.",
        "English and Turkish on every screen, sign-in, shared-file page and toasts included; the ⌘K palette also switches language.",
      ],
      tr: [
        "Mini grafikler, 7/14/30 günlük yükleme ve girişler, yaklaşan projeler ve müşteri başına depolamayla pano.",
        "Arama, filtre, sıralama, sayfalama ve CSV dışa aktarımlı kullanıcı tablosu.",
        "Müşteri dosya portalı: klasörler, ilerlemeli sürükle-bırak yükleme, 25 MB sınırı ve depolama kotası.",
        "Görsel, PDF (PDF.js ile, telefonda da), CSV ve metin önizleme; yüklenen SVG ve HTML betik çalıştıramaz.",
        "1, 7 ya da 30 gün geçerli, indirme sayaçlı ve geri alınabilir paylaşım bağlantıları.",
        "Sayfalar, müşteriler, projeler, kişiler ve dosyalar arasında komut paleti (⌘K).",
        "Giriş, paylaşılan dosya sayfası ve bildirimler dahil her ekranda İngilizce ve Türkçe; ⌘K paleti dili de değiştirir.",
      ],
    },
    quality: {
      en: ["Unit tests with Vitest and end-to-end tests with Playwright, including hardening cases for uploads and previews."],
      tr: ["Vitest ile birim testleri ve yükleme ile önizleme için sağlamlık senaryoları dahil Playwright ile uçtan uca testler."],
    },
    gallery: [
      g("atlas-dashboard", { en: "Admin dashboard", tr: "Yönetici panosu" }, 1440, 900),
      g("atlas-files", { en: "Client file portal", tr: "Müşteri dosya portalı" }, 1440, 900),
      g("atlas-preview", { en: "File preview", tr: "Dosya önizleme" }, 1440, 900),
      g("atlas-turkish", { en: "Admin dashboard in Turkish", tr: "Türkçe yönetici panosu" }, 1440, 900),
    ],
  },

  "pdf-to-excel": {
    problem: {
      en: "Reports arrive as PDFs, and the numbers inside are needed in Excel. Copy and paste breaks the columns, repeats the header on every page and turns amounts into text.",
      tr: "Raporlar PDF olarak gelir, içindeki rakamlar ise Excel'de gerekir. Kopyala-yapıştır sütunları bozar, her sayfadaki başlığı tekrarlar ve tutarları metne çevirir.",
    },
    approach: {
      en: "PDFs store positioned text, not tables. Columns are found from gutters, the vertical strips no row writes into; lines that cross them (titles, notes, footers) are set aside, and the header is the first non-numeric line.",
      tr: "PDF'ler tablo değil, konumlu metin saklar. Sütunlar, hiçbir satırın yazmadığı dikey boşluklardan bulunur; bunları kesen satırlar (başlıklar, notlar, alt bilgiler) ayrılır ve başlık, sayısal olmayan ilk satırdır.",
    },
    features: {
      en: [
        "One sheet per group (branch, store or region) and a summary sheet with counts and totals.",
        "Numbers in any notation become real numbers; dates become real Excel dates; IDs with leading zeros stay text.",
        "Totals inside the table are set aside and the rows are checked against the printed grand total.",
        "Detection view: the page with header, rows, skipped lines and column bounds drawn on top.",
        "CSV that is safe to open: no formula injection, ';' separators on decimal-comma locales.",
        "English and Turkish interface, Excel sheet names and headers included, and a ⌘K palette to load a sample, split by a column or export.",
      ],
      tr: [
        "Her grup (şube, mağaza ya da bölge) için bir sayfa ve sayılar ile toplamları içeren bir özet sayfası.",
        "Her yazımdaki sayılar gerçek sayıya, tarihler gerçek Excel tarihine dönüşür; baştaki sıfırlı kimlikler metin kalır.",
        "Tablo içindeki toplamlar ayrılır ve satırlar basılı genel toplamla karşılaştırılır.",
        "Tespit görünümü: başlık, satırlar, atlanan satırlar ve sütun sınırları sayfanın üzerine çizilir.",
        "Güvenle açılan CSV: formül enjeksiyonu yok, ondalık virgüllü dillerde ';' ayırıcı.",
        "Excel sayfa adları ve başlıkları dahil İngilizce ve Türkçe arayüz; örnek yüklemek, bir sütuna göre bölmek ya da dışa aktarmak için ⌘K paleti.",
      ],
    },
    quality: {
      en: ["Files are processed locally with PDF.js; nothing is uploaded."],
      tr: ["Dosyalar PDF.js ile yerelde işlenir; hiçbir şey yüklenmez."],
    },
    gallery: [
      g("pdf-home", { en: "Drop one or more PDFs", tr: "Bir ya da birden fazla PDF bırakın" }, 1440, 900),
      g("pdf-result", { en: "Detection view and the table preview", tr: "Tespit görünümü ve tablo önizlemesi" }, 1440, 900),
      g("pdf-turkish", { en: "A membership register extracted, interface in Turkish", tr: "Arayüz Türkçeyken çıkarılmış üyelik kaydı" }, 1440, 900),
    ],
  },

  "lead-scraper": {
    problem: {
      en: "Sales lists built by hand from directories are slow to make and go stale: phone numbers in five formats, the same business twice, no way to tell a good contact from a dead one.",
      tr: "Rehberlerden elle çıkarılan satış listeleri yavaş hazırlanır ve çabuk eskir: beş farklı biçimde telefon numarası, aynı işletme iki kez, iyi bir iletişim bilgisini ölüsünden ayırmanın yolu yok.",
    },
    approach: {
      en: "A polite crawler (robots.txt, delays, retries with back-off, never the same page twice) feeds a cleaning stage that normalises phones to E.164, merges duplicates and scores each lead. A GitHub Actions job runs it every morning and publishes the results.",
      tr: "Kurallara uyan bir tarayıcı (robots.txt, beklemeler, artan aralıklarla tekrar deneme, aynı sayfaya iki kez gitmeme) temizleme aşamasını besler: telefonlar E.164 biçimine çevrilir, mükerrerler birleştirilir ve her potansiyel müşteriye puan verilir. Bir GitHub Actions işi her sabah çalışıp sonuçları yayınlar.",
    },
    features: {
      en: [
        "Crawls category pages, pagination and every business page; skips broken pages instead of crashing.",
        "Finds e-mails and social profiles on each business's own website and checks every e-mail without sending anything.",
        "Scores each lead 0 to 100 and tracks what is new or changed since the previous run.",
        "Exports CSV, a formatted Excel workbook, JSON and a CRM import file.",
        "Results page in English and Turkish, a ⌘K palette to jump to any business or filter, and links that keep the filters.",
      ],
      tr: [
        "Kategori sayfalarını, sayfalamayı ve her işletme sayfasını tarar; bozuk sayfada çökmek yerine atlar.",
        "Her işletmenin kendi sitesinde e-posta ve sosyal profilleri bulur, hiçbir şey göndermeden her e-postayı kontrol eder.",
        "Her potansiyel müşteriye 0-100 arası puan verir ve önceki çalıştırmadan bu yana yeni ya da değişeni izler.",
        "CSV, biçimli Excel, JSON ve CRM içe aktarma dosyası üretir.",
        "İngilizce ve Türkçe sonuç sayfası; herhangi bir işletmeye ya da filtreye atlayan ⌘K paleti ve filtreleri koruyan linkler.",
      ],
    },
    quality: {
      en: ["Each site is one small module; crawling, politeness, cleaning and exports are shared and covered by a Python test suite."],
      tr: ["Her site küçük bir modül; tarama, kurallar, temizleme ve dışa aktarma ortak ve bir Python test paketiyle sınanıyor."],
    },
    gallery: [
      g("lead-directory", { en: "The demo business directory it crawls", tr: "Taranan örnek işletme rehberi" }, 1440, 900),
      g("lead-results", { en: "Published results with run statistics", tr: "Çalıştırma istatistikleriyle yayınlanan sonuçlar" }, 1440, 900),
      g("lead-turkish", { en: "Results page in Turkish", tr: "Türkçe sonuç sayfası" }, 1440, 900),
    ],
  },
};

export function caseStudy(slug: string, locale: Locale) {
  const c = CASE_STUDIES[slug];
  if (!c) return null;
  return {
    problem: c.problem[locale],
    approach: c.approach[locale],
    features: c.features[locale],
    quality: c.quality[locale],
    gallery: c.gallery.map((img) => ({ ...img, caption: img.caption[locale] })),
  };
}
