import SectionHeading from "../ui/SectionHeading.jsx";
import ProjectCard from "../ui/ProjectCard.jsx";
import { projects, profile } from "../../data/portfolio.js";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading index="03" title="Selected work" kicker="Things I've built" />
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
        <p className="more reveal">
          More on{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </p>
      </div>
    </section>
  );
}
