// =====================================================================
// DATE — SINGURUL loc pe care trebuie să-l editați ca să actualizați pagina.
// =====================================================================

export type Status = "done" | "progress" | "bad" | "current" | "none";

export const petitie = {
  url: "https://www.petitieonline.com/finalizati_lucrrile_la_coala_gimnazial_nr_13_botoani_ca_elevii_s_inceap_noul_an_colar_in_coala_lor",
  semnaturi: 58, // ← actualizați numărul de semnături
  obiectiv: 500, // ← obiectivul propus
  // Semnare pe hârtie (lăsați gol dacă nu e cazul)
  peHartie:
    "Se poate semna și pe hârtie, până luni, în fiecare zi după ora 16:00, la intrarea în Parcul Curcubeului.",
};

// Termenul final promis (an, luna 0-11, zi) — 1 septembrie 2026
export const termenFinal: [number, number, number] = [2026, 8, 1];

// Stadiul pe etaje (de sus în jos). Progresul general = media procentelor.
export const etaje = [
  { nume: "Etajul 3", procent: 99, nota: "Practic finalizat." },
  { nume: "Etajul 2", procent: 99, nota: "Practic finalizat." },
  { nume: "Etajul 1", procent: 90, nota: "Aproape gata, finisaje finale." },
  {
    nume: "Parter",
    procent: 35,
    nota: "Ferestre montate și glet pe pereți, dar pardoseli desfăcute și instalații neterminate (din pozele de pe șantier).",
  },
];

// % general de acum o săptămână (pentru calculul ritmului real)
export const progresSaptamanaTrecuta = 78;

export const ramasDeFacut = [
  "Finisaje interioare la parter (glet, gletuire, vopsire)",
  "Sala de sport — intervenții importante rămase",
  "Montaj final gresie/parchet acolo unde nu e gata",
  "Recepția și curățenia finală / curtea școlii",
];

export const termene: { cand: string; status: Status; text: string }[] = [
  { cand: "16 octombrie 2025", status: "bad", text: "termenul contractual inițial de finalizare" },
  { cand: "„Din toamnă” 2025", status: "bad", text: "promisiunea publică a revenirii elevilor în școală" },
  { cand: "Iunie 2026", status: "bad", text: "al treilea termen anunțat" },
  { cand: "1 septembrie 2026", status: "progress", text: "termenul actual, promis public de administrația locală" },
];

// Jurnal: cele mai noi săptămâni primele.
// progres: "da" | "putin" | "nu"
// media: poze SAU video din /assets/santier/saptamana-NN/
//        (.jpg/.png = poze, .mp4/.webm/.mov = video)
export const saptamani: {
  titlu: string;
  data: string;
  progres: "da" | "putin" | "nu";
  nota?: string;
  analizaAI?: string;
  media: string[];
}[] = [
  {
    titlu: "16 iulie 2026 — parter",
    data: "16 iulie 2026",
    progres: "putin",
    nota: "Poze din timpul vizitei la parter (16 iulie 2026).",
    analizaAI:
      "Analiză din pozele de la parter (16 iulie 2026). <strong>Ce e făcut:</strong> tâmplăria exterioară e montată — ferestre noi, negre, încă cu folia de protecție (se văd inclusiv profile Alumil); pereții sunt tencuiți și gletuiți în mare parte, holul lung arată neted și alb; șapa e turnată pe holuri. <strong>Ce lipsește (mult):</strong> în sălile de clasă pardoseala e încă desfăcută — moloz, șapă nefinalizată, fără gresie/parchet; instalația electrică e neterminată — cabluri care atârnă din pereți și din tavan, doze și tablouri deschise, jgheaburi de cabluri expuse pe tavanul holului, fără corpuri de iluminat; unele coloane și glafuri au încă tencuială brută; cutia de hidrant e veche, nefinisată; nu sunt montate uși și nu sunt făcute tavanele; lipsește zugrăveala finală. <strong>Concluzie:</strong> la parter s-a ajuns la stadiul de glet + tâmplărie, dar mai e muncă serioasă la pardoseli, instalații electrice, tavane, uși și zugrăveală — estimativ ~35% finalizat. Etajele superioare sunt mult mai avansate; parterul rămâne punctul critic pentru termenul de 1 septembrie.",
    // Adaugă aici link-uri Cloudinary (sau căi din /assets/...) după ce urci pozele/video.
    media: [],
  },
];

