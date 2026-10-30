// ───────────────────────────────────────────────────────────────
//  A tiny, offline intent classifier that answers questions about
//  the portfolio. Keyword scoring → intent → answer built from
//  data/portfolio.js. No LLM, no network calls.
// ───────────────────────────────────────────────────────────────
import {
  profile,
  stats,
  about,
  experience,
  projects,
  skills,
  education,
  certifications,
} from "../data/portfolio.js";

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const tokenize = (s) => normalize(s).match(/[a-z0-9+#]+/g) || [];

// Short keywords must match exactly ("ai" shouldn't match "said"),
// longer ones also match as prefixes ("project" → "projects").
const matches = (token, keyword) =>
  keyword.length <= 3 ? token === keyword : token.startsWith(keyword);

const external = (label, href) => ({ label, href });

const intents = [
  {
    id: "greeting",
    keywords: ["hi", "hey", "hello", "namaste", "yo", "hola"],
    answer: () => ({
      text: `Hey! Ask me anything about ${profile.name.split(" ")[0]} — her projects, stack, experience or availability.`,
    }),
  },
  {
    id: "about",
    keywords: ["who", "yourself", "introduce", "summary", "sakshee", "background"],
    answer: () => ({ text: `${profile.intro}\n\n${about[0]}`, actions: [external("Read more", "#about")] }),
  },
  {
    id: "pitch",
    keywords: ["why", "hire", "fit", "strength", "different", "stand", "best", "value"],
    answer: () => ({
      text:
        "Short version: she ships. As the sole developer on a live product she owns features from schema to deploy.\n\n" +
        stats.map((s) => `• ${s.value} ${s.label.toLowerCase()}`).join("\n"),
      actions: [external("See the work", "#projects")],
    }),
  },
  {
    id: "ai",
    keywords: ["ai", "llm", "gemini", "prompt", "agent", "adk", "ml", "gpt", "claude", "chatbot", "genai", "rag"],
    answer: () => {
      const ai = skills.find((s) => s.group === "AI");
      return {
        text:
          `${about[2]}\n\nAI toolkit: ${ai ? ai.items.join(", ") : "LLM integration"}.` +
          "\n\nFun fact: this assistant is a mini version of the same idea — intent classification, running in your browser.",
        actions: [external("AI projects", "#projects")],
      };
    },
  },
  {
    id: "experience",
    keywords: ["experience", "work", "job", "company", "spinify", "celebal", "macrostays", "freelance", "freelancing", "years", "career", "intern", "role", "current"],
    answer: () => ({
      text:
        "About 3 years across product engineering and data:\n\n" +
        experience.map((j) => `• ${j.role} @ ${j.company} — ${j.period}`).join("\n") +
        `\n\nRight now: ${experience[0].points[0]}`,
      actions: [external("Full timeline", "#experience")],
    }),
  },
  {
    id: "projects",
    keywords: ["project", "built", "build", "made", "demo", "portfolio", "app"],
    answer: () => ({
      text:
        projects.map((p) => `• ${p.title} — ${p.kind}`).join("\n") +
        "\n\nAsk about any of them by name, e.g. “tell me about LeadLens”.",
      actions: [external("Selected work", "#projects")],
    }),
  },
  {
    id: "skills",
    keywords: ["skill", "stack", "tech", "react", "python", "node", "fastapi", "language", "tool", "know", "frontend", "backend", "docker", "sql"],
    answer: () => ({
      text: skills.map((s) => `• ${s.group}: ${s.items.join(", ")}`).join("\n"),
      actions: [external("Toolkit", "#skills")],
    }),
  },
  {
    id: "education",
    keywords: ["education", "degree", "college", "university", "mca", "bsc", "cgpa", "gpa", "study", "studied", "certif", "course"],
    answer: () => ({
      text:
        education.map((e) => `• ${e.degree} — ${e.school} (${e.score})`).join("\n") +
        `\n\nCertifications: ${certifications.join("; ")}.`,
      actions: [external("Education", "#education")],
    }),
  },
  {
    id: "availability",
    keywords: ["available", "availability", "join", "notice", "relocat", "onsite", "remote", "location", "where", "based", "live", "open"],
    answer: () => ({ text: `${profile.availability}. Currently based in ${profile.location}.` }),
  },
  {
    id: "contact",
    keywords: ["contact", "email", "mail", "reach", "phone", "call", "linkedin", "github", "connect", "talk"],
    answer: () => ({
      text: `Email is fastest: ${profile.email}\nOr message her on LinkedIn — she replies quickly.`,
      actions: [
        external("Email", `mailto:${profile.email}`),
        external("LinkedIn", profile.linkedin),
        external("GitHub", profile.github),
      ],
    }),
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "pdf", "download"],
    answer: () => ({
      text: "Here's her résumé as a PDF. Questions about it? Email or LinkedIn is the quickest way to reach her.",
      actions: [external("Open résumé", profile.resume), external("Email", `mailto:${profile.email}`), external("LinkedIn", profile.linkedin)],
    }),
  },
];

// Distinctive words from each project title, so "leadlens" or "avatar" finds the project.
const GENERIC = new Set(["app", "the", "and"]);
const projectIndex = projects.map((p) => ({
  project: p,
  words: tokenize(p.title).filter((w) => w.length >= 4 && !GENERIC.has(w)),
}));

const describeProject = (p) => ({
  text:
    `${p.title} — ${p.kind}\n\n${p.description}` +
    (p.highlight ? `\n\n✦ ${p.highlight}` : "") +
    `\n\nStack: ${p.stack.join(", ")}` +
    (p.company && !p.link
      ? `\n\nBuilt at ${p.company}, so the code is private — happy to walk through it in an interview.`
      : ""),
  actions: p.link || p.repo
    ? [
        p.link && external(p.link.includes("github.com") ? "View on GitHub" : "View live", p.link),
        p.repo && external("View on GitHub", p.repo),
      ].filter(Boolean)
    : [external("All projects", "#projects")],
});

export const suggestions = [
  "What has she built?",
  "Tell me about the 3D avatar",
  "What's her AI experience?",
  "Is she available?",
];

export const welcome = {
  intent: "greeting",
  text: `Hi, I'm a tiny assistant that knows ${profile.name.split(" ")[0]}'s work. I'm a keyword intent classifier, not an LLM — so ask simple questions and I'll do my best.`,
};

export function ask(question) {
  const tokens = tokenize(question);

  const project = projectIndex.find(({ words }) => words.some((w) => tokens.some((t) => matches(t, w))));
  if (project) return { intent: "project_detail", ...describeProject(project.project) };

  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keywords.reduce((n, k) => n + (tokens.some((t) => matches(t, k)) ? 1 : 0), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  if (!best) {
    return {
      intent: "fallback",
      text:
        "Hmm, I didn't catch that — I only know what's on this page. Try asking about projects, skills, experience, education or how to get in touch.",
    };
  }
  return { intent: best.id, ...best.answer() };
}
