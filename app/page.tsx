"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
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
  return (
    <section id={id} className="scroll-mt-24 pt-8">
      <Reveal>
        <h2 className="mb-4 flex items-center gap-2.5 font-display text-xl font-bold sm:text-2xl">
          <span aria-hidden className="h-6 w-1.5 rounded-full bg-primary" />
          {title}
        </h2>
        {plain ? (
          children
        ) : (
          <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,25,40,.04),0_10px_28px_rgba(20,25,40,.06)] transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(20,25,40,.06),0_18px_44px_rgba(20,25,40,.10)] sm:p-6">
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

    if (prog >= 100) {
      estVerdict = "Lucrările sunt raportate ca finalizate.";
      estColor = "hsl(var(--ok))";
      sanse = 100;
    } else if (ritm <= 0) {
      estVerdict = "La ritmul actual raportat, nu se poate estima o dată de finalizare.";
      estColor = "hsl(var(--bad))";
      estDetail = `Nu s-a raportat progres față de săptămâna anterioară. Rest de executat: ${ramas}%. Zile până la termen: ${zile}.`;
      sanse = 12;
    } else {
      const saptNecesare = Math.ceil(ramas / ritm);
      const finalMs = now + saptNecesare * 7 * 86400000;
      const laTimp = finalMs <= deadline;
      dataFinal = new Date(finalMs).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      // șanse orientative: 50% dacă exact la termen, +/- în funcție de zile diferență și de progres
      const diffZile = Math.round((deadline - finalMs) / 86400000);
      sanse = Math.max(5, Math.min(95, Math.round(50 + diffZile * 3.5 + (prog - 80) * 0.4)));
      estVerdict = laTimp
        ? "La ritmul actual, lucrările s-ar încadra în termenul anunțat."
        : "La ritmul actual, finalizarea ar depăși termenul anunțat.";
      estColor = laTimp ? "hsl(var(--ok))" : "hsl(var(--bad))";
      estDetail = `Ritm raportat: ${ritm}% pe săptămână · Rest de executat: ${ramas}% · Dată realistă estimată de finalizare: ${dataFinal}.`;
    }

    setView({ zile: Math.abs(zile), overdue: zile < 0, estVerdict, estColor, estDetail, sanse, dataFinal });
  }, []);

  const [sig, setSig] = React.useState(petitie.semnaturi);
  const [dbUpdates, setDbUpdates] = React.useState<{ id: string; data: string; text: string }[]>([]);
  React.useEffect(() => {
    fetch("/api/signatures")
      .then((r) => r.json())
      .then((d) => typeof d.count === "number" && setSig(d.count))
      .catch(() => {});
    fetch("/api/updates")
      .then((r) => r.json())
      .then((d) => Array.isArray(d.updates) && setDbUpdates(d.updates))
      .catch(() => {});
  }, []);

  const semnPct = Math.min(100, Math.round((sig / petitie.obiectiv) * 100));
  const semnListUrl = petitie.url.replace("/finalizati", "/signatures/finalizati") + "/";

  return (
    <main>
      {/* ===== Antet închis cu accent portocaliu ===== */}
      <header className="relative overflow-hidden border-b-[3px] border-primary bg-[#14151a] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(70% 60% at 85% -10%, rgba(224,145,46,.28), transparent 70%)" }}
        />
        <div className="relative mx-auto flex max-w-4xl items-center justify-between px-5 py-2.5 text-xs">
          <span className="font-semibold uppercase tracking-wide text-[#d9a15a]">Monitorizare civică · Botoșani</span>
          <ThemeToggle />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pb-9 pt-4">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#e6a34f] ring-1 ring-white/15">
            Școala Gimnazială nr. 13 Botoșani
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
            Stadiul lucrărilor de reabilitare
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Pagină de informare realizată de comunitatea părinților. Urmărim public stadiul lucrărilor,
            termenele anunțate și documentăm progresul cu poze de pe șantier.
          </p>

          {/* bandă de date esențiale */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: view ? String(view.zile) : "—", l: view?.overdue ? "zile peste termen" : "zile până la termen", warn: view?.overdue },
              { v: "1 sept. 2026", l: "termenul anunțat" },
              { v: PROGRES_GENERAL + "%", l: "progres general estimat" },
              { v: "~14 mil.", l: "finanțare PNRR (lei)" },
            ].map((c, i) => (
              <div key={i} className="rounded-lg bg-white/12 p-4 text-center ring-1 ring-white/15 backdrop-blur-sm">
                <div className={cn("font-display text-2xl font-bold tnum", c.warn ? "text-[#ffb4a8]" : "text-white")}>{c.v}</div>
                <div className="mt-0.5 text-xs text-white/75">{c.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#petitie"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-px hover:brightness-105"
            >
              Semnează petiția
            </a>
            <a
              href="#jurnal"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/40 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Jurnalul de pe șantier
            </a>
          </div>
        </div>
      </header>

      {/* ===== Conținut ===== */}
      <div className="mx-auto max-w-4xl px-5 pb-10">
        {/* PETIȚIE */}
        <Section id="petitie" title="Petiția părinților">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="rounded-lg bg-[hsl(var(--card-2))] p-5 text-center sm:w-56">
              <div className="font-display text-5xl font-bold text-primary tnum">{sig}</div>
              <div className="text-sm text-muted-foreground">semnături din {petitie.obiectiv}</div>
              <Progress value={semnPct} className="mt-3 h-2" />
            </div>
            <div>
              <p className="italic text-muted-foreground">
                „Finalizați lucrările la Școala Gimnazială nr. 13 Botoșani, ca elevii să înceapă noul an
                școlar în școala lor!”
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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
              {petitie.peHartie && (
                <div className="mt-4 rounded-md border-l-4 border-primary bg-[hsl(var(--card-2))] px-4 py-3">
                  <p className="text-sm">
                    <strong>Semnare pe hârtie:</strong> {petitie.peHartie}
                  </p>
                </div>
              )}
            </div>
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
                  const low = e.procent < 60;
                  return (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">{e.nume}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold tnum", low ? "text-bad" : "text-ok")}>{e.procent}%</span>
                          <Progress value={e.procent} tone={low ? "bad" : "primary"} className="h-1.5 flex-1" />
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{e.nota}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                Șanse ca elevii să înceapă anul școlar la <strong>1 septembrie 2026</strong> în școala
                reabilitată.
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
        <Section id="revendicari" title="Ce cerem" plain>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Finalizarea până la 1 septembrie 2026",
                d: "termenul anunțat public, astfel încât elevii să înceapă anul școlar în incinta școlii.",
              },
              {
                t: "Verificare săptămânală",
                d: "vizite pe șantier ale părinților, alături de reprezentanții Primăriei și ai constructorului.",
              },
              {
                t: "Informare transparentă",
                d: "comunicare publică și constantă a stadiului real și a eventualelor întârzieri.",
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
