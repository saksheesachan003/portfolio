import SectionHeading from "../ui/SectionHeading.jsx";
import { education, certifications } from "../../data/portfolio.js";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading index="05" title="Education" />
        <div className="edu">
          {education.map((e, i) => (
            <div key={e.degree} className="edu__item reveal" style={{ "--i": i }}>
              <span className="mono">{e.period}</span>
              <h3>{e.degree}</h3>
              <p className="muted">{e.school}</p>
              <p className="edu__score">{e.score}</p>
            </div>
          ))}
          <div className="edu__item edu__certs reveal" style={{ "--i": education.length }}>
            <span className="mono">Certifications</span>
            <ul>
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
