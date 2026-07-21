// =====================================================================
// DATE — SINGURUL loc pe care trebuie să-l editați ca să actualizați pagina.
// =====================================================================

export type Status = "done" | "progress" | "bad" | "current" | "none";

export const petitie = {
  url: "https://www.petitieonline.com/finalizati_lucrrile_la_coala_gimnazial_nr_13_botoani_ca_elevii_s_inceap_noul_an_colar_in_coala_lor",
  semnaturi: 168, // ← număr de rezervă (folosit dacă citirea automată nu reușește)
  obiectiv: 500, // ← obiectivul propus
  // Semnare pe hârtie (lăsați gol dacă nu e cazul)
  peHartie:
    "Petiția se mai poate semna până mâine. Pe hârtie, între orele 16:00 și 20:00, părinții vă așteaptă la foișorul de lângă locul de joacă din Parcul Curcubeu.",
};

// Termenul promis de finalizare a lucrărilor (an, luna 0-11, zi) — 1 septembrie 2026
export const termenFinal: [number, number, number] = [2026, 8, 1];
// Începutul anului școlar — 8 septembrie 2026 (data reală până la care elevii trebuie să poată intra)
export const anScolarStart: [number, number, number] = [2026, 8, 8];

// Detalii proiect (informații publice, din presă și comunicate)
export const proiect: { eticheta: string; valoare: string }[] = [
  { eticheta: "Obiectiv", valoare: "Reabilitare și modernizare energetică" },
  { eticheta: "Elevi", valoare: "peste 540" },
  { eticheta: "Clase (estimativ)", valoare: "~24" },
  { eticheta: "Beneficiar", valoare: "Primăria Municipiului Botoșani" },
  { eticheta: "Finanțare", valoare: "PNRR — aproximativ 14 milioane lei" },
  { eticheta: "Constructor", valoare: "Katar Conneg SRL (Vaslui)" },
  { eticheta: "Primul termen anunțat", valoare: "16 octombrie 2025" },
  { eticheta: "Termenul anunțat în prezent", valoare: "1 septembrie 2026" },
];

// Câți oameni lucrează acum pe șantier (estimativ). Influențează ritmul și data.
export const muncitori = 3;

// Etapele de finisaj și cât cântărește fiecare din total (%). Suma = 100.
export const etapeLucrare: { cheie: string; nume: string; pondere: number }[] = [
  { cheie: "tamplarie", nume: "Tâmplărie (ferestre)", pondere: 10 },
  { cheie: "glet", nume: "Tencuială + glet pereți", pondere: 20 },
  { cheie: "instalatii", nume: "Instalații electrice/sanitare", pondere: 15 },
  { cheie: "pardoseli", nume: "Șapă + gresie/parchet", pondere: 20 },
  { cheie: "tavane", nume: "Tavane", pondere: 10 },
  { cheie: "zugraveala", nume: "Zugrăveală", pondere: 15 },
  { cheie: "finisaje", nume: "Uși interioare + finisaje", pondere: 10 },
];

export type Etaj = {
  nume: string;
  nota?: string;
  mp?: number; // suprafață estimată (pentru ponderare + afișare)
  etapeGata?: string[]; // etape finalizate (din poze)
  etapePartial?: string[]; // etape în curs (jumătate de credit)
  procent?: number; // fallback dacă nu sunt etape
};

// Stadiul pe etaje (de sus în jos). Procentul se ia din etapele văzute în poze
// (fallback pe `procent`). `mp` sunt estimați și ponderează progresul general.
export const etaje: Etaj[] = [
  { nume: "Etajul 3", mp: 400, procent: 99, nota: "Practic finalizat." },
  { nume: "Etajul 2", mp: 400, procent: 99, nota: "Practic finalizat." },
  { nume: "Etajul 1", mp: 400, procent: 90, nota: "Aproape gata, finisaje finale." },
  {
    nume: "Parter",
    mp: 400,
    etapeGata: ["tamplarie"],
    etapePartial: ["glet", "pardoseli"],
    nota: "Din poze: ferestre montate; gletul e început dar nu terminat (mai e de dat var/finisat), șapă parțial pe holuri; instalații, tavane și zugrăveală neîncepute.",
  },
];

// Procentul unui nivel: din etapele gata (+ jumătate pentru cele în curs); altfel `procent`.
export function procentEtaj(e: Etaj): number {
  if (e.etapeGata || e.etapePartial) {
    const w = (keys?: string[]) =>
      (keys || []).reduce((s, k) => s + (etapeLucrare.find((x) => x.cheie === k)?.pondere || 0), 0);
    return Math.min(100, Math.round(w(e.etapeGata) + 0.5 * w(e.etapePartial)));
  }
  return e.procent ?? 0;
}

// % general de acum o săptămână (pentru calculul ritmului real)
export const progresSaptamanaTrecuta = 78;

export const ramasDeFacut = [
  "Finisaje interioare la parter (glet, gletuire, vopsire)",
  "Sala de sport — intervenții importante rămase",
  "Montaj final gresie/parchet acolo unde nu e gata",
  "Recepția și curățenia finală / curtea școlii",
];

export const termene: { cand: string; status: Status; text: string }[] = [
  { cand: "16 octombrie 2025", status: "bad", text: "primul termen anunțat pentru finalizare" },
  { cand: "„Din toamnă” 2025", status: "bad", text: "termen anunțat public" },
  { cand: "Iunie 2026", status: "bad", text: "termen intermediar anunțat" },
  { cand: "1 septembrie 2026", status: "progress", text: "termenul anunțat în prezent pentru finalizare" },
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
      "Pe durata lucrărilor, elevii învață temporar în alte spații, cu program adaptat.",
  },
  {
    data: "16 octombrie 2025",
    status: "done",
    titlu: "Primul termen anunțat pentru finalizare",
    detalii: "Finanțarea prin PNRR a avut întârzieri la unele tranșe, care au influențat ritmul lucrărilor.",
  },
  { data: "Iunie 2026", status: "done", titlu: "Termen intermediar anunțat" },
  {
    data: "16 iulie 2026",
    status: "done",
    titlu: "Întâlnire cu autoritățile locale",
    detalii:
      "Se reconfirmă termenul de 1 septembrie 2026 și se stabilesc vizite săptămânale de monitorizare pe șantier, la care pot participa și părinții.",
  },
  {
    data: "Iulie 2026",
    status: "done",
    titlu: "Lansarea petiției",
    detalii: "Comunitatea de părinți lansează petiția pentru finalizarea lucrărilor la timp.",
  },
  {
    data: "1 septembrie 2026",
    status: "current",
    titlu: "Termenul anunțat pentru finalizare",
    detalii: "Elevii ar urma să înceapă anul școlar 2026–2027 în școala reabilitată.",
  },
];

export const actualizari = [
  {
    data: "21 iulie 2026",
    text: "Mâine depunem petiția la Primăria Municipiului Botoșani.",
  },
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
