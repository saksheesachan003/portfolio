import SectionHeading from "../ui/SectionHeading.jsx";
import { about, profile } from "../../data/portfolio.js";
import portrait from "../../assets/portrait.jpg";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading index="01" title="About" />
        <div className="about">
          <div className="about__text reveal">
            {/* Split into words so the scroll effect can light them up one by one */}
            <p className="lead">
              {profile.intro.split(" ").map((w, i) => (
                <span key={i} className="word">{w} </span>
              ))}
            </p>
            {about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="about__side">
            <figure className="portrait reveal" style={{ "--i": 1 }}>
              <div className="portrait__frame">
                <img
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  width="768"
                  height="1344"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Rotating circular badge; the same info is in the hero for screen readers */}
              <div className="portrait__badge" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <path id="badge-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text textLength="228" lengthAdjust="spacing">
                    <textPath href="#badge-ring">Open to work · Immediate joiner ·</textPath>
                  </text>
                </svg>
                <span className="portrait__badge-dot" />
              </div>
            </figure>

            <div className="about__card reveal" style={{ "--i": 2 }}>
              <p className="mono">currently</p>
              <p>Freelance @ <strong>Macrostays</strong></p>
              <p className="mono">based in</p>
              <p>{profile.location}</p>
              <p className="mono">focus</p>
              <p>LLM products · Full-stack web</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
