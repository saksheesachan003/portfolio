import { useEffect, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { profile } from "../../data/portfolio.js";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];
const sectionIds = ["top", ...links.map((l) => l.href.slice(1))];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label="Back to top">
          S<span>.</span>S
        </a>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <ul className={`nav__links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? "is-active" : ""}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              Résumé ↗
            </a>
          </li>
          <li>
            <a className="btn btn--small" href="#contact" onClick={() => setOpen(false)}>
              Let's talk
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
