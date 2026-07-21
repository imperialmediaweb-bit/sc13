"use client";

import * as React from "react";
import { Bell, BellRing, BellOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { subscribeToPush, unsubscribeFromPush, isSubscribed } from "@/lib/push";

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
    if ("Notification" in window && Notification.permission === "denied") {
      setState("denied");
      return;
    }
    isSubscribed().then((sub) => sub && setState("subscribed"));
  }, [vapid]);

  const toggle = async () => {
    if (state === "subscribed") {
      setState("busy");
      await unsubscribeFromPush();
      setState("idle");
      return;
    }
    setState("busy");
    const r = await subscribeToPush();
    setState(r === "ok" ? "subscribed" : r === "denied" ? "denied" : r === "unsupported" ? "unsupported" : "error");
  };

  if (state === "unsupported") return null;

  const label =
    state === "subscribed"
      ? "Notificări active — dezactivează"
      : state === "busy"
      ? "Se procesează…"
      : state === "denied"
      ? "Notificări blocate în browser"
      : state === "error"
      ? "Eroare — încearcă din nou"
      : "Primește notificări la actualizări";

  const Icon =
    state === "busy" ? Loader2 : state === "subscribed" ? BellRing : state === "denied" ? BellOff : Bell;

  return (
    <button
      onClick={toggle}
      disabled={state === "busy" || state === "denied"}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition-colors",
        state === "subscribed"
          ? "border-ok/40 bg-ok-soft text-ok hover:bg-ok/10"
          : "border-border bg-card hover:bg-muted disabled:opacity-60"
      )}
    >
      <Icon className={cn("h-4 w-4", state === "busy" && "animate-spin")} />
      {label}
    </button>
  );
}
