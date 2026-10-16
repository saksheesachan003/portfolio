// ───────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Sakshee Sachan",
  role: "Software Engineer",
  tagline: "I build production web apps and LLM-powered products — end to end.",
  intro:
    "~3 years shipping React, Node.js and Python/FastAPI to real users. Often the sole developer on a product, I own it from component architecture and API design through deployment and production support.",
  location: "Kanpur, India",
  email: "sakshee.sachan003@gmail.com",
  github: "https://github.com/saksheesachan003",
  linkedin: "https://www.linkedin.com/in/sakshee2518",
  availability: "Immediate joiner · Open to relocation & on-site",
  // Cycles in the hero after the role
  focus: ["LLM-powered products", "real-time interfaces", "3D on the web", "APIs that hold up"],
};

export const stats = [
  { value: "~3", label: "Years in production" },
  { value: "10+", label: "Features shipped solo" },
  { value: "15+", label: "REST endpoints designed" },
  { value: "40%", label: "Faster initial load" },
];

export const about = [
  "I'm a software engineer at Spinify.AI, where I've spent most of my time as the only developer on the product. That means I don't just write the UI — I design the APIs, write the queries, set up the Docker environments, and pick up the pager when something breaks.",
  "Lately my focus has been LLM-powered products: conversational assistants with multi-turn memory, intent classification and tool calling, plus the visual tooling around them. I care about the unglamorous parts too — loading states, error handling, and shaving seconds off page loads.",
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Spinify.AI",
    location: "Remote (Noida)",
    period: "Apr 2024 — Present",
    points: [
      "Sole developer on the product — shipped 10+ production features end to end, from development through deployment and post-release support.",
      "Designed and integrated 15+ REST endpoints across Node.js and Python/FastAPI, including async handling of long-running requests and structured error responses.",
      "Refactored data-fetching patterns and API payloads for 40% faster initial page load and 1.2s lower LCP.",
      "Set up Docker-based dev environments and contributed to CI/CD pipelines, cutting deployment time by 35%.",
      "Led development of LLM-powered conversational workflow features now serving live users; real-time UI over WebSockets.",
    ],
    tags: ["React", "Node.js", "FastAPI", "Docker", "WebSockets", "LLMs"],
  },
  {
    role: "React & Frontend Integration Intern",
    company: "Spinify.AI",
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

// featured: true → large card. `link` is optional; leave "" to hide the button.
// `company` marks work built for an employer — the code is private, so the card
// shows a "Private · <company>" badge instead of a link.
export const projects = [
  {
    title: "AI Admission Chatbot",
    kind: "Conversational AI",
    featured: true,
    description:
      "A multi-turn admission assistant that answers course questions, classifies intent and uses tool calling to collect student details and walk applicants through the admission process.",
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
      "An interactive 3D avatar designed and rendered with Three.js, brought to life with a voice layer — it speaks responses aloud with real-time speech synthesis, turning a chat into a face-to-face conversation.",
    highlight: "Smooth 60 fps rendering on mid-range devices",
    stack: ["Three.js", "React", "Web Speech API", "JavaScript"],
    link: "",
    company: "Spinify.AI",
  },
  {
    title: "Rental Booking App",
    kind: "B2C Product",
    description:
      "Responsive booking interface for bikes, cars and homestays, with a real-time WebSocket support chatbot. Recognised with an Instant Award for delivering the entire front end independently.",
    stack: ["React", "Tailwind", "Material UI", "WebSockets"],
    link: "",
    company: "Spinify.AI",
  },
  {
    title: "Visual Flow Builder",
    kind: "Developer Tool",
    description:
      "Drag-and-drop workflow builder with custom node types, configurable connections, Redux state and persisted configurations.",
    stack: ["React", "React Flow", "Redux"],
    link: "",
    company: "Spinify.AI",
  },
  {
    title: "LeadLens",
    kind: "Backend · Data",
    description:
      "Turns a list of company websites into verified, scored, CRM-ready leads using async scraping, email validation and explainable scoring.",
    stack: ["Python", "FastAPI", "Async scraping"],
    link: "https://github.com/saksheesachan003/leadlens",
  },
  {
    title: "SkyCart",
    kind: "Full-stack SPA",
    description:
      "Single-page e-commerce dashboard with authentication, product filtering and search.",
    stack: ["React", "Tailwind", "Lucide"],
    link: "https://github.com/saksheesachan003/skycart_application",
  },
  {
    title: "myCDA Session Feedback",
    kind: "Full-stack Feature",
    description:
      "Students and parents rate completed sessions; instructors only see an anonymised average — privacy built into the data model.",
    stack: ["Django REST", "Next.js 14", "Python"],
    link: "https://github.com/saksheesachan003/mycda-session-feedback",
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript (ES6+)", "Python", "SQL", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React.js", "Redux", "React Flow", "Three.js", "Tailwind CSS", "Material UI"] },
  { group: "Backend", items: ["Node.js", "FastAPI", "REST APIs", "WebSockets", "YAML"] },
  { group: "Data & DevOps", items: ["PostgreSQL", "Docker", "CI/CD", "Git", "GitHub"] },
  { group: "AI", items: ["LLM Integration", "Google ADK", "Gemini", "Prompt Engineering", "Claude Code", "OpenAI Codex"] },
  { group: "Testing", items: ["React Testing Library", "Chrome DevTools"] },
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
  "Docker Prerequisites — KodeKloud",
];
