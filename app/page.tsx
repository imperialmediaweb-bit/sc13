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

function Band({ id, tint, children }: { id?: string; tint?: boolean; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-4 py-16 sm:py-24", tint ? "bg-[hsl(var(--card-2))]" : "bg-background")}
    >
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

function Head({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary-2))]">{kicker}</div>
      <h2 className="mt-2 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-pretty text-muted-foreground">{subtitle}</p>}
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
      estVerdict = "Lucrările sunt raportate ca finalizate.";
      estColor = "hsl(var(--ok))";
    } else if (ritm <= 0) {
      estVerdict = "La ritmul actual, nu se poate estima o dată de finalizare.";
      estColor = "hsl(var(--bad))";
      estDetail = `Nu s-a raportat progres față de săptămâna trecută. Mai sunt ${ramas}% de făcut și ${zile} zile până la termen.`;
    } else {
      const saptNecesare = Math.ceil(ramas / ritm);
      const finalMs = now + saptNecesare * 7 * 86400000;
      const laTimp = finalMs <= deadline;
      const dataStr = new Date(finalMs).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      estVerdict = laTimp
        ? "La ritmul actual, lucrările s-ar încadra în termen."
        : "La ritmul actual, finalizarea ar depăși termenul anunțat.";
      estColor = laTimp ? "hsl(var(--ok))" : "hsl(var(--bad))";
      estDetail = `Ritm raportat: ${ritm}% pe săptămână. Mai sunt ${ramas}% de făcut până la 1 septembrie. Estimare de finalizare la ritmul actual: ${dataStr}.`;
    }

    setView({ zile: Math.abs(zile), overdue: zile < 0, estVerdict, estColor, estDetail });
  }, []);

  const semnPct = Math.min(100, Math.round((petitie.semnaturi / petitie.obiectiv) * 100));
  const semnListUrl = petitie.url.replace("/finalizati", "/signatures/finalizati") + "/";

  return (
    <main>
      {/* ================= HERO ================= */}
      <header className="relative overflow-hidden border-b-[3px] border-primary bg-[#14151a] text-[#f0eee7]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 50% -10%, rgba(224,145,46,.22), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-6 text-center">
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="text-left text-[0.72rem] font-bold uppercase leading-tight tracking-[0.16em] text-[#d9a15a]">
              Monitorizare civică · Botoșani
            </span>
            <ThemeToggle />
          </div>

          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-wider text-[#d9a15a]">
            Școala Gimnazială nr. 13
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-balance font-display text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-6xl">
            Progresul lucrărilor, <span className="text-primary">sub ochii tuturor</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[#c4c3bb] sm:text-lg">
            De aproape trei ani, elevii Școlii 13 învață în spații temporare. Aici urmărim, public și la zi,
            stadiul real al lucrărilor de reabilitare.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col items-center gap-1 rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-6">
            <span
              className={cn(
                "font-display text-7xl font-black leading-none tracking-tighter tabular-nums",
                view?.overdue ? "text-[#ef6b5c]" : "text-primary"
              )}
            >
              {view ? <NumberTicker value={view.zile} /> : "—"}
            </span>
            <span className="mt-2 text-sm text-[#c4c3bb]">
              {view?.overdue ? (
                <>
                  zile <strong className="text-white">peste</strong> termenul anunțat
                </>
              ) : (
                <>zile până la termenul anunțat</>
              )}
              {" — "}
              <strong className="text-white">1 septembrie 2026</strong>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ShimmerButton href="#petitie">Semnează petiția</ShimmerButton>
            <a href="#santier" className={buttonVariants({ variant: "ghostLight" })}>
              Vezi șantierul
            </a>
          </div>
        </div>
      </header>

      {/* ================= CIFRE + INSTALARE ================= */}
      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: <NumberTicker value={4} />, l: "termene anunțate, depășite", warn: true },
                { n: <>~14<span className="text-base"> mil.</span></>, l: "lei prin PNRR" },
                { n: <NumberTicker value={100} suffix="%" />, l: "promovabilitate a elevilor" },
                { n: <>~3</>, l: "ani în spații temporare" },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 text-center shadow-[0_1px_2px_rgba(20,25,40,.04),0_8px_24px_rgba(20,25,40,.05)]">
                  <div className={cn("font-display text-3xl font-black tracking-tight", c.warn ? "text-bad" : "text-foreground")}>
                    {c.n}
                  </div>
                  <div className="mt-1 text-xs leading-tight text-muted-foreground">{c.l}</div>
                </div>
              ))}
            </div>
            <AppCTA />
            <p className="mt-5 text-center text-xs text-muted-foreground">
              Pagină independentă, realizată voluntar de comunitatea părinților elevilor de la Școala Gimnazială
              nr. 13 Botoșani. Nu este un site oficial. Informațiile provin din presă și comunicări publice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= PETIȚIE ================= */}
      <Band id="petitie" tint>
        <div className="mx-auto max-w-xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary-2))]">Petiția părinților</div>
          <div className="mt-4 font-display text-6xl font-black tracking-tighter text-[hsl(var(--primary-2))]">
            <NumberTicker value={petitie.semnaturi} />
          </div>
          <div className="text-muted-foreground">semnături din {petitie.obiectiv} (obiectiv)</div>
          <Progress value={semnPct} className="mx-auto my-5 max-w-sm" />
          <p className="text-pretty text-lg font-medium">
            „Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani, ca elevii să înceapă noul an școlar în
            școala lor!”
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ShimmerButton href={petitie.url} target="_blank" rel="noopener noreferrer">
              Semnează online
            </ShimmerButton>
            <a href={semnListUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
              Vezi semnăturile
            </a>
          </div>
          {petitie.peHartie && (
            <div className="mx-auto mt-6 max-w-lg rounded-xl border-2 border-primary/50 bg-primary/[0.07] px-5 py-4 text-left">
              <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[hsl(var(--primary-2))]">
                <span aria-hidden>📌</span> Important — semnare pe hârtie
              </div>
              <p className="text-sm font-medium">{petitie.peHartie}</p>
            </div>
          )}
        </div>
      </Band>

      {/* ================= STADIUL LUCRĂRILOR ================= */}
      <Band id="santier-stadiu">
        <Head
          kicker="Pe teren"
          title="Stadiul lucrărilor"
          subtitle="Progresul general, pe etaje, cu o evaluare a ce s-a făcut și ce a mai rămas."
        />
        <div className="mx-auto mb-8 max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-[0_1px_2px_rgba(20,25,40,.04),0_10px_30px_rgba(20,25,40,.06)]">
          <div className="font-display text-5xl font-black tracking-tight">
            <NumberTicker value={PROGRES_GENERAL} suffix="%" />
          </div>
          <div className="text-sm text-muted-foreground">progres general estimat</div>
          <Progress value={PROGRES_GENERAL} className="my-4" />
          <p className="font-semibold" style={{ color: view?.estColor }}>
            {view?.estVerdict ?? "Se calculează…"}
          </p>
          {view?.estDetail && <p className="mt-1 text-sm text-muted-foreground">{view.estDetail}</p>}
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <Card>
            <CardContent>
              <div className="pb-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                ▲ pe etaje, de sus în jos
              </div>
              <div className="flex flex-col gap-2">
                {etaje.map((e, i) => {
                  const low = e.procent < 60;
                  return (
                    <div key={i} className="relative overflow-hidden rounded-lg border border-border bg-[hsl(var(--card-2))]">
                      <div
                        className={cn("absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out", low ? "bg-bad/20" : "bg-ok/25")}
                        style={{ width: `${e.procent}%` }}
                      />
                      <div className="relative flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                        <span className="font-bold">{e.nume}</span>
                        <span className={cn("font-display text-lg font-extrabold tabular-nums", low ? "text-bad" : "text-ok")}>
                          {e.procent}%
                        </span>
                        {e.nota && <span className="w-full text-sm text-muted-foreground">{e.nota}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <EvaluareCard />
        </div>
      </Band>

      {/* ================= JURNAL FOTO/VIDEO ================= */}
      <Band id="santier" tint>
        <Head
          kicker="Documentare"
          title="Jurnal de pe șantier"
          subtitle="Poze și video de pe teren, adăugate pe măsură ce lucrările avansează, cu analiza noastră despre progres."
        />
        <SantierGallery />
        <div className="space-y-4">
          {saptamani.map((s, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
                <h3 className="font-display text-lg font-extrabold">
                  {s.titlu}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">{s.data}</span>
                </h3>
                <Badge tone={s.progres === "da" ? "done" : s.progres === "putin" ? "progress" : "bad"}>
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
      </Band>

      {/* ================= RAPORTEAZĂ ================= */}
      <Band id="raporteaza">
        <Head
          kicker="De pe teren"
          title="Ai trecut pe la școală? Spune-ne ce ai văzut"
          subtitle="Oricine poate adăuga o observație — cu sau fără poze. Le verificăm și le publicăm pe pagină."
        />
        <Card>
          <CardContent>
            <ReportForm />
          </CardContent>
        </Card>
        <div className="mt-6">
          <ParentReports />
        </div>
      </Band>

      {/* ================= DESPRE PROIECT ================= */}
      <Band id="proiect" tint>
        <Head kicker="Date publice" title="Despre proiect" subtitle="Informații publice, din presă și comunicate." />
        <Card>
          <CardContent>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {proiect.map((p, i) => (
                <div key={i} className="flex flex-col border-b border-border pb-4 last:border-b-0">
                  <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{p.eticheta}</dt>
                  <dd className="mt-0.5 font-semibold">{p.valoare}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
        <div className="mt-5">
          <h3 className="mb-3 font-display text-lg font-extrabold">Termene anunțate</h3>
          <Card>
            <CardContent className="py-2">
              {termene.map((t, i) => (
                <div key={i} className="flex flex-wrap items-center gap-3 border-b border-border py-3 last:border-b-0">
                  <span className="min-w-[10.5rem] font-bold">{t.cand}</span>
                  <Badge tone={badgeTone[t.status]}>{termenLabel[t.status] ?? "—"}</Badge>
                  <span className="text-sm text-muted-foreground">{t.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Band>

      {/* ================= CRONOLOGIE ================= */}
      <Band id="cronologie">
        <Head kicker="Istoric" title="Cronologie" />
        <Card>
          <CardContent>
            <ol className="relative ml-2 border-l-2 border-border">
              {cronologie.map((e, i) => (
                <li key={i} className="relative mb-5 pl-6 last:mb-0">
                  <span
                    className={cn(
                      "absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-[3px] border-card",
                      e.status === "done" && "bg-ok",
                      e.status === "bad" && "bg-bad",
                      e.status === "current" && "bg-primary ring-4 ring-primary/20",
                      (e.status === "none" || e.status === "progress") && "bg-muted-foreground"
                    )}
                  />
                  <span className="block text-xs font-semibold tracking-wide text-muted-foreground">{e.data}</span>
                  <span className="font-bold">{e.titlu}</span>
                  {e.detalii && <div className="mt-0.5 text-sm text-muted-foreground">{e.detalii}</div>}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </Band>

      {/* ================= CE CEREM ================= */}
      <Band id="revendicari" tint>
        <Head kicker="Cereri" title="Ce cerem" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Finalizare la 1 septembrie 2026", d: "Termenul anunțat public, astfel încât elevii să înceapă anul școlar în incinta școlii." },
            { t: "Verificare săptămânală", d: "Dreptul părinților de a vedea stadiul lucrărilor prin vizite pe șantier." },
            { t: "Informare transparentă", d: "Comunicare publică și constantă a stadiului real și a eventualelor întârzieri." },
          ].map((c, i) => (
            <Card key={i}>
              <CardContent>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-foreground font-display text-base font-extrabold text-background">
                  {i + 1}
                </div>
                <h3 className="font-bold">{c.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Band>

      {/* ================= ACTUALIZĂRI ================= */}
      <Band id="actualizari">
        <Head kicker="La zi" title="Actualizări" />
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
      </Band>

      {/* ================= DISTRIBUIE + SURSE ================= */}
      <Band id="surse" tint>
        <div className="mb-10 text-center">
          <Head kicker="Amplifică" title="Trimite mai departe" subtitle="Cu cât ajunge la mai mulți, cu atât mai bine." />
          <div className="flex justify-center">
            <ShareButtons />
          </div>
        </div>
        <h3 className="mb-3 text-center font-display text-lg font-extrabold">Surse</h3>
        <Card>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {surse.map((s, i) => (
                <li key={i} className="relative pl-5 text-sm leading-snug">
                  <span className="absolute left-0 text-primary">→</span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary-2))] underline-offset-2 hover:underline">
                    {s.text}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Band>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-5 py-8 text-center text-sm text-muted-foreground">
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
    PROGRES_GENERAL >= 95 ? "aproape finalizat" : PROGRES_GENERAL >= 75 ? "avansat, cu un punct critic" : "în întârziere";
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
          critic este <strong className="text-foreground">{slab.nume.toLowerCase()}</strong>, la{" "}
          <strong className="text-foreground">{slab.procent}%</strong> — {slab.nota}
        </p>
        <strong className="text-sm">Ce a mai rămas de făcut:</strong>
        <ul className="ml-5 mt-1 list-disc space-y-1 text-muted-foreground">
          {ramasDeFacut.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ShareButtons() {
  const [copied, setCopied] = React.useState(false);
  const share = (net: "fb" | "wa") => {
    const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
    const txt = "Susține finalizarea lucrărilor la Școala 13 Botoșani:";
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
    <div className="flex flex-wrap justify-center gap-3">
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
