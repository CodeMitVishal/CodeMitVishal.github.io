/* Translations. English is the source text and the default.
   Each hand-translated language has a dictionary in src/i18n/<code>.js keyed by the exact English
   text; dictionaries are loaded only when that language is chosen. Missing entries stay in English.

   Rich text inside a string:  **bold**   *italic*   {name} -> a value or a React node (e.g. a link). */
import { Fragment, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HAND_LANGUAGES } from "./languages.js";

const LOADERS = {
  de: () => import("./i18n/de.js"),
  fr: () => import("./i18n/fr.js"),
  es: () => import("./i18n/es.js"),
  it: () => import("./i18n/it.js"),
  hi: () => import("./i18n/hi.js"),
  bn: () => import("./i18n/bn.js"),
  mr: () => import("./i18n/mr.js"),
  te: () => import("./i18n/te.js"),
  ta: () => import("./i18n/ta.js"),
  gu: () => import("./i18n/gu.js"),
};

export const PAGE_TITLE = "Vishal Singh · Software Engineer (C# / .NET, Angular, Azure, AI agents)";

const isHand = (v) => HAND_LANGUAGES.some((l) => l.code === v);

/* ?lang=de in the address wins (shareable links), then the visitor's last choice, then English. */
function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isHand(fromUrl)) return fromUrl;
  try {
    const v = localStorage.getItem("lang");
    return isHand(v) ? v : "en";
  } catch (e) {
    return "en";
  }
}

/* Turn "I build *this* with **that** at {link}" into React nodes. */
function format(text, values) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\{\w+\})/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <b key={i}>{format(part.slice(2, -2), values)}</b>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{format(part.slice(1, -1), values)}</em>;
    const m = part.match(/^\{(\w+)\}$/);
    if (m && values && m[1] in values) return <Fragment key={i}>{values[m[1]]}</Fragment>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  /* `wanted` is what the visitor picked; `active` is what is on screen. The page keeps showing the
     current language until the new dictionary has loaded, then switches in one step (no mixed text). */
  const [wanted, setWanted] = useState(initialLang);
  const [active, setActive] = useState({ code: "en", dict: null });
  const lang = active.code;
  const loading = wanted !== active.code;

  useEffect(() => {
    let cancelled = false;
    if (wanted === "en") { setActive({ code: "en", dict: null }); return undefined; }
    LOADERS[wanted]()
      .then((m) => { if (!cancelled) setActive({ code: wanted, dict: m.default }); })
      .catch(() => { if (!cancelled) { setWanted("en"); setActive({ code: "en", dict: null }); } });
    return () => { cancelled = true; };
  }, [wanted]);

  const setLang = useCallback((code) => {
    if (!isHand(code)) return;
    setWanted(code);
    try { localStorage.setItem("lang", code); } catch (e) { /* private mode */ }
  }, []);

  const dict = active.dict;
  const lookup = useCallback((s) => {
    if (lang === "en" || typeof s !== "string") return s;
    if (!dict) return s;
    const hit = dict[s];
    if (hit === undefined) {
      (window.__i18nMissing ||= new Set()).add(`${lang}: ${s}`);
      return s;
    }
    return hit;
  }, [lang, dict]);

  /* plain string, with {name} values filled in */
  const t = useCallback((s, vars) => {
    let out = lookup(s);
    if (vars && typeof out === "string") out = out.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
    return out;
  }, [lookup]);

  /* rich text: markup and React nodes (links) */
  const tr = useCallback((s, values) => format(lookup(s), values), [lookup]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t(PAGE_TITLE);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t, tr, loading }), [lang, setLang, t, tr, loading]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
