import { lazy, Suspense } from "react";
import { profile, stats } from "../../data/portfolio.js";
import RotatingText from "../ui/RotatingText.jsx";
import CountUp from "../ui/CountUp.jsx";

// Three.js is code-split so the text paints first.
const HeroScene = lazy(() => import("../three/HeroScene.jsx"));

export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  // Each letter rises in on its own, staggered by --i.
  let n = 0;
  const letters = (word) =>
    [...word].map((ch) => (
      <span key={n} className="char" style={{ "--i": n++ }}>
        {ch}
      </span>
    ));

  return (
    <section id="top" className="hero">
      <div className="aurora" aria-hidden="true" />
      <div className="hero__scene" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="container hero__content">
        <p className="eyebrow rise">
          <span className="dot" /> {profile.availability}
        </p>
        <h1 aria-label={profile.name}>
          <span aria-hidden="true">
            {letters(first)}
            <br />
            <em>{letters(rest.join(" "))}</em>
          </span>
        </h1>
        <p className="hero__role rise" style={{ "--d": "700ms" }}>
          {profile.role} <span className="hero__sep">/</span> <RotatingText words={profile.focus} />
        </p>
        <p className="hero__tagline rise" style={{ "--d": "820ms" }}>{profile.tagline}</p>

        <div className="hero__actions rise" style={{ "--d": "940ms" }}>
          <a className="btn" href="#projects">See my work</a>
          <a className="btn btn--ghost" href="#contact">Get in touch</a>
        </div>

        <dl className="stats rise" style={{ "--d": "1060ms" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt><CountUp value={s.value} /></dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#about" className="scroll-cue rise" style={{ "--d": "1400ms" }} aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
