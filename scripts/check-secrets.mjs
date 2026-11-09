// Blocks commits that contain secrets or private data. Runs as a git pre-commit hook
// (.githooks/pre-commit) and on demand with `npm run check:secrets`.
// Scans the files that are staged for commit (or, with --all, every tracked file).
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const RULES = [
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["GitHub token", /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}/],
  ["Slack token", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["Stripe live key", /\b(sk|rk)_live_[A-Za-z0-9]{16,}/],
  ["OpenAI/Anthropic-style key", /\bsk-(ant-)?[A-Za-z0-9_-]{20,}/],
  ["Cloudflare API token", /\b(CLOUDFLARE_API_TOKEN|CF_API_TOKEN)\s*[:=]\s*["']?[A-Za-z0-9_-]{30,}/],
  ["connection string", /(AccountKey|SharedAccessKey|Password|Pwd)=[^;\s"']{6,}/i],
  ["database URL with password", /\b(mongodb(\+srv)?|postgres(ql)?|mysql|redis):\/\/[^:\s"'/]+:[^@\s"']+@/i],
  ["password assignment", /\b(password|passwd|secret|api[_-]?key|client[_-]?secret|auth[_-]?token)\b\s*[:=]\s*["'][^"'\s]{6,}["']/i],
  ["phone number", /\+(49|91)[\s-]?\d[\d\s-]{8,}\d/],
];
const SKIP = /(^|\/)(package-lock\.json|dist\/|node_modules\/)|\.(png|jpg|jpeg|gif|webp|ico|pdf|woff2?)$/i;

const all = process.argv.includes("--all");
const files = execSync(all ? "git ls-files" : "git diff --cached --name-only --diff-filter=ACMR", { encoding: "utf8" })
  .split("\n").filter((f) => f && !SKIP.test(f) && f !== "scripts/check-secrets.mjs");

const findings = [];
for (const f of files) {
  let text;
  try { text = readFileSync(f, "utf8"); } catch { continue; }
  text.split("\n").forEach((line, i) => {
    for (const [name, re] of RULES) if (re.test(line)) findings.push(`${f}:${i + 1}  ${name}`);
  });
}
if (findings.length) {
  console.error("Possible secrets or private data found; commit blocked:\n  " + findings.join("\n  "));
  console.error("Remove them (use environment variables or the host's secret store), then commit again.");
  process.exit(1);
}
console.log(`check-secrets: ${files.length} file(s) clean.`);
