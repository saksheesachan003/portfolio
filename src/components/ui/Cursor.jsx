import { useEffect, useRef } from "react";

// A soft ring that trails the mouse and grows over links, buttons and cards.
// Desktop mice only; the native cursor stays visible. Off for reduced motion.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const el = ref.current;
    el.classList.add("is-on");
    let x = 0, y = 0, tx = 0, ty = 0;
    let raf = 0;
    let seen = false;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // Stop the loop once the ring has caught up; the next move restarts it.
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        x = tx;
        y = ty;
        seen = true;
      }
      el.classList.add("is-visible");
      el.classList.toggle("is-hover", !!e.target.closest?.("a, button, input, .project"));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => el.classList.remove("is-visible");
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  );
}
