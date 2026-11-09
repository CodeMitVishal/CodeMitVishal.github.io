import { useEffect, useMemo, useState } from "react";
import {
  profile, experience, workProjects, courses, repos, skills,
  certifications, transcript, education, thesis, testimonials, leadership,
} from "./data.js";

/* ---------------------------------------------------------------- icons */
const PATHS = {
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.3 21 14.7V21h-4v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9z",
  github: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z",
  youtube: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.2 12z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.6L4 7.4V17h16V7.4z",
  download: "M12 3v11m0 0-4-4m4 4 4-4M4 17v3h16v-3",
  external: "M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6 6 18",
  pin: "M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.3-4.3",
  award: "M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5",
  cloud: "M7 18a5 5 0 0 1-.9-9.9A6 6 0 0 1 17.7 9 4.5 4.5 0 0 1 17.5 18z",
  spark: "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z",
  shield: "M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z",
  chart: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  face: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 10h.01M15 10h.01M8.5 14.5a4.5 4.5 0 0 0 7 0",
  table: "M3 5h18v14H3zM3 10h18M3 15h18M9 5v14",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18",
  tag: "M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9zM7.5 7.5h.01",
  school: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",
  play: "M8 5v14l11-7z",
  book: "M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z",
};
const FILLED = new Set(["linkedin", "github", "youtube", "mail", "play"]);
function Icon({ name, size = 18 }) {
  const filled = FILLED.has(name);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name]} />
    </svg>
  );
}

PATHS.copy = "M9 9h11v11H9zM5 15H4V4h11v1";
PATHS.check = "M5 12l5 5L20 7";
PATHS.arrow = "M5 12h14m-6-6 6 6-6 6";
PATHS.verified = "M12 2l2.6 2.1 3.3-.3.9 3.2 2.9 1.7-1.2 3.1 1.2 3.1-2.9 1.7-.9 3.2-3.3-.3L12 22l-2.6-2.1-3.3.3-.9-3.2-2.9-1.7 1.2-3.1L2.3 9.1l2.9-1.7.9-3.2 3.3.3zM8.5 12l2.5 2.5 4.5-5";

