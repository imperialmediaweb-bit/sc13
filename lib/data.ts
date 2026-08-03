// =====================================================================
// DATE — SINGURUL loc pe care trebuie să-l editați ca să actualizați pagina.
// =====================================================================

export type Status = "done" | "progress" | "bad" | "current" | "none";

export const petitie = {
  url: "https://www.petitieonline.com/finalizati_lucrrile_la_coala_gimnazial_nr_13_botoani_ca_elevii_s_inceap_noul_an_colar_in_coala_lor",
  semnaturi: 243, // ← număr de rezervă (folosit dacă citirea automată nu reușește)
  obiectiv: 500, // ← obiectivul propus
  // Semnare pe hârtie (lăsați gol dacă nu e cazul)
  peHartie: "",
};

// Petiția depusă oficial la Primărie (lăsați null dacă nu e cazul)
export const petitieDepusa = {
  data: "22 iulie 2026",
  institutie: "Primăria Municipiului Botoșani și Consiliul Local Botoșani",
  numere: ["19849", "19850"], // numere de înregistrare (petiția + adresa)
};

// Termenul promis de finalizare a lucrărilor (an, luna 0-11, zi) — 1 septembrie 2026
export const termenFinal: [number, number, number] = [2026, 8, 1];
// Începutul anului școlar — 7 septembrie 2026 (data reală până la care elevii trebuie să poată intra)
export const anScolarStart: [number, number, number] = [2026, 8, 7];

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

// Media zilnică REALĂ de muncitori, estimată prin calcul invers din poze:
// câtă muncă se vede făcută între 16 și 27 iulie ÷ zile lucrătoare (vezi calculMuncitori).
// În zilele obișnuite lucrează 3–4; media pe perioadă (cu ziua vizitei inclusă) iese 5–7.
export const muncitori = 5;

// Câți muncitori erau la vizita oficială (când vin oficialii, șantierul se umple).
// Diferența față de zilele obișnuite e afișată pe pagină ca semnal de alarmă.
export const muncitoriVizita = { numar: 19, data: "27 iulie 2026" };

// Anunț oficial care schimbă totul (lăsați null dacă nu e cazul).
// Când există, verdictul și șansele se raportează la el, nu la calculul din ritm.
export const anuntOficial = {
  data: "3 august 2026",
  sursa: "audiență la primar, relatată de părinții prezenți",
  termen: "cel târziu în octombrie 2026",
  text: "Primarul a comunicat părinților că elevii vor intra în școală „cel târziu în octombrie”. Termenul de 1 septembrie și garanția de 8 septembrie, date pe 27 iulie, sunt astfel abandonate. Anul școlar începe pe 7 septembrie — elevii Școlii 13 îl vor începe din nou în spații temporare, al patrulea an consecutiv.",
};

// Accesul părinților pe șantier (monitorizarea independentă).
export const accesParinti = {
  permis: false,
  dinData: "3 august 2026",
  text: "Din 3 august 2026, părinților nu li se mai permite accesul în școală și nu mai pot face fotografii. Pe 16 iulie, după protest, fuseseră promise public vizite săptămânale de monitorizare, la care să participe și părinții. Fără acces, verificarea independentă a stadiului lucrărilor — baza acestei pagini — nu mai este posibilă.",
};

// Calcul invers: din diferența dintre pozele din 16 iulie și cele din 27 iulie
// deducem câtă muncă s-a depus efectiv — și deci câți oameni au lucrat în medie.
export const calculMuncitori = {
  perioada: "16 – 27 iulie 2026 (≈10 zile lucrătoare)",
  lucrari: [
    { ce: "Finalizarea gletului la parter (pereții apar albi, finisați, în pozele din 27 iulie)", omZile: "~12–15" },
    { ce: "Calorifere montate la etajele 2–3 (~40 de bucăți, cu racorduri)", omZile: "~20–25" },
    { ce: "Parchet montat în sălile de la etaje (~300 mp vizibili în poze)", omZile: "~8–12" },
    { ce: "Trasee electrice parțiale la parter (doze, tuburi în pereți)", omZile: "~8–10" },
    { ce: "Retușuri la etajele 1–3 + început de lucru la soclu", omZile: "~8–10" },
  ],
  totalOmZile: "≈ 55–70 om-zile",
  concluzie:
    "55–70 de om-zile împărțite la ~10 zile lucrătoare înseamnă, în medie, 5–7 muncitori pe zi — cu vârf doar în ziua vizitei oficiale. Dacă 19 muncitori ar fi lucrat zilnic (≈190 de om-zile), volumul de muncă vizibil în poze ar fi trebuit să fie de aproape 3 ori mai mare: șapa și pardoselile parterului ar fi fost demult turnate. Pozele arată că mobilizarea de 19 a fost excepția, nu regula.",
};

