import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Testimonials.module.css";
import SectionLabel from "../common/SectionLabel";
import { testimonials, testimonialsContent } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const AUTO_ADVANCE_MS = 6000;

type SlideState = "active" | "exiting" | "entering" | "hidden";

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideStates, setSlideStates] = useState<SlideState[]>(
    testimonials.map((_, i) => (i === 0 ? "active" : "hidden"))
  );
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentIndex) return;

      setSlideStates((prev) => {
        const next = [...prev];
        next[currentIndex] = "exiting";
        next[nextIndex] = "entering";
        return next;
      });
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setSlideStates(
          testimonials.map((_, i) =>
            i === nextIndex ? "active" : "hidden"
          )
        );
      }, 500);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % testimonials.length);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, goTo]);
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, goNext]);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={styles.section}
      aria-label="Отзывы клиентов"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      <div className={styles.sectionHeader}>
        <SectionLabel text={testimonialsContent.label} light centered />
        <h2 className={styles.headline}>
          {testimonialsContent.headlinePart1}{" "}
          <em className={styles.headlineItalic}>
            {testimonialsContent.headlineItalic}
          </em>
        </h2>
      </div>

      
      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={styles.slideTrack}>
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`${styles.slide} ${
                slideStates[i] === "active"
                  ? styles.active
                  : slideStates[i] === "exiting"
                  ? styles.exiting
                  : slideStates[i] === "entering"
                  ? styles.entering
                  : styles.hidden
              }`}
              aria-hidden={i !== currentIndex}
            >
              <span className={styles.quoteMarks} aria-hidden="true">
                «
              </span>
              <p className={styles.quote}>
                {testimonial.quote}
              </p>
              <p className={styles.author}>{testimonial.author}</p>
            </div>
          ))}
        </div>

        
        <div className={styles.navRow}>
          
          <button
            className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.arrowDisabled : ""}`}
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          
          <div className={styles.dots} role="tablist" aria-label="Выбрать отзыв">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Отзыв ${i + 1}`}
                aria-selected={i === currentIndex}
                role="tab"
              />
            ))}
          </div>

          
          <button
            className={`${styles.arrowBtn} ${currentIndex === testimonials.length - 1 ? styles.arrowDisabled : ""}`}
            onClick={goNext}
            disabled={currentIndex === testimonials.length - 1}
            aria-label="Следующий отзыв"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
