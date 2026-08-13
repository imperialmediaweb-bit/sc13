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
  { eticheta: "Termenul anunțat în prezent", valoare: "finalul lui august – 1 octombrie 2026" },
];

// Câți muncitori sunt ACUM pe șantier (ultima observație a părinților).
// 6 august 2026: 10 oameni numărați la parter, în trecere; se auzeau lucrări
// și la etaje, deci numărul real poate fi mai mare.
export const muncitori = 10;

// Media zilnică din perioada în care a fost măsurat ritmul (16–27 iulie): ~5 oameni.
// Serveşte ca reper: dacă acum sunt mai mulți, ritmul se accelerează proporțional.
export const muncitoriReferinta = 5;

// Câți muncitori erau la vizita oficială (când vin oficialii, șantierul se umple).
// Diferența față de zilele obișnuite e afișată pe pagină ca semnal de alarmă.
export const muncitoriVizita = { numar: 19, data: "27 iulie 2026" };

// Câți muncitori declară autoritățile că lucrează — comparat cu ce numără părinții.
export const muncitoriDeclarati = {
  numar: 30,
  cine: "viceprimarul Bogdan Buhăianu",
  data: "august 2026",
  nota: "Declarat în presă: ~30 de muncitori care lucrează intens. Ultima numărătoare a părinților, pe 6 august, a fost de ~10 oameni la parter (se auzeau lucrări și la etaje). Verificăm diferența la fiecare trecere pe lângă șantier.",
};

// Anunț oficial care schimbă totul (lăsați null dacă nu e cazul).
// Când există, verdictul și șansele se raportează la el, nu la calculul din ritm.
export const anuntOficial = {
  data: "5 august 2026",
  sursa: "întâlnirile părinților cu primarul și cu prefectul",
  termen: "între sfârșitul lui august și 1 octombrie",
  text: "Două termene diferite, comunicate la o zi distanță. Primarul Cosmin Andrei le-a spus părinților, pe 4 august, că lucrările se finalizează până la 1 octombrie 2026. A doua zi, la întâlnirea de la Prefectură, doamna prefect a transmis părinților că, din discuțiile ei cu constructorul, acesta face tot posibilul să termine până la finalul lunii august, cu posibilitatea prelungirii cel târziu în septembrie, dacă apar situații neprevăzute. Rămâne cert doar că anul școlar începe pe 7 septembrie, iar elevii Școlii 13 învață deja de aproape trei ani în spații temporare.",
};

// Termenele comunicate de fiecare parte — pentru comparație publică.
export const termeneComunicate: { cine: string; cand: string; termen: string; nota?: string }[] = [
  {
    cine: "Constructorul (prin doamna prefect)",
    cand: "5 august 2026",
    termen: "finalul lui august, cel târziu septembrie",
    nota: "Constructorul face tot posibilul să termine până la finalul lunii august; prelungire până cel târziu în septembrie doar dacă apar situații neprevăzute.",
  },
  {
    cine: "Primarul Cosmin Andrei",
    cand: "4 august 2026",
    termen: "1 octombrie 2026",
    nota: "Comunicat părinților în întâlnire; primarul a declarat că are tot interesul ca lucrările să fie terminate.",
  },
  {
    cine: "Calculul acestei pagini",
    cand: "actualizat 6 august 2026",
    termen: "mijlocul lui septembrie",
    nota: "Calculat pe ritmul real de lucru, ajustat după numărul de oameni de pe șantier. Pe 6 august au fost numărați ~10 muncitori (față de ~5 media din iulie), ceea ce a apropiat data cu câteva săptămâni. Cu 19 oameni zilnic, termenul anunțat de constructor devine realizabil.",
  },
];

// Accesul părinților pe șantier (monitorizarea independentă).
// Setați pe null când accesul e permis; altfel completați cu detaliile restricției.
export const accesParinti: { permis: boolean; dinData: string; text: string } | null = null;

// În ce condiții învață copiii acum — date din hotărârea Consiliului Local și din presă.
export const conditiiTemporare = {
  loc: "Fundația Hand of Help (centrul de plasament), str. Pacea nr. 118, Botoșani",
  durata: "de aproape trei ani",
  detalii: [
    "Ciclul primar a fost relocat la etajul I al clădirii Fundației Hand of Help.",
    "Programul se face în două schimburi: 8:00–11:00 și 11:00–14:00.",
    "Orele durează 40 de minute, iar pauzele sunt de 5 minute.",
    "Părinții au reclamat că unele săli au fost amenajate în foste dormitoare, în magazii sau chiar la subsol.",
    "Peste 540 de elevi învață astfel de aproape trei ani.",
  ],
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
    nota: "Din poze (27 iulie): ferestre montate și pereți gletuiți, dar pardoseala e încă desfăcută — pământ și moloz, fără șapă. Pe 6 august se lucra la spartul șapei vechi, în pregătirea turnării celei noi. Instalația electrică e trasă parțial (doze în pereți); tavane, zugrăveală și finisaje neîncepute.",
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
  "Parter: turnarea șapelor — în lucru din 6 august (se sparge șapa veche). Fusese anunțată pentru 27 iulie – 2 august",
  "Parter: pardoseli (gresie/parchet), tavane, zugrăveală, uși și finisaje",
  "Parter: finalizarea instalațiilor electrice și sanitare",
  "Soclul clădirii — în lucru",
  "Etajul 1: finalizarea montajului caloriferelor; retușuri la etajele 1, 2 și 3",
  "Sala de sport — NU intră în termenele anunțate; rămâne pentru mai târziu",
  "Recepția și curățenia finală / curtea școlii",
];

