# Școala 13 Botoșani — Monitorul lucrărilor

Aplicație **Next.js** (App Router) + **Tailwind** + componente în stil
**shadcn/ui** și **Magic UI**, pentru monitorizarea publică a stadiului
lucrărilor de reabilitare de la **Școala Gimnazială nr. 13 Botoșani**
(investiție ~14 milioane lei prin PNRR) și a respectării termenului promis:
**1 septembrie 2026**.

Conține: card cu petiția (număr de semnături + bară de progres), contor de zile
până la termen, estimare automată „va fi gata la timp?”, istoricul termenelor,
stadiul pe etaje, evaluare automată, **jurnal cu poze și video** de pe șantier,
cronologie, revendicări, butoane de distribuire și surse de presă. Temă
light/dark cu comutator.

## Rulare locală

```bash
npm install
npm run dev        # http://localhost:3000
```

Pentru producție:

```bash
npm run build
npm start
```

## Publicare pe Railway

1. Intră pe [railway.app](https://railway.app) și conectează-ți contul de GitHub.
2. **New Project → Deploy from GitHub repo** → alege `imperialmediaweb-bit/sc13`.
3. Railway detectează automat Next.js și rulează `npm install`, `npm run build`,
   `npm start`. Nu e nevoie de configurare specială (scriptul `start` folosește
   automat portul dat de Railway prin variabila `PORT`).
4. După build, Railway îți dă un link public (`Settings → Networking → Generate
   Domain`).

## Cum actualizezi conținutul

Tot ce se schimbă e într-un singur fișier: **`lib/data.ts`**.

- `petitie.semnaturi` — numărul curent de semnături (se actualizează manual;
  petitieonline.com nu permite citirea automată).
- `etaje` — procentul fiecărui etaj. Din ele se calculează automat progresul
  general, evaluarea și estimarea.
- `progresSaptamanaTrecuta` — % general de acum o săptămână (pentru ritm).
- `ramasDeFacut`, `termene`, `cronologie`, `actualizari`, `surse`.
- `saptamani` — jurnalul de pe șantier (poze + video).

După orice modificare: commit + push → Railway reface deploy-ul automat.

## Cum adaugi poze și video săptămânal

1. Pune fișierele în `public/assets/santier/saptamana-NN/`
   (poze `.jpg/.png`, video `.mp4/.webm/.mov`).
2. În `lib/data.ts`, adaugă la **începutul** listei `saptamani` un obiect nou:

   ```ts
   {
     titlu: "Săptămâna 2",
     data: "28 iulie – 3 august 2026",
     progres: "da",            // "da" | "putin" | "nu"
     nota: "Ce s-a schimbat față de săptămâna trecută.",
     analizaAI: "Analiza pozelor/video…",
     media: [
       "/assets/santier/saptamana-02/1.jpg",
       "/assets/santier/saptamana-02/clip.mp4",
     ],
   },
   ```

3. Commit + push. Galeria afișează automat pozele ca imagini și clipurile ca
   player video.

> Sfat: redimensionează pozele la ~1600px lățime înainte de a le urca.

## Structură

- `app/` — layout, pagina, stiluri globale (tokeni de temă).
- `components/ui/` — componente stil shadcn/ui (button, card, badge, progress).
- `components/magicui/` — number-ticker, shimmer-button, reveal.
- `lib/data.ts` — **datele editabile**.
- `public/assets/santier/` — pozele și video-urile de pe șantier.
- `legacy/index.html` — varianta veche, dintr-un singur fișier (backup).

---

*Pagină independentă a părinților. Nu este site oficial al școlii sau al
Primăriei Botoșani. Informațiile provin din presă și comunicări publice.*
