import { useEffect, useRef, useState } from "react";
import { ask, suggestions, welcome } from "../../lib/assistant.js";
import { emit, on } from "../../lib/assistantBus.js";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTyping = () => {
  const el = document.activeElement;
  return el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
};

// Floating "Ask about me" chat. Press "/" anywhere to open it.
export default function AskAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", ...welcome }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !open && !isTyping()) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Clicking the avatar opens the chat
  useEffect(() => on("request-open", () => setOpen(true)), []);

  // Tell the avatar what the chat is doing, so it can think, then "say" the reply
  const last = messages[messages.length - 1];
  const phase = last.pending ? (last.text ? "talking" : "thinking") : "idle";
  useEffect(() => {
    emit("state", { open, phase, text: last.full || "" });
    // last.full only changes along with phase
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // "Stream" the newest bot reply a few characters at a time.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last?.pending) return;
    const reduce = prefersReducedMotion();
    let shown = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        shown = reduce ? last.full.length : shown + 3;
        const done = shown >= last.full.length;
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { ...last, text: last.full.slice(0, shown), pending: !done };
          return copy;
        });
        if (done) {
          clearInterval(interval);
          setBusy(false);
        }
      }, 16);
    }, reduce ? 0 : 500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // Only restart when a new message is appended, not on every streamed tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  const send = (text) => {
    const question = text.trim();
    if (!question || busy) return;
    const reply = ask(question);
    setInput("");
    setBusy(true);
    setMessages((m) => [
      ...m,
      { from: "user", text: question },
      { from: "bot", ...reply, full: reply.text, text: "", pending: true },
    ]);
  };

  return (
    <>
      <button
        className={`ask-fab ${open ? "is-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open the portfolio assistant"
      >
        <span className="dot" /> Ask about me <kbd>/</kbd>
      </button>

      {open && (
        <div className="ask" role="dialog" aria-label="Portfolio assistant">
          <header className="ask__head">
            <div>
              <p className="ask__title">sakshee.assistant</p>
              <p className="mono">intent classifier · runs in your browser</p>
            </div>
            <button className="ask__close" onClick={() => setOpen(false)} aria-label="Close assistant">
              ×
            </button>
          </header>

          <ol className="ask__log" ref={logRef} aria-live="polite">
            {messages.map((m, i) => (
              <li key={i} className={`msg msg--${m.from}`}>
                {m.intent && <span className="msg__intent">intent: {m.intent}</span>}
                {m.pending && !m.text ? (
                  <span className="typing" aria-label="Thinking">
                    <i /><i /><i />
                  </span>
                ) : (
                  <p>{m.text}</p>
                )}
                {!m.pending && m.actions?.length > 0 && (
                  <div className="msg__actions">
                    {m.actions.map((a) => {
                      const internal = a.href.startsWith("#");
                      return (
                        <a
                          key={a.href}
                          href={a.href}
                          {...(a.href.startsWith("http") || a.href.endsWith(".pdf")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          onClick={() => internal && setOpen(false)}
                        >
                          {a.label} {internal ? "↓" : "↗"}
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="ask__chips">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={busy}>
                {s}
              </button>
            ))}
          </div>

          <form
            className="ask__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, stack, availability…"
              aria-label="Your question"
              maxLength={200}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
