import { useEffect, useMemo, useState } from "react";
import {
  profile, experience, workProjects, courses, repos, skills,
  certifications, transcript, education, thesis, testimonials, leadership,
} from "./data.js";

/* A small, hand-tuned icon set. Everything else is typography. */
const PATHS = {
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  menu: "M3 7h18M3 17h18",
  close: "M6 6l12 12M18 6 6 18",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  check: "M5 12l5 5L20 7",
};
function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={PATHS[name]} /></svg>
  );
}

const ext = { target: "_blank", rel: "noreferrer" };

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

const NAV = [
  ["experience", "Experience"], ["work", "Work"], ["credentials", "Credentials"],
  ["toolbox", "Toolbox"], ["education", "Education"], ["contact", "Contact"],
];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: "-35% 0px -60% 0px" });
    document.querySelectorAll("section[id]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------------------------------------------------------- building blocks */
function Section({ id, num, title, note, children }) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-h`}>
      <div className="wrap sec-grid">
        <header className="sec-label">
          <span className="num" aria-hidden="true">{num}</span>
          <h2 id={`${id}-h`}>{title}</h2>
          {note && <p>{note}</p>}
        </header>
        <div className="sec-body">{children}</div>
      </div>
    </section>
  );
}

/* A schematic of a real system: boxes, arrows, mono labels. */
function Flow({ steps, caption }) {
  return (
    <figure className="flow">
      <ol>
        {steps.map(([name, detail], i) => (
          <li key={name}><span className="flow-i">{String(i + 1).padStart(2, "0")}</span><b>{name}</b><span>{detail}</span></li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const slashes = (items) => items.join(" / ");

/* ---------------------------------------------------------------- page */
function Masthead({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const close = () => setOpen(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <header className="mast">
      <div className="wrap mast-inner">
        <a href="#top" className="sig" onClick={close}>Vishal Singh</a>
        <nav className={open ? "menu open" : "menu"} aria-label="Sections">
          {NAV.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={close} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
        <div className="mast-tools">
          <button className="tool" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          </button>
          <button className="tool menu-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const now = experience[0];
  const ms = certifications.filter((c) => c.issuer === "Microsoft");
  const expert = ms.filter((c) => c.level === "Expert");
  return (
    <section className="hero" id="top" aria-labelledby="hero-h">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">Vishal Singh — {profile.role}, {profile.location}</p>
          <h1 id="hero-h">
            I build C# back ends that <em>talk in events</em>, Angular front ends, and the pipelines that <em>ship them</em> to Azure.
          </h1>
          <p className="hero-sub">
            Seven years of production code: REST APIs, event-driven systems with Service Bus and the Outbox pattern,
            data processors, AI agent back ends, and the CI/CD that keeps them honest.
          </p>
          <div className="hero-actions">
            <a className="cta" href={`mailto:${profile.email}`}>Write to me</a>
            <a className="textlink" href={profile.social[0].url} {...ext}>LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="textlink" href={profile.social[1].url} {...ext}>GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="portrait">
          <img src={profile.photo} alt="Portrait of Vishal Singh" width="440" height="440" fetchpriority="high" />
          <figcaption>Augsburg, Germany · open to new roles</figcaption>
        </figure>
      </div>

      <div className="wrap">
        <dl className="facts">
          <div>
            <dt>Now</dt>
            <dd><img src={now.logo} alt="" width="22" height="22" /><span>{now.role.replace(" – ", ", ")} at <a href={now.url} {...ext}>baramundi</a></span></dd>
          </div>
          <div>
            <dt>Before</dt>
            <dd className="logos">
              {experience.slice(1).map((j) => <img key={j.company} src={j.logo} alt={j.company} title={j.company} width="22" height="22" />)}
              <span>RDA Labs, Euromonitor, C-DAC</span>
            </dd>
          </div>
          <div>
            <dt>Certified</dt>
            <dd><img src={expert[0].badge} alt="" width="26" height="26" /><span><a href="#credentials">{ms.length}× Microsoft</a>, {expert.length} at Expert level</span></dd>
          </div>
          <div>
            <dt>Teaching</dt>
            <dd><span>Free Git &amp; Python courses on <a href={profile.social[2].url} {...ext}>YouTube</a></span></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" num="00" title="About" note="The short version.">
      <div className="prose">
        {profile.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>
      <ol className="brings">
        <li><span><b>C# / .NET REST APIs</b> and microservices, structured with Clean Architecture.</span></li>
        <li><span><b>Event-driven back ends</b>: Service Bus, Event Hubs, the Outbox pattern, change trackers.</span></li>
        <li><span><b>Data processors and pipelines</b> that move millions of rows without dropping one.</span></li>
        <li><span><b>AI agent back ends</b>: tool APIs, MCP servers and RAG over company data.</span></li>
        <li><span><b>Angular</b> front ends, <b>CI/CD pipelines</b>, and careful <b>code reviews</b>.</span></li>
      </ol>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" num="01" title="Experience" note="Four teams, seven years. Open a role for the details.">
      <div className="ledger">
        {experience.map((job, i) => (
          <details className="role" key={job.company} open={i === 0}>
            <summary>
              <span className="when">{job.period.replace("Present", "now")}</span>
              <span className="what">
                <span className="role-title">{job.role}</span>
                <span className="role-org"><img src={job.logo} alt="" width="20" height="20" />{job.company} · {job.place}</span>
              </span>
              {job.award && <span className="honour">{job.award}</span>}
              <span className="toggle" aria-hidden="true" />
            </summary>
            <div className="role-body">
              {job.context && <p className="role-context">{job.context}</p>}
              <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <p className="stack"><span>Stack</span> {slashes(job.stack)}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

const TOPICS = ["All", "Courses", "Azure", ".NET", "Frontend", "Full stack", "Python", "AI", "Security", "DevOps", "Data"];

function Work() {
  const featured = workProjects.filter((p) => p.featured);
  const more = workProjects.filter((p) => !p.featured);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const list = useMemo(() => repos.filter((r) =>
    (cat === "All" || r.cats.includes(cat)) &&
    (!q || `${r.name} ${r.text} ${r.lang}`.toLowerCase().includes(q.toLowerCase()))), [cat, q]);
  const shown = all || q || cat !== "All" ? list : list.slice(0, 8);
  return (
    <Section id="work" num="02" title="Selected work" note="Client code is private, so each project is a short case study with a sketch of how the system fits together.">
      {featured.map((p, i) => (
        <article className="case" key={p.title} aria-labelledby={`case-${i}`}>
          <header className="case-head">
            <span className="case-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 id={`case-${i}`}>{p.title}</h3>
              <p className="case-org"><img src={p.logo} alt="" width="18" height="18" />{p.org}</p>
            </div>
          </header>
          <Flow steps={p.flow} caption={`Fig. ${i + 1}: ${p.title}, from end to end.`} />
          <dl className="case-story">
            <div><dt>Problem</dt><dd>{p.story.challenge}</dd></div>
            <div><dt>What I built</dt><dd>{p.story.approach}</dd></div>
            <div><dt>Outcome</dt><dd>{p.story.result}</dd></div>
          </dl>
          <p className="stack"><span>Stack</span> {slashes(p.tags)}</p>
        </article>
      ))}

      <h3 className="minor">Also built</h3>
      <ul className="index">
        {more.map((p) => (
          <li key={p.title}>
            <span className="index-title">{p.url ? <a href={p.url} {...ext}>{p.title} <span aria-hidden="true">↗</span></a> : p.title}</span>
            <span className="index-text">{p.text}</span>
            <span className="index-meta">{p.org}</span>
          </li>
        ))}
      </ul>

      <div className="oss-head">
        <h3 className="minor">On GitHub <span className="count">{repos.length} repositories</span></h3>
        <label className="find">
          <span className="sr">Search repositories</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" />
        </label>
      </div>
      <div className="tabs" role="group" aria-label="Filter repositories">
        {TOPICS.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <ul className="repos">
        {shown.map((r) => (
          <li key={r.name}>
            <a href={r.url} {...ext}>
              <span className="repo-name">{r.name}</span>
              <span className="repo-text">{r.text}</span>
              <span className="repo-meta">{r.lang} · {r.year}</span>
            </a>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="quiet">Nothing matches “{q}”.</p>}
      {!all && !q && cat === "All" && list.length > 8 && (
        <button className="more" onClick={() => setAll(true)}>Show all {list.length} repositories</button>
      )}
    </Section>
  );
}

function Credentials() {
  const ms = certifications.filter((c) => c.issuer === "Microsoft");
  const other = certifications.filter((c) => c.issuer !== "Microsoft");
  return (
    <Section id="credentials" num="03" title="Credentials"
      note={`${ms.length} Microsoft certifications, ${ms.filter((c) => c.level === "Expert").length} at Expert level. Each badge links to its official page on Microsoft Learn.`}>
      <ul className="badges">
        {ms.map((c) => (
          <li key={c.name} className={c.level === "Expert" ? "expert" : ""}>
            <a href={c.url} {...ext}>
              <img src={c.badge} alt={`Microsoft Certified: ${c.name} badge`} width="120" height="120" loading="lazy" />
              <span className="badge-name">{c.name}</span>
              <span className="badge-meta">{c.exam} · {c.level}</span>
              <span className="badge-link">Microsoft Learn <span aria-hidden="true">↗</span></span>
            </a>
          </li>
        ))}
      </ul>
      <p className="also">
        {other.map((c) => (
          <span key={c.name}>Also certified: <a href={c.url} {...ext}>{c.name}</a>, {c.issuer}.</span>
        ))}
        {transcript && <> <a className="textlink" href={transcript} {...ext}>Verify my transcript on Microsoft Learn ↗</a></>}
      </p>
    </Section>
  );
}

function Toolbox() {
  return (
    <Section id="toolbox" num="04" title="Toolbox" note="What I reach for, grouped by the job it does.">
      <dl className="tools">
        {skills.map((g) => (
          <div key={g.title}><dt>{g.title}</dt><dd>{g.items.join(", ")}</dd></div>
        ))}
      </dl>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" num="05" title="Education" note="An MBA in IT project management, on top of an engineering degree.">
      <ul className="schools">
        {education.map((e) => (
          <li key={e.degree}>
            <img src={e.logo} alt={`${e.school.split(",")[0]} logo`} width="44" height="44" loading="lazy" />
            <div>
              <h3>{e.degree}</h3>
              <p><a href={e.url} {...ext}>{e.school}</a></p>
              <p className="quiet">{e.note}</p>
            </div>
            <span className="when">{e.period}</span>
          </li>
        ))}
      </ul>
      <article className="thesis" aria-labelledby="thesis-h">
        <p className="label">Master's thesis · {thesis.date}</p>
        <h3 id="thesis-h">{thesis.title}</h3>
        <p className="thesis-meta">{thesis.degree.replace("Master's thesis · ", "")} · Supervisor: {thesis.supervisor} · ISO 31000:2018</p>
        <p className="thesis-summary">{thesis.summary}</p>
        <dl className="case-story">
          {thesis.points.map((p) => <div key={p.k}><dt>{p.k}</dt><dd>{p.v}</dd></div>)}
        </dl>
      </article>
    </Section>
  );
}

function Teaching() {
  return (
    <Section id="teaching" num="06" title={<>Teaching &amp; leadership</>}
      note="Teaching, leading and social service: free courses, a learning community, and volunteer work since my student days.">
      <h3 className="minor first">Teaching &amp; community</h3>
      <ul className="index">
        {courses.map((c) => (
          <li key={c.title}>
            <span className="index-title"><a href={c.url} {...ext}>{c.title} <span aria-hidden="true">↗</span></a></span>
            <span className="index-text">{c.text}</span>
            <span className="index-meta">{slashes(c.tags)}</span>
          </li>
        ))}
        {leadership.filter((l) => l.title.startsWith("Founder")).map((l) => (
          <li key={l.title}>
            <span className="index-title">{l.title}</span>
            <span className="index-text">{l.text}</span>
            <span className="index-meta">{l.period}</span>
          </li>
        ))}
      </ul>
      <h3 className="minor">Leadership &amp; social service</h3>
      <ul className="index">
        {leadership.filter((l) => !l.title.startsWith("Founder")).map((l) => (
          <li key={l.title}>
            <span className="index-title">{l.title}</span>
            <span className="index-text">{l.text}</span>
            <span className="index-meta">{l.period}</span>
          </li>
        ))}
      </ul>
      <div className="quotes">
        {testimonials.map((t) => (
          <figure key={t.who}>
            <blockquote><p>{t.text}</p></blockquote>
            <figcaption>{t.who}, <span>{t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) { /* no clipboard */ }
  };
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-h">
      <div className="wrap">
        <p className="kicker"><span className="num">07</span> Contact</p>
        <h2 id="contact-h">Have a system that needs building, or a team that needs one more engineer?</h2>
        <div className="mail">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button onClick={copy} aria-live="polite"><Icon name={copied ? "check" : "copy"} size={16} />{copied ? "Copied" : "Copy"}</button>
        </div>
        <p className="contact-note">I usually reply within one or two working days. Based in {profile.location} (CET).</p>
        <ul className="elsewhere">
          {profile.social.filter((s) => s.icon !== "mail").map((s) => (
            <li key={s.name}><a href={s.url} {...ext}>{s.name} <span aria-hidden="true">↗</span></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer className="colophon">
      <div className="wrap colophon-inner">
        <p>© {new Date().getFullYear()} Vishal Singh.</p>
        <p>Set in Instrument Serif, Geist and Geist Mono. Built with React and Vite, hosted on GitHub Pages. <a href="https://github.com/CodeMitVishal/cloudfolio" {...ext}>Source ↗</a></p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Masthead theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Credentials />
        <Toolbox />
        <Education />
        <Teaching />
        <Contact />
      </main>
      <Colophon />
    </>
  );
}
