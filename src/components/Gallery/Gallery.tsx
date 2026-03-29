import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Gallery.module.css";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";
import SectionLabel from "../common/SectionLabel";
import { galleryItems } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);
const ITEM_CLASSES = [
  styles.item1,
  styles.item2,
  styles.item3,
  styles.item4,
  styles.item5,
  styles.item6,
  styles.item7,
  styles.item8,
];

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryItems.length
    );
  }, []);
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className={styles.section} aria-label="Портфолио">
      
      <div className={styles.header}>
        <SectionLabel text="ПОРТФОЛИО" centered />
        <h2 className={styles.headline}>
          <em className={styles.headlineItalic}>Избранные</em> работы
        </h2>
        <p className={styles.hint}>
          нажми на фото — откроется в полном размере
        </p>
      </div>

      
      <div className={styles.grid} ref={gridRef}>
        {galleryItems.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            onClick={() => openLightbox(index)}
            className={ITEM_CLASSES[index]}
          />
        ))}
      </div>

      
      <Lightbox
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
};

export default Gallery;