// Etapele de finisaj și cât cântărește fiecare din total (%). Suma = 100.
export const etapeLucrare: { cheie: string; nume: string; pondere: number }[] = [
  { cheie: "tamplarie", nume: "Tâmplărie (ferestre)", pondere: 10 },
  { cheie: "glet", nume: "Tencuială + glet pereți", pondere: 20 },
  { cheie: "instalatii_el", nume: "Instalații electrice", pondere: 8 },
  { cheie: "instalatii_san", nume: "Instalații sanitare", pondere: 7 },
  { cheie: "pardoseli", nume: "Șapă + gresie/parchet", pondere: 20 },
  { cheie: "tavane", nume: "Tavane", pondere: 10 },
  { cheie: "zugraveala", nume: "Zugrăveală", pondere: 15 },
  { cheie: "finisaje", nume: "Uși interioare + finisaje", pondere: 10 },
];

export type Etaj = {
  nume: string;
  nota?: string;
  mp?: number; // suprafață de finisat estimată (podea + pereți + tavan), pentru ponderare + afișare
  etapeGata?: string[]; // etape finalizate (din poze)
  etapePartial?: string[]; // etape în curs (jumătate de credit)
  procent?: number; // fallback dacă nu sunt etape
};

// Stadiul pe etaje (de sus în jos). Procentul se ia din etapele văzute în poze
// (fallback pe `procent`). `mp` sunt estimați și ponderează progresul general.
export const etaje: Etaj[] = [
  { nume: "Etajul 3", mp: 1200, procent: 97, nota: "Din poze (27 iulie): parchet montat, calorifere montate, pereți finisați. Se fac retușuri." },
  { nume: "Etajul 2", mp: 1200, procent: 97, nota: "Din poze (27 iulie): parchet montat, calorifere montate, pereți finisați. Se fac retușuri." },
  { nume: "Etajul 1", mp: 1200, procent: 93, nota: "Din poze (27 iulie): parchet montat, se montează caloriferele; urmează retușurile." },
  {
    nume: "Parter",
    mp: 1200,
    etapeGata: ["tamplarie", "glet"],
    etapePartial: ["instalatii_el"],
    nota: "Din poze (27 iulie): ferestre montate și pereți gletuiți, dar pardoseala e încă desfăcută — pământ și moloz, fără șapă. Șapele se toarnă săptămâna viitoare. Instalația electrică e trasă parțial (doze în pereți); tavane, zugrăveală și finisaje neîncepute.",
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
  "Parter: turnarea șapelor (anunțată pentru săptămâna 27 iulie – 2 august)",
  "Parter: pardoseli (gresie/parchet), tavane, zugrăveală, uși și finisaje",
  "Parter: finalizarea instalațiilor electrice și sanitare",
  "Soclul clădirii — în lucru",
  "Etajul 1: finalizarea montajului caloriferelor; retușuri la etajele 1, 2 și 3",
  "Sala de sport — NU intră în termenul de 8 septembrie; rămâne pentru mai târziu",
  "Recepția și curățenia finală / curtea școlii",
];

export const termene: { cand: string; status: Status; text: string }[] = [
  { cand: "16 octombrie 2025", status: "bad", text: "primul termen anunțat pentru finalizare" },
  { cand: "„Din toamnă” 2025", status: "bad", text: "termen anunțat public" },
  { cand: "Iunie 2026", status: "bad", text: "termen intermediar anunțat" },
  { cand: "1 septembrie 2026", status: "progress", text: "termenul anunțat pentru finalizare" },
  {
    cand: "8 septembrie 2026",
    status: "current",
    text: "garanția oficialilor Primăriei și a constructorului (27 iulie): școala finalizată, fără sala de sport",
  },
  {
    cand: "Sept.–Oct. 2026 (risc)",
    status: "bad",
    text: "viceprimarul admite în Consiliul Local (31 iulie) că unele școli pot începe cu 2 săptămâni – o lună mai târziu, cu relocare prin Inspectoratul Școlar (fără a nominaliza Școala 13)",
  },
  {
    cand: "„Cel târziu octombrie” 2026",
    status: "current",
    text: "termenul comunicat de primar părinților, în audiență (3 august 2026) — elevii NU încep anul școlar în școala lor",
  },
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
    titlu: "27 iulie 2026 — vizită cu oficialii Primăriei și constructorul",
    data: "27 iulie 2026",
    progres: "da",
    nota: "Vizită a părinților la școală, împreună cu oficiali din administrația locală și un reprezentant al constructorului. 19 muncitori pe șantier. Următoarea vizită: 3 august 2026.",
    analizaAI:
      "Analiză din pozele raportate de părinți (27 iulie 2026). <strong>Progres real față de 16 iulie:</strong> pe șantier lucrează acum 19 muncitori (față de 2–3 înainte) — la soclu, la calorifere la etajul 1 și la retușuri la etajele 1–3. <strong>Etajele:</strong> pozele arată săli cu parchet montat, calorifere albe noi sub ferestre, pereți gletuiți și finisați — etajele sunt aproape gata. <strong>Parterul:</strong> pereții sunt gletuiți și albi (etapa de glet e încheiată), tâmplăria e montată, dar pardoseala e încă pământ și moloz, fără șapă; instalația electrică e trasă doar parțial (doze și trasee în pereți); la baza pereților mai e brut, unde vine șapa. Constructorul anunță că șapele la parter se toarnă săptămâna 27 iulie – 2 august. <strong>Concluzie:</strong> ritmul a crescut vizibil; parterul rămâne punctul critic — șapă, pardoseli, tavane, zugrăveală și finisaje în ~6 săptămâni. Garanția dată de oficialii Primăriei și de constructor: școala gata pe 8 septembrie 2026, fără sala de sport.",
    media: [],
  },
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
    data: "22 iulie 2026",
    status: "done",
    titlu: "Petiția depusă la Primărie",
    detalii: "Petiția semnată pe hârtie, înregistrată la Primărie și Consiliul Local cu numerele 19849 și 19850.",
  },
  {
    data: "27 iulie 2026",
    status: "done",
    titlu: "Vizită pe șantier cu oficialii Primăriei și constructorul",
    detalii:
      "19 muncitori pe șantier. Garanție primită: școala finalizată până pe 8 septembrie 2026, fără sala de sport. Șapele la parter se toarnă în săptămâna următoare.",
  },
  {
    data: "31 iulie 2026",
    status: "done",
    titlu: "Viceprimarul, în Consiliul Local: unele școli pot începe mai târziu",
    detalii:
      "Viceprimarul Bogdan Buhăianu declară că unele școli aflate în șantier ar putea începe anul școlar cu 2 săptămâni – o lună mai târziu, elevii urmând a fi relocați de Inspectoratul Școlar Județean. Nu a nominalizat Școala 13.",
  },
  {
    data: "3 august 2026",
    status: "bad",
    titlu: "Audiență la primar: termen „cel târziu octombrie” și acces interzis",
    detalii:
      "Primarul comunică părinților, în audiență, că elevii vor intra în școală cel târziu în octombrie. Din aceeași zi, accesul părinților în școală este oprit și nu se mai pot face fotografii — deși pe 16 iulie fuseseră promise public vizite săptămânale de monitorizare.",
  },
  {
    data: "1 septembrie 2026",
    status: "none",
    titlu: "Termenul anunțat pentru finalizare",
    detalii: "Elevii ar urma să înceapă anul școlar 2026–2027 în școala reabilitată.",
  },
];

