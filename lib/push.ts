// Abonare la notificări push — folosită la instalare și de butonul separat.

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export type PushResult = "ok" | "denied" | "unsupported" | "error";

export async function isSubscribed(): Promise<boolean> {
  try {
    if (!("serviceWorker" in navigator)) return false;
    const reg = await navigator.serviceWorker.ready;
    return !!(await reg.pushManager.getSubscription());
  } catch {
    return false;
  }
}

// Dezactivează notificările (dezabonare).
export async function unsubscribeFromPush(): Promise<boolean> {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      const endpoint = sub.endpoint;
      await sub.unsubscribe();
      await fetch("/api/subscribe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint }),
      }).catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

export async function subscribeToPush(): Promise<PushResult> {
  const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("Notification" in window) ||
    !vapid
  ) {
    return "unsupported";
  }
  try {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return perm === "denied" ? "denied" : "error";

    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    const sub =
      existing ||
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid) as unknown as BufferSource,
      }));

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
