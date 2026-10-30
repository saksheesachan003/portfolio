import { useEffect, useRef } from "react";
import SectionHeading from "../ui/SectionHeading.jsx";
import { experience } from "../../data/portfolio.js";

export default function Experience() {
  const listRef = useRef(null);

  // The timeline rail fills as you scroll through it (--progress: 0 → 1).
  useEffect(() => {
    const el = listRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.65 - r.top) / r.height;
      el.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading index="02" title="Experience" kicker="Where I've shipped" />
        <ol className="timeline" ref={listRef}>
          {experience.map((job) => (
            <li key={job.role + job.period} className="timeline__item reveal">
              <div className="timeline__meta">
                <span className="mono">{job.period}</span>
                <span className="muted">{job.location}</span>
              </div>
              <div className="timeline__body">
                <h3>
                  {job.role}{" "}
                  <span className="at">
                    @{" "}
                    {job.link ? (
                      <a href={job.link} target="_blank" rel="noreferrer">{job.company} ↗</a>
                    ) : (
                      job.company
                    )}
                  </span>
                  {job.award && <span className="award">🏆 {job.award}</span>}
                </h3>
                <ul>
                  {job.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
