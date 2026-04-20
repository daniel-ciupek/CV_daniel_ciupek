"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const lenis = (window as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis;
    if (!lenis) return;

    function onLenisScroll() {
      ScrollTrigger.update();
    }

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.lagSmoothing(0);

    const triggers: ScrollTrigger[] = [];

    const initTriggers = () => {
      document
        .querySelectorAll<HTMLElement>('[data-animate="section-child"]')
        .forEach((el) => {
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
            },
          });
          triggers.push(trigger);
        });
    };

    const timeout = setTimeout(initTriggers, 100);

    return () => {
      clearTimeout(timeout);
      lenis.off("scroll", onLenisScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
