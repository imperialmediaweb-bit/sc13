import { promises as fs } from "fs";
import path from "path";
import type { PushSubscription } from "web-push";

// Fișierul cu abonamentele. Pe Railway, pentru persistență la redeploy,
// setați SUBS_FILE către un volum montat (ex. /data/subs.json).
const FILE = process.env.SUBS_FILE || path.join(process.cwd(), ".data", "subs.json");

async function readAll(): Promise<PushSubscription[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as PushSubscription[];
  } catch {
    return [];
  }
}

async function writeAll(subs: PushSubscription[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(subs), "utf8");
}

export async function addSub(sub: PushSubscription): Promise<void> {
  const subs = await readAll();
  if (!subs.some((s) => s.endpoint === sub.endpoint)) {
    subs.push(sub);
    await writeAll(subs);
  }
}

export async function removeSub(endpoint: string): Promise<void> {
  const subs = await readAll();
  await writeAll(subs.filter((s) => s.endpoint !== endpoint));
}

export async function allSubs(): Promise<PushSubscription[]> {
  return readAll();
}
