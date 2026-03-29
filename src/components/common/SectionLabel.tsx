import React from "react";

interface SectionLabelProps {
  text: string;
  light?: boolean; // for use on dark backgrounds
  centered?: boolean;
  large?: boolean; // slightly larger variant
}

const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  light = false,
  centered = false,
  large = false,
}) => {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--font-sans)",
        fontSize: large ? "0.84rem" : "0.72rem",
        fontWeight: 500,
        letterSpacing: large ? "0.2em" : "0.18em",
        textTransform: "uppercase",
        color: light ? "var(--accent)" : "var(--accent)",
        marginBottom: "1rem",
        textAlign: centered ? "center" : "left",
      }}
    >
      {text}
    </span>
  );
};

export default SectionLabel;
