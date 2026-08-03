"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/magicui/reveal";
import {
  PenLine,
  Building2,
  TrendingUp,
  Camera,
  MessageSquarePlus,
  FileText,
  Clock,
  ListChecks,
  Bell,
  Share2,
  Link2,
  CheckCircle2,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MediaItem } from "@/components/media-item";
import { ReportForm } from "@/components/report-form";
import { ParentReports } from "@/components/parent-reports";
import { SantierGallery } from "@/components/santier-gallery";
import { AppCTA } from "@/components/app-cta";
import { PetitionEmbed } from "@/components/petition-embed";
import { cn } from "@/lib/utils";
import { cldOpt } from "@/lib/img";
import {
  petitie,
  petitieDepusa,
  proiect,
  termenFinal,
  anScolarStart,
  etaje,
  etapeLucrare,
  procentEtaj,
  muncitori,
  muncitoriVizita,
  calculMuncitori,
  anuntOficial,
  accesParinti,
  progresSaptamanaTrecuta,
  ramasDeFacut,
  termene,
  saptamani,
  cronologie,
  actualizari,
  surse,
  contextNational,
  contextSurse,
  type Status,
} from "@/lib/data";

// Progres general = media procentelor pe niveluri, ponderată pe mp (nivel mare contează mai mult).
const PROGRES_GENERAL = (() => {
  const totMp = etaje.reduce((s, e) => s + (e.mp || 0), 0);
  if (totMp > 0) {
    return Math.round(etaje.reduce((s, e) => s + procentEtaj(e) * (e.mp || 0), 0) / totMp);
  }
  return Math.round(etaje.reduce((s, e) => s + procentEtaj(e), 0) / etaje.length);
})();

// Etichetă de ritm în funcție de câți muncitori sunt pe șantier.
const ritmLabel = muncitori <= 3 ? "ritm mic" : muncitori <= 7 ? "ritm mediu" : "ritm bun";

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

const SECTION_ICONS: Record<string, LucideIcon> = {
  petitie: PenLine,
  stadiu: Building2,
  sanse: TrendingUp,
  jurnal: Camera,
  raporteaza: MessageSquarePlus,
  proiect: FileText,
  cronologie: Clock,
  revendicari: ListChecks,
  actualizari: Bell,
  distribuie: Share2,
  context: Landmark,
  surse: Link2,
};

/* Secțiune standard: titlu + un card alb (bloc de conținut) — identic peste tot.
   `plain` = fără cardul exterior (pentru secțiunile care își fac propriile carduri). */