export const actualizari = [
  {
    data: "3 august 2026",
    text: "Părinții au fost în audiență la domnul primar. Două anunțuri importante: (1) elevii vor intra în școală „cel târziu în octombrie” — deci termenul de 1 septembrie și garanția de 8 septembrie sunt oficial abandonate; (2) de astăzi părinților nu li se mai permite accesul în școală și nu mai pot face fotografii. Vizitele de monitorizare și jurnalul foto de pe această pagină se opresc, deși vizitele săptămânale fuseseră promise public pe 16 iulie. Estimarea platformei, calculată din ritmul real de lucru, indica finalizarea în jurul datei de 17 octombrie — ceea ce se confirmă acum din sursă oficială.",
  },
  {
    data: "31 iulie 2026",
    text: "Declarație a viceprimarului Bogdan Buhăianu, azi în Consiliul Local: unele școli aflate în șantier ar putea începe anul școlar mai târziu, cu două săptămâni până la o lună, iar elevii ar urma să fie relocați de Inspectoratul Școlar Județean, care are această atribuție. Nu a nominalizat Școala 13 — dar declarația vine la doar 4 zile după garanția „finalizat până pe 8 septembrie” dată de oficialii Primăriei și de constructor, și confirmă că riscul de întârziere e luat în calcul oficial.",
  },
  {
    data: "28 iulie 2026",
    text: "Semnal de la părinți: cei 19 muncitori au fost pe șantier doar la vizita oficială, cu oficialii de față. În zilele obișnuite se lucrează în continuare cu 3–4 oameni (media pe perioadă, cu ziua vizitei inclusă, iese 5–7). Am ajustat estimarea pe ritmul real și urmărim la fiecare raportare câți muncitori sunt de fapt.",
  },
  {
    data: "27 iulie 2026",
    text: "Vizită la școală împreună cu oficiali din administrația locală și un reprezentant al constructorului. Garanție primită: școala va fi finalizată până pe 8 septembrie 2026, fără sala de sport. Pe șantier lucrau 19 muncitori — la soclu, la montarea caloriferelor la etajul 1 și la retușuri la etajele 1–3. Șapele de la parter se toarnă săptămâna viitoare. Următoarea vizită: 3 august 2026.",
  },
  {
    data: "22 iulie 2026",
    text: "Presa locală a preluat subiectul: Botoșani Expres și BotosaniNews scriu despre depunerea petiției la Primărie și despre această platformă pe care poate fi urmărit stadiul lucrărilor.",
  },
  {
    data: "22 iulie 2026",
    text: "Petiția semnată pe hârtie de părinți a fost depusă oficial la Primăria Municipiului Botoșani și la Consiliul Local, înregistrată cu numerele 19849 și 19850. Petiția online rămâne deschisă pentru susținere. Așteptăm răspunsul instituției în termenul legal.",
  },
  {
    data: "16 iulie 2026",
    text: "Protest în fața Primăriei Botoșani. Viceprimarul Bogdan Buhăianu reconfirmă termenul de 1 septembrie 2026 și promite vizite săptămânale pe șantier.",
  },
];

