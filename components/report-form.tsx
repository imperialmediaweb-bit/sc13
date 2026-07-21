"use client";

import * as React from "react";
import { Send, Upload, CheckCircle2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("upload");
  const data = await res.json();
  return data.url as string;
}

export function ReportForm() {
  const [nume, setNume] = React.useState("");
  const [dataVizita, setDataVizita] = React.useState("");
  const [mesaj, setMesaj] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [state, setState] = React.useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = React.useState("");
  const canUpload = true;

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 8));
  };
  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, j) => j !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mesaj.trim() && files.length === 0) {
      setErr("Scrie ceva sau adaugă cel puțin o poză.");
      return;
    }
    setState("sending");
    setErr("");
    try {
      let media: string[] = [];
      if (files.length) {
        media = await Promise.all(files.map(uploadFile));
      }
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nume, dataVizita, mesaj, media }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      setNume("");
      setDataVizita("");
      setMesaj("");
      setFiles([]);
    } catch {
      setState("error");
      setErr("Nu s-a putut trimite. Încearcă din nou.");
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-ok/40 bg-ok-soft p-4 text-ok">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <div className="font-bold">Mulțumim! Raportul a fost trimis.</div>
          <p className="text-sm opacity-90">
            Îl verificăm și, dacă e cazul, îl adăugăm pe pagină (în cronologie, actualizări sau jurnal).
          </p>
          <button
            onClick={() => setState("idle")}
            className="mt-2 text-sm font-bold underline underline-offset-2"
          >
            Trimite alt raport
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold">Numele tău (opțional)</label>
          <input
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            placeholder="Lasă gol pentru „Anonim”"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Data când ai fost la școală</label>
          <input
            type="date"
            value={dataVizita}
            onChange={(e) => setDataVizita(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Ce ai văzut pe șantier? *</label>
        <textarea
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
          rows={4}
          placeholder="Ex.: Azi nu lucra nimeni. / S-a montat gresia la parter. / Se lucrează la sala de sport…"
          className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {canUpload ? (
        <div>
          <label className="mb-1 block text-sm font-semibold">Poze / video (dacă ai fost acolo)</label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-border px-3 py-4 text-sm text-muted-foreground hover:bg-muted">
            <Upload className="h-4 w-4" />
            Alege poze sau video
            <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={onPick} />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between rounded-md bg-muted px-3 py-1.5 text-xs">
                  <span className="truncate">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} aria-label="Elimină">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          (Încărcarea de poze se activează după ce se configurează Cloudinary. Poți trimite oricând raportul
          text.)
        </p>
      )}

      {err && <p className="text-sm text-bad">{err}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-px hover:brightness-105 disabled:opacity-60"
        )}
      >
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {state === "sending" ? "Se trimite…" : "Trimite raportul"}
      </button>
    </form>
  );
}
