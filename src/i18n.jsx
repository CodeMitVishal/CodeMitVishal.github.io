/* Languages: English is the source text and the default. German and Hindi are
   hand-written dictionaries keyed by the English text, so any string without a
   translation simply stays in English. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import de from "./i18n/de.js";
import hi from "./i18n/hi.js";

export const LANGS = [
  { code: "en", short: "EN", name: "English" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "hi", short: "हि", name: "हिन्दी" },
];
const DICTS = { de, hi };
const TITLES = {
  en: "Vishal Singh · Software Engineer (C# / .NET, Angular, Azure, AI agents)",
  de: "Vishal Singh · Softwareentwickler (C# / .NET, Angular, Azure, KI-Agenten)",
  hi: "विशाल सिंह · सॉफ़्टवेयर इंजीनियर (C# / .NET, Angular, Azure, AI एजेंट)",
};

const LangContext = createContext(null);

const isLang = (v) => LANGS.some((l) => l.code === v);

/* ?lang=de in the address wins (shareable links), then the visitor's last choice, then English. */
function readStoredLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const v = localStorage.getItem("lang");
    return isLang(v) ? v : "en";
  } catch (e) {
    return "en";
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
  }, [lang]);

  const t = useCallback((s, vars) => {
    let out = s;
    if (lang !== "en" && typeof s === "string") {
      const hit = DICTS[lang][s];
      if (hit === undefined) {
        (window.__i18nMissing ||= new Set()).add(`${lang}: ${s}`);
      } else {
        out = hit;
      }
    }
    if (vars) out = out.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
    return out;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/* Sentences with inline markup or links, where word order differs per language. */
export const RICH = {
  heroTitle: {
    en: <>I build C# back ends that <em>talk in events</em>, Angular front ends, and the pipelines that <em>ship them</em> to Azure.</>,
    de: <>Ich baue C#-Backends, die <em>in Events sprechen</em>, Angular-Frontends und die Pipelines, die sie <em>nach Azure bringen</em>.</>,
    hi: <>मैं C# बैकएंड बनाता हूँ जो <em>इवेंट्स में बात करते हैं</em>, Angular फ्रंटएंड, और वे पाइपलाइन जो उन्हें <em>Azure तक पहुँचाती हैं</em>।</>,
  },
  brings: {
    en: [
      <><b>C# / .NET REST APIs</b> and microservices, structured with Clean Architecture.</>,
      <><b>Event-driven back ends</b>: IoT Hub consumer groups, Service Bus, the Outbox pattern, change trackers.</>,
      <><b>Data processors and pipelines</b> that move millions of rows without dropping one.</>,
      <><b>AI agent back ends</b>: tool APIs, MCP servers and RAG over company data.</>,
      <><b>Angular</b> front ends, <b>CI/CD pipelines</b>, and careful <b>code reviews</b>.</>,
    ],
    de: [
      <><b>C# / .NET REST-APIs</b> und Microservices, aufgebaut nach Clean Architecture.</>,
      <><b>Eventgetriebene Backends</b>: IoT-Hub-Consumer-Groups, Service Bus, das Outbox-Pattern, Change Tracker.</>,
      <><b>Datenprozessoren und Pipelines</b>, die Millionen von Zeilen verarbeiten, ohne eine zu verlieren.</>,
      <><b>Backends für KI-Agenten</b>: Tool-APIs, MCP-Server und RAG über Unternehmensdaten.</>,
      <><b>Angular</b>-Frontends, <b>CI/CD-Pipelines</b> und sorgfältige <b>Code-Reviews</b>.</>,
    ],
    hi: [
      <><b>C# / .NET REST API</b> और माइक्रोसर्विसेज़, Clean Architecture के साथ।</>,
      <><b>इवेंट-ड्रिवन बैकएंड</b>: IoT Hub consumer groups, Service Bus, Outbox पैटर्न, change trackers।</>,
      <><b>डेटा प्रोसेसर और पाइपलाइन</b>, जो लाखों पंक्तियाँ बिना एक भी खोए संभालते हैं।</>,
      <><b>AI एजेंट बैकएंड</b>: tool API, MCP सर्वर और कंपनी डेटा पर RAG।</>,
      <><b>Angular</b> फ्रंटएंड, <b>CI/CD पाइपलाइन</b> और ध्यान से किए गए <b>कोड रिव्यू</b>।</>,
    ],
  },
  nowAt: {
    en: (role, link) => <>{role} at {link}</>,
    de: (role, link) => <>{role} bei {link}</>,
    hi: (role, link) => <>{link} में {role}</>,
  },
  certified: {
    en: (link, e) => <>{link}, {e} at Expert level</>,
    de: (link, e) => <>{link}, davon {e} auf Expert-Niveau</>,
    hi: (link, e) => <>{link}, जिनमें {e} Expert स्तर के</>,
  },
  courses: {
    en: (link) => <>Free Git &amp; Python courses on {link}</>,
    de: (link) => <>Kostenlose Git- und Python-Kurse auf {link}</>,
    hi: (link) => <>{link} पर मुफ़्त Git और Python कोर्स</>,
  },
  alsoCertified: {
    en: (link, issuer) => <>Also certified: {link}, {issuer}.</>,
    de: (link, issuer) => <>Außerdem zertifiziert: {link}, {issuer}.</>,
    hi: (link, issuer) => <>इसके अलावा प्रमाणित: {link}, {issuer}।</>,
  },
};

export function rich(lang, key) {
  return RICH[key][lang] ?? RICH[key].en;
}
