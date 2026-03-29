import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import SectionLabel from "../common/SectionLabel";
import { aboutContent } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: -30, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
      if (textRef.current) {
        const children = textRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
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
      id="about"
      ref={sectionRef}
      className={styles.section}
      aria-label="Обо мне"
    >
      <div className={styles.inner}>
        <div className={styles.photoCol} ref={photoRef}>
          <div className={styles.photoWrapper}>
            <img
              src="/images/about-sasha.jpg"
              alt="Фотограф Саша"
              className={`${styles.photo} ${styles.aboutImage}`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.photoAccent} aria-hidden="true" />
        </div>

        <div className={styles.textCol} ref={textRef}>
          <SectionLabel text={aboutContent.label} />

          <h2 className={styles.headline}>
            {aboutContent.headlinePart1}{" "}
            <em className={styles.headlineItalic}>{aboutContent.headlineItalic}</em>
          </h2>

          <p className={styles.paragraph}>{aboutContent.paragraph1}</p>
          <p className={styles.paragraph}>{aboutContent.paragraph2}</p>

          <a
            href={aboutContent.ctaUrl}
            className={styles.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {aboutContent.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
