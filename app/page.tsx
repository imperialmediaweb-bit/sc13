"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Reveal } from "@/components/magicui/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { MediaItem } from "@/components/media-item";
import { ReportForm } from "@/components/report-form";
import { ParentReports } from "@/components/parent-reports";
import { SantierGallery } from "@/components/santier-gallery";
import { SantierUpload } from "@/components/santier-upload";
import { AppCTA } from "@/components/app-cta";
import { cn } from "@/lib/utils";
import {
  petitie,
  proiect,
  termenFinal,
  etaje,
  progresSaptamanaTrecuta,
  ramasDeFacut,
  termene,
  saptamani,
  cronologie,
  actualizari,
  surse,
  type Status,
} from "@/lib/data";

const PROGRES_GENERAL = Math.round(etaje.reduce((s, e) => s + e.procent, 0) / etaje.length);

const badgeTone: Record<Status, "done" | "progress" | "bad" | "none"> = {
  done: "done",
  progress: "progress",
  bad: "bad",
  current: "progress",
  none: "none",
};
const termenLabel: Record<string, string> = {
  done: "Finalizat",
  progress: "În așteptare",
  bad: "Depășit",
  none: "—",
};

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[hsl(var(--primary-2))]">{kicker}</div>
      <h2 className="mt-1 text-balance font-display text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">
        {title}
      </h2>
    </div>
  );
}

