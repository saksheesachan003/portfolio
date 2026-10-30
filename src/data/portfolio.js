// ───────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ───────────────────────────────────────────────────────────────

import avatarShot from "../assets/projects/3d-avatar.png";
import callCanvasShot from "../assets/projects/call-canvas.png";
import leadLensShot from "../assets/projects/leadlens.png";
import skyCartShot from "../assets/projects/skycart.png";

export const profile = {
  name: "Sakshee Sachan",
  role: "Software Engineer",
  tagline: "Full-stack engineer who ships LLM features to real users — from the React UI to the FastAPI backend.",
  intro: "I own products end to end — UI, APIs, deployment, and the 2 a.m. fix.",
  location: "Kanpur, India",
  email: "sakshee.sachan003@gmail.com",
  github: "https://github.com/saksheesachan003",
  linkedin: "https://www.linkedin.com/in/sakshee2518",
  resume: "Sakshee_Sachan_Software_Engineer.pdf", // file in public/
  availability: "Immediate joiner · Open to relocation & on-site",
  // Cycles in the hero after the role
  focus: ["LLM-powered products", "real-time interfaces", "3D on the web", "APIs that hold up"],
};

export const stats = [
  { value: "~3", label: "Years in production" },
  { value: "10+", label: "Features shipped solo" },
  { value: "~30%", label: "Lower AI response latency" },
  { value: "40%", label: "Faster initial load" },
];

export const about = [
  "I'm a software engineer who usually owns the whole product. For my first two years at Spinify.AI I was the sole developer — I designed the APIs, wrote the queries, set up the Docker environments and picked up the pager when something broke. After my promotion I led our LLM-powered features and mentored new developers.",
  "Right now I'm the sole designer and frontend developer at Macrostays, a furnished-rental platform built with React 19, TypeScript and server-side rendering for SEO.",
  "My focus is LLM products: conversational assistants with multi-turn memory, intent classification and tool calling. I also care about the unglamorous parts — loading states, error handling, and shaving seconds off page loads.",
];

export const experience = [
  {
    role: "Frontend Developer & UI/UX Designer · Freelance",
    company: "Macrostays",
    link: "https://www.linkedin.com/company/macrostays/",
    location: "Remote",
    period: "Oct 2026 — Present",
    points: [
      "Sole designer and frontend developer for a furnished apartment rental platform for long stays and corporate housing.",
      "Designed wireframes and high-fidelity UI focused on a smooth search and booking experience.",
      "Building the frontend in React 19, TypeScript, Tailwind CSS v4 and shadcn/ui, with server-side rendering and pre-rendering via React Router v7.",
      "Implementing search with advanced filters and Google Maps nearby places.",
      "SEO-first setup: dynamic meta tags, Open Graph, hreflang, JSON-LD structured data, sitemap and Core Web Vitals optimisation.",
    ],
    tags: ["React 19", "TypeScript", "React Router v7", "Tailwind v4", "shadcn/ui", "Figma", "SEO"],
  },
  {
    role: "Software Engineer",
    company: "Spinify.AI",
    link: "https://spinify.ai/",
    location: "Remote (Noida)",
    period: "Apr 2026 — Oct 2026",
    points: [
      "Promoted after two years as Associate; led LLM-powered conversational workflow features on Google ADK and Gemini, now serving live users and reducing support tickets.",
      "Cut average AI response latency by ~30% through async response handling and prompt caching.",
      "Designed FastAPI workflows for long-running requests with async processing and structured errors; built real-time WebSocket dashboards.",
      "Reviewed code, mentored junior developers on React and API integration, and worked with business stakeholders to turn requirements into shipped features.",
    ],
    tags: ["Google ADK", "Gemini", "FastAPI", "WebSockets", "LLMs", "Mentoring"],
  },
  {
    role: "Associate Software Engineer",
    company: "Spinify.AI",
    link: "https://spinify.ai/",
    location: "Remote (Noida)",
    period: "Apr 2024 — Mar 2026",
    award: "Instant Award",
    points: [
      "Sole developer on the product — shipped 10+ production features end to end, from design through deployment and support.",
      "Designed 15+ REST endpoints in Python/FastAPI and Node.js with structured error handling.",
      "Refactored data fetching and API payloads, cutting initial page load by 40% and LCP by 1.2s.",
      "Set up Docker-based dev environments and contributed to CI/CD pipelines, cutting deployment time by 35%.",
      "Delivered the full frontend of RentEase, a B2C booking platform for bikes, cars and homestays, with a real-time WebSocket support chatbot; won an Instant Award.",
      "Built a secure Razorpay checkout end to end (webhooks, payment verification, React UI) and a real-time audio pipeline (React, WebRTC, Janus Gateway).",
    ],
    tags: ["React", "Node.js", "FastAPI", "Docker", "Razorpay", "WebRTC"],
  },
  {
    role: "React & Frontend Integration Intern",
    company: "Spinify.AI",
    link: "https://spinify.ai/",
    location: "Noida",
    period: "Jan 2024 — Mar 2024",
    points: [
      "Built 8+ reusable React components and optimized async API data flows, cutting unnecessary re-renders by 20%.",
      "Developed a 3D virtual agent interface with real-time voice synthesis, sustaining 60 fps on mid-range devices.",
    ],
    tags: ["React", "Three.js", "Voice"],
  },
  {
    role: "SQL Developer Intern",
    company: "Celebal Technologies",
    location: "Jaipur",
    period: "Jun 2023 — Aug 2023",
    points: [
      "Rewrote and indexed SQL queries behind reporting dashboards for 500+ daily users, improving retrieval speed by 25%.",
      "Contributed to schema design across 3 internal projects.",
    ],
    tags: ["SQL", "PostgreSQL", "Schema design"],
  },
];

