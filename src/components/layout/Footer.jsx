import { profile } from "../../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono">
          Press <kbd>/</kbd> to ask my assistant · Built with React · Three.js · Vite
        </span>
      </div>
    </footer>
  );
}
