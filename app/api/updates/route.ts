import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addUpdate, listUpdates, deleteUpdate } from "@/lib/updates";
import { correctGrammar } from "@/lib/correct";
import { authorized } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


// Public — actualizările afișate pe pagină.
export async function GET() {
  try {
    return NextResponse.json({ updates: await listUpdates() });
  } catch {
    return NextResponse.json({ updates: [] });
  }
}

// Admin — adaugă o actualizare.
export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  try {
    const body = await req.json();
    const raw = String(body?.text || "").trim();
    if (!raw) return NextResponse.json({ error: "Scrie textul actualizării." }, { status: 400 });
    const data = String(body?.data || "").trim().slice(0, 40);
    // corectare gramaticală automată (dacă e configurat ANTHROPIC_API_KEY)
    const text = await correctGrammar(raw.slice(0, 2000));
    await addUpdate({ id: randomUUID(), createdAt: new Date().toISOString(), data, text });
    return NextResponse.json({ ok: true, text });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}

// Admin — șterge o actualizare.
export async function DELETE(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  try {
    const { id } = await req.json();
    if (id) await deleteUpdate(String(id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}