// featured: true → large card. `link` (live site or repo) and `repo` (GitHub source,
// shown as a second button) are optional; leave "" or omit to hide the button.
// `company` marks work built for an employer — the code is private, so the card
// shows a "Private · <company>" badge instead of a link.
// `image` (optional) is a screenshot or GIF imported from src/assets/projects/.
export const projects = [
  {
    title: "AI Admission Chatbot",
    kind: "Conversational AI",
    featured: true,
    description:
      "Applicants kept emailing the same admission questions. I built a multi-turn assistant on Google ADK + Gemini that answers course questions, classifies intent, and uses tool calling to collect student details and guide them through admission.",
    highlight: "~30% lower response latency via prompt caching",
    stack: ["React", "FastAPI", "Python", "Google ADK", "Gemini", "YAML"],
    link: "",
    company: "Spinify.AI",
  },
  {
    title: "3D Talking Avatar",
    kind: "3D · Voice",
    featured: true,
    description:
      "I built the 3D avatar end to end in Three.js — model, scene, lip-sync with morph targets and head-follow. Spinify used it as the face of its real-time voice agent, turning a chat into a face-to-face conversation.",
    highlight: "Smooth 60 fps rendering on mid-range devices",
    stack: ["Three.js", "React", "Web Speech API", "JavaScript"],
    link: "",
    image: avatarShot,
    company: "Spinify.AI",
  },
  {
    title: "RentEase",
    kind: "B2C Product",
    description:
      "I delivered the entire front end of a B2C booking platform for bikes, cars and homestays — including a real-time WebSocket support chat and a secure Razorpay checkout.",
    highlight: "Instant Award for solo front-end delivery",
    stack: ["React", "Tailwind", "Material UI", "WebSockets", "Razorpay"],
    link: "",
    company: "Spinify.AI",
  },
  {
    title: "LeadLens",
    kind: "Personal · Backend · Data",
    description:
      "Turns a list of company websites into verified, scored, CRM-ready leads using async scraping, email validation and explainable scoring.",
    stack: ["Python", "FastAPI", "Async scraping"],
    link: "https://leadlens-chi.vercel.app/",
    repo: "https://github.com/saksheesachan003/leadlens",
    image: leadLensShot,
  },
  {
    title: "Call Canvas",
    kind: "Personal · Developer Tool",
    description:
      "A drag-and-drop designer for voice-bot conversations, with custom node types, editable connections, Redux state and JSON import/export so flows can be saved, shared and reloaded.",
    stack: ["React", "React Flow", "Redux"],
    link: "https://call-canvas.vercel.app/",
    repo: "https://github.com/saksheesachan003/call-canvas",
    image: callCanvasShot,
  },
  {
    title: "myCDA Session Feedback",
    kind: "Personal · Full-stack",
    description:
      "Students and parents rate completed sessions; instructors only see an anonymised average — privacy built into the data model.",
    stack: ["Django REST", "Next.js 14", "Python"],
    repo: "https://github.com/saksheesachan003/mycda-session-feedback",
  },
  {
    title: "SkyCart",
    kind: "Personal · Full-stack SPA",
    description:
      "Single-page e-commerce dashboard with authentication, product filtering and search.",
    stack: ["React", "Tailwind", "Lucide"],
    link: "https://skycart-application-zi7t.vercel.app/",
    repo: "https://github.com/saksheesachan003/skycart_application",
    image: skyCartShot,
  },
];

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL"] },
  { group: "Frontend", items: ["React 19", "Next.js", "React Router v7", "Redux", "React Flow", "Three.js", "Tailwind CSS", "shadcn/ui", "Material UI"] },
  { group: "Backend", items: ["Node.js", "FastAPI", "Django REST", "REST APIs", "WebSockets", "WebRTC"] },
  { group: "AI", items: ["LLM Integration", "Google ADK", "Gemini", "Prompt Engineering", "Tool Calling"] },
  { group: "Data & DevOps", items: ["PostgreSQL", "Docker", "CI/CD", "Git/GitHub"] },
  { group: "Design & Testing", items: ["Figma", "React Testing Library"] },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Lovely Professional University, Phagwara",
    period: "2022 — 2024",
    score: "CGPA 9.5 / 10",
  },
  {
    degree: "B.Sc. Computer Programming & Applications",
    school: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    period: "2019 — 2022",
    score: "CGPA 8.7 / 10",
  },
];

export const certifications = [
  "Meta Front-End Developer — Coursera",
  "Claude Code — Anthropic",
];

// The 3D avatar follows you down the page. For each section: what it says and how it poses.
// Poses: "wave" · "think" · "point" (towards the content) · "present"
export const avatar = {
  model: "models/avatar.vrm", // drop your own VRoid export here
  sections: {
    top: { pose: "wave", line: "Hi, I'm Sakshee 👋 Scroll and I'll show you around." },
    about: { pose: "think", line: "Short version: I usually own the whole product." },
    experience: { pose: "point", line: "~3 years shipping to real users. Here's where." },
    projects: { pose: "present", line: "These are the ones I'm proudest of ✦" },
    skills: { pose: "point", line: "My everyday toolkit." },
    education: { pose: "think", line: "Where it all started." },
    contact: { pose: "wave", line: "Let's build something together — say hi!" },
  },
};
