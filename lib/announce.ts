import { createHash } from "crypto";
import { actualizari } from "@/lib/data";
import { claimOnce } from "@/lib/settings";
import { notifyAll } from "@/lib/notify";

/**
 * Trimite notificare pentru actualizările scrise direct în cod (lib/data.ts),
 * nu doar pentru cele publicate din /admin.
 *
 * Fiecare actualizare are o amprentă unică (dată + text). La prima încărcare a
 * paginii după un deploy, cele noi sunt anunțate o singură dată — `claimOnce`
 * garantează asta chiar dacă rulează mai multe instanțe în paralel.
 *
 * Prima rulare pe o bază de date goală nu trimite nimic: doar marchează
 * actualizările existente ca știute, ca să nu se trimită retroactiv zeci de
 * notificări pentru istoricul deja publicat.
 */
export async function announceStaticUpdates(): Promise<void> {
  if (!process.env.DATABASE_URL) return;

  const amprenta = (u: { data: string; text: string }) =>
    "anunt_" + createHash("sha1").update(u.data + "|" + u.text).digest("hex").slice(0, 16);

  // Prima rulare: marcăm tot ce există acum, fără să notificăm.
  const primaRulare = await claimOnce("anunturi_initializate");
  if (primaRulare) {
    await Promise.all(actualizari.map((u) => claimOnce(amprenta(u))));
    return;
  }

  // Doar cea mai recentă actualizare (prima din listă) e anunțată.
  const ultima = actualizari[0];
  if (!ultima) return;

  const nou = await claimOnce(amprenta(ultima));
  if (!nou) return;

  await notifyAll({
    title: "Școala 13 — actualizare nouă",
    body: ultima.text.length > 120 ? ultima.text.slice(0, 117) + "…" : ultima.text,
    url: "/#actualizari",
  });
}
