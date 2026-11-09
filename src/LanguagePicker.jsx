import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_LANGUAGES, LANGUAGE_GROUPS, SITE_HOST, googleTranslateUrl, isGoogleProxy } from "./languages.js";
import { useLang } from "./i18n.jsx";

function Globe() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18" />
    </svg>
  );
}

const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function LanguageRow({ l, current, onPick, t }) {
  if (l.hand) {
    return (
      <li>
        <button type="button" className="lp-item" lang={l.code} aria-current={current ? "true" : undefined} onClick={() => onPick(l.code)}>
          <span className="lp-name">{l.name}</span>
          <span className="lp-hint" lang="en">{l.english}</span>
          {current && <span className="lp-check" aria-label={t("Current language")}>✓</span>}
        </button>
      </li>
    );
  }
  return (
    <li>
      <a className="lp-item" lang={l.code} dir={l.rtl ? "rtl" : undefined} href={googleTranslateUrl(l.google)} rel="noopener">
        <span className="lp-name">{l.name}</span>
        <span className="lp-hint" lang="en" dir="ltr">{l.english}</span>
        <span className="lp-mt" aria-hidden="true">G ↗</span>
      </a>
    </li>
  );
}

export default function LanguagePicker() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState({});
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);
  const proxied = isGoogleProxy();
  const currentLang = ALL_LANGUAGES.find((l) => l.code === lang);

  const close = (focusButton = true) => {
    setOpen(false);
    setQ("");
    if (focusButton) buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return undefined;
    searchRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) close(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  const results = useMemo(() => {
    const s = norm(q.trim());
    if (!s) return null;
    return ALL_LANGUAGES.filter((l) => norm(`${l.name} ${l.english} ${l.code}`).includes(s));
  }, [q]);

  const pick = (code) => { setLang(code); close(); };

  return (
    <div className="lp" ref={rootRef}>
      <button type="button" ref={buttonRef} className="lp-trigger" aria-haspopup="dialog" aria-expanded={open}
        aria-label={`${t("Language")}: ${currentLang?.name}`} onClick={() => setOpen(!open)}>
        <Globe />
        <span className="lp-current" lang={lang}>{currentLang?.name}</span>
        <span className="lp-code" aria-hidden="true">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <div className="lp-panel" role="dialog" aria-label={t("Choose a language")}>
          {proxied && (
            <p className="lp-proxy">
              {t("You're reading a machine translation by Google.")} <a href={`https://${SITE_HOST}/`}>{t("Open the original site")}</a>
            </p>
          )}
          <div className="lp-head">
            <label className="lp-search">
              <span className="sr">{t("Search languages")}</span>
              <input ref={searchRef} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search languages")} autoComplete="off" />
            </label>
            <button type="button" className="lp-close" onClick={() => close()} aria-label={t("Close")}>×</button>
          </div>

          <div className="lp-body">
            {results ? (
              results.length ? (
                <ul className="lp-list">{results.map((l) => <LanguageRow key={l.code} l={l} current={l.code === lang} onPick={pick} t={t} />)}</ul>
              ) : (
                <p className="lp-empty">{t("No language matches “{q}”.", { q })}</p>
              )
            ) : (
              LANGUAGE_GROUPS.map((g) => {
                const hand = g.languages.filter((l) => l.hand);
                const more = g.languages.filter((l) => !l.hand);
                const isOpen = !!expanded[g.id];
                return (
                  <section className="lp-group" key={g.id} aria-labelledby={`lp-${g.id}`}>
                    <h3 id={`lp-${g.id}`}>{t(g.label)}</h3>
                    <ul className="lp-list">{hand.map((l) => <LanguageRow key={l.code} l={l} current={l.code === lang} onPick={pick} t={t} />)}</ul>
                    <button type="button" className="lp-more" aria-expanded={isOpen} aria-controls={`lp-more-${g.id}`}
                      onClick={() => setExpanded((x) => ({ ...x, [g.id]: !x[g.id] }))}>
                      <span>{t(g.more)} <span className="lp-count">({more.length})</span></span>
                      <span className="lp-chev" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <ul className="lp-list lp-list-more" id={`lp-more-${g.id}`}>
                        {more.map((l) => <LanguageRow key={l.code} l={l} current={false} onPick={pick} t={t} />)}
                      </ul>
                    )}
                  </section>
                );
              })
            )}
          </div>

          <p className="lp-note">{t("Languages marked G ↗ open a machine translation by Google, which may contain errors. All others are translated by hand.")}</p>
        </div>
      )}
    </div>
  );
}