// Context național: cercetare despre blocajul plăților PNRR și cine poartă vina.
// Toate afirmațiile au sursă în lista `contextSurse` de mai jos.
export const contextNational: { titlu: string; text: string }[] = [
  {
    titlu: "Blocajul plăților PNRR e real, la nivel național",
    text: "Facturi PNRR de peste 500 de milioane de euro au stat neplătite mai mult de 3 luni, iar constructorii din toată țara au cerut primăriilor să încetinească sau să oprească șantierele. Premierul Ilie Bolojan a recunoscut public: „Există întârzieri de plată la proiecte PNRR. Fără să ne plătim constructorii, greu să fie finalizate în august.” În primele 4 luni din 2026 s-au plătit doar ~60 de milioane de euro, în timp ce 82 de cereri de rambursare (~135 mil. €) stăteau neprocesate — unele depuse încă din 2024.",
  },
  {
    titlu: "Dar guvernul a deblocat banii în vara 2026",
    text: "Guvernul a aprobat de urgență un pachet de ~12 miliarde de lei: 10 miliarde ca împrumuturi fără dobândă de la Trezorerie pentru primăriile cu proiecte PNRR cu progres de peste 60% (cazul Școlii 13) și 2 miliarde pentru închiderea proiectelor. Concluzia practică: din vară, scuza „nu sunt bani” nu mai ține — banii pot fi accesați.",
  },
  {
    titlu: "România a gestionat prost PNRR la nivel central",
    text: "La renegocierea din 2025, România a renunțat la ~7 miliarde de euro din plan pentru că nu-și îndeplinea jaloanele, iar cererea de plată 5 a intrat în analiză cu doar 33 din 75 de jaloane îndeplinite. România a încasat doar ~61% din banii alocați — penultima din UE. Termenul absolut pentru toate lucrările PNRR: 31 august 2026.",
  },
  {
    titlu: "Școala 13 nu e caz izolat",
    text: "Multe școli PNRR din țară sunt încă în șantier. Exemplu aproape identic: Școala „Elena Cuza” din Vaslui nu va fi gata la timp, iar primăria de acolo riscă să returneze ~6 milioane de lei deja cheltuiți; elevii încep anul școlar în spații temporare.",
  },
  {
    titlu: "Verificare: „unele școli au terminat pentru că firmele au avut bani; la Școala 13 firma nu a primit bani” (viceprimarul)",
    text: "PARȚIAL ADEVĂRAT. Ce se confirmă: tranșele PNRR au venit cu întârzieri de 3–4 luni, iar la Botoșani, Colegiul Național „Mihai Eminescu” (31,3 mil. lei, constructor Sud-Est Construct) a fost recepționat integral — acolo firma a mers înainte și a prefinanțat. Ce NU se confirmă: că firma de la Școala 13 nu ar fi avut de unde. Katar Conneg SRL e cea mai mare firmă de construcții din județul Vaslui după cifra de afaceri — ~121 de milioane de lei în 2024, în creștere cu 30% — deci a avut capacitatea financiară, dar a ales să nu prefinanțeze Școala 13, în timp ce pe alt șantier al ei din Botoșani (ambulatoriul Spitalului „Mavromati”) lucrările sunt mai avansate.",
  },
  {
    titlu: "Concluzia cercetării",
    text: "Vina e împărțită, în trei trepte: (1) guvernul și ministerele au blocat real plățile luni întregi — documentat și recunoscut de premier; (2) constructorul a folosit blocajul ca acoperire și a ținut șantierul la ritm minim, cu mobilizare doar la vizitele oficiale (19 muncitori cu oficialii de față, 3–4 în restul zilelor); (3) Primăria a tolerat patru amânări de termen fără penalități vizibile. După deblocarea celor 12 miliarde de lei, responsabilitatea ritmului aparține constructorului și Primăriei — nu mai există scuza banilor.",
  },
];

