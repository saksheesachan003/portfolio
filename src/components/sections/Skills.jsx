import SectionHeading from "../ui/SectionHeading.jsx";
import Marquee from "../ui/Marquee.jsx";
import { skills } from "../../data/portfolio.js";

const all = skills.flatMap((s) => s.items);
const half = Math.ceil(all.length / 2);

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading index="04" title="Toolkit" />
      </div>

      <div className="skills-marquee">
        <Marquee items={all.slice(0, half)} />
        <Marquee items={all.slice(half)} reverse />
      </div>

      <div className="container">
        <div className="skills">
          {skills.map((s, i) => (
            <div key={s.group} className="skills__group reveal" style={{ "--i": i % 3 }}>
              <h3 className="mono">{s.group}</h3>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
