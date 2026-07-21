"use client";

import * as React from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

export function SantierUpload() {
  const [open, setOpen] = React.useState(false);
  const [secret, setSecret] = React.useState("");
  const [date, setDate] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, setState] = React.useState<"idle" | "up" | "err">("idle");
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    try {
      const s = localStorage.getItem("admin-secret");
      if (s) setSecret(s);
    } catch {}
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!secret) return setMsg("Introdu parola.");
    if (!date) return setMsg("Alege data.");
    if (files.length === 0) return setMsg("Alege pozele.");
    setState("up");
    setMsg("");
    const folder = `scoala13/santier/${date}`;
    let ok = 0;
    for (const f of files) {
      try {
        const fd = new FormData();
        fd.append("file", f);
        fd.append("folder", folder);
        const res = await fetch("/api/upload", { method: "POST", headers: { "x-notify-secret": secret }, body: fd });
        if (res.status === 401) {
          setState("err");
          setMsg("Parolă greșită.");
          return;
        }
        if (res.ok) ok++;
      } catch {}
    }
    try {
      localStorage.setItem("admin-secret", secret);
    } catch {}
    setMsg(`Urcate ${ok}/${files.length}. Se reîncarcă pagina…`);
    setTimeout(() => location.reload(), 900);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-bold hover:bg-muted"
      >
        <ImagePlus className="h-4 w-4" /> Adaugă poze de pe șantier
      </button>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">Adaugă poze de pe șantier</h3>
        <button onClick={() => setOpen(false)} aria-label="Închide" className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Data pozelor</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Parola (de administrator)</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="parola ta"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Poze / video</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
            className="block w-full text-sm"
          />
          {files.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{files.length} fișiere alese</p>}
        </div>
        <button
          disabled={state === "up"}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {state === "up" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {state === "up" ? "Se urcă…" : "Urcă pozele"}
        </button>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </form>
    </div>
  );
}