export const contextSurse = [
  { url: "https://www.puterea.ro/romania-in-blocaj-total-facturi-pnrr-neplatite-de-peste-trei-luni-si-constructori-gata-sa-opreasca-lucrarile/", text: "Puterea — Facturi PNRR neplătite de peste 3 luni; constructori gata să oprească lucrările" },
  { url: "https://economedia.ro/bolojan-exista-intarzieri-de-plata-la-proiecte-pnrr-fara-sa-ne-platim-constructorii-greu-sa-fie-finalizate-in-august-cinci-loturi-din-autostrada-a7-sunt-in-pnrr.html", text: "Economedia — Bolojan: „Există întârzieri de plată la proiecte PNRR”" },
  { url: "https://www.digi24.ro/digieconomic/financiar/guvernul-bolojan-in-sedinta-extraordinara-inainte-de-motiune-12-miliarde-de-lei-pentru-salvarea-proiectelor-pnrr-99813", text: "Digi24 — Guvernul deblochează 12 miliarde de lei pentru salvarea proiectelor PNRR" },
  { url: "https://www.mediafax.ro/politic/ceasul-ticaie-pentru-63-miliarde-de-euro-din-pnrr-romania-intra-in-sprintul-final-al-pnrr-cu-doar-33-din-75-de-jaloane-indeplinite-23773861", text: "Mediafax — România, în sprintul final PNRR cu 33 din 75 de jaloane îndeplinite" },
  { url: "https://www.antena3.ro/externe/uniunea-europeana/romania-si-bulgaria-sunt-codasele-ue-la-atragerea-fondurilor-din-pnrr-bucurestiul-a-incasat-doar-61-din-miliardele-alocate-796261.html", text: "Antena 3 — România a încasat doar 61% din banii PNRR, penultima din UE" },
  { url: "https://stirileprotv.ro/romania-te-iubesc/unde-s-au-blocat-miliardele-din-pnrr-pentru-modernizarea-scolilor-multe-proiecte-sunt-inca-in-faza-de-santier.html", text: "Știrile ProTV — Unde s-au blocat miliardele PNRR pentru modernizarea școlilor" },
  { url: "https://www.monitoruldevaslui.ro/2026/07/reabilitarea-scolii-elena-cuza-nu-va-fi-gata-la-timp-primaria-vaslui-ar-putea-fi-obligata-sa-returneze-6-milioane-de-lei/", text: "Monitorul de Vaslui — Școala „Elena Cuza”: nu va fi gata la timp; risc de returnare a 6 mil. lei" },
  { url: "https://arenaconstruct.ro/colegiul-national-mihai-eminescu-din-botosani-reabilitat-integral-prin-pnrr-receptie-final-pentru-o-investitie-de-313-milioane-lei/", text: "ArenaConstruct — Colegiul „Mihai Eminescu” Botoșani, reabilitat integral prin PNRR (31,3 mil. lei)" },
  { url: "https://termene.ro/firma/40314681-KATAR-CONNEG-SRL", text: "Termene.ro — Katar Conneg SRL: locul 1 în Vaslui după cifra de afaceri (~121 mil. lei în 2024, +30%)" },
  { url: "https://www.botosaneanul.ro/tensiuni-la-primarie-din-cauza-intarzierilor-de-la-scoala-13-viceprimarul-intarzierile-au-fost-provocate-de-blocajele-la-plati", text: "Botoșăneanul — Viceprimarul: întârzierile la Școala 13, provocate de blocajele la plăți (tranșe la 3–4 luni)" },
];

