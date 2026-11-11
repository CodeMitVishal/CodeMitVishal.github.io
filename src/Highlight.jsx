/* Emphasises the few words a reader should remember, inside already-translated text.
   UX rules (Baymard, NN/g scanning research, Dynatrace style guide):
   - Style is weight only (see .hl in styles.css): no underline (that means "link") and no colour
     (orange already means "link hover" on this site).
   - Restraint: 1 per bullet or story line, 2 per paragraph. When everything stands out, nothing does.
   - Only words people scan for: numbers, the credential, clients and signature technologies.
     No adjectives or conclusions ("reliably", "automatically"...).
   - Works in every language: product names and numbers stay the same in all translations.
   - Each term at most once per block; the text itself is never changed, only wrapped. */

// In priority order: the earlier a pattern, the more it deserves the highlight.
const TERMS = [
  // 1. Numbers and measurable facts
  /\b\d+–\d+ developers\b/, /\b\d+ developers\b/, /\b7\+ years\b/, /\bSeven years\b/,
  /\b\d{1,3}(?:,\d{3})+\+ members\b/, /\b\d+(?:\.\d+)?M\+ rows\b/, /\bfour EU countries\b/,
  // the same facts in the translations: "über 7 Jahren", "plus de 7 ans", "2.000", "2 000"...
  /(?<![\d.,])7\+? (?:Jahren|Jahre|ans|años|anni)\b/,
  /(?<![\d.,])\d+–\d+(?![\d.,])/, /(?<![\d.,])\d{1,3}(?:[.,   ]\d{3})+\+?/, /(?<![\d.,])\d+(?:[.,]\d+)?M\+/,
  /(?<![\d.,])\d+\+/,
  // 2. Credential and clients
  /\bAzure Solutions Architect Expert\b/, /\bSamsung\b/, /\bAssurant\b/, /\bThe Growth Club\b/,
  // 3. Signature skills (nouns only)
  /\bOutbox pattern\b/, /\bOutbox\b/, /\bService Bus\b/, /\bIoT Hub\b/, /\bClean Architecture\b/,
  /\bAI agents?\b/, /\bRAG\b/, /\bMCP\b/, /\bGDPR\b/, /\bAKS\b/, /\bGitOps\b/, /\bAzure AI Foundry\b/,
  /\bEvent Hubs\b/, /C# \/ \.NET/, /\bAI adoption\b/, /\bAzure AD B2C\b/,
];

export function highlightRanges(text, max) {
  const picked = [];
  for (const re of TERMS) {
    if (picked.length >= max) break;
    const m = re.exec(text);
    if (!m) continue;
    const start = m.index, end = start + m[0].length;
    if (picked.some((p) => start < p.end && end > p.start)) continue;     // no overlaps
    picked.push({ start, end });
  }
  return picked.sort((a, b) => a.start - b.start);
}

export default function Hl({ text, max = 2 }) {
  if (typeof text !== "string") return text;
  const ranges = highlightRanges(text, max);
  if (!ranges.length) return text;
  const out = [];
  let at = 0;
  ranges.forEach(({ start, end }, i) => {
    if (start > at) out.push(text.slice(at, start));
    out.push(<strong key={i} className="hl">{text.slice(start, end)}</strong>);
    at = end;
  });
  if (at < text.length) out.push(text.slice(at));
  return out;
}
