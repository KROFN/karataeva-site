import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { heroContent } from "../../data/content";

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      [headlineRef, subRef, ctaRef, photoRef].forEach((r) => {
        if (r.current) gsap.set(r.current, { opacity: 1, y: 0 });
      });
      if (indicatorRef.current)
        gsap.set(indicatorRef.current, { opacity: 1 });
      return;
    }
    gsap.set(
      [headlineRef.current, subRef.current, ctaRef.current, photoRef.current],
      { opacity: 0 }
    );
    gsap.set(headlineRef.current, { y: 40 });
    gsap.set(subRef.current, { y: 28 });
    gsap.set(ctaRef.current, { y: 22 });
    gsap.set(photoRef.current, { y: 30 });
    if (indicatorRef.current)
      gsap.set(indicatorRef.current, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.65"
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.5"
      )
      .to(
        photoRef.current,
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.7"
      )
      .to(
        indicatorRef.current,
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.hero} aria-label="Главный экран">
      <div className={styles.inner}>
        
        <div className={styles.textCol}>
          <h1 ref={headlineRef} className={styles.headline}>
            {heroContent.headlinePart1}{" "}
            <em className={styles.headlineAccent}>
              {heroContent.headlineItalic}
            </em>{" "}
            {heroContent.headlinePart2}
          </h1>

          <p ref={subRef} className={styles.subheadline}>
            {heroContent.subheadline}
          </p>

          <div ref={ctaRef} className={styles.ctaGroup}>
            <a
              href="#gallery"
              className={styles.ctaBtnPrimary}
              onClick={(e) => handleScroll(e, "#gallery")}
            >
              {heroContent.ctaPrimary}
            </a>
            <a
              href="#contact"
              className={styles.ctaBtnSecondary}
              onClick={(e) => handleScroll(e, "#contact")}
            >
              {heroContent.ctaSecondary}
            </a>
          </div>
        </div>

        
        <div ref={photoRef} className={styles.photoCol}>
          <img
            src="/images/hero-bg.jpg"
            alt="Портретная фотография"
            className={styles.photoImg}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      
      <div
        ref={indicatorRef}
        className={`${styles.scrollIndicator} ${scrolled ? styles.hidden : ""}`}
        aria-hidden="true"
      >
        <svg
          className={styles.scrollChevron}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className={styles.scrollLabel}>листать</span>
      </div>
    </section>
  );
};

export default Hero;