export const termene: { cand: string; status: Status; text: string }[] = [
  { cand: "16 octombrie 2025", status: "bad", text: "primul termen anunțat pentru finalizare" },
  { cand: "„Din toamnă” 2025", status: "bad", text: "termen anunțat public" },
  { cand: "Iunie 2026", status: "bad", text: "termen intermediar anunțat" },
  { cand: "1 septembrie 2026", status: "bad", text: "termen anunțat pentru finalizare — abandonat" },
  {
    cand: "8 septembrie 2026",
    status: "bad",
    text: "garanția oficialilor Primăriei și a constructorului (27 iulie): școala finalizată, fără sala de sport — depășită de anunțurile ulterioare",
  },
  {
    cand: "Sept.–Oct. 2026 (risc)",
    status: "bad",
    text: "viceprimarul admite în Consiliul Local (31 iulie) că unele școli pot începe cu 2 săptămâni – o lună mai târziu, cu relocare prin Inspectoratul Școlar (fără a nominaliza Școala 13)",
  },
  {
    cand: "Finalul lui august 2026",
    status: "current",
    text: "ținta constructorului, comunicată prin doamna prefect (5 august) — cel târziu septembrie, dacă apar situații neprevăzute",
  },
  {
    cand: "1 octombrie 2026",
    status: "current",
    text: "termenul comunicat de primar părinților (4 august 2026) — elevii NU încep anul școlar în școala lor",
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
    data: "4 august 2026",
    status: "bad",
    titlu: "Întâlnire cu primarul: termen nou, 1 octombrie 2026",
    detalii:
      "Primarul Cosmin Andrei comunică părinților termenul de 1 octombrie 2026 pentru finalizarea lucrărilor și declară că are tot interesul ca acestea să fie terminate. Elevii nu vor începe anul școlar (7 septembrie) în școala lor.",
  },
  {
    data: "5 august 2026",
    status: "done",
    titlu: "Întâlnire la Prefectură: constructorul țintește finalul lui august",
    detalii:
      "Doamna prefect transmite părinților că, din discuțiile cu constructorul, acesta face tot posibilul să termine până la finalul lunii august, cu prelungire cel târziu în septembrie dacă apar situații neprevăzute.",
  },
  {
    data: "6 august 2026",
    status: "done",
    titlu: "Ritmul crește: ~10 muncitori la parter",
    detalii:
      "Un părinte numără, în trecere, aproximativ 10 muncitori care lucrau la spartul șapei vechi de la parter — dublu față de media din iulie, exact la punctul critic al lucrării.",
  },
  {
    data: "7 septembrie 2026",
    status: "current",
    titlu: "Începe anul școlar 2026–2027",
    detalii: "Data până la care elevii ar trebui să poată intra în școala reabilitată.",
  },
];

export const actualizari = [
  {
    data: "7 august 2026",
    text: "Din presă: Primăria Botoșani a semnat un act adițional prin care termenul de finalizare a lucrărilor la Școala 13 a fost prelungit oficial, prin contract. Tot din presă, viceprimarul Bogdan Buhăianu a declarat că pe șantier lucrează intens aproximativ 30 de muncitori. Părinții au numărat ~10 oameni pe 6 august, la parter — verificăm diferența la fiecare trecere pe lângă șantier. Dacă cei 30 sunt confirmați, lucrările se pot încheia semnificativ mai repede decât arată estimarea noastră.",
  },
  {
    data: "6 august 2026",
    text: "Veste bună de pe șantier: un părinte a numărat, în trecere, aproximativ 10 muncitori care lucrau la parter — la spartul șapei vechi, pregătind turnarea celei noi. Se auzeau lucrări și la etaje, deci numărul real poate fi mai mare. E dublu față de media de ~5 oameni pe zi din iulie și e exact la punctul critic al lucrării. Am recalculat estimarea în consecință: dacă ritmul ăsta se menține, data de finalizare se apropie serios.",
  },
  {
    data: "5 august 2026",
    text: "Părinții au participat la o întâlnire la Prefectură. Doamna prefect le-a transmis că, din discuțiile purtate cu constructorul, acesta face tot posibilul să finalizeze lucrările până la finalul lunii august, existând și posibilitatea prelungirii până cel târziu în septembrie, în cazul unor situații neprevăzute. Sunt vești mai bune decât termenul de 1 octombrie comunicat cu o zi înainte de primar. Urmărim în continuare ritmul real de pe șantier: termenul constructorului e realizabil doar cu mobilizare mare și constantă, nu cu 3–5 oameni pe zi.",
  },
  {
    data: "4 august 2026",
    text: "Părinții s-au întâlnit cu primarul Cosmin Andrei. Termenul comunicat pentru finalizarea lucrărilor este 1 octombrie 2026, iar primarul a declarat că are tot interesul ca lucrările să fie terminate. Rămâne faptul că anul școlar începe pe 7 septembrie: elevii Școlii 13 îl vor începe din nou în spații temporare, unde învață deja de aproape trei ani.",
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
  { url: "https://primariabt.ro/hotarari-de-consiliu-local/", text: "Primăria Botoșani — hotărârile Consiliului Local (inclusiv cea privind relocarea elevilor Școlii 13 la Fundația Hand of Help: două schimburi, ore de 40 min, pauze de 5 min)" },
  { url: "https://www.botosaninews.ro/645361/social/inspectoratul-scolar-botosani-a-decis-relocarea-mai-multor-scoli-din-cauza-lucrarilor-de-reabilitare-sunt-mai-multe-scoli-in-trei-schimburi-vezi-lista/", text: "BotosaniNews.ro — Inspectoratul Școlar a decis relocarea mai multor școli; unele în trei schimburi" },
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
