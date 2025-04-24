import React from "react";
import { TextStyle, typographyTypes } from "./typography-types";

export const Typography: React.FC = () => {
  return (
    <div style={{ margin: "4rem 2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr 1fr 1fr",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "2rem",
          fontWeight: "bold"
        }}
      >
        <div>Font name</div>
        <div>Weight</div>
        <div>Size</div>
        <div>Line Height</div>
      </div>
      {typographyTypes.map((font: TextStyle) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 1fr 1fr 1fr",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1.5rem"
          }}
          key={font.name}
        >
          <div style={{ font: font.cssVar }}>
            {font.alternativeName ? `${font.alternativeName} - ` : ""}
            {font.name}
          </div>
          <div>{font.fontWeight}</div>
          <div>{font.fontSizeRem}rem</div>
          <div>{font.lineHeightRem}rem</div>
        </div>
      ))}
    </div>
  );
};
