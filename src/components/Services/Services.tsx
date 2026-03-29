import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";
import ServiceCard from "./ServiceCard";
import SectionLabel from "../common/SectionLabel";
import { services, servicesContent } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="services"
      ref={sectionRef}
      className={styles.section}
      aria-label="Услуги и цены"
    >
      <div className={styles.sectionHeader}>
        <SectionLabel text={servicesContent.label} centered large />
        <h2 className={styles.headline}>
          {servicesContent.headlinePart1}{" "}
          <em className={styles.headlineItalic}>{servicesContent.headlineItalic}</em>
        </h2>
      </div>

      <div className={styles.cardsGrid} ref={cardsRef}>
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} />
        ))}
      </div>

      <p className={styles.footnote}>{servicesContent.footnote}</p>
    </section>
  );
};

export default Services;
