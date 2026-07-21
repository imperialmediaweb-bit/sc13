import { NextResponse } from "next/server";
import { incrementCounter } from "@/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["install", "visit"]);

// Înregistrează un eveniment (ex. instalare PWA). Public, dar acceptă doar evenimente cunoscute.
export async function POST(req: Request) {
  try {
    const { event } = await req.json();
    const name = String(event || "");
    if (!ALLOWED.has(name)) {
      return NextResponse.json({ error: "Eveniment necunoscut" }, { status: 400 });
    }
    await incrementCounter(name);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
