"use client";

import * as React from "react";
import { Bell, BellRing, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

type State = "idle" | "unsupported" | "subscribed" | "busy" | "denied" | "error";

export function NotifyButton() {
  const [state, setState] = React.useState<State>("idle");
  const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window) || !vapid) {
      setState("unsupported");
      return;
    }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => {
        if (sub) setState("subscribed");
        if (Notification.permission === "denied") setState("denied");
      })
      .catch(() => {});
  }, [vapid]);

  const subscribe = async () => {
    if (!vapid) return;
    setState("busy");
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setState(perm === "denied" ? "denied" : "idle");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid),
      });
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      setState(res.ok ? "subscribed" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "unsupported") return null;

  const disabled = state === "busy" || state === "subscribed" || state === "denied";
  const label =
    state === "subscribed"
      ? "Ești abonat la notificări"
      : state === "busy"
      ? "Se activează…"
      : state === "denied"
      ? "Notificări blocate în browser"
      : state === "error"
      ? "A apărut o eroare — încearcă din nou"
      : "Primește notificări la actualizări";

  const Icon = state === "subscribed" ? BellRing : state === "denied" ? BellOff : Bell;

  return (
    <button
      onClick={subscribe}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition-colors",
        state === "subscribed"
          ? "border-ok/40 bg-ok-soft text-ok"
          : "border-border bg-card hover:bg-muted disabled:opacity-60"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
