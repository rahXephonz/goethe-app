import { gsap } from "gsap";
import { prefersReducedMotion } from "./smooth-scroll";

/**
 * Fade-up reveal for every `[data-reveal]` element as it enters the viewport.
 * Elements inside a `[data-reveal-group]` stagger together instead.
 *
 * Triggered by IntersectionObserver rather than ScrollTrigger: IO stays
 * correct regardless of sticky/pinned sections and Lenis' smoothed scroll,
 * where ScrollTrigger's cached positions proved flaky.
 */
export const initReveals = (): void => {
  if (prefersReducedMotion()) return;

  const singles = document.querySelectorAll<HTMLElement>(
    "[data-reveal]:not([data-reveal-group] [data-reveal])",
  );
  const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");

  const show = (targets: gsap.TweenTarget, stagger = 0) => {
    gsap.to(targets, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger,
      overwrite: "auto",
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        if (el.hasAttribute("data-reveal-group")) {
          show(el.querySelectorAll("[data-reveal]"), 0.12);
        } else {
          show(el);
        }
      }
    },
    // Fire once the element is 12% up from the viewport bottom.
    { rootMargin: "0px 0px -12% 0px" },
  );

  for (const el of singles) {
    gsap.set(el, { y: 32, autoAlpha: 0 });
    io.observe(el);
  }
  for (const group of groups) {
    gsap.set(group.querySelectorAll("[data-reveal]"), { y: 32, autoAlpha: 0 });
    io.observe(group);
  }
};
