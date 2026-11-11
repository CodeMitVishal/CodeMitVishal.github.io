import { useEffect, useMemo, useState } from "react";
import {
  profile, experience, workProjects, courses, repos, skills,
  certifications, transcript, education, thesis, testimonials, leadership, languages,
} from "./data.js";
import { LangProvider, useLang } from "./i18n.jsx";
import LanguagePicker from "./LanguagePicker.jsx";
import Assistant from "./Assistant.jsx";
import BrandIcon from "./BrandIcon.jsx";
import FlowIcon from "./FlowIcon.jsx";
import Hl from "./Highlight.jsx";

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
  ["toolbox", "Toolbox"], ["education", "Education"], ["teaching", "Teaching"], ["contact", "Contact"],
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

/* "03/2025 – Present", "2025–now" and similar: translate the open end. */
function usePeriod() {
  const { t } = useLang();
  return (p) => p.replace(/Present|now/, t("now"));
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

/* A schematic of a real system: boxes, arrows, mono labels.
   `lanes` is a list of { name, steps }; a single unnamed lane draws as one row of boxes. */
function Flow({ lanes, caption }) {
  const { t } = useLang();
  return (
    <figure className="flow">
      {lanes.map((lane) => (
        <div className="lane" key={lane.name || "main"}>
          {lane.name && <p className="lane-name">{t(lane.name)}</p>}
          <ol aria-label={lane.name ? t(lane.name) : t("Flow")}>
            {lane.steps.map(([name, detail], i) => (
              <li key={name}>
                <span className="flow-top"><FlowIcon step={name} /><span className="flow-i">{String(i + 1).padStart(2, "0")}</span></span>
                <b>{t(name)}</b><span className="flow-d">{t(detail)}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const slashes = (items) => items.join(" / ");

/* ---------------------------------------------------------------- page */
function Masthead({ theme, toggleTheme }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const close = () => setOpen(false);
  // Close the menu first (unlocking the page), then scroll to the section.
  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      history.replaceState(null, "", `#${id}`);
    }, 0);
  };
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const wide = window.matchMedia("(min-width: 961px)");
    const onWide = () => { if (wide.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => { window.removeEventListener("keydown", onKey); wide.removeEventListener("change", onWide); };
  }, [open]);
  return (
    <header className={open ? "mast open" : "mast"}>
      <div className="wrap mast-inner">
        <a href="#top" className="sig" onClick={close}>{t("Vishal Singh")}</a>
        <nav id="site-menu" className={open ? "menu open" : "menu"} aria-label={t("Sections")}>
          {NAV.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={(e) => goTo(e, id)} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{t(label)}
            </a>
          ))}
        </nav>
        <div className="mast-tools">
          <LanguagePicker />
          <button className="tool" onClick={toggleTheme} aria-label={theme === "dark" ? t("Switch to light theme") : t("Switch to dark theme")}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          </button>
          <button className="tool menu-btn" onClick={() => setOpen(!open)} aria-label={open ? t("Close menu") : t("Open menu")} aria-expanded={open} aria-controls="site-menu">
            <Icon name={open ? "close" : "menu"} size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t, tr } = useLang();
  const now = experience[0];
  const ms = certifications.filter((c) => c.issuer === "Microsoft");
  const expert = ms.filter((c) => c.level === "Expert");
  return (
    <section className="hero" id="top" aria-labelledby="hero-h">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">{t("Vishal Singh")} — {t(profile.role)}, {t(profile.location)}</p>
          <h1 id="hero-h">{tr("I build C# back ends that *talk in events*, Angular front ends, and the pipelines that *ship them* to Azure.")}</h1>
          <p className="hero-sub">
            <Hl text={t(profile.summary)} />
          </p>
          <div className="hero-actions">
            <a className="cta" href={`mailto:${profile.email}`}>{t("Write to me")}</a>
            <a className="textlink" href={profile.social[0].url} {...ext}><BrandIcon name="linkedin" />LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="textlink" href={profile.social[1].url} {...ext}><BrandIcon name="github" />GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="portrait">
          <img src={profile.photo} alt={t("Portrait of Vishal Singh")} width="440" height="440" fetchpriority="high" />
          <figcaption>{t("Augsburg, Germany · available from 1 March 2027")}</figcaption>
        </figure>
      </div>

      <div className="wrap">
        <dl className="facts">
          <div>
            <dt>{t("Now")}</dt>
            <dd><img src={now.logo} alt="" width="22" height="22" /><span>{tr("{role} at {company}", { role: t("Software Engineer, Cloud Products"), company: <a href={now.url} {...ext}>baramundi</a> })}</span></dd>
          </div>
          <div>
            <dt>{t("Before")}</dt>
            <dd className="logos">
              {experience.slice(1).map((j) => <img key={j.company} src={j.logo} alt={j.company} title={j.company} width="22" height="22" />)}
              <span>RDA Labs, Euromonitor, C-DAC</span>
            </dd>
          </div>
          <div>
            <dt>{t("Certified")}</dt>
            <dd><img src={expert[0].badge} alt="" width="26" height="26" /><span>{tr("{count}, {experts} at Expert level", { count: <a href="#credentials">{ms.length}× Microsoft</a>, experts: expert.length })}</span></dd>
          </div>
          <div>
            <dt>{t("Teaching")}</dt>
            <dd><span>{tr("Free lessons on cloud, security, programming and more on {youtube}", { youtube: <a href={profile.social[2].url} {...ext}><BrandIcon name="youtube" />YouTube</a> })}</span></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

const BRINGS = [
  "**C# / .NET REST APIs** and microservices, structured with Clean Architecture.",
  "**Event-driven back ends**: IoT Hub consumer groups, Service Bus, the Outbox pattern, change trackers.",
  "**Data processors and pipelines** that move millions of rows without dropping one.",
  "**AI agent back ends**: tool APIs, MCP servers and RAG over company data.",
  "**Angular** front ends, **CI/CD pipelines**, and careful **code reviews**.",
];

function About() {
  const { t, tr } = useLang();
  return (
    <Section id="about" num="00" title={t("About")} note={t("The short version.")}>
      <div className="prose">
        {profile.about.map((p) => <p key={p.slice(0, 24)}><Hl text={t(p)} max={3} /></p>)}
      </div>
      <ol className="brings">
        {BRINGS.map((item) => <li key={item}><span>{tr(item)}</span></li>)}
      </ol>
      <p className="spoken">
        <span className="spoken-label">{t("Languages")}</span>
        <span className="spoken-list">
          {languages.map((l) => <span key={l.name} className="spoken-item"><b>{t(l.name)}</b> {t(l.level)}</span>)}
        </span>
      </p>
    </Section>
  );
}

function Experience() {
  const { t } = useLang();
  const period = usePeriod();
  return (
    <Section id="experience" num="01" title={t("Experience")} note={t("Four teams, seven years. Open a role for the details.")}>
      <div className="ledger">
        {experience.map((job, i) => (
          <details className="role" key={job.company} open={i === 0}>
            <summary>
              <span className="when">{period(job.period)}</span>
              <span className="what">
                <span className="role-title">{t(job.role)}</span>
                <span className="role-org"><img src={job.logo} alt="" width="20" height="20" />{job.company} · {t(job.place)}</span>
              </span>
              {job.award && <span className="honour">{t(job.award)}</span>}
              <span className="toggle" aria-hidden="true" />
            </summary>
            <div className="role-body">
              {job.context && <p className="role-context">{t(job.context)}</p>}
              <ul>{job.points.map((p) => <li key={p}><Hl text={t(p)} /></li>)}</ul>
              <p className="stack"><span>{t("Stack")}</span> {slashes(job.stack)}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

const TOPICS = ["All", "Courses", "Azure", ".NET", "Frontend", "Full stack", "Python", "AI", "Security", "DevOps", "Data"];

function Work() {
  const { t } = useLang();
  const period = usePeriod();
  const featured = workProjects.filter((p) => p.featured);
  const more = workProjects.filter((p) => !p.featured);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const list = useMemo(() => repos.filter((r) =>
    (cat === "All" || r.cats.includes(cat)) &&
    (!q || `${r.name} ${r.text} ${t(r.text)} ${r.lang}`.toLowerCase().includes(q.toLowerCase()))), [cat, q, t]);
  const shown = all || q || cat !== "All" ? list : list.slice(0, 8);
  return (
    <Section id="work" num="02" title={t("Selected work")} note={t("Client code is private, so each project is a short case study with a sketch of how the system fits together.")}>
      {featured.map((p, i) => (
        <article className="case" key={p.title} aria-labelledby={`case-${i}`}>
          <header className="case-head">
            <span className="case-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 id={`case-${i}`}>{t(p.title)}</h3>
              <p className="case-org"><img src={p.logo} alt="" width="18" height="18" />{period(t(p.org))}</p>
            </div>
          </header>
          <Flow lanes={p.flows || [{ steps: p.flow }]} caption={t("Fig. {n}: {title}, from end to end.", { n: i + 1, title: t(p.title) })} />
          <dl className="case-story">
            <div><dt>{t("Problem")}</dt><dd><Hl text={t(p.story.challenge)} /></dd></div>
            <div><dt>{t("What I built")}</dt><dd><Hl text={t(p.story.approach)} /></dd></div>
            <div><dt>{t("Outcome")}</dt><dd><Hl text={t(p.story.result)} /></dd></div>
          </dl>
          {p.notes && (
            <dl className="case-notes">
              {p.notes.map((n) => <div key={n.k}><dt>{t(n.k)}</dt><dd>{t(n.v)}</dd></div>)}
            </dl>
          )}
          <p className="stack"><span>{t("Stack")}</span> {slashes(p.tags)}</p>
        </article>
      ))}

      <h3 className="minor">{t("Also built")}</h3>
      <ul className="index">
        {more.map((p) => (
          <li key={p.title}>
            <span className="index-title">{p.url ? <a href={p.url} {...ext}><BrandIcon url={p.url} />{t(p.title)} <span aria-hidden="true">↗</span></a> : t(p.title)}</span>
            <span className="index-text">{t(p.text)}</span>
            <span className="index-meta">{t(p.org)}</span>
          </li>
        ))}
      </ul>

      <div className="oss-head">
        <h3 className="minor"><BrandIcon name="github" />{t("On GitHub")} <span className="count">{t("{n} repositories", { n: repos.length })}</span></h3>
        <label className="find">
          <span className="sr">{t("Search repositories")}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search…")} />
        </label>
      </div>
      <div className="tabs" role="group" aria-label={t("Filter repositories")}>
        {TOPICS.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{t(c)}</button>)}
      </div>
      <ul className="repos">
        {shown.map((r) => (
          <li key={r.name}>
            <a href={r.url} {...ext}>
              <span className="repo-name">{r.name}</span>
              <span className="repo-text">{t(r.text)}</span>
              <span className="repo-meta">{r.lang} · {r.year}</span>
            </a>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="quiet">{t("Nothing matches “{q}”.", { q })}</p>}
      {!all && !q && cat === "All" && list.length > 8 && (
        <button className="more" onClick={() => setAll(true)}>{t("Show all {n} repositories", { n: list.length })}</button>
      )}
    </Section>
  );
}

function Credentials() {
  const { t, tr } = useLang();
  const ms = certifications.filter((c) => c.issuer === "Microsoft");
  const other = certifications.filter((c) => c.issuer !== "Microsoft");
  return (
    <Section id="credentials" num="03" title={t("Credentials")}
      note={t("{n} Microsoft certifications, {e} at Expert level. Each badge links to its official page on Microsoft Learn.", { n: ms.length, e: ms.filter((c) => c.level === "Expert").length })}>
      <ul className="badges">
        {ms.map((c) => (
          <li key={c.name} className={c.level === "Expert" ? "expert" : ""}>
            <a href={c.url} {...ext}>
              <img src={c.badge} alt={t("Microsoft Certified: {name} badge", { name: c.name })} width="120" height="120" loading="lazy" />
              <span className="badge-name">{c.name}</span>
              <span className="badge-meta">{c.exam} · {t(c.level)}</span>
              <span className="badge-link"><BrandIcon name="microsoft" />Microsoft Learn <span aria-hidden="true">↗</span></span>
            </a>
          </li>
        ))}
      </ul>
      <p className="also">
        {other.map((c) => (
          <span key={c.name}>{tr("Also certified: {cert}, {issuer}.", { cert: <a href={c.url} {...ext}>{c.name}</a>, issuer: c.issuer })}</span>
        ))}
        {transcript && <> <a className="textlink" href={transcript} {...ext}><BrandIcon name="microsoft" />{t("Verify my transcript on Microsoft Learn")} ↗</a></>}
      </p>
    </Section>
  );
}

function Toolbox() {
  const { t } = useLang();
  return (
    <Section id="toolbox" num="04" title={t("Toolbox")} note={t("What I reach for, grouped by the job it does.")}>
      <dl className="tools">
        {skills.map((g) => (
          <div key={g.title}><dt>{t(g.title)}</dt><dd>{g.items.map((s) => t(s)).join(", ")}</dd></div>
        ))}
      </dl>
    </Section>
  );
}

function Education() {
  const { t } = useLang();
  return (
    <Section id="education" num="05" title={t("Education")} note={t("An MBA in IT project management, on top of an engineering degree.")}>
      <ul className="schools">
        {education.map((e) => (
          <li key={e.degree}>
            <img src={e.logo} alt={t("{school} logo", { school: e.school.split(",")[0] })} width="44" height="44" loading="lazy" />
            <div>
              <h3>{t(e.degree)}</h3>
              <p><a href={e.url} {...ext}>{t(e.school)}</a></p>
              <p className="quiet">{t(e.note)}</p>
            </div>
            <span className="when">{e.period}</span>
          </li>
        ))}
      </ul>
      <article className="thesis" aria-labelledby="thesis-h">
        <p className="label">{t("Master's thesis")} · {t(thesis.date)}</p>
        <h3 id="thesis-h" lang="en">{thesis.title}</h3>
        <p className="thesis-meta">{t("MBA (90 ECTS) · IU International University")} · {t("Supervisor")}: {thesis.supervisor} · ISO 31000:2018</p>
        <p className="thesis-summary">{t(thesis.summary)}</p>
        <dl className="case-story">
          {thesis.points.map((p) => <div key={p.k}><dt>{t(p.k)}</dt><dd>{t(p.v)}</dd></div>)}
        </dl>
      </article>
    </Section>
  );
}

function Teaching() {
  const { lang, t } = useLang();
  const period = usePeriod();
  const Row = ({ title, text, meta, url }) => (
    <li>
      <span className="index-title">{url ? <a href={url} {...ext}><BrandIcon url={url} />{title} <span aria-hidden="true">↗</span></a> : title}</span>
      <span className="index-text">{text}</span>
      <span className="index-meta">{meta}</span>
    </li>
  );
  return (
    <Section id="teaching" num="06" title={t("Teaching & leadership")}
      note={t("Teaching, leading and social service: free courses, a learning community, and volunteer work since my student days.")}>
      <h3 className="minor first">{t("Teaching & community")}</h3>
      <ul className="index">
        {courses.map((c) => <Row key={c.title} title={c.title} url={c.url} text={t(c.text)} meta={slashes(c.tags.map((x) => t(x)))} />)}
        {leadership.filter((l) => l.title.startsWith("Founder")).map((l) => (
          <Row key={l.title} title={t(l.title)} text={t(l.text)} meta={period(l.period)} />
        ))}
      </ul>
      <h3 className="minor">{t("Leadership & social service")}</h3>
      <ul className="index">
        {leadership.filter((l) => !l.title.startsWith("Founder")).map((l) => (
          <Row key={l.title} title={t(l.title)} text={t(l.text)} meta={l.period} />
        ))}
      </ul>
      <div className="quotes">
        {testimonials.map((q) => (
          <figure key={q.who}>
            <blockquote lang="en"><p>{q.text}</p></blockquote>
            <figcaption>{q.who}, <span>{q.role}</span></figcaption>
          </figure>
        ))}
      </div>
      {lang !== "en" && <p className="quiet quote-note">{t("Quotes are shown in their original English.")}</p>}
    </Section>
  );
}

function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) { /* no clipboard */ }
  };
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-h">
      <div className="wrap">
        <p className="kicker"><span className="num">07</span> {t("Contact")}</p>
        <h2 id="contact-h">{t("Have a system that needs building, or a team that needs one more engineer?")}</h2>
        <div className="mail">
          <a href={`mailto:${profile.email}`}><BrandIcon url={`mailto:${profile.email}`} />{profile.email}</a>
          <button onClick={copy} aria-live="polite"><Icon name={copied ? "check" : "copy"} size={16} />{copied ? t("Copied") : t("Copy")}</button>
        </div>
        <p className="contact-note"><b>{t("Available to start a new role on 1 March 2027.")}</b> {t("I usually reply within one or two working days. Based in Augsburg, Germany (CET).")}</p>
        <ul className="elsewhere">
          {profile.social.filter((s) => s.icon !== "mail").map((s) => (
            <li key={s.name}><a href={s.url} {...ext}><BrandIcon url={s.url} />{s.name} <span aria-hidden="true">↗</span></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Colophon() {
  const { t } = useLang();
  return (
    <footer className="colophon">
      <div className="wrap colophon-inner">
        <p>© {new Date().getFullYear()} {t("Vishal Singh")}.</p>
        <p>{t("Set in Instrument Serif, Geist and Geist Mono. Built with React and Vite, hosted on GitHub Pages.")} <a href="https://github.com/CodeMitVishal/CodeMitVishal.github.io" {...ext}><BrandIcon name="github" />{t("Source")} ↗</a></p>
      </div>
    </footer>
  );
}

function Page() {
  const { t } = useLang();
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <a className="skip" href="#main">{t("Skip to content")}</a>
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
      <Assistant />
    </>
  );
}

export default function App() {
  return <LangProvider><Page /></LangProvider>;
}
