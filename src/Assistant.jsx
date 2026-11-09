import { useEffect, useMemo, useRef, useState } from "react";
import { assistant, profile } from "./data.js";
import { buildKnowledge, searchKnowledge } from "./knowledge.js";
import { useLang } from "./i18n.jsx";
import { PRIVACY_WARNING, containsPersonalData } from "./privacy.js";

const SUGGESTIONS = [
  "What does Vishal work on today?",
  "Which Microsoft certifications does he hold?",
  "Has he led development teams?",
  "Which languages does he speak?",
];
const STORE = "assistant-chat";

function Spark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
    </svg>
  );
}

/* Shows **bold** and line breaks / "- " bullets from the model's plain-text answer, without raw HTML. */
function Rich({ text }) {
  const blocks = text.split(/\n{2,}/);
  const inline = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") && p.endsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p));
  return blocks.map((b, i) => {
    const rows = b.split("\n").filter(Boolean);
    if (rows.length && rows.every((r) => /^\s*[-*•]\s+/.test(r))) {
      return <ul key={i}>{rows.map((r, j) => <li key={j}>{inline(r.replace(/^\s*[-*•]\s+/, ""))}</li>)}</ul>;
    }
    return <p key={i}>{rows.map((r, j) => <span key={j}>{j > 0 && <br />}{inline(r)}</span>)}</p>;
  });
}

export default function Assistant() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(STORE)) || []; } catch (e) { return []; }
  });
  const knowledge = useMemo(() => buildKnowledge(), []);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const online = Boolean(assistant.endpoint);

  useEffect(() => {
    try { sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-20))); } catch (e) { /* private mode */ }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); launcherRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const localAnswer = (question, reason) => {
    const found = searchKnowledge(knowledge, question, 2);
    const intro = reason ? `${t(reason)}\n\n` : "";
    if (!found.length) return `${intro}${t("I couldn't find that on this website. Please email Vishal: {email}", { email: profile.email })}`;
    return `${intro}${t("Here is what this website says:")}\n\n${found.map((c) => `**${c.title}**\n${c.text.split("\n").slice(0, 6).join("\n")}`).join("\n\n")}`;
  };

  /* `searchText` lets a translated suggestion search the English website text in search mode. */
  const send = async (text, searchText = text) => {
    const question = text.trim().slice(0, 800);
    if (!question || busy) return;
    // Personal data never leaves the browser and is never stored: warn, and keep the text
    // in the box so the visitor can remove the personal part.
    if (containsPersonalData(question)) {
      setMessages([...messages, { role: "assistant", content: t(PRIVACY_WARNING), error: true }]);
      inputRef.current?.focus();
      return;
    }
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    if (!online) {
      setMessages([...next, { role: "assistant", content: localAnswer(searchText), local: true }]);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${assistant.endpoint.replace(/\/$/, "")}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next.slice(-10).map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      } else if (data.error === "personal_data") {
        setMessages([...messages, { role: "assistant", content: t(PRIVACY_WARNING), error: true }]);
      } else if (res.status === 429 && data.error === "rate_limited") {
        setMessages([...next, { role: "assistant", content: t("You're asking very quickly. Please wait a minute and try again."), error: true }]);
      } else {
        const why = data.error === "daily_limit" ? "The AI has reached its free daily limit." : "The AI is not reachable right now.";
        setMessages([...next, { role: "assistant", content: localAnswer(searchText, why), local: true }]);
      }
    } catch (e) {
      setMessages([...next, { role: "assistant", content: localAnswer(searchText, "The AI is not reachable right now."), local: true }]);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e) => { e.preventDefault(); send(input); };
  const onKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } };

  return (
    <>
      <button type="button" ref={launcherRef} className={open ? "ai-launch hidden" : "ai-launch"} onClick={() => setOpen(true)}
        aria-haspopup="dialog" aria-expanded={open}>
        <Spark /> <span>{t("Ask AI about Vishal")}</span>
      </button>

      {open && (
        <section className="ai-panel" role="dialog" aria-modal="false" aria-labelledby="ai-title">
          <header className="ai-head">
            <div>
              <h2 id="ai-title"><Spark size={15} /> {t("AI assistant")}</h2>
              <p>{online ? t("Answers only from this website's content.") : t("Search mode: answers come straight from this website.")}</p>
            </div>
            <div className="ai-head-tools">
              {messages.length > 0 && <button type="button" className="ai-clear" onClick={() => setMessages([])}>{t("Clear")}</button>}
              <button type="button" className="ai-x" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} aria-label={t("Close assistant")}>×</button>
            </div>
          </header>

          <div className="ai-log" ref={listRef} aria-live="polite">
            <div className="ai-msg bot"><p>{t("Hi! Ask me about Vishal's experience, projects, skills, certifications or how to reach him.")}</p></div>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role === "user" ? "me" : "bot"}${m.error ? " err" : ""}`}>
                {m.role === "user" ? <p>{m.content}</p> : <Rich text={m.content} />}
              </div>
            ))}
            {busy && <div className="ai-msg bot typing" aria-label={t("Thinking…")}><span /><span /><span /></div>}
            {messages.length === 0 && (
              <div className="ai-suggest">
                <p>{t("Try asking:")}</p>
                {SUGGESTIONS.map((s) => <button type="button" key={s} onClick={() => send(t(s), s)}>{t(s)}</button>)}
              </div>
            )}
          </div>

          <form className="ai-form" onSubmit={onSubmit}>
            <label className="sr" htmlFor="ai-input">{t("Your question")}</label>
            <textarea id="ai-input" ref={inputRef} rows={1} value={input} maxLength={800} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
              placeholder={t("Ask about experience, projects or skills…")} />
            <button type="submit" disabled={busy || !input.trim()}>{t("Send")}</button>
          </form>
          <p className="ai-foot">{t("AI can make mistakes; please check important facts.")}</p>
        </section>
      )}
    </>
  );
}