export const cronologie: { data: string; status: Status; titlu: string; detalii?: string }[] = [
  {
    data: "~2023",
    status: "done",
    titlu: "Începerea reabilitării prin PNRR (~14 mil. lei)",
    detalii:
      "Elevii sunt mutați în spații improvizate — inclusiv în clădirea fundației Hand of Help, în foste dormitoare, magazii și la subsol, cu ore scurtate și fără laboratoare.",
  },
  {
    data: "16 octombrie 2025",
    status: "bad",
    titlu: "Termenul contractual inițial este depășit",
    detalii:
      "Constructorul (firmă din Vaslui) nu finalizează la termen. Primăria invocă întârzieri de 3–4 luni la tranșele de finanțare PNRR.",
  },
  { data: "Iunie 2026", status: "bad", titlu: "Al treilea termen promis trece fără finalizare" },
  {
    data: "16 iulie 2026",
    status: "done",
    titlu: "Protestul părinților în fața Primăriei Botoșani",
    detalii:
      "Zeci de părinți (50–100, potrivit presei) cer un termen ferm și garanții. Primarul Cosmin Andrei fiind în delegație, sunt primiți de viceprimarul Bogdan Buhăianu, care reconfirmă termenul de 1 septembrie și promite vizite săptămânale de monitorizare pe șantier.",
  },
  {
    data: "Iulie 2026",
    status: "done",
    titlu: "Lansarea petiției online",
    detalii: "Comunitatea părinților lansează petiția „Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani”.",
  },
  {
    data: "1 septembrie 2026",
    status: "current",
    titlu: "Termenul promis de finalizare — al patrulea",
    detalii: "Elevii ar trebui să înceapă anul școlar 2026–2027 în școala lor.",
  },
];

export const actualizari = [
  {
    data: "16 iulie 2026",
    text: "Protest în fața Primăriei Botoșani. Viceprimarul Bogdan Buhăianu reconfirmă termenul de 1 septembrie 2026 și promite vizite săptămânale pe șantier.",
  },
];

export const surse = [
  { url: "https://agerpres.ro/educatie-stiinta/2026/07/16/botosani-protest-al-parintilor-elevilor-unei-scoli-fata-de-ritmul-lent-al-lucrarilor-de-reabilitare---1576737", text: "AGERPRES — Protest al părinților față de ritmul lent al lucrărilor (16 iulie 2026)" },
  { url: "https://www.edupedu.ro/parintii-elevilor-de-la-scoala-13-din-botosani-au-protestat-din-cauza-intarzierii-lucrarilor-de-reabilitare/", text: "Edupedu.ro — Părinții elevilor de la Școala 13 au protestat" },
  { url: "https://www.botosaninews.ro/744543/administratie/foto-video-lucrarile-la-scoala-nr-13-din-botosani-sunt-in-toi-vezi-stadiul-acestora/", text: "BotosaniNews.ro — FOTO/VIDEO Lucrările la Școala 13 sunt în toi. Vezi stadiul" },
  { url: "https://www.botosaninews.ro/693246/social/foto-situatie-grava-la-o-importanta-scoala-din-botosani-constructorul-a-anuntat-ca-vrea-sa-rezilieze-contractul-lucrarile-au-fost-oprite/", text: "BotosaniNews.ro — Constructorul (Katar Conneg) a vrut să rezilieze contractul" },
  { url: "https://www.botosaninews.ro/744496/eveniment/foto-video-protest-la-botosani-cu-zeci-de-parinti-nemultumiti-oamenii-si-au-spus-of-ul-in-fata-primariei/", text: "BotosaniNews.ro — Protest cu zeci de părinți nemulțumiți" },
  { url: "https://www.botosaninews.ro/744519/administratie/video-viceprimarul-municipiului-botosani-explicatii-in-fata-protestatarilor-despre-intarzierea-finalizarii-lucrarilor-la-scoala-13-nu-a-depins-de-primaria-botosani/", text: "BotosaniNews.ro — Viceprimarul, explicații în fața protestatarilor" },
  { url: "https://www.botosaneanul.ro/parintii-au-intrat-pe-santierul-scolii-nr-13-viceprimarul-promite-vizite-saptamanale-pentru-monitorizarea-lucrarilor", text: "Botoșăneanul — Părinții au intrat pe șantier; vizite săptămânale promise" },
  { url: "https://vivafm.ro/stire/2025/07/14/modernizare-completa-la-scoala-gimnaziala-nr-13/", text: "VIVA FM — Stadiul lucrărilor (2025)" },
  { url: "https://www.botosaneanul.ro/in-jur-de-100-de-parinti-ai-copiilor-de-la-scoala-13-protesteaza-la-primarie", text: "Botoșăneanul — În jur de 100 de părinți protestează la Primărie" },
  { url: "https://telem.ro/scolile-din-botosani-raman-in-santier/", text: "TeleM Regional — Școlile din Botoșani rămân în șantier" },
  { url: "https://www.botosaninews.ro/693544/administratie/video-primarul-cosmin-andrei-reactioneaza-dupa-aparitia-unui-articol-despre-intarzierile-la-lucrarile-de-la-scoala-13-botosani/", text: "BotosaniNews.ro — Primarul Cosmin Andrei reacționează la întârzieri" },
];
