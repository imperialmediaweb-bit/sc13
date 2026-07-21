"use client";

import * as React from "react";
import { Download, X, Share } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallPrompt() {
  const [deferred, setDeferred] = React.useState<BIPEvent | null>(null);
  const [show, setShow] = React.useState(false);
  const [iosHint, setIosHint] = React.useState(false);

  React.useEffect(() => {
    // Înregistrează service worker-ul
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const dismissed = (() => {
      try {
        return localStorage.getItem("pwa-dismissed") === "1";
      } catch {
        return false;
      }
    })();

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS
      window.navigator.standalone === true;
    if (standalone || dismissed) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    // iOS Safari nu emite beforeinstallprompt
    const ua = window.navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /safari/i.test(ua) && !/crios|fxios|chrome/i.test(ua);
    if (isIOS && isSafari) {
      setIosHint(true);
      setShow(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  };

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("pwa-dismissed", "1");
    } catch {}
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md p-3">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-lg shadow-black/10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <div className="font-bold">Pune aplicația pe telefon</div>
          {iosHint ? (
            <div className="flex items-center gap-1 text-muted-foreground">
              Apasă <Share className="inline h-3.5 w-3.5" /> apoi „Adaugă pe ecranul principal”.
            </div>
          ) : (
            <div className="text-muted-foreground">Acces rapid, ca o aplicație obișnuită.</div>
          )}
        </div>
        {!iosHint && (
          <button
            onClick={install}
            className="shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground hover:brightness-105"
          >
            Instalează
          </button>
        )}
        <button onClick={dismiss} aria-label="Închide" className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
