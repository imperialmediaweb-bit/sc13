"use client";

import * as React from "react";
import { Report } from "@/lib/reports";

const isVideo = (p: string) => /\.(mp4|webm|mov|m4v|ogg)$/i.test(p);

export default function Admin() {
  const [secret, setSecret] = React.useState("");
  const [authed, setAuthed] = React.useState(false);
  const [reports, setReports] = React.useState<Report[]>([]);
  const [stats, setStats] = React.useState<{ installs: number; abonati: number; reports: { total: number; published: number } } | null>(null);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const s = localStorage.getItem("admin-secret");
    if (s) {
      setSecret(s);
      load(s);
    }
  }, []);

  async function load(s: string) {
    const res = await fetch("/api/report", { headers: { "x-notify-secret": s } });
    if (res.ok) {
      const data = await res.json();
      setReports(data.reports);
      setAuthed(true);
      localStorage.setItem("admin-secret", s);
      fetch("/api/stats", { headers: { "x-notify-secret": s } })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && setStats(d))
        .catch(() => {});
    } else {
      setAuthed(false);
      setMsg("Secret greșit.");
    }
  }

  async function act(method: "PATCH" | "DELETE", body: object) {
    await fetch("/api/report", {
      method,
      headers: { "Content-Type": "application/json", "x-notify-secret": secret },
      body: JSON.stringify(body),
    });
    load(secret);
  }

  // --- Upload poze de șantier, pe dată ---
  const [upDate, setUpDate] = React.useState("");
  const [upFiles, setUpFiles] = React.useState<File[]>([]);
  const [upState, setUpState] = React.useState<"idle" | "up" | "done">("idle");
  const [upMsg, setUpMsg] = React.useState("");

  async function uploadSantier(e: React.FormEvent) {
    e.preventDefault();
    if (!upDate) {
      setUpMsg("Alege data.");
      return;
    }
    if (upFiles.length === 0) {
      setUpMsg("Alege pozele/video.");
      return;
    }
    setUpState("up");
    setUpMsg("");
    const folder = `scoala13/santier/${upDate}`;
    let ok = 0;
    for (const f of upFiles) {
      try {
        const fd = new FormData();
        fd.append("file", f);
        fd.append("folder", folder);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-notify-secret": secret },
          body: fd,
        });
        if (res.ok) ok++;
      } catch {}
    }
    setUpState("done");
    setUpFiles([]);
    setUpMsg(`Urcate ${ok}/${upFiles.length} fișiere în ${folder}. Apar automat pe pagină.`);
  }

  async function sendNotify(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-notify-secret": secret },
      body: JSON.stringify({
        title: fd.get("title") || undefined,
        body: fd.get("body") || undefined,
        url: fd.get("url") || undefined,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setMsg(res.ok ? `Notificare trimisă la ${data.sent ?? 0} abonați.` : "Eroare la trimitere.");
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-3 p-6">
        <h1 className="font-display text-2xl font-extrabold">Administrare — Școala 13</h1>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Secretul (NOTIFY_SECRET)"
          className="rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        />
        <button onClick={() => load(secret)} className="rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground">
          Intră
        </button>
        {msg && <p className="text-sm text-bad">{msg}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-5">
      <h1 className="font-display text-2xl font-extrabold">Administrare — Școala 13</h1>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: stats?.installs, l: "instalări (PWA)" },
          { n: stats?.abonati, l: "abonați notificări" },
          { n: stats?.reports.total, l: "rapoarte primite" },
          { n: stats?.reports.published, l: "rapoarte publicate" },
        ].map((c, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4 text-center">
            <div className="font-display text-3xl font-bold tabular-nums">{c.n ?? "…"}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.l}</div>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-2 font-bold">Urcă poze / video de pe șantier (pe dată)</h2>
        <form onSubmit={uploadSantier} className="space-y-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Data pozelor</label>
            <input
              type="date"
              value={upDate}
              onChange={(e) => setUpDate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setUpFiles(e.target.files ? Array.from(e.target.files) : [])}
            className="block w-full text-sm"
          />
          {upFiles.length > 0 && (
            <p className="text-xs text-muted-foreground">{upFiles.length} fișiere alese</p>
          )}
          <button
            disabled={upState === "up"}
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {upState === "up" ? "Se urcă…" : "Urcă pe pagină"}
          </button>
        </form>
        {upMsg && <p className="mt-2 text-sm text-muted-foreground">{upMsg}</p>}
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-2 font-bold">Trimite notificare tuturor abonaților</h2>
        <form onSubmit={sendNotify} className="space-y-2">
          <input name="title" placeholder="Titlu (ex: Școala 13 — update)" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          <input name="body" placeholder="Text (ex: S-a montat gresia la parter)" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          <input name="url" placeholder="Link (opțional, ex: /#santier)" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Trimite notificarea</button>
        </form>
        {msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
      </section>

      <section className="space-y-3">
        <h2 className="font-bold">Rapoarte primite ({reports.length})</h2>
        {reports.length === 0 && <p className="text-sm text-muted-foreground">Niciun raport încă.</p>}
        {reports.map((r) => (
          <div key={r.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <strong>{r.nume}</strong>
              {r.dataVizita && <span className="text-muted-foreground">· vizită: {r.dataVizita}</span>}
              <span className="text-muted-foreground">· trimis: {new Date(r.createdAt).toLocaleString("ro-RO")}</span>
              {r.published ? (
                <span className="rounded bg-ok-soft px-2 py-0.5 text-xs font-bold text-ok">PUBLICAT</span>
              ) : (
                <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">în așteptare</span>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap">{r.mesaj}</p>
            {r.media.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {r.media.map((m, i) =>
                  isVideo(m) ? (
                    <video key={i} src={m} controls className="aspect-[4/3] w-full rounded object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <a key={i} href={m} target="_blank" rel="noopener noreferrer">
                      <img src={m} alt="" className="aspect-[4/3] w-full rounded object-cover" />
                    </a>
                  )
                )}
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => act("PATCH", { id: r.id, published: !r.published })}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground"
              >
                {r.published ? "Retrage de pe pagină" : "Publică pe pagină"}
              </button>
              <button
                onClick={() => confirm("Ștergi raportul?") && act("DELETE", { id: r.id })}
                className="rounded-md border border-border px-3 py-1.5 text-sm font-bold text-bad"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
