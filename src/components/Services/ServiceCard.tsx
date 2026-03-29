import React from "react";
import styles from "./Services.module.css";
import { Service } from "../../data/content";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article
      className={`${styles.card} ${service.featured ? styles.cardFeatured : ""}`}
    >
      <h3 className={styles.cardTitle}>{service.title}</h3>
      {service.featured && (
        <p className={styles.popularityNote} aria-label="Чаще всего выбирают">
          чаще всего выбирают ♡
        </p>
      )}

      <ul className={styles.detailsList} aria-label="Детали пакета">
        {service.details.map((detail, i) => (
          <li key={i} className={styles.detailItem}>
            {detail}
          </li>
        ))}
      </ul>

      <p className={styles.price} aria-label={`Цена: ${service.price}`}>
        {service.price}
      </p>

      <a
        href="#contact"
        className={styles.cardBtn}
        onClick={handleContactClick}
      >
        Записаться
      </a>
    </article>
  );
};

export default ServiceCard;