/* ---------------------------------------------------------------- hooks */
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.06 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const SECTIONS = [
  ["experience", "Experience"], ["projects", "Projects"], ["certifications", "Certifications"],
  ["skills", "Skills"], ["education", "Education"], ["teaching", "Teaching"],
];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: "-40% 0px -55% 0px" });
    [...SECTIONS.map(([id]) => id), "contact"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------------------------------------------------------- small parts */
function Logo({ src, alt, size = 48 }) {
  return (
    <span className="logo-tile" style={{ width: size, height: size }}>
      <img src={src} alt={alt} loading="lazy" width={size} height={size} />
    </span>
  );
}

function Chips({ items }) {
  return <ul className="chips" aria-label="Technologies">{items.map((t) => <li className="chip" key={t}>{t}</li>)}</ul>;
}

function Section({ id, eyebrow, title, intro, children, tint }) {
  return (
    <section id={id} className={tint ? "section tint" : "section"} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- layout */
function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={close} aria-label="Vishal Singh, back to top">
          <span className="brand-mark" aria-hidden="true">VS</span><span>Vishal Singh</span>
        </a>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "true" : undefined} onClick={close}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <a className="btn btn-small" href="#contact" onClick={close}>Contact me</a>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- sections */
function Hero() {
  const expert = certifications.filter((c) => c.level === "Expert");
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="status"><span className="dot" aria-hidden="true" /> Open to new opportunities · {profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role} <span className="sep" aria-hidden="true">/</span> <span className="accent">Azure Solutions Architect Expert</span></p>
          <p className="intro">{profile.intro}</p>
          <div className="hero-cta">
            <a className="btn" href="#contact">Let's talk <Icon name="arrow" size={16} /></a>
            <a className="btn btn-ghost" href={profile.cv} download><Icon name="download" size={16} /> Download CV</a>
          </div>
          <ul className="socials" aria-label="Profiles">
            {profile.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name} title={s.name}>
                  <Icon name={s.icon} size={19} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-photo">
          <img src={profile.photo} alt="Portrait of Vishal Singh" width="360" height="360" fetchpriority="high" />
          <a className="hero-cert" href="#certifications">
            <img src={expert[0].badge} alt="" width="52" height="52" />
            <span><strong>Microsoft Certified</strong>{expert.length}× Expert · {certifications.length - 1} Microsoft certifications</span>
          </a>
        </div>
      </div>

      <div className="container">
        <div className="trust reveal">
          <p className="trust-label">Experience at</p>
          <ul className="trust-logos">
            {experience.map((j) => (
              <li key={j.company}>
                <a href={j.url} target="_blank" rel="noreferrer" title={j.company}>
                  <Logo src={j.logo} alt="" size={36} /><span>{j.company.replace(" (C-DAC)", "").replace("Centre for Development of Advanced Computing", "C-DAC")}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <dl className="stats">
          {profile.stats.map((s) => (
            <div className="stat reveal" key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" aria-label="About me">
      <div className="container about-grid">
        <div className="reveal">
          <p className="eyebrow">About me</p>
          {profile.about.map((p) => <p className="body" key={p.slice(0, 20)}>{p}</p>)}
        </div>
        <div className="card reveal highlights">
          <h3>What I bring to your team</h3>
          <ul className="checks">
            <li>Cloud platforms on <b>Azure &amp; Kubernetes</b>, from design to production</li>
            <li><b>CI/CD, GitOps</b> and infrastructure as code (Terraform)</li>
            <li><b>Security &amp; GDPR</b> built in from day one</li>
            <li><b>AI agents, RAG and MCP</b>, and safe AI adoption for teams</li>
            <li><b>Team leadership</b>: mentoring, reviews, stakeholder demos</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [openRole, setOpenRole] = useState(-1);
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" tint
      intro="7+ years across product companies and client projects: device management, insurance, finance and market research.">
      <ol className="jobs">
        {experience.map((job, i) => {
          const expanded = openRole === i;
          const shown = expanded ? job.points : job.points.slice(0, 3);
          return (
            <li className="card job reveal" key={job.company}>
              <div className="job-head">
                <Logo src={job.logo} alt={`${job.company} logo`} size={56} />
                <div className="job-title">
                  <h3>{job.role}</h3>
                  <p><a href={job.url} target="_blank" rel="noreferrer">{job.company}</a> · {job.place}</p>
                </div>
                <div className="job-meta">
                  <span className={job.current ? "period now" : "period"}>{job.current && <i aria-hidden="true" />}{job.period}</span>
                  {job.award && <span className="award"><Icon name="award" size={14} /> {job.award}</span>}
                </div>
              </div>
              {job.context && <p className="context">{job.context}</p>}
              <ul className="bullets">{shown.map((p) => <li key={p}>{p}</li>)}</ul>
              {job.points.length > 3 && (
                <button className="link-btn" onClick={() => setOpenRole(expanded ? -1 : i)} aria-expanded={expanded}>
                  {expanded ? "Show less" : `Show all ${job.points.length} highlights`}
                </button>
              )}
              <Chips items={job.stack} />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

const LANG_COLORS = { "C#": "#178600", TypeScript: "#3178c6", JavaScript: "#e6c200", Python: "#3572A5", HTML: "#e34c26", PowerShell: "#012456", Shell: "#89e051" };
const CATS = ["All", "Courses", "Azure", ".NET", "Frontend", "Full stack", "Python", "AI", "Security", "DevOps", "Data"];

function Projects() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const featured = workProjects.filter((p) => p.featured);
  const more = workProjects.filter((p) => !p.featured);
  const filtered = useMemo(() => repos.filter((r) =>
    (cat === "All" || r.cats.includes(cat)) &&
    (q === "" || `${r.name} ${r.text} ${r.lang}`.toLowerCase().includes(q.toLowerCase()))), [cat, q]);
  const visible = all || q || cat !== "All" ? filtered : filtered.slice(0, 6);
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work"
      intro="The problem, what I did and what changed. Client code is private, so these are told as short case studies.">
      <div className="cases">
        {featured.map((p) => (
          <article className="card case reveal" key={p.title}>
            <div className="case-head">
              <Logo src={p.logo} alt="" size={44} />
              <div><h3>{p.title}</h3><p className="muted small">{p.org}</p></div>
            </div>
            <dl className="story">
              <div><dt>Challenge</dt><dd>{p.story.challenge}</dd></div>
              <div><dt>What I did</dt><dd>{p.story.approach}</dd></div>
              <div><dt>Result</dt><dd>{p.story.result}</dd></div>
            </dl>
            <Chips items={p.tags} />
          </article>
        ))}
      </div>

      <h3 className="sub reveal">More professional projects</h3>
      <div className="grid-3">
        {more.map((p) => (
          <article className="card project reveal" key={p.title}>
            <div className="case-head">
              <Logo src={p.logo} alt="" size={40} />
              <div><h4>{p.title}</h4><p className="muted small">{p.org}</p></div>
            </div>
            <p className="body-sm">{p.text}</p>
            <Chips items={p.tags} />
            {p.url && <a className="card-link" href={p.url} target="_blank" rel="noreferrer">Learn more <Icon name="external" size={14} /></a>}
          </article>
        ))}
      </div>

      <div className="oss-head reveal">
        <h3 className="sub">Open source on GitHub <span className="count">{repos.length}</span></h3>
        <label className="search">
          <Icon name="search" size={16} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search repositories" aria-label="Search repositories" />
        </label>
      </div>
      <div className="filters" role="group" aria-label="Filter repositories by topic">
        {CATS.map((c) => (
          <button key={c} aria-pressed={cat === c} className={cat === c ? "filter on" : "filter"} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="grid-3">
        {visible.map((r) => (
          <a className="card repo" key={r.name} href={r.url} target="_blank" rel="noreferrer">
            <div className="repo-top"><Icon name="github" size={18} /><h4>{r.name}</h4><Icon name="external" size={14} /></div>
            <p className="body-sm">{r.text}</p>
            <div className="repo-meta">
              <span><i style={{ background: LANG_COLORS[r.lang] || "#8a93a6" }} />{r.lang}</span>
              <span>{r.year}</span>
              <span className="cats">{r.cats.slice(0, 2).join(" · ")}</span>
            </div>
          </a>
        ))}
      </div>
      {visible.length === 0 && <p className="muted center">No repository matches "{q}".</p>}
      {!all && !q && cat === "All" && filtered.length > 6 && (
        <div className="center"><button className="btn btn-ghost" onClick={() => setAll(true)}>Show all {filtered.length} repositories</button></div>
      )}
    </Section>
  );
}

function Certifications() {
  const ms = certifications.filter((c) => c.issuer === "Microsoft");
  const other = certifications.filter((c) => c.issuer !== "Microsoft");
  return (
    <Section id="certifications" eyebrow="Certifications" title="Microsoft Certified" tint
      intro={`${ms.length} official Microsoft certifications, including ${ms.filter((c) => c.level === "Expert").length} at Expert level. Each card links to the official certification page on Microsoft Learn.`}>
      <div className="cert-grid">
        {ms.map((c) => (
          <a className={c.level === "Expert" ? "card cert expert reveal" : "card cert reveal"} key={c.name} href={c.url} target="_blank" rel="noreferrer">
            <img className="cert-badge" src={c.badge} alt={`Microsoft Certified ${c.level} badge`} width="96" height="96" loading="lazy" />
            <div className="cert-body">
              <p className="cert-issuer">Microsoft Certified</p>
              <h3>{c.name}</h3>
              <div className="cert-tags"><span className={`lvl lvl-${c.level.toLowerCase()}`}>{c.level}</span><span className="exam">Exam {c.exam}</span></div>
              <span className="card-link">View on Microsoft Learn <Icon name="external" size={14} /></span>
            </div>
          </a>
        ))}
      </div>
      <div className="cert-foot reveal">
        {other.map((c) => (
          <a className="cert-mini" key={c.name} href={c.url} target="_blank" rel="noreferrer">
            <img src={c.badge} alt="" width="32" height="32" loading="lazy" />
            <span><strong>{c.name}</strong> · {c.issuer}</span>
          </a>
        ))}
        {transcript && (
          <a className="btn" href={transcript} target="_blank" rel="noreferrer"><Icon name="verified" size={16} /> Verify on Microsoft Learn</a>
        )}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I use every day">
      <div className="grid-4">
        {skills.map((g) => (
          <div className="card skill reveal" key={g.title}>
            <h3>{g.title}</h3>
            <Chips items={g.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="What I studied" tint>
      <div className="grid-3">
        {education.map((e) => (
          <article className="card edu reveal" key={e.degree}>
            <Logo src={e.logo} alt={`${e.school.split(",")[0]} logo`} size={64} />
            <span className="period">{e.period}</span>
            <h3>{e.degree}</h3>
            <p className="muted small"><a href={e.url} target="_blank" rel="noreferrer">{e.school}</a></p>
            <p className="body-sm">{e.note}</p>
          </article>
        ))}
      </div>
      <article className="thesis card reveal" aria-labelledby="thesis-title">
        <div className="thesis-top">
          <Logo src={education[0].logo} alt="" size={44} />
          <div>
            <p className="eyebrow">Master's thesis</p>
            <h3 id="thesis-title">{thesis.title}</h3>
          </div>
        </div>
        <ul className="thesis-meta chips">
          <li className="chip strong"><Icon name="book" size={14} /> {thesis.degree}</li>
          <li className="chip">{thesis.date}</li>
          <li className="chip">Supervisor: {thesis.supervisor}</li>
          <li className="chip">ISO 31000:2018</li>
        </ul>
        <p className="body">{thesis.summary}</p>
        <dl className="story three">
          {thesis.points.map((p) => (<div key={p.k}><dt>{p.k}</dt><dd>{p.v}</dd></div>))}
        </dl>
      </article>
    </Section>
  );
}

function Teaching() {
  return (
    <Section id="teaching" eyebrow="Teaching & community" title="I share what I learn"
      intro="Free, hands-on courses with slides, exercises and interview questions, on GitHub and on my YouTube channel CodeMitVishal.">
      <div className="grid-3">
        {courses.map((c) => (
          <a className="card course reveal" key={c.title} href={c.url} target="_blank" rel="noreferrer">
            <div className="project-icon"><Icon name="play" size={20} /></div>
            <h3>{c.title}</h3>
            <p className="body-sm">{c.text}</p>
            <Chips items={c.tags} />
            <span className="card-link">Open the course <Icon name="external" size={14} /></span>
          </a>
        ))}
      </div>
      <div className="grid-2 teach-bottom">
        <div className="card reveal">
          <h3>Leadership &amp; volunteering</h3>
          <ul className="lead-list">
            {leadership.map((l) => (
              <li key={l.title}><div><strong>{l.title}</strong><p className="body-sm">{l.text}</p></div><span className="period">{l.period}</span></li>
            ))}
          </ul>
        </div>
        <div className="card reveal">
          <h3>What colleagues say</h3>
          {testimonials.map((t) => (
            <figure className="quote" key={t.who}>
              <blockquote><p>“{t.text}”</p></blockquote>
              <figcaption><strong>{t.who}</strong> · {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) { /* no clipboard */ }
  };
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card reveal">
          <p className="eyebrow light">Contact</p>
          <h2 id="contact-title">Let's build something together</h2>
          <p className="lead light">Cloud platforms, DevSecOps, AI agents, or a team that needs a lead. Email is the fastest way to reach me; I reply within one or two working days.</p>
          <div className="email-row">
            <a className="email" href={`mailto:${profile.email}`}><Icon name="mail" size={18} /> {profile.email}</a>
            <button className="copy" onClick={copy} aria-live="polite">
              <Icon name={copied ? "check" : "copy"} size={16} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="hero-cta center-row">
            <a className="btn btn-light" href={profile.social[0].url} target="_blank" rel="noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>
            <a className="btn btn-outline-light" href={profile.cv} download><Icon name="download" size={16} /> CV (PDF)</a>
          </div>
          <p className="where"><Icon name="pin" size={15} /> {profile.location} · CET (UTC+1)</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Vishal Singh · Built with React and Vite</p>
        <ul className="socials" aria-label="Profiles">
          {profile.social.map((s) => (
            <li key={s.name}><a href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name}><Icon name={s.icon} size={18} /></a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useReveal();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Skills />
        <Education />
        <Teaching />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
