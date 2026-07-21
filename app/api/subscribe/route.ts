import { NextResponse } from "next/server";
import { addSub, removeSub } from "@/lib/subs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const sub = await req.json();
    if (!sub || !sub.endpoint) {
      return NextResponse.json({ error: "Abonament invalid" }, { status: 400 });
    }
    await addSub(sub);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { endpoint } = await req.json();
    if (endpoint) await removeSub(endpoint);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}
