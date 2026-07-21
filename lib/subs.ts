import type { PushSubscription } from "web-push";
import { getPool, ensureTables } from "@/lib/db";

export async function addSub(sub: PushSubscription): Promise<void> {
  await ensureTables();
  await getPool().query(
    `INSERT INTO push_subs (endpoint, data) VALUES ($1, $2)
     ON CONFLICT (endpoint) DO UPDATE SET data = EXCLUDED.data`,
    [sub.endpoint, JSON.stringify(sub)]
  );
}

export async function removeSub(endpoint: string): Promise<void> {
  await ensureTables();
  await getPool().query(`DELETE FROM push_subs WHERE endpoint = $1`, [endpoint]);
}

export async function allSubs(): Promise<PushSubscription[]> {
  await ensureTables();
  const { rows } = await getPool().query(`SELECT data FROM push_subs`);
  return rows.map((r) => r.data as PushSubscription);
}
