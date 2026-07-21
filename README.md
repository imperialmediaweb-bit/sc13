# Școala 13 Botoșani — Pagina de progres a lucrărilor

Pagină web independentă, realizată de comunitatea părinților elevilor de la
**Școala Gimnazială nr. 13 Botoșani**, pentru monitorizarea publică a stadiului
lucrărilor de reabilitare (investiție ~14 milioane lei prin PNRR) și a
respectării termenului promis: **1 septembrie 2026**.

Pagina conține:

- card cu **petiția** și numărul de semnături + bară de progres;
- **contor** de zile până la termenul promis;
- **istoricul termenelor** promise și depășite;
- **stadiul lucrărilor** pe etape;
- **jurnal foto săptămânal** de pe șantier, cu marcaj „progres / fără progres”;
- cronologie, revendicări, butoane de distribuire și surse de presă.

Totul este un singur fișier: [`index.html`](index.html). Fără build, fără
dependențe.

---

## Cum actualizezi datele

Deschide `index.html` și mergi la secțiunea marcată **`DATE`** de la începutul
scriptului (aproape de final). Acolo, într-un singur loc, editezi:

- `semnaturi` — numărul curent de semnături de pe petiție;
- `obiectivSemnaturi` — obiectivul propus;
- `termene`, `lucrari` — statusurile;
- `saptamani` — jurnalul foto (vezi mai jos);
- `cronologie`, `actualizari`, `surse`.

Statusurile folosesc: `"done"` (verde), `"progress"` (galben), `"bad"` (roșu).

## Cum adaugi pozele săptămânal

1. Pune pozele într-un folder nou, de exemplu `assets/santier/saptamana-02/`.
2. În `index.html`, în array-ul `saptamani`, adaugă la **început** un obiect nou:

   ```js
   {
     titlu: "Săptămâna 2",
     data: "28 iulie – 3 august 2026",
     progres: "da",              // "da" | "putin" | "nu"
     nota: "S-a montat gresia la parter. Progres vizibil față de săptămâna trecută.",
     poze: [
       "assets/santier/saptamana-02/1.jpg",
       "assets/santier/saptamana-02/2.jpg"
     ]
   },
   ```

3. Salvează, fă commit și push. Pagina se actualizează automat.

> Sfat: redimensionează pozele la ~1200px lățime înainte de a le urca, ca pagina
> să se încarce repede pe telefon.

## Publicare gratuită (GitHub Pages)

1. Fă merge / push pe branch-ul principal al repo-ului `sc13`.
2. În GitHub: **Settings → Pages → Source: Deploy from a branch**.
3. Alege branch-ul (`main`) și folderul `/ (root)`, apoi **Save**.
4. După câteva minute, pagina va fi la:
   `https://imperialmediaweb-bit.github.io/sc13/`

---

*Pagină independentă a părinților. Nu este site oficial al școlii sau al
Primăriei Botoșani. Informațiile provin din presă și comunicări publice.*
