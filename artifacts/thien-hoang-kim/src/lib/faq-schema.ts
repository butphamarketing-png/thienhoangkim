export type FaqItem = { question: string; answer: string };

/** Trích FAQ từ markdown body (section ## Câu hỏi thường gặp) */
export function extractFaqFromBody(body: string): FaqItem[] {
  const idx = body.search(/##\s*Câu hỏi thường gặp/i);
  if (idx < 0) return [];

  const section = body.slice(idx);
  const items: FaqItem[] = [];

  for (const line of section.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("**")) continue;
    const match = trimmed.match(/^\*\*(.+?)\*\*\s*(.+)$/);
    if (!match) continue;
    const question = match[1].replace(/\?$/, "").trim() + "?";
    const answer = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (question.length > 5 && answer.length > 10) {
      items.push({ question, answer });
    }
  }

  return items.slice(0, 8);
}
