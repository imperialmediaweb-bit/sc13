import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addReport, readReports, setPublished, deleteReport } from "@/lib/reports";
import { authorized } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Primește un raport de la un părinte (text obligatoriu, poze/video opționale).
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mesaj = String(body?.mesaj || "").trim();
    if (!mesaj) {
      return NextResponse.json({ error: "Scrie ce ai văzut pe șantier." }, { status: 400 });
    }
    const nume = String(body?.nume || "").trim().slice(0, 80) || "Anonim";
    const dataVizita = String(body?.dataVizita || "").trim().slice(0, 40);
    const media = Array.isArray(body?.media)
      ? body.media.filter((u: unknown) => typeof u === "string").slice(0, 8)
      : [];

    await addReport({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      dataVizita,
      nume,
      mesaj: mesaj.slice(0, 4000),
      media,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}

// Citirea tuturor rapoartelor (pentru moderare) — protejat cu NOTIFY_SECRET.
export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  return NextResponse.json({ reports: await readReports() });
}

// Publică / retrage un raport — protejat.
export async function PATCH(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  try {
    const { id, published } = await req.json();
    if (!id) return NextResponse.json({ error: "Lipsește id" }, { status: 400 });
    await setPublished(String(id), Boolean(published));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}

// Șterge un raport — protejat.
export async function DELETE(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Lipsește id" }, { status: 400 });
    await deleteReport(String(id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}
