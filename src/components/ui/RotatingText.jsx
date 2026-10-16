import { useEffect, useState } from "react";

// Types a word, holds it, deletes it, moves to the next.
export default function RotatingText({ words }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[index];
    const full = !deleting && length === word.length;
    const empty = deleting && length === 0;
    const delay = full ? 1800 : empty ? 300 : deleting ? 35 : 70;

    const t = setTimeout(() => {
      if (full) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [index, length, deleting, words]);

  return (
    <span className="rotating">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {words[index].slice(0, length)}
        <span className="caret" />
      </span>
    </span>
  );
}
