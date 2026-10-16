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

export default function App() {
  useReveal();
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
      <AskAssistant />
      <Cursor />
    </>
  );
}