export default function Page() {
  const [view, setView] = React.useState<null | {
    zile: number;
    overdue: boolean;
    estVerdict: string;
    estColor: string;
    estDetail: string;
  }>(null);

  React.useEffect(() => {
    const [y, m, d] = termenFinal;
    const deadline = new Date(y, m, d).getTime();
    const now = Date.now();
    const zile = Math.ceil((deadline - now) / 86400000);

    const prog = PROGRES_GENERAL;
    const ritm = prog - progresSaptamanaTrecuta;
    const ramas = 100 - prog;
    const saptRamase = zile / 7;
    let estVerdict = "";
    let estColor = "hsl(var(--foreground))";
    let estDetail = "";

    if (prog >= 100) {
      estVerdict = "✔ Lucrările sunt raportate ca finalizate.";
      estColor = "hsl(var(--ok))";
    } else if (ritm <= 0) {
      estVerdict = "✘ În ritmul actual, lucrările NU se termină la timp.";
      estColor = "hsl(var(--bad))";
      estDetail = `Nu s-a raportat progres față de săptămâna trecută (0% pe săptămână), deci nu se poate estima o dată de finalizare. Mai sunt ${ramas}% de făcut și ${zile} zile până la termen.`;
    } else {
      const saptNecesare = Math.ceil(ramas / ritm);
      const finalMs = now + saptNecesare * 7 * 86400000;
      const laTimp = finalMs <= deadline;
      const dataStr = new Date(finalMs).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const ritmNecesar = saptRamase > 0 ? (ramas / saptRamase).toFixed(1) : "∞";
      estVerdict = laTimp
        ? "✔ În ritmul actual, lucrările s-ar termina la timp."
        : "✘ În ritmul actual, lucrările riscă să depășească termenul.";
      estColor = laTimp ? "hsl(var(--ok))" : "hsl(var(--bad))";
      estDetail = `Ritm raportat: ${ritm}% pe săptămână. Mai sunt ${ramas}% de făcut, în aproximativ ${saptRamase.toFixed(
        1
      )} săptămâni până la 1 septembrie. Ar fi nevoie de circa ${ritmNecesar}% pe săptămână. Estimare de finalizare la ritmul actual: ${dataStr}.`;
    }

    setView({ zile: Math.abs(zile), overdue: zile < 0, estVerdict, estColor, estDetail });
  }, []);

  const semnPct = Math.min(100, Math.round((petitie.semnaturi / petitie.obiectiv) * 100));
  const semnListUrl = petitie.url.replace("/finalizati", "/signatures/finalizati") + "/";

  return (
    <main>
      {/* HERO */}
      <header className="border-b-[3px] border-primary bg-[#14151a] text-[#f0eee7]">
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-8">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-[#d9a15a]">
              Monitorizare civică · Școala Gimnazială nr. 13 · Botoșani
            </span>
            <ThemeToggle />
          </div>

          <h1 className="mt-4 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl">
            Progresul lucrărilor, <span className="text-primary">sub ochii tuturor</span>.
          </h1>
          <p className="mt-4 max-w-xl text-[#bdbcb4]">
            De aproape trei ani, elevii Școlii 13 învață în spații improvizate. Urmărim aici, public și
            săptămânal, stadiul real al șantierului și fiecare termen promis de autorități.
          </p>

          <div className="relative mt-7 flex flex-wrap items-center gap-4 overflow-hidden rounded-xl border border-white/15 border-l-4 border-l-primary bg-white/[0.045] px-5 py-4">
            <span
              className={cn(
                "font-display text-6xl font-black leading-none tracking-tighter tabular-nums sm:text-7xl",
                view?.overdue ? "text-[#ef6b5c]" : "text-primary"
              )}
            >
              {view ? <NumberTicker value={view.zile} /> : "—"}
            </span>
            <span className="max-w-sm text-[#cfcdc5]">
              {view?.overdue ? (
                <>
                  zile <strong className="text-white">peste</strong> termenul promis (1 septembrie 2026) — al
                  patrulea termen depășit.
                </>
              ) : (
                <>
                  zile până la termenul promis: <strong className="text-white">1 septembrie 2026</strong> — al
                  patrulea termen anunțat pentru aceeași școală.
                </>
              )}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ShimmerButton href="#petitie">Semnează petiția</ShimmerButton>
            <a href="#santier" className={buttonVariants({ variant: "ghostLight" })}>
              Vezi șantierul
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        {/* LEDGER */}
        <Reveal className="-mt-6">
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-4">
            {[
              { n: <NumberTicker value={4} />, l: "termene promise și depășite", warn: true },
              { n: <>~14<span className="text-[0.9rem]"> mil.</span></>, l: "lei din bani publici, prin PNRR" },
              { n: <NumberTicker value={100} suffix="%" />, l: "promovabilitate, deși învață improvizat" },
              { n: <>~3</>, l: "ani în spații improvizate" },
            ].map((c, i) => (
              <div
                key={i}
                className={cn(
                  "border-border p-4 text-center",
                  i < 3 && "sm:border-r",
                  i % 2 === 0 && "border-r sm:border-r",
                  i < 2 && "border-b sm:border-b-0"
                )}
              >
                <div
                  className={cn(
                    "font-display text-2xl font-extrabold tracking-tight",
                    c.warn ? "text-bad" : "text-foreground"
                  )}
                >
                  {c.n}
                </div>
                <div className="mt-1 text-xs leading-tight text-muted-foreground">{c.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-5 flex gap-2 rounded-lg border border-border border-l-[3px] border-l-muted-foreground bg-[hsl(var(--card-2))] px-4 py-3 text-sm text-muted-foreground">
          <span>
            Pagină independentă, realizată voluntar de comunitatea părinților elevilor de la Școala Gimnazială
            nr. 13 Botoșani. Nu este un site oficial al școlii, al Primăriei Botoșani sau al altei autorități.
            Informațiile provin din presă și din comunicări publice — sursele sunt la finalul paginii.
          </span>
        </div>

        <AppCTA />

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-6 lg:gap-y-8">

        {/* PETIȚIE */}
        <section id="petitie" className="mb-8 scroll-mt-4 lg:col-span-2 lg:mb-0">
          <Reveal>
            <SectionHead kicker="Acțiune" title="Petiția părinților" />
            <Card className="relative overflow-hidden">
              <CardContent>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-5xl font-black tracking-tighter text-[hsl(var(--primary-2))]">
                    <NumberTicker value={petitie.semnaturi} />
                  </span>
                  <span className="text-muted-foreground">semnături din {petitie.obiectiv} (obiectiv)</span>
                </div>
                <Progress value={semnPct} className="my-3" />
                <p className="my-3 border-l-[3px] border-primary pl-3 italic text-muted-foreground">
                  „Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani, ca elevii să înceapă noul an
                  școlar în școala lor!”
                </p>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton href={petitie.url} target="_blank" rel="noopener noreferrer">
                    Semnează petiția
                  </ShimmerButton>
                  <a
                    href={semnListUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Vezi semnăturile
                  </a>
                </div>
                {petitie.peHartie && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-border border-l-[3px] border-l-primary bg-[hsl(var(--card-2))] px-4 py-3 text-sm">
                    <span aria-hidden>✍️</span>
                    <span>
                      <strong>Și pe hârtie:</strong> {petitie.peHartie}
                    </span>
                  </div>
                )}
              </CardContent>
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-[hsl(var(--primary-2))]" />
            </Card>
          </Reveal>
        </section>

        {/* TERMENE */}
        <section id="termene" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Promisiuni" title="Istoricul termenelor" />
            <Card>
              <CardContent className="py-2">
                {termene.map((t, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center gap-3 border-b border-border py-3 last:border-b-0"
                  >
                    <span className="min-w-[10.5rem] font-bold">{t.cand}</span>
                    <Badge tone={badgeTone[t.status]}>{termenLabel[t.status] ?? "—"}</Badge>
                    <span className="text-sm text-muted-foreground">{t.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* ESTIMARE */}
        <section id="estimare" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Proiecție" title="Va fi gata la timp?" />
            <Card>
              <CardContent>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-4xl font-black tracking-tight">
                    <NumberTicker value={PROGRES_GENERAL} suffix="%" />
                  </span>
                  <span className="text-muted-foreground">progres estimat al lucrărilor</span>
                </div>
                <Progress value={PROGRES_GENERAL} className="my-3" />
                <p className="mb-1 mt-3 font-bold" style={{ color: view?.estColor }}>
                  {view?.estVerdict ?? "Se calculează…"}
                </p>
                <p className="text-sm text-muted-foreground">{view?.estDetail}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Estimare orientativă, calculată automat din ritmul de progres raportat (procentul actual față
                  de cel de acum o săptămână). Nu înlocuiește un grafic oficial de execuție.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* DETALII PROIECT */}
        <section id="proiect" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-2">
          <Reveal>
            <SectionHead kicker="Date publice" title="Detalii despre proiect" />
            <Card>
              <CardContent>
                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {proiect.map((p, i) => (
                    <div key={i} className="flex flex-col border-b border-border pb-3 last:border-b-0">
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{p.eticheta}</dt>
                      <dd className="font-semibold">{p.valoare}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">
                  Informații publice, din presă și comunicate. Vezi sursele la finalul paginii.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* STADIU PE ETAJE */}
        <section id="stadiu" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Pe teren" title="Stadiul lucrărilor, pe etaje" />
            <Card>
              <CardContent>
                <div className="pb-1 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  ▲ acoperiș
                </div>
                <div className="flex flex-col gap-2">
                  {etaje.map((e, i) => {
                    const low = e.procent < 60;
                    return (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-lg border border-border bg-[hsl(var(--card-2))]"
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out",
                            low ? "bg-bad/20" : "bg-ok/20"
                          )}
                          style={{ width: `${e.procent}%` }}
                        />
                        <div className="relative flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                          <span className="font-bold">{e.nume}</span>
                          <span
                            className={cn(
                              "font-display text-lg font-extrabold tabular-nums",
                              low ? "text-bad" : "text-ok"
                            )}
                          >
                            {e.procent}%
                          </span>
                          {e.nota && (
                            <span className="w-full text-sm text-muted-foreground">{e.nota}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* EVALUARE */}
        <section id="evaluare" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Analiză automată" title="Evaluarea stadiului" />
            <EvaluareCard />
          </Reveal>
        </section>

        {/* JURNAL FOTO/VIDEO */}
        <section id="santier" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-2">
          <Reveal>
            <SectionHead kicker="Documentare" title="Jurnal de pe șantier" />
            <p className="mb-4 max-w-2xl text-muted-foreground">
              Poze și video de pe șantier, adăugate pe măsură ce lucrările avansează, cu analiza noastră
              despre progresul de la o săptămână la alta.
            </p>
            <SantierUpload />
            <SantierGallery />
            <div className="space-y-4">
              {saptamani.map((s, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
                    <h3 className="font-display text-lg font-extrabold">
                      {s.titlu}
                      <span className="ml-2 text-sm font-medium text-muted-foreground">{s.data}</span>
                    </h3>
                    <Badge
                      tone={s.progres === "da" ? "done" : s.progres === "putin" ? "progress" : "bad"}
                    >
                      {s.progres === "da" ? "Progres vizibil" : s.progres === "putin" ? "Progres mic" : "Fără progres"}
                    </Badge>
                  </div>
                  {s.nota && <p className="px-5 pt-4 text-muted-foreground">{s.nota}</p>}
                  {s.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
                      {s.media.map((src, j) => (
                        <MediaItem key={j} src={src} alt={`${s.titlu} (${j + 1})`} />
                      ))}
                    </div>
                  )}
                  {s.analizaAI && (
                    <div
                      className="mx-5 mb-5 rounded-lg border border-border border-l-[3px] border-l-primary bg-[hsl(var(--card-2))] px-4 py-3 text-sm text-muted-foreground [&_strong]:text-foreground"
                      dangerouslySetInnerHTML={{ __html: `<strong>Analiză (din poze/video):</strong> ${s.analizaAI}` }}
                    />
                  )}
                </Card>
              ))}
            </div>
          </Reveal>
        </section>

        {/* RAPORTEAZĂ DE PE TEREN */}
        <section id="raporteaza" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-2">
          <Reveal>
            <SectionHead kicker="De pe teren" title="Ai trecut pe la școală? Raportează" />
            <p className="mb-4 max-w-2xl text-muted-foreground">
              Dacă ai fost la școală și ai văzut stadiul lucrărilor, spune-ne ce se întâmplă — cu sau fără
              poze. Dacă ai poze sau video, urcă-le aici. Le verificăm și le adăugăm pe pagină, iar din poze
              facem analiza comparativă față de săptămâna trecută.
            </p>
            <Card>
              <CardContent>
                <ReportForm />
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* DE LA PĂRINȚI (rapoarte publicate) */}
        <ParentReports />

        {/* CRONOLOGIE */}
        <section id="cronologie" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-2">
          <Reveal>
            <SectionHead kicker="Istoric" title="Cronologie" />
            <Card>
              <CardContent>
                <ol className="relative ml-2 border-l-2 border-border">
                  {cronologie.map((e, i) => (
                    <li key={i} className="relative mb-5 pl-6 last:mb-0">
                      <span
                        className={cn(
                          "absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-[3px] border-background",
                          e.status === "done" && "bg-ok",
                          e.status === "bad" && "bg-bad",
                          e.status === "current" && "bg-primary ring-4 ring-primary/20",
                          (e.status === "none" || e.status === "progress") && "bg-muted-foreground"
                        )}
                      />
                      <span className="block text-xs font-semibold tracking-wide text-muted-foreground">
                        {e.data}
                      </span>
                      <span className="font-bold">{e.titlu}</span>
                      {e.detalii && <div className="mt-0.5 text-sm text-muted-foreground">{e.detalii}</div>}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* REVENDICĂRI */}
        <section id="revendicari" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Cereri" title="Ce cerem" />
            <Card>
              <CardContent>
                <ol className="space-y-0">
                  {[
                    <>
                      <strong>Finalizarea lucrărilor până la 1 septembrie 2026</strong> — termenul promis public
                      — astfel încât elevii să înceapă anul școlar 2026–2027 în incinta școlii, nu în spații
                      improvizate.
                    </>,
                    <>
                      <strong>Dreptul părinților de a verifica săptămânal stadiul lucrărilor</strong>, prin
                      vizite pe șantier alături de reprezentanții Primăriei și ai constructorului.
                    </>,
                    <>
                      <strong>Informare publică, transparentă și constantă</strong> asupra stadiului real al
                      lucrărilor și a eventualelor întârzieri.
                    </>,
                  ].map((txt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-b border-border py-3 last:border-b-0"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground font-display text-base font-extrabold text-background">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{txt}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* DISTRIBUIE */}
        <section id="distribuie" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Amplifică" title="Trimite mai departe" />
            <Card>
              <CardContent>
                <p className="mb-3 text-muted-foreground">
                  Cu cât suntem mai mulți, cu atât presiunea e mai mare. Distribuie pagina:
                </p>
                <ShareButtons />
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* ACTUALIZĂRI */}
        <section id="actualizari" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="La zi" title="Actualizări" />
            <Card>
              <CardContent className="space-y-4">
                {actualizari.map((u, i) => (
                  <div key={i} className="border-l-[3px] border-primary pl-4">
                    <div className="text-xs font-semibold text-muted-foreground">{u.data}</div>
                    <div>{u.text}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </section>

        {/* SURSE */}
        <section id="surse" className="mb-8 scroll-mt-4 lg:mb-0 lg:col-span-1">
          <Reveal>
            <SectionHead kicker="Referințe" title="Surse" />
            <Card>
              <CardContent>
                <ul className="space-y-2">
                  {surse.map((s, i) => (
                    <li key={i} className="relative pl-5 leading-snug">
                      <span className="absolute left-0 text-primary">→</span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--primary-2))] underline-offset-2 hover:underline"
                      >
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </section>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center text-sm text-muted-foreground">
          Pagină întreținută voluntar de comunitatea părinților · Corecturi și completări sunt binevenite.
        </div>
      </footer>
    </main>
  );
}

function EvaluareCard() {
  const gata = etaje.filter((e) => e.procent >= 98);
  const slab = etaje.reduce((a, b) => (a.procent < b.procent ? a : b));
  const stare =
    PROGRES_GENERAL >= 95
      ? "aproape finalizat"
      : PROGRES_GENERAL >= 75
      ? "avansat, dar cu un punct critic"
      : "în întârziere";
  const culoare =
    PROGRES_GENERAL >= 95 ? "hsl(var(--ok))" : PROGRES_GENERAL >= 75 ? "hsl(var(--warn))" : "hsl(var(--bad))";

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent>
        <p className="mb-2 text-lg font-bold" style={{ color: culoare }}>
          Stadiul general: {PROGRES_GENERAL}% — {stare}.
        </p>
        <p className="mb-3 text-muted-foreground">
          Etajele superioare stau bine:{" "}
          {gata.length ? gata.map((e) => e.nume.toLowerCase()).join(" și ") + " sunt practic gata" : "lucrările avansează la etaje"}. Punctul
          critic este <strong className="text-foreground">{slab.nume.toLowerCase()}</strong>, la doar{" "}
          <strong className="text-foreground">{slab.procent}%</strong> — {slab.nota}. Ritmul general depinde
          direct de recuperarea rapidă la parter și la sala de sport.
        </p>
        <strong className="text-sm">Ce a mai rămas de făcut:</strong>
        <ul className="ml-5 mt-1 list-disc space-y-1 text-muted-foreground">
          {ramasDeFacut.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Evaluare generată automat din procentele pe etaje și din informațiile apărute în presă. Are rol
          orientativ, nu de expertiză tehnică.
        </p>
      </CardContent>
    </Card>
  );
}

function ShareButtons() {
  const [copied, setCopied] = React.useState(false);
  const share = (net: "fb" | "wa") => {
    const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
    const txt = "Susține finalizarea lucrărilor la Școala 13 Botoșani — semnează petiția:";
    const href =
      net === "fb"
        ? "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)
        : "https://wa.me/?text=" + encodeURIComponent(txt + " " + url);
    window.open(href, "_blank", "noopener");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => share("fb")} className={buttonVariants()}>
        Facebook
      </button>
      <button onClick={() => share("wa")} className={buttonVariants()}>
        WhatsApp
      </button>
      <button onClick={copy} className={buttonVariants({ variant: "outline" })}>
        {copied ? "Link copiat ✓" : "Copiază linkul"}
      </button>
    </div>
  );
}
