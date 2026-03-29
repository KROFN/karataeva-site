import React, { useState } from "react";
import { GalleryItem as GalleryItemType } from "../../data/content";

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
  className?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick, className }) => {
  const [hovered, setHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = `/images/gallery-${item.id}.jpg`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        background: "linear-gradient(135deg, #D4C5B9, #E8DDD4)",
        width: "100%",
        height: "100%",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-soft)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      role="button"
      aria-label={`Открыть фото ${item.id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {!imageFailed ? (
        <img
          src={imageSrc}
          alt={`Фото ${item.id}`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "rgba(0,0,0,0.15)",
              userSelect: "none",
            }}
          >
            ФОТО {item.id}
          </span>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(transparent 40%, rgba(26, 22, 20, 0.62) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default GalleryItem;

