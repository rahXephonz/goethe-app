import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./smooth-scroll";

/**
 * Fade-up reveal for every `[data-reveal]` element as it enters the viewport.
 * Elements inside a `[data-reveal-group]` stagger together instead.
 */
export const initReveals = (): void => {
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  const singles = document.querySelectorAll<HTMLElement>(
    "[data-reveal]:not([data-reveal-group] [data-reveal])",
  );
  for (const el of singles) {
    gsap.from(el, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  }

  const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");
  for (const group of groups) {
    gsap.from(group.querySelectorAll("[data-reveal]"), {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: "top 85%" },
    });
  }
};
