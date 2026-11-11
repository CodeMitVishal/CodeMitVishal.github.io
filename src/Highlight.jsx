/* Highlights the few words a reader should remember, inside already-translated text.
   UX rules:
   - Restraint: at most `max` highlights per block (2 for a bullet, 3 for a paragraph); when everything
     is emphasised, nothing is.
   - What sticks: numbers and results first, then signature skills, credentials and clients.
   - Works in every language: product names and numbers stay the same in all translations, so the
     same terms are found there. English-only outcome phrases simply don't match elsewhere.
   - Each term at most once per block; the original text is never changed, only wrapped. */

// In priority order: the earlier a pattern, the more it deserves the highlight.
const TERMS = [
  // 1. Numbers and measurable facts
  /\b\d+–\d+ developers\b/, /\b\d+ developers\b/, /\b7\+ years\b/, /\bSeven years\b/,
  /\b\d{1,3}(?:,\d{3})+\+ members\b/, /\b\d+(?:\.\d+)?M\+ rows\b/, /\bfour EU countries\b/,
  // the same facts in the translations: "über 7 Jahren", "plus de 7 ans", "2.000", "2 000"...
  /(?<![\d.,])7\+? (?:Jahren|Jahre|ans|años|anni)\b/,
  /(?<![\d.,])\d+–\d+(?![\d.,])/, /(?<![\d.,])\d{1,3}(?:[.,   ]\d{3})+\+?/, /(?<![\d.,])\d+(?:[.,]\d+)?M\+/,
  /(?<![\d.,])\d+\+/,
  // 2. Results (English wording)
  /\bnever lost\b/, /\breliably\b/, /\bdecision-ready data\b/, /\bat scale\b/, /\bautomatically\b/,
  /\bcompany-wide AI adoption programme\b/,
  // 3. Credentials and clients
  /\bAzure Solutions Architect Expert\b/, /\bSamsung\b/, /\bAssurant\b/, /\bThe Growth Club\b/,
  // 4. Signature skills
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
