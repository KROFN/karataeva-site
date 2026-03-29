import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
  start?: string;
}


export function useScrollReveal(
  selector?: string,
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const targets = selector
      ? el.querySelectorAll(selector)
      : [el];

    const {
      y = 25,
      x = 0,
      scale = 1,
      opacity = 0,
      duration = 0.8,
      ease = "power2.out",
      stagger = 0,
      delay = 0,
      start = "top 85%",
    } = options;

    gsap.set(targets, { opacity, y, x, scale });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [selector, options.y, options.x, options.scale, options.duration, options.stagger, options.delay, options.start]);

  return ref;
}
