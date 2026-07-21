import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function configured() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) return false;
  cloudinary.config({ cloud_name: cloud, api_key: key, api_secret: secret });
  return true;
}

// Primește un fișier (poză/video) și îl urcă pe Cloudinary; secretul rămâne pe server.
export async function POST(req: Request) {
  if (!configured()) {
    return NextResponse.json({ error: "Cloudinary neconfigurat" }, { status: 501 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Lipsește fișierul" }, { status: 400 });
    }
    if (file.size > 60 * 1024 * 1024) {
      return NextResponse.json({ error: "Fișier prea mare (max 60 MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "scoala13/rapoarte", resource_type: "auto" },
        (err, res) => (err || !res ? reject(err) : resolve(res as { secure_url: string }))
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json({ error: "Încărcare eșuată" }, { status: 500 });
  }
}
