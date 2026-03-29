import React, { useEffect, useCallback, useState } from "react";
import { galleryItems } from "../../data/content";

interface LightboxProps {
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const isOpen = activeIndex !== null;
  const [imageFailed, setImageFailed] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setImageFailed(false);
  }, [activeIndex]);

  if (!isOpen || activeIndex === null) return null;

  const item = galleryItems[activeIndex];
  const imageSrc = `/images/gallery-${item.id}.jpg`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фото"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(26, 22, 20, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "lbFadeIn 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #D4C5B9, #E8DDD4)",
            borderRadius: "12px",
            width: "min(600px, 85vw)",
            aspectRatio: item.aspectRatio,
            maxHeight: "80vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!imageFailed ? (
            <img
              src={imageSrc}
              alt={`Фото ${item.id}`}
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.8rem",
                color: "rgba(0,0,0,0.18)",
              }}
            >
              ФОТО {item.id}
            </span>
          )}
        </div>

      </div>

      <button
        onClick={onClose}
        aria-label="Закрыть"
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "rgba(240, 230, 216, 0.8)",
          fontSize: "1.8rem",
          cursor: "pointer",
          lineHeight: 1,
          padding: "0.5rem",
          transition: "color 0.2s ease, transform 0.2s ease",
          zIndex: 2010,
          minWidth: "44px",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          (e.currentTarget as HTMLButtonElement).style.transform = "rotate(90deg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,230,216,0.8)";
          (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg)";
        }}
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Предыдущее фото"
        style={{
          position: "fixed",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(240, 230, 216, 0.8)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.25s ease, color 0.25s ease",
          zIndex: 2010,
          minWidth: "44px",
          minHeight: "44px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Следующее фото"
        style={{
          position: "fixed",
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(240, 230, 216, 0.8)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.25s ease, color 0.25s ease",
          zIndex: 2010,
          minWidth: "44px",
          minHeight: "44px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          color: "rgba(240, 230, 216, 0.5)",
          letterSpacing: "0.1em",
          zIndex: 2010,
        }}
      >
        {activeIndex + 1} / {galleryItems.length}
      </div>

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;

