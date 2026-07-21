import { NextResponse } from "next/server";
import { getSetting, setSetting } from "@/lib/settings";
import { authorized } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["semnaturi"]);

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const semnaturi = await getSetting("semnaturi");
  return NextResponse.json({ semnaturi: semnaturi ? Number(semnaturi) : null });
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  try {
    const { key, value } = await req.json();
    if (!ALLOWED.has(String(key))) {
      return NextResponse.json({ error: "Setare necunoscută" }, { status: 400 });
    }
    const n = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
    if (!Number.isFinite(n) || n < 0) {
      return NextResponse.json({ error: "Valoare invalidă" }, { status: 400 });
    }
    await setSetting(String(key), String(n));
    return NextResponse.json({ ok: true, value: n });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}
