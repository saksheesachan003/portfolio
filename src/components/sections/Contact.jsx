import { useState } from "react";
import { profile } from "../../data/portfolio.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="aurora aurora--contact" aria-hidden="true" />
      <div className="container reveal">
        <span className="section-index">06</span>
        <h2 className="contact__title">
          Let's build <em>something</em> together.
        </h2>
        <p className="contact__sub">
          Hiring for a full-stack or AI product role? I can start immediately and am open to relocation. The fastest way to reach me is email.
        </p>
        <div className="contact__actions">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <button className="btn btn--ghost" onClick={copyEmail}>
            {copied ? "Copied ✓" : "Copy email"}
          </button>
          <a className="btn btn--ghost" href={profile.resume} download>
            Download résumé ↓
          </a>
        </div>
        <ul className="contact__links">
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
        </ul>
      </div>
    </section>
  );
}