// Surse din presă, în ordine cronologică (de la cele mai vechi la cele mai noi).
export const surse = [
  { url: "https://vivafm.ro/stire/2025/07/14/modernizare-completa-la-scoala-gimnaziala-nr-13/", text: "VIVA FM — Modernizare completă la Școala Gimnazială nr. 13 (14 iulie 2025)" },
  { url: "https://www.botosaninews.ro/693246/social/foto-situatie-grava-la-o-importanta-scoala-din-botosani-constructorul-a-anuntat-ca-vrea-sa-rezilieze-contractul-lucrarile-au-fost-oprite/", text: "BotosaniNews.ro — Constructorul (Katar Conneg) a vrut să rezilieze contractul; lucrările, oprite (2025)" },
  { url: "https://www.botosaninews.ro/693544/administratie/video-primarul-cosmin-andrei-reactioneaza-dupa-aparitia-unui-articol-despre-intarzierile-la-lucrarile-de-la-scoala-13-botosani/", text: "BotosaniNews.ro — Primarul Cosmin Andrei reacționează la întârzieri (2025)" },
  { url: "https://telem.ro/scolile-din-botosani-raman-in-santier/", text: "TeleM Regional — Școlile din Botoșani rămân în șantier" },
  { url: "https://agerpres.ro/educatie-stiinta/2026/07/16/botosani-protest-al-parintilor-elevilor-unei-scoli-fata-de-ritmul-lent-al-lucrarilor-de-reabilitare---1576737", text: "AGERPRES — Protest al părinților față de ritmul lent al lucrărilor (16 iulie 2026)" },
  { url: "https://www.edupedu.ro/parintii-elevilor-de-la-scoala-13-din-botosani-au-protestat-din-cauza-intarzierii-lucrarilor-de-reabilitare/", text: "Edupedu.ro — Părinții elevilor de la Școala 13 au protestat (16 iulie 2026)" },
  { url: "https://www.botosaneanul.ro/in-jur-de-100-de-parinti-ai-copiilor-de-la-scoala-13-protesteaza-la-primarie", text: "Botoșăneanul — În jur de 100 de părinți protestează la Primărie (16 iulie 2026)" },
  { url: "https://www.botosaninews.ro/744496/eveniment/foto-video-protest-la-botosani-cu-zeci-de-parinti-nemultumiti-oamenii-si-au-spus-of-ul-in-fata-primariei/", text: "BotosaniNews.ro — FOTO/VIDEO Protest cu zeci de părinți nemulțumiți în fața Primăriei (16 iulie 2026)" },
  { url: "https://www.facebook.com/PrimaTVRomania/videos/27699584519670999/", text: "Prima TV — VIDEO: Revoltă la o școală gimnazială din Botoșani; zeci de părinți și elevi au protestat (16 iulie 2026)" },
  { url: "https://www.botosaneanul.ro/tipete-la-primarie-parintii-primiti-de-viceprimar-vreti-sa-tipati-asta-dorim-nu-povesti", text: "Botoșăneanul — VIDEO: Țipete la Primărie, părinții primiți de viceprimar (16 iulie 2026)" },
  { url: "https://www.botosaninews.ro/744519/administratie/video-viceprimarul-municipiului-botosani-explicatii-in-fata-protestatarilor-despre-intarzierea-finalizarii-lucrarilor-la-scoala-13-nu-a-depins-de-primaria-botosani/", text: "BotosaniNews.ro — Viceprimarul, explicații în fața protestatarilor (16 iulie 2026)" },
  { url: "https://www.botosaneanul.ro/tensiuni-la-primarie-din-cauza-intarzierilor-de-la-scoala-13-viceprimarul-intarzierile-au-fost-provocate-de-blocajele-la-plati", text: "Botoșăneanul — Tensiuni la Primărie; viceprimarul: întârzierile, provocate de blocajele la plăți (16 iulie 2026)" },
  { url: "https://www.botosaneanul.ro/parintii-au-intrat-pe-santierul-scolii-nr-13-viceprimarul-promite-vizite-saptamanale-pentru-monitorizarea-lucrarilor", text: "Botoșăneanul — Părinții au intrat pe șantier; vizite săptămânale promise (16 iulie 2026)" },
  { url: "https://www.botosaninews.ro/744543/administratie/foto-video-lucrarile-la-scoala-nr-13-din-botosani-sunt-in-toi-vezi-stadiul-acestora/", text: "BotosaniNews.ro — FOTO/VIDEO Lucrările la Școala 13 sunt în toi. Vezi stadiul (17 iulie 2026)" },
  { url: "https://www.botosaninews.ro/745309/administratie/petitie-online-a-parintilor-pentru-finalizarea-lucrarilor-la-scoala-nr-13-din-botosani-de-aproape-3-ani-copiii-invata-in-spatii-temporare/", text: "BotosaniNews.ro — Petiție online a părinților pentru finalizarea lucrărilor; de aproape 3 ani copiii învață în spații temporare (22 iulie 2026)" },
  { url: "https://botosaniexpres.ro/local/peti-ia-p-rin-ilor-de-la-coala-gimnazial-nr-13-depus-oficial-la-prim-rie-stadiul-lucr-rilor-poate-fi-urm-rit-acum-pe-o-platform-online", text: "Botoșani Expres — Petiția depusă oficial la Primărie; stadiul lucrărilor poate fi urmărit pe o platformă online (22 iulie 2026)" },
];
