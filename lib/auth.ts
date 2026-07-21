import { timingSafeEqual } from "crypto";

// Verifică antetul x-notify-secret în timp constant (rezistent la timing attacks).
export function authorized(req: Request): boolean {
  const secret = process.env.NOTIFY_SECRET;
  const provided = req.headers.get("x-notify-secret");
  if (!secret || !provided) return false;
  const a = Buffer.from(secret, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
