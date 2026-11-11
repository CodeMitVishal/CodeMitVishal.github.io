/* Turns the public website content (data.js) into small text chunks the assistant can search.
   Used in two places: the browser (on-page search fallback) and the Cloudflare Worker (AI context).
   RULE: only text that is visible on the website goes in here, nothing more. The assistant must
   never know anything a visitor could not read on the page. */
import {
  profile, experience, workProjects, courses, repos, skills, certifications,
  education, thesis, testimonials, leadership, languages,
} from "./data.js";

const lines = (...xs) => xs.filter(Boolean).join("\n");

export function buildKnowledge() {
  const chunks = [];
  const add = (id, title, text) => chunks.push({ id, title, text });

  add("profile", "Profile", lines(
    `${profile.name} is a ${profile.role} based in ${profile.location}.`,
    `Availability: he is open to new roles and available to start on ${profile.availableFrom} (he can join a new company from ${profile.availableFrom}).`,
    profile.summary,
    ...profile.about,
  ));
  add("contact", "Contact", lines(
    `Email: ${profile.email}. He usually replies within one or two working days. Available to start on ${profile.availableFrom}.`,
    ...profile.social.filter((s) => s.icon !== "mail").map((s) => `${s.name}: ${s.url}`),
    "Website: https://codemitvishal.github.io/",
  ));
  add("work-history", "Work history (employers)", lines(
    "Companies Vishal has worked for, newest first (these are his employers; clients he built software for are not employers):",
    ...experience.map((j) => `- ${j.company}, ${j.place}: ${j.role}, ${j.period}`),
  ));
  add("languages", "Spoken languages", languages.map((l) => `${l.name}: ${l.level}`).join("\n"));

  experience.forEach((j, i) => add(`job-${i}`, `${j.role} at ${j.company}`, lines(
    `${j.role} at ${j.company}, ${j.place}, ${j.period}.${j.award ? ` Award: ${j.award}.` : ""}`,
    j.context,
    ...j.points.map((p) => `- ${p}`),
    `Stack: ${j.stack.join(", ")}.`,
  )));

  workProjects.forEach((p, i) => add(`project-${i}`, `Project: ${p.title}`, lines(
    `${p.title} (${p.org}).`,
    !p.featured && p.text,  // featured projects show their story instead of this summary
    p.story && `Problem: ${p.story.challenge}`,
    p.story && `What he built: ${p.story.approach}`,
    p.story && `Outcome: ${p.story.result}`,
    ...(p.flows || (p.flow ? [{ name: "Flow", steps: p.flow }] : [])).map((f) => `${f.name}: ${f.steps.map(([a, b]) => `${a} (${b})`).join(" -> ")}`),
    ...(p.notes || []).map((n) => `${n.k}: ${n.v}`),
    `Technologies: ${p.tags.join(", ")}.`,
  )));

  add("certifications", "Certifications", certifications.map((c) =>
    `${c.issuer} ${c.name} (${c.level}, exam ${c.exam}) - ${c.url}`).join("\n"));

  add("skills", "Skills", skills.map((g) => `${g.title}: ${g.items.join(", ")}`).join("\n"));

  add("education", "Education", lines(
    ...education.map((e) => `${e.degree}, ${e.school}, ${e.period}. ${e.note}`),
  ));
  add("thesis", "Master's thesis", lines(
    `"${thesis.title}" - ${thesis.degree}, ${thesis.date}, supervisor ${thesis.supervisor}.`,
    thesis.summary,
    ...thesis.points.map((p) => `${p.k}: ${p.v}`),
  ));

  add("teaching", "Teaching and leadership", lines(
    `He publishes free lessons on cloud, security, programming and more on YouTube: ${profile.social.find((s) => /youtube/i.test(s.name))?.url}`,
    ...courses.map((c) => `Course "${c.title}": ${c.text} (${c.url})`),
    ...leadership.map((l) => `${l.title} (${l.period}): ${l.text}`),
  ));
  add("testimonials", "What colleagues say", testimonials.map((t) => `${t.who} (${t.role}): "${t.text}"`).join("\n"));
  add("github", "Open-source repositories", repos.map((r) => `${r.name} (${r.lang}, ${r.year}): ${r.text}`).join("\n"));
  return chunks;
}

/* Very small keyword search: good enough to pick the relevant chunks for a question. */
const STOP = new Set("the a an and or of to in on for with is are was were be has have had does did do what which who whom how when where why his her he she it its this that these those about from at by as can could would should vishal singh tell me please".split(" "));
export const tokenize = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}#.+]+/gu, " ")
  .split(" ").map((w) => w.replace(/\.+$/, "")).filter((w) => w.length > 1 && !STOP.has(w));

/* certifications -> certif, speaking -> speak: crude stemming so word forms still match */
const SYNONYMS = { led: "lead", leader: "lead", leading: "lead", managed: "lead", teams: "team", speak: "language", speaks: "language", reach: "contact", email: "contact", today: "current", now: "current", currently: "current", cert: "certification", certs: "certification" };
const stem = (w) => {
  const s = SYNONYMS[w] || w;
  return s.length > 4 ? s.replace(/(ations|ation|ings|ing|ies|ers|er|es|ed|s)$/, "") : s;
};

export function searchKnowledge(chunks, question, k = 5) {
  const q = [...new Set(tokenize(question).map(stem))];
  if (!q.length) return [];
  return chunks
    .map((c) => {
      const title = new Set(tokenize(c.title).map(stem));
      const words = tokenize(c.text).map(stem);
      let score = 0;
      for (const w of q) {
        if (title.has(w)) score += 4;                     // the section is about this
        const n = words.filter((x) => x === w).length;    // how much the section talks about it
        if (n) score += 1 + Math.min(n, 4) * 0.5;
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.c);
}
