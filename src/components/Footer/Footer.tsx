import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";
import { siteConfig, footerContent } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
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
    <footer
      id="contact"
      ref={sectionRef}
      className={styles.section}
      role="contentinfo"
      aria-label="Контакты"
    >
      <div className={styles.ctaBlock} ref={contentRef}>
        
        <h2 className={styles.headline}>
          {footerContent.headline1}{" "}
          <em className={styles.headlineItalic}>{footerContent.headlineItalic}</em>
          {footerContent.headline2}
        </h2>

        
        <p className={styles.paragraph}>{footerContent.paragraph}</p>

        
        <div className={styles.contactBtns}>
          <a
            href={siteConfig.telegramUrl}
            className={styles.contactBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
          >
            <Send size={17} aria-hidden="true" />
            Telegram
          </a>
          <a
            href={siteConfig.vkUrl}
            className={styles.contactBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти ВКонтакте"
          >
            <ExternalLink size={17} aria-hidden="true" />
            ВКонтакте
          </a>
        </div>

        
        <p className={styles.emailWrapper}>
          {footerContent.emailLabel}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className={styles.emailLink}
          >
            {siteConfig.email}
          </a>
        </p>
      </div>

      
      <div className={styles.divider} aria-hidden="true" />

      
      <div className={styles.footerBottom}>
        <p className={styles.footerText}>
          <span className={styles.footerAccent}>©</span>{" "}
          {siteConfig.year} {siteConfig.name}
          <br />
          
          Сделано с теплом в {siteConfig.city}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
