import webpush from "web-push";
import { allSubs, removeSub } from "@/lib/subs";

// Configurează VAPID; întoarce false dacă nu sunt cheile setate.
export function pushConfigured(): boolean {
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:contact@example.com", pub, priv);
  return true;
}

export type NotifyPayload = { title?: string; body?: string; url?: string };
export type NotifyResult = { ok: boolean; sent: number; removed: number; total: number };

// Trimite o notificare tuturor abonaților. Curăță abonamentele expirate (404/410).
export async function notifyAll(payload: NotifyPayload): Promise<NotifyResult> {
  if (!pushConfigured()) return { ok: false, sent: 0, removed: 0, total: 0 };

  const message = JSON.stringify({
    title: payload.title || "Școala 13 — actualizare",
    body: payload.body || "Este o actualizare nouă pe pagina de monitorizare.",
    url: payload.url || "/#actualizari",
  });

  const subs = await allSubs();
  let sent = 0;
  let removed = 0;
  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(sub, message);
        sent++;
      } catch (err: unknown) {
        const status = (err as { statusCode?: number })?.statusCode;
        if (status === 404 || status === 410) {
          await removeSub(sub.endpoint);
          removed++;
        }
      }
    })
  );

  return { ok: true, sent, removed, total: subs.length };
}
