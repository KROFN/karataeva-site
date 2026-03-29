import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Process.module.css";
import SectionLabel from "../common/SectionLabel";
import { processSteps, processContent } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={styles.section}
      aria-label="Как всё устроено"
    >
      <div className={styles.sectionHeader}>
        <SectionLabel text={processContent.label} centered />
        <h2 className={styles.headline}>
          {processContent.headlinePart1}{" "}
          <em className={styles.headlineItalic}>{processContent.headlineItalic}</em>{" "}
          {processContent.headlinePart2}
        </h2>
      </div>

      <div className={styles.stepsWrapper}>
        <div className={styles.steps} ref={stepsRef}>
          {processSteps.map((step) => (
            <article key={step.number} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
