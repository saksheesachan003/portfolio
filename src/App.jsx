import { lazy, Suspense, useState } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Experience from "./components/sections/Experience.jsx";
import Projects from "./components/sections/Projects.jsx";
import Skills from "./components/sections/Skills.jsx";
import Education from "./components/sections/Education.jsx";
import Contact from "./components/sections/Contact.jsx";
import ScrollProgress from "./components/ui/ScrollProgress.jsx";
import Cursor from "./components/ui/Cursor.jsx";
import AskAssistant from "./components/assistant/AskAssistant.jsx";
import { useReveal } from "./hooks/useReveal.js";
import { useSmoothScroll, useScrollFx } from "./lib/motion.js";

// The avatar (and its ~MBs of model + three-vrm) only loads on wide screens, and not in data-saver mode.
// With reduced motion it still appears, just calmer (see Avatar.jsx).
const Avatar = lazy(() => import("./components/three/Avatar.jsx"));
const wantsAvatar = () => window.matchMedia("(min-width: 1100px)").matches && !navigator.connection?.saveData;

export default function App() {
  useReveal();
  useSmoothScroll();
  useScrollFx();
  const [showAvatar] = useState(wantsAvatar);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      {showAvatar && (
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
      )}
      <AskAssistant />
      <Cursor />
    </>
  );
}
