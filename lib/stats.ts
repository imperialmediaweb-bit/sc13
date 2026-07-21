import { getPool, ensureTables } from "@/lib/db";

export async function incrementCounter(name: string): Promise<void> {
  await ensureTables();
  await getPool().query(
    `INSERT INTO counters (name, value) VALUES ($1, 1)
     ON CONFLICT (name) DO UPDATE SET value = counters.value + 1`,
    [name]
  );
}

export async function getCounter(name: string): Promise<number> {
  await ensureTables();
  const { rows } = await getPool().query(`SELECT value FROM counters WHERE name = $1`, [name]);
  return rows.length ? Number(rows[0].value) : 0;
}

export async function countSubscribers(): Promise<number> {
  await ensureTables();
  const { rows } = await getPool().query(`SELECT COUNT(*)::int AS c FROM push_subs`);
  return rows[0]?.c ?? 0;
}

export async function countReports(): Promise<{ total: number; published: number }> {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE published)::int AS published FROM reports`
  );
  return { total: rows[0]?.total ?? 0, published: rows[0]?.published ?? 0 };
}
