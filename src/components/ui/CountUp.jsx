import { useEffect, useState } from "react";

// Animates the number inside a stat like "~3", "10+" or "40%".
export default function CountUp({ value }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const start = performance.now() + 1100;
    const duration = 1400;
    const step = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  if (!match) return value;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {n}
        {match[3]}
      </span>
    </>
  );
}
