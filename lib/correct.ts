// Corectează gramatical/ortografic un text în română folosind un model Claude.
// Necesită ANTHROPIC_API_KEY setat pe server. Dacă lipsește sau apare o eroare,
// returnează textul original neschimbat (nu blocăm publicarea).

export async function correctGrammar(text: string): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  const input = text.trim();
  if (!key || !input) return input;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content:
              "Corectează gramatical, ortografic și de punctuație următorul text în limba română. " +
              "Păstrează exact sensul, informațiile și un ton sobru, de anunț public. " +
              "Nu adăuga informații noi, nu explica nimic. Răspunde DOAR cu textul corectat:\n\n" +
              input,
          },
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return input;
    const data = await res.json();
    const out = data?.content?.[0]?.text;
    return typeof out === "string" && out.trim() ? out.trim() : input;
  } catch {
    return input;
  }
}
