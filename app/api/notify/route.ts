import { NextResponse } from "next/server";
import webpush from "web-push";
import { allSubs, removeSub } from "@/lib/subs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function configured() {
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:contact@example.com", pub, priv);
  return true;
}

/**
 * Trimite o notificare tuturor abonaților.
 * Protejat cu NOTIFY_SECRET (antet `x-notify-secret` sau câmpul `secret`).
 * Body: { title?, body?, url?, secret? }
 */
export async function POST(req: Request) {
  if (!configured()) {
    return NextResponse.json({ error: "VAPID neconfigurat pe server" }, { status: 500 });
  }
  const secret = process.env.NOTIFY_SECRET;
  let payload: { title?: string; body?: string; url?: string; secret?: string } = {};
  try {
    payload = await req.json();
  } catch {}
  const provided = req.headers.get("x-notify-secret") || payload.secret;
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

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

  return NextResponse.json({ ok: true, sent, removed, total: subs.length });
}