function Section({
  id,
  title,
  children,
  plain,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  plain?: boolean;
}) {
  const Icon = SECTION_ICONS[id];
  return (
    <section id={id} className="scroll-mt-24 pt-12">
      <Reveal>
        <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
          {Icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
              <Icon className="h-5 w-5" />
            </span>
          )}
          {title}
        </h2>
        {plain ? (
          children
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(20,25,40,.04),0_12px_32px_rgba(20,25,40,.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(20,25,40,.06),0_22px_50px_rgba(20,25,40,.11)] sm:p-7">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}

export default function Page() {
  const [view, setView] = React.useState<null | {
    zile: number;
    overdue: boolean;
    estVerdict: string;
    estColor: string;
    estDetail: string;
    sanse: number;
    dataFinal: string;
  }>(null);

  React.useEffect(() => {
    const [y, m, d] = termenFinal;
    const deadline = new Date(y, m, d).getTime();
    const [sy, sm, sd] = anScolarStart;
    const startScoala = new Date(sy, sm, sd).getTime();
    const now = Date.now();
    const zile = Math.ceil((deadline - now) / 86400000);

    const prog = PROGRES_GENERAL;
    const ritm = prog - progresSaptamanaTrecuta;
    const ramas = 100 - prog;
    let estVerdict = "";
    let estColor = "hsl(var(--foreground))";
    let estDetail = "";
    let sanse = 50;
    let dataFinal = "—";

    const fmt = (ms: number) =>
      new Date(ms).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

    if (prog >= 100) {
      estVerdict = "Lucrările sunt raportate ca finalizate.";
      estColor = "hsl(var(--ok))";
      sanse = 100;
      dataFinal = "acum";
    } else if (ritm <= 0) {
      // progres stagnat: presupunem un ritm minim, pesimist — data se împinge tot mai târziu
      const ritmMinim = 1; // % pe săptămână
      const saptNecesare = Math.ceil(ramas / ritmMinim);
      const finalMs = now + saptNecesare * 7 * 86400000;
      dataFinal = fmt(finalMs);
      estVerdict = "Progresul a stagnat față de săptămâna anterioară.";
      estColor = "hsl(var(--bad))";
      estDetail = `Cu ~${muncitori} muncitori (${ritmLabel}), dacă ritmul rămâne oprit, data la care elevii ar putea reveni în școală se împinge tot mai târziu. Estimare pesimistă: ${dataFinal}.`;
      sanse = 8;
    } else {
      // numărul de muncitori ajustează ritmul: puțini → mai lent, mulți → mai rapid
      const factorOf = (n: number) => (n <= 3 ? 1.3 : n <= 7 ? 1.05 : n <= 14 ? 0.85 : 0.6);
      // Două scenarii: ritmul REAL (medie ~5/zi, estimată din progresul dintre poze)
      // vs. ritmul PROMIS, ca la vizita oficială (19 muncitori aduși când vin oficialii).
      const saptReal = Math.ceil((ramas / ritm) * factorOf(muncitori));
      const saptPromis = Math.ceil((ramas / ritm) * factorOf(muncitoriVizita.numar));
      const finalReal = now + saptReal * 7 * 86400000;
      const finalPromis = now + saptPromis * 7 * 86400000;
      // „la timp” = elevii pot intra în școală la începutul anului școlar (7 septembrie)
      const laTimp = finalReal <= startScoala;
      dataFinal = fmt(finalReal);
      // șansele: media celor două scenarii, înclinată spre ce se vede zilnic pe șantier
      const sanseDe = (finalMs: number) => {
        const diffZile = Math.round((startScoala - finalMs) / 86400000);
        return Math.max(5, Math.min(95, Math.round(50 + diffZile * 4 + (prog - 80) * 0.4)));
      };
      // 31 iulie: viceprimarul a admis în Consiliul Local o posibilă întârziere de o lună,
      // deci scenariul real primește greutate mai mare
      sanse = Math.round(sanseDe(finalReal) * 0.75 + sanseDe(finalPromis) * 0.25);
      estVerdict = laTimp
        ? "La ritmul actual, elevii ar putea intra în școală pe 7 septembrie."
        : "Cu ritmul din zilele obișnuite, finalizarea ar depăși 7 septembrie (începutul școlii).";
      estColor = laTimp ? "hsl(var(--ok))" : "hsl(var(--bad))";
      estDetail =
        `Rest de executat: ${ramas}% · Ritm măsurat: ${ritm}% pe săptămână. ` +
        `Scenariul REAL (~${muncitori} muncitori pe zi în medie, estimat din progresul dintre pozele din 16 și 27 iulie): gata în jur de ${fmt(finalReal)}. ` +
        `Scenariul PROMIS (${muncitoriVizita.numar} muncitori, câți erau la vizita oficială din ${muncitoriVizita.data}): gata în jur de ${fmt(finalPromis)}.`;
    }

    // Anunț oficial: primarul a comunicat un termen nou. Verdictul nu mai e o
    // estimare — e o certitudine comunicată de autoritate.
    if (anuntOficial) {
      estVerdict = `Confirmat oficial: elevii NU încep anul școlar în școala lor. Termen nou: ${anuntOficial.termen}.`;
      estColor = "hsl(var(--bad))";
      dataFinal = anuntOficial.termen;
      sanse = 2;
      estDetail =
        `${anuntOficial.text} Estimarea acestei pagini, calculată din ritmul real de lucru (~${muncitori} muncitori pe zi), ` +
        `indica finalizarea în jurul lui 17 octombrie — ceea ce se confirmă acum din sursă oficială (${anuntOficial.sursa}, ${anuntOficial.data}).`;
    }

    setView({ zile: Math.abs(zile), overdue: zile < 0, estVerdict, estColor, estDetail, sanse, dataFinal });
  }, []);

  const [dbUpdates, setDbUpdates] = React.useState<{ id: string; data: string; text: string }[]>([]);
  const [heroImg, setHeroImg] = React.useState<string | null>(null);
  React.useEffect(() => {
    fetch("/api/updates")
      .then((r) => r.json())
      .then((d) => Array.isArray(d.updates) && setDbUpdates(d.updates))
      .catch(() => {});
    fetch("/api/santier")
      .then((r) => r.json())
      .then((d) => {
        const img = (d.items || []).find((it: { type: string; url: string }) => it.type === "image");
        if (img) setHeroImg(cldOpt(img.url, 1600));
      })
      .catch(() => {});
  }, []);

  const semnListUrl = petitie.url.replace("/finalizati", "/signatures/finalizati") + "/";

  return (
    <main>
      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden border-b-[3px] border-primary bg-[#14151a] text-white">
        {/* poză de pe șantier în fundal */}
        {heroImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30 duration-1000 animate-in fade-in"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(15,16,20,.72) 0%, rgba(15,16,20,.82) 60%, rgba(15,16,20,.95) 100%), radial-gradient(70% 55% at 80% -10%, rgba(224,145,46,.35), transparent 70%)",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 py-3 text-xs">
          <span className="font-semibold uppercase tracking-wide text-[#e6a34f]">Monitorizare civică · Botoșani</span>
          <ThemeToggle />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-8 text-center sm:pt-12">
          <span className="inline-block rounded-full bg-primary/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#eba650] ring-1 ring-primary/40">
            Școala Gimnazială nr. 13 · Botoșani
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-[3.4rem]">
            Stadiul lucrărilor,{" "}
            <span className="text-primary">urmărit public</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/75 sm:text-lg">
            De aproape trei ani, elevii Școlii 13 învață în spații temporare. Aici vezi, la zi, cât s-a lucrat și
            când ar putea reveni copiii în școală.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <a
              href="#petitie"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              Semnează petiția
            </a>
            <a
              href="#jurnal"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Vezi șantierul
            </a>
          </div>

          {/* bandă de date esențiale */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { v: view ? String(view.zile) : "—", l: view?.overdue ? "zile peste termen" : "zile până la termen", warn: view?.overdue },
              { v: "1 sept. 2026", l: "termenul anunțat" },
              { v: PROGRES_GENERAL + "%", l: "progres estimat" },
              { v: `~${muncitori}/zi`, l: "muncitori, medie reală din poze", warn: muncitori < 10 },
              { v: view ? view.sanse + "%" : "—", l: "șanse la timp", warn: (view?.sanse ?? 50) < 40 },
            ].map((c, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-4 text-center ring-1 ring-white/15 backdrop-blur-md">
                <div className={cn("font-display text-2xl font-bold tnum", c.warn ? "text-[#ffb4a8]" : "text-white")}>{c.v}</div>
                <div className="mt-0.5 text-xs text-white/70">{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===== Conținut ===== */}
      <div className="mx-auto max-w-4xl px-5 pb-10">
        {/* ANUNȚ OFICIAL — termen nou + acces interzis */}
        {(anuntOficial || accesParinti?.permis === false) && (
          <div className="mt-8 space-y-3">
            {anuntOficial && (
              <div className="rounded-2xl border-2 border-bad bg-bad-soft p-5 sm:p-6">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-bad">
                  Anunț oficial · {anuntOficial.data}
                </div>
                <h2 className="mt-1.5 font-display text-xl font-extrabold sm:text-2xl">
                  Elevii nu încep anul școlar în școala lor. Termen nou: {anuntOficial.termen}.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{anuntOficial.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">Sursa: {anuntOficial.sursa}.</p>
              </div>
            )}
            {accesParinti?.permis === false && (
              <div className="rounded-2xl border border-bad/40 bg-card p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-bad">
                  Accesul părinților pe șantier a fost oprit ({accesParinti.dinData})
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{accesParinti.text}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Datele de mai jos rămân cele verificate până la această dată. Vom actualiza pagina cu orice
                  informație oficială primită și cu observațiile părinților din afara curții școlii.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PETIȚIE */}
        <Section id="petitie" title="Petiția părinților">
          <div className="space-y-5">
            <p className="border-l-4 border-primary pl-4 text-lg font-medium italic text-foreground">
              „Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani, ca elevii să înceapă noul an
              școlar în școala lor!”
            </p>

            {petitieDepusa && (
              <div className="flex items-start gap-2.5 rounded-md border border-ok/40 bg-ok-soft px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
                <p className="text-sm">
                  <strong className="text-ok">
                    Petiția semnată pe hârtie a fost depusă la Primărie pe {petitieDepusa.data}.
                  </strong>{" "}
                  Înregistrată la {petitieDepusa.institutie}, cu numerele{" "}
                  <span className="font-semibold tnum">{petitieDepusa.numere.join(" și ")}</span>. Petiția online
                  rămâne deschisă pentru susținere; așteptăm răspunsul instituției în termenul legal.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <a href={petitie.url} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
                Semnează online
              </a>
              <a
                href={semnListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                Vezi semnăturile
              </a>
            </div>
          </div>

          {/* Petiția oficială — semnare direct în pagină (numărul live e aici) */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">Semnează direct aici (număr de semnături în timp real):</p>
            <PetitionEmbed
              src="https://www.petitieonline.com/embed/finalizati_lucrrile_la_coala_gimnazial_nr_13_botoani_ca_elevii_s_inceap_noul_an_colar_in_coala_lor"
              title="Semnează petiția: Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani"
            />
          </div>
        </Section>

        {/* STADIU */}
        <Section id="stadiu" title="Stadiul lucrărilor, pe etaje">
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--card-2))] text-left">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Nivel</th>
                  <th className="w-40 px-4 py-2.5 font-semibold">Stadiu</th>
                  <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">Observații</th>
                </tr>
              </thead>
              <tbody>
                {etaje.map((e, i) => {
                  const pct = procentEtaj(e);
                  const low = pct < 60;
                  const hasStages = !!(e.etapeGata || e.etapePartial);
                  const nameOf = (keys?: string[]) =>
                    etapeLucrare.filter((x) => (keys || []).includes(x.cheie)).map((x) => x.nume.toLowerCase());
                  const gata = nameOf(e.etapeGata);
                  const partial = nameOf(e.etapePartial);
                  const lipsa = etapeLucrare
                    .filter((x) => !(e.etapeGata || []).includes(x.cheie) && !(e.etapePartial || []).includes(x.cheie))
                    .map((x) => x.nume.toLowerCase());
                  return (
                    <tr key={i} className="border-t border-border align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{e.nume}</div>
                        {e.mp && <div className="text-xs text-muted-foreground tnum">~{e.mp} mp de finisat</div>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold tnum", low ? "text-bad" : "text-ok")}>{pct}%</span>
                          <Progress value={pct} tone={low ? "bad" : "primary"} className="h-1.5 flex-1" />
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                        {hasStages ? (
                          <span className="[&_strong]:text-foreground">
                            {gata.length > 0 && (
                              <>
                                <strong>Gata:</strong> {gata.join(", ")}.{" "}
                              </>
                            )}
                            {partial.length > 0 && (
                              <>
                                <strong>În curs:</strong> {partial.join(", ")}.{" "}
                              </>
                            )}
                            {lipsa.length > 0 && (
                              <>
                                <strong>Lipsă:</strong> {lipsa.join(", ")}.
                              </>
                            )}
                          </span>
                        ) : (
                          e.nota
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            „mp de finisat" = toată suprafața lucrată (podea + pereți + tavan), nu doar amprenta la sol. O sală de
            clasă (~50 mp podea) înseamnă ~170 mp de finisat cu tot cu pereți și tavan; pe nivel ~1.200 mp, în total
            ~{etaje.reduce((s, e) => s + (e.mp || 0), 0)} mp (estimativ). mp e orientativ — procentul fiecărui nivel
            îl dau etapele văzute în pozele de pe șantier.
          </p>

          <div className="mt-5 rounded-md border-l-4 border-bad bg-bad-soft p-4">
            <p className="font-semibold text-bad">
              ⚠ Muncitori doar la vizite? {muncitoriVizita.numar} la vizita oficială — dar pozele arată o medie
              de ~5–7 pe zi.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              La vizita din {muncitoriVizita.data}, cu oficialii de față, constructorul avea{" "}
              {muncitoriVizita.numar} muncitori pe șantier. În zilele obișnuite se lucrează însă cu doar 3–4 oameni.
              Am verificat cine are dreptate printr-un calcul invers: cât s-a lucrat efectiv între pozele din
              16 iulie și cele din 27 iulie?
            </p>
            <div className="mt-3 rounded-md border border-border bg-card p-3.5">
              <p className="text-sm font-semibold">
                Verificare din poze: câtă muncă s-a depus în {calculMuncitori.perioada}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {calculMuncitori.lucrari.map((l, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span>{l.ce}</span>
                    <span className="shrink-0 font-semibold tnum">{l.omZile} om-zile</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 border-t border-border pt-2 text-sm font-semibold">
                Total: {calculMuncitori.totalOmZile}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{calculMuncitori.concluzie}</p>
            </div>
          </div>

          <div className="mt-5 rounded-md border-l-4 border-primary bg-[hsl(var(--card-2))] p-4">
            <p className="font-semibold" style={{ color: view?.estColor }}>
              {view?.estVerdict ?? "Se calculează…"}
            </p>
            {view?.estDetail && <p className="mt-1 text-sm text-muted-foreground">{view.estDetail}</p>}
            <p className="mt-2 text-xs text-muted-foreground">
              Estimare orientativă pe baza ritmului raportat. Nu înlocuiește graficul oficial de execuție.
            </p>
          </div>

          <div className="mt-5">
            <h3 className="mb-2 font-semibold">Ce a mai rămas de făcut</h3>
            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
              {ramasDeFacut.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ȘANSE */}
        <Section id="sanse" title="Șanse să înceapă anul școlar la timp">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="rounded-lg bg-[hsl(var(--card-2))] p-6 text-center sm:w-56">
              <div
                className="font-display text-6xl font-bold tnum"
                style={{
                  color:
                    (view?.sanse ?? 50) >= 70
                      ? "hsl(var(--ok))"
                      : (view?.sanse ?? 50) >= 40
                      ? "hsl(var(--warn))"
                      : "hsl(var(--bad))",
                }}
              >
                {view ? view.sanse + "%" : "—"}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">șanse estimate</div>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Șanse ca elevii să înceapă anul școlar în școala reabilitată. Anul școlar începe pe{" "}
                <strong>7 septembrie 2026</strong> — iar garanția dată de oficialii Primăriei și de constructor pe 27 iulie e
                „finalizat până pe 8 septembrie", adică la o zi <em>după</em> începerea școlii.
              </p>
              <div className="mt-4 rounded-lg border-l-4 border-primary bg-[hsl(var(--card-2))] p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Data realistă estimată de finalizare
                </div>
                <div className="font-display text-2xl font-bold">{view?.dataFinal ?? "—"}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adică elevii ar putea reveni în școală în jurul acestei date, la ritmul actual de lucru.
                </p>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Estimare orientativă, calculată automat pe baza procentelor de progres (din pozele de pe
                șantier) și a ritmului de la o săptămână la alta. Nu este o cifră oficială.
              </p>
            </div>
          </div>
        </Section>

        {/* JURNAL */}
        <Section id="jurnal" title="Jurnal foto de pe șantier" plain>
          <p className="mb-5 text-sm text-muted-foreground">
            Poze și video de pe teren, adăugate pe măsură ce lucrările avansează, împreună cu analiza
            progresului.
          </p>
          <SantierGallery />
          <div className="space-y-5">
            {saptamani.map((s, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(20,25,40,.04),0_10px_28px_rgba(20,25,40,.06)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-[hsl(var(--card-2))] px-4 py-3">
                  <h3 className="font-semibold">
                    {s.titlu}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">{s.data}</span>
                  </h3>
                  <Badge tone={s.progres === "da" ? "done" : s.progres === "putin" ? "progress" : "bad"}>
                    {s.progres === "da" ? "Progres vizibil" : s.progres === "putin" ? "Progres parțial" : "Fără progres"}
                  </Badge>
                </div>
                {s.nota && <p className="px-4 pt-3 text-sm text-muted-foreground">{s.nota}</p>}
                {s.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
                    {s.media.map((src, j) => (
                      <MediaItem key={j} src={src} alt={`${s.titlu} (${j + 1})`} />
                    ))}
                  </div>
                )}
                {s.analizaAI && (
                  <div
                    className="border-t border-border px-4 py-3 text-sm text-muted-foreground [&_strong]:text-foreground"
                    dangerouslySetInnerHTML={{ __html: `<strong>Analiză:</strong> ${s.analizaAI}` }}
                  />
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* RAPORTEAZĂ */}
        <Section id="raporteaza" title="Raportează ce ai văzut la școală" plain>
          <p className="mb-5 text-sm text-muted-foreground">
            Oricine poate transmite o observație — cu sau fără poze. Observațiile sunt verificate înainte de
            publicare.
          </p>
          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,25,40,.04),0_10px_28px_rgba(20,25,40,.06)] sm:p-6">
            <ReportForm />
          </div>
          <div className="mt-6">
            <ParentReports />
          </div>
        </Section>

        {/* PROIECT */}
        <Section id="proiect" title="Date despre proiect">
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <tbody>
                {proiect.map((p, i) => (
                  <tr key={i} className={cn(i > 0 && "border-t border-border")}>
                    <th className="w-1/3 bg-[hsl(var(--card-2))] px-4 py-3 text-left align-top font-semibold">
                      {p.eticheta}
                    </th>
                    <td className="px-4 py-3">{p.valoare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 mt-6 font-semibold">Termene anunțate</h3>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <tbody>
                {termene.map((t, i) => (
                  <tr key={i} className={cn(i > 0 && "border-t border-border")}>
                    <td className="w-44 px-4 py-3 font-semibold">{t.cand}</td>
                    <td className="w-32 px-4 py-3">
                      <Badge tone={badgeTone[t.status]}>{termenLabel[t.status] ?? "—"}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* CRONOLOGIE */}
        <Section id="cronologie" title="Cronologie">
          <ol className="relative ml-2 border-l-2 border-border">
            {cronologie.map((e, i) => (
              <li key={i} className="relative mb-5 pl-6 last:mb-0">
                <span
                  className={cn(
                    "absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-background",
                    e.status === "done" && "bg-ok",
                    e.status === "bad" && "bg-bad",
                    e.status === "current" && "bg-primary",
                    (e.status === "none" || e.status === "progress") && "bg-muted-foreground"
                  )}
                />
                <span className="block text-xs font-semibold text-muted-foreground">{e.data}</span>
                <span className="font-semibold">{e.titlu}</span>
                {e.detalii && <div className="mt-0.5 text-sm text-muted-foreground">{e.detalii}</div>}
              </li>
            ))}
          </ol>
        </Section>

        {/* CE CEREM */}
        <Section id="revendicari" title="Ce cerem Primăriei" plain>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Graficul de execuție, făcut public",
                d: "graficul semnat cu constructorul, cu jaloane săptămânale verificabile (șapele până la data X, tavanele până la Y) și numărul de muncitori prevăzut pe zi. Așa oricine poate compara promisiunea cu realitatea din poze.",
              },
              {
                t: "Penalitățile din contract, aplicate",
                d: "primul termen (16 octombrie 2025) e depășit de aproape un an. Cerem dovada, în scris, a penalităților de întârziere calculate și reținute constructorului până azi. Dacă suma e zero, părinții merită să știe de ce.",
              },
              {
                t: "Mobilizare reală, nu doar la vizite",
                d: "echipe pe șantier în fiecare zi lucrătoare, la nivelul arătat la vizita oficială (19 muncitori), nu 3–4 câți se văd în zilele obișnuite. Verificăm prin raportările și pozele părinților.",
              },
              {
                t: "Informare transparentă, săptămânal",
                d: "comunicare publică a stadiului real și a oricărei întârzieri, plus continuarea vizitelor cu părinții (următoarea: 3 august). Elevii trebuie să intre în școala lor pe 7 septembrie 2026.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,25,40,.04),0_10px_28px_rgba(20,25,40,.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(20,25,40,.08),0_22px_50px_rgba(20,25,40,.12)]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{c.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ACTUALIZĂRI */}
        <Section id="actualizari" title="Actualizări">
          <div className="space-y-4">
            {[
              ...dbUpdates.map((u) => ({ key: u.id, data: u.data, text: u.text })),
              ...actualizari.map((u, i) => ({ key: "s" + i, data: u.data, text: u.text })),
            ].map((u) => (
              <div key={u.key} className="border-l-4 border-primary pl-4">
                <div className="text-xs font-semibold text-muted-foreground">{u.data}</div>
                <div className="text-sm">{u.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <AppCTA />
          </div>
        </Section>

        {/* DISTRIBUIE */}
        {/* CONTEXT NAȚIONAL */}
        <Section id="context" title="Context național: cine e de vină?">
          <p className="mb-4 text-sm text-muted-foreground">
            Cercetare pe surse publice: e adevărat că „nu au fost bani”? Cine poartă responsabilitatea
            întârzierilor — guvernul, constructorul sau Primăria? Sursele complete sunt la finalul secțiunii.
          </p>
          <div className="space-y-4">
            {contextNational.map((c, i) => (
              <div
                key={i}
                className={
                  i === contextNational.length - 1
                    ? "rounded-md border-l-4 border-primary bg-[hsl(var(--card-2))] p-4"
                    : "border-b border-border pb-4 last:border-0"
                }
              >
                <h3 className="font-semibold">{c.titlu}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-ok/40 bg-ok-soft p-4">
            <p className="text-sm font-semibold text-ok">Important: ACUM banii există.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Din vara 2026, guvernul a pus la dispoziție ~12 miliarde de lei pentru primăriile cu proiecte
              PNRR — împrumuturi fără dobândă de la Trezorerie pentru proiectele cu progres de peste 60%.
              Școala 13 este la ~80%, deci se califică. Orice întârziere de acum înainte nu mai poate fi pusă
              pe seama lipsei banilor de la guvern.
            </p>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-primary">
              Sursele cercetării ({contextSurse.length})
            </summary>
            <ul className="mt-2 space-y-2 text-sm">
              {contextSurse.map((s, i) => (
                <li key={i} className="relative pl-4 leading-snug">
                  <span className="absolute left-0 text-primary">›</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {s.text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </Section>

        <Section id="distribuie" title="Distribuie pagina">
          <ShareButtons />
        </Section>

        {/* SURSE */}
        <Section id="surse" title="Surse">
          <ul className="space-y-2 text-sm">
            {surse.map((s, i) => (
              <li key={i} className="relative pl-4 leading-snug">
                <span className="absolute left-0 text-primary">›</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <footer className="mt-4 border-t-[3px] border-primary bg-[#14151a] text-white/75">
        <div className="mx-auto max-w-4xl px-5 py-7 text-sm">
          <p className="mb-2 font-display text-base font-bold text-white">Școala Gimnazială nr. 13 Botoșani</p>
          Pagină independentă, întreținută voluntar de comunitatea părinților. Nu este un site oficial al
          școlii, al Primăriei Botoșani sau al altei autorități. Informațiile provin din presă și din
          comunicări publice.
        </div>
      </footer>
    </main>
  );
}

function ShareButtons() {
  const [copied, setCopied] = React.useState(false);
  const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "https://sc13-production.up.railway.app/";
  const txt = "Stadiul lucrărilor la Școala Gimnazială nr. 13 Botoșani:";

  const links: { label: string; href: string }[] = [
    { label: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) },
    { label: "WhatsApp", href: "https://wa.me/?text=" + encodeURIComponent(txt + " " + url) },
    { label: "Messenger", href: "https://www.facebook.com/dialog/send?link=" + encodeURIComponent(url) + "&app_id=0&redirect_uri=" + encodeURIComponent(url) },
    { label: "Telegram", href: "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(txt) },
    { label: "Email", href: "mailto:?subject=" + encodeURIComponent("Școala 13 Botoșani — stadiul lucrărilor") + "&body=" + encodeURIComponent(txt + "\n" + url) },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Școala 13 Botoșani — stadiul lucrărilor", text: txt, url });
      } catch {}
    } else {
      copy();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
          {l.label}
        </a>
      ))}
      <button onClick={copy} className={buttonVariants({ variant: "outline" })}>
        {copied ? "Link copiat ✓" : "Copiază linkul"}
      </button>
      <button onClick={nativeShare} className={buttonVariants()}>
        Distribuie…
      </button>
    </div>
  );
}
