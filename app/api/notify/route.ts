import { NextResponse } from "next/server";
import { authorized } from "@/lib/auth";
import { pushConfigured, notifyAll } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Trimite o notificare tuturor abonaților.
 * Protejat cu NOTIFY_SECRET (antet `x-notify-secret`, comparație în timp constant).
 * Body: { title?, body?, url? }
 */
export async function POST(req: Request) {
  if (!pushConfigured()) {
    return NextResponse.json({ error: "VAPID neconfigurat pe server" }, { status: 500 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  let payload: { title?: string; body?: string; url?: string } = {};
  try {
    payload = await req.json();
  } catch {}

  const result = await notifyAll(payload);
  return NextResponse.json(result);
}
