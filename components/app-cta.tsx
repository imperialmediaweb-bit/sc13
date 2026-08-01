"use client";

import * as React from "react";
import { Smartphone, Share, CheckCircle2 } from "lucide-react";
import { NotifyButton } from "@/components/notify-button";
import { subscribeToPush, isSubscribed } from "@/lib/push";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function AppCTA() {
  const [deferred, setDeferred] = React.useState<BIPEvent | null>(null);
  const [installed, setInstalled] = React.useState(false);
  const [iosHint, setIosHint] = React.useState(false);

  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    if (standalone) {
      setInstalled(true);
      // Aplicația e instalată: dacă permisiunea de notificări e deja dată dar
      // abonamentul lipsește (expirat/șters), ne reabonăm automat — ca toți cei
      // cu aplicația instalată să primească notificările.
      if ("Notification" in window && Notification.permission === "granted") {
        isSubscribed().then((sub) => {
          if (!sub) subscribeToPush().catch(() => {});
        });
      }
    }

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    const onInstalled = () => {
      setInstalled(true);
      try {
        localStorage.setItem("pwa-installed", "1");
      } catch {}
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "install" }),
      }).catch(() => {});
      // cere permisiunea de notificări odată cu instalarea
      subscribeToPush().catch(() => {});
    };
    window.addEventListener("appinstalled", onInstalled);

    const ua = window.navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios|chrome/i.test(ua)) {
      setIosHint(true);
    }
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    // dacă a acceptat instalarea, cerem și permisiunea de notificări (odată cu instalarea)
    if (choice?.outcome === "accepted") {
      subscribeToPush().catch(() => {});
    }
  };

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/[0.08] to-transparent p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Smartphone className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-extrabold">Pune pagina pe telefon și primești notificări</h3>
          <p className="text-sm text-muted-foreground">
            Instaleaz-o pe ecranul principal, ca o aplicație, și primești o notificare la fiecare actualizare
            despre lucrări.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {installed ? (
            <span className="inline-flex items-center gap-2 rounded-md border border-ok/40 bg-ok-soft px-3 py-2 text-sm font-bold text-ok">
              <CheckCircle2 className="h-4 w-4" /> Instalată
            </span>
          ) : (
            !iosHint && (
              <button
                onClick={install}
                disabled={!deferred}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-px hover:brightness-105 disabled:cursor-default disabled:opacity-60"
                title={deferred ? "" : "Deschide meniul browserului → „Adaugă pe ecranul principal”"}
              >
                <Smartphone className="h-4 w-4" /> Instalează pe telefon
              </button>
            )
          )}
          <NotifyButton />
        </div>
      </div>

      {iosHint && !installed && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-card p-3.5 text-sm">
          <p className="flex items-center gap-1.5 font-semibold">
            <Share className="h-4 w-4 text-primary" /> Pe iPhone, în 2 pași:
          </p>
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>
              Apasă butonul de partajare din bara Safari, apoi <strong>„Adaugă pe ecranul principal”</strong>.
            </li>
            <li>
              Deschide aplicația de pe ecranul principal și apasă <strong>„Primește notificări”</strong> — pe
              iPhone notificările se pot activa doar din aplicația instalată.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
