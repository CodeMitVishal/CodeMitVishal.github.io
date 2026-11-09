import { useEffect, useMemo, useState } from "react";
import {
  profile, experience, workProjects, courses, repos, skills,
  certifications, education, thesis, testimonials, leadership,
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
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const SECTIONS = [
  ["about", "About"], ["experience", "Experience"], ["projects", "Projects"], ["skills", "Skills"],
  ["education", "Education"], ["thesis", "Thesis"], ["teaching", "Teaching"], ["contact", "Contact"],
];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------------------------------------------------------- layout */
function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">VS</span> Vishal Singh</a>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <a className="btn btn-small" href={profile.cv} download>CV <Icon name="download" size={16} /></a>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Section({ id, eyebrow, title, intro, children, tint }) {
  return (
    <section id={id} className={tint ? "section tint" : "section"}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sections */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="hello"><span className="dot" /> Open to new opportunities</p>
          <h1>Hi, I'm {profile.name.split(" ")[0]}.<br /><span className="grad">{profile.role}</span></h1>
          <p className="headline">{profile.headline.join("  ·  ")}</p>
          <p className="intro">{profile.intro}</p>
          <div className="hero-cta">
            <a className="btn" href="#projects">See my projects</a>
            <a className="btn btn-ghost" href={profile.cv} download><Icon name="download" size={16} /> Download CV</a>
          </div>
          <div className="socials">
            {profile.social.map((s) => (
              <a key={s.name} href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name} title={s.name}>
                <Icon name={s.icon} size={20} />
              </a>
            ))}
            <span className="loc"><Icon name="pin" size={16} /> {profile.location}</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src={profile.photo} alt="Vishal Singh" width="360" height="360" />
          <div className="badge badge-1"><Icon name="cloud" size={16} /> Azure Solutions Architect Expert</div>
          <div className="badge badge-2"><Icon name="spark" size={16} /> Agentic AI</div>
        </div>
      </div>
      <div className="container stats">
        {profile.stats.map((s) => (
          <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About me" title="Cloud, security and AI, explained simply">
      <div className="about-grid">
        <div className="reveal">{profile.about.map((p) => <p className="body" key={p.slice(0, 20)}>{p}</p>)}</div>
        <div className="card reveal highlights">
          <h3>What I bring</h3>
          <ul className="checks">
            <li>Cloud platforms on <b>Azure & Kubernetes</b>, from design to production</li>
            <li><b>CI/CD, GitOps</b> and infrastructure as code (Terraform)</li>
            <li><b>Security & GDPR</b> built in from day one</li>
            <li><b>AI agents, RAG and MCP</b>, and safe AI adoption for teams</li>
            <li><b>Team leadership</b>: mentoring, reviews, stakeholder demos</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  const [openRole, setOpenRole] = useState(0);
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" tint
      intro="7+ years across product companies and client projects: insurance, finance, market research and device management.">
      <ol className="timeline">
        {experience.map((job, i) => {
          const expanded = openRole === i;
          const shown = expanded ? job.points : job.points.slice(0, 3);
          return (
            <li className="tl-item reveal" key={job.company}>
              <div className="tl-dot" />
              <div className="card tl-card">
                <div className="tl-top">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="muted">{job.company} · {job.place}</p>
                  </div>
                  <div className="tl-right">
                    <span className="period">{job.period}</span>
                    {job.award && <span className="award"><Icon name="award" size={14} /> {job.award}</span>}
                  </div>
                </div>
                {job.context && <p className="context">{job.context}</p>}
                <ul className="bullets">{shown.map((p) => <li key={p}>{p}</li>)}</ul>
                {job.points.length > 3 && (
                  <button className="link-btn" onClick={() => setOpenRole(expanded ? -1 : i)}>
                    {expanded ? "Show less" : `Show all ${job.points.length} highlights`}
                  </button>
                )}
                <div className="chips">{job.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

const LANG_COLORS = { "C#": "#178600", TypeScript: "#3178c6", JavaScript: "#e6c200", Python: "#3572A5", HTML: "#e34c26", PowerShell: "#012456" };
const CATS = ["All", "Courses", "Azure", ".NET", "Frontend", "Full stack", "Python", "AI", "Security", "DevOps", "Data"];

function Projects() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const filtered = useMemo(() => repos.filter((r) =>
    (cat === "All" || r.cats.includes(cat)) &&
    (q === "" || `${r.name} ${r.text} ${r.lang}`.toLowerCase().includes(q.toLowerCase()))), [cat, q]);
  const visible = all || q || cat !== "All" ? filtered : filtered.slice(0, 9);
  return (
    <Section id="projects" eyebrow="Projects" title="What I've built"
      intro="Client and company projects (private code), plus everything I've published on GitHub.">
      <h3 className="sub reveal">Professional projects</h3>
      <div className="grid-3">
        {workProjects.map((p) => (
          <article className="card project reveal" key={p.title}>
            <div className="project-icon"><Icon name={p.icon} size={22} /></div>
            <h4>{p.title}</h4>
            <p className="muted small">{p.org}</p>
            <p className="body-sm">{p.text}</p>
            <div className="chips">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
            {p.url && <a className="card-link" href={p.url} target="_blank" rel="noreferrer">Learn more <Icon name="external" size={14} /></a>}
          </article>
        ))}
      </div>

      <div className="oss-head reveal">
        <h3 className="sub">Open source on GitHub <span className="count">{repos.length}</span></h3>
        <label className="search">
          <Icon name="search" size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" aria-label="Search projects" />
        </label>
      </div>
      <div className="filters reveal" role="tablist" aria-label="Filter projects">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "filter on" : "filter"} onClick={() => setCat(c)}>{c}</button>
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
      {visible.length === 0 && <p className="muted center">No project matches "{q}".</p>}
      {!all && !q && cat === "All" && filtered.length > 9 && (
        <div className="center"><button className="btn btn-ghost" onClick={() => setAll(true)}>Show all {filtered.length} projects</button></div>
      )}
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I use every day" tint>
      <div className="grid-4">
        {skills.map((g) => (
          <div className="card skill reveal" key={g.title}>
            <h4>{g.title}</h4>
            <div className="chips">{g.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        ))}
      </div>
      <h3 className="sub reveal" style={{ marginTop: 48 }}>Certifications</h3>
      <div className="certs">
        {certifications.map((c) => (
          <div className="cert reveal" key={c.name}>
            <span className={c.issuer === "Microsoft" ? "cert-logo ms" : "cert-logo"}>{c.issuer === "Microsoft" ? "MS" : "SA"}</span>
            <div><strong>{c.name}</strong><span>{c.issuer}</span></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="What I studied">
      <div className="grid-3">
        {education.map((e) => (
          <div className="card edu reveal" key={e.degree}>
            <div className="project-icon"><Icon name="school" size={22} /></div>
            <span className="period">{e.period}</span>
            <h4>{e.degree}</h4>
            <p className="muted small">{e.school}</p>
            <p className="body-sm">{e.note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Thesis() {
  return (
    <Section id="thesis" eyebrow="Master's thesis" title={thesis.title} tint>
      <div className="thesis card reveal">
        <div className="thesis-meta">
          <span className="chip strong"><Icon name="book" size={14} /> {thesis.degree}</span>
          <span className="chip">{thesis.date}</span>
          <span className="chip">Supervisor: {thesis.supervisor}</span>
          <span className="chip">ISO 31000:2018</span>
        </div>
        <p className="body">{thesis.summary}</p>
        <div className="grid-3 thesis-points">
          {thesis.points.map((p) => (
            <div key={p.k}><p className="eyebrow">{p.k}</p><p className="body-sm">{p.v}</p></div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Teaching() {
  return (
    <Section id="teaching" eyebrow="Teaching & community" title="I share what I learn"
      intro="Free, hands-on courses with slides, runnable code, exercises and interview questions, on GitHub and on my YouTube channel.">
      <div className="grid-3">
        {courses.map((c) => (
          <a className="card course reveal" key={c.title} href={c.url} target="_blank" rel="noreferrer">
            <div className="project-icon"><Icon name="play" size={20} /></div>
            <h4>{c.title}</h4>
            <p className="body-sm">{c.text}</p>
            <div className="chips">{c.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
            <span className="card-link">Open the course <Icon name="external" size={14} /></span>
          </a>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: 28 }}>
        <div className="card reveal">
          <h4>Leadership & volunteering</h4>
          <ul className="lead-list">
            {leadership.map((l) => (
              <li key={l.title}><div><strong>{l.title}</strong><p className="body-sm">{l.text}</p></div><span className="period">{l.period}</span></li>
            ))}
          </ul>
        </div>
        <div className="card reveal">
          <h4>What colleagues say</h4>
          {testimonials.map((t) => (
            <blockquote key={t.who}>
              <p>“{t.text}”</p>
              <footer><strong>{t.who}</strong> · {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-card reveal">
          <p className="eyebrow light">Contact</p>
          <h2>Let's build something together</h2>
          <p className="lead light">Cloud platforms, DevSecOps, AI agents or a team that needs a lead: write me an email, I reply within a day or two.</p>
          <div className="hero-cta center-row">
            <a className="btn btn-light" href={`mailto:${profile.email}`}><Icon name="mail" size={16} /> {profile.email}</a>
            <a className="btn btn-outline-light" href={profile.social[0].url} target="_blank" rel="noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>
            <a className="btn btn-outline-light" href={profile.cv} download><Icon name="download" size={16} /> CV (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Vishal Singh · {profile.location}</p>
        <div className="socials">
          {profile.social.map((s) => (
            <a key={s.name} href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name}><Icon name={s.icon} size={18} /></a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useReveal();
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Thesis />
        <Teaching />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
