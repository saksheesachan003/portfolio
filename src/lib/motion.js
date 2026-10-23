import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Inertial smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // anchors: in-page links glide instead of jumping; allowNestedScroll: the chat log still scrolls on its own.
    const lenis = new Lenis({ lerp: 0.1, anchors: true, allowNestedScroll: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

// Scroll-scrubbed effects layered on top of the CSS reveals. Each one is tied to scroll position, not time.
export function useScrollFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const scrub = (trigger, start, end) => ({ trigger, start, end, scrub: true });

    const ctx = gsap.context(() => {
      // Hero copy drifts up and fades as you leave it
      gsap.to(".hero__content", { yPercent: -16, opacity: 0, ease: "none", scrollTrigger: scrub(".hero", "top top", "bottom top") });

      // About: the lead paragraph lights up word by word
      gsap.fromTo(
        ".lead .word",
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: scrub(".lead", "top 85%", "bottom 50%") }
      );

      // Skills: the two ticker rows slide against each other
      gsap.fromTo(".skills-marquee .marquee:nth-child(1)", { xPercent: 4 }, { xPercent: -4, ease: "none", scrollTrigger: scrub(".skills-marquee", "top bottom", "bottom top") });
      gsap.fromTo(".skills-marquee .marquee:nth-child(2)", { xPercent: -4 }, { xPercent: 4, ease: "none", scrollTrigger: scrub(".skills-marquee", "top bottom", "bottom top") });

      // Contact: the headline grows into place
      gsap.fromTo(
        ".contact__title",
        { scale: 0.86, opacity: 0.35, transformOrigin: "0% 50%" },
        { scale: 1, opacity: 1, ease: "none", scrollTrigger: scrub(".contact", "top 85%", "top 30%") }
      );
    });
    return () => ctx.revert();
  }, []);
}
