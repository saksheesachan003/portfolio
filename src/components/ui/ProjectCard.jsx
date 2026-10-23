// Pointer position drives two effects through CSS vars:
// a spotlight (--mx/--my, used by .project::before) and a slight 3D tilt (--rx/--ry).
const track = (e) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  card.style.setProperty("--mx", `${x}px`);
  card.style.setProperty("--my", `${y}px`);
  if (e.pointerType !== "mouse") return;
  const max = r.width > 600 ? 2 : 6; // wide featured cards tilt less
  card.style.setProperty("--ry", `${(x / r.width - 0.5) * max}deg`);
  card.style.setProperty("--rx", `${(0.5 - y / r.height) * max}deg`);
};

const reset = (e) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

export default function ProjectCard({ project, index }) {
  const { title, kind, description, highlight, stack, link, repo, featured, company } = project;
  return (
    <article
      className={`project reveal ${featured ? "project--featured" : ""}`}
      style={{ "--i": index % 3 }}
      onPointerMove={track}
      onPointerLeave={reset}
    >
      <div className="project__top">
        <span className="mono">{String(index + 1).padStart(2, "0")} · {kind}</span>
        {company && !link && (
          <span className="project__private" title="Built for an employer — source code is private">
            Private · {company}
          </span>
        )}
        {(link || repo) && (
          <span className="project__links">
            {repo && (
              <a className="project__link" href={repo} target="_blank" rel="noreferrer" aria-label={`${title} on GitHub`} title="Source on GitHub">
                {"</>"}
              </a>
            )}
            {link && (
              <a className="project__link" href={link} target="_blank" rel="noreferrer" aria-label={link.includes("github.com") ? `${title} on GitHub` : `${title} live site`} title={link.includes("github.com") ? "Source on GitHub" : "Live site"}>
                ↗
              </a>
            )}
          </span>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {highlight && <p className="project__highlight">✦ {highlight}</p>}
      <div className="tags">
        {stack.map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </article>
  );
}
