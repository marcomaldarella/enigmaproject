'use client';

import React, { useContext } from "react";
import { DarkModeContext } from "../../Providers";
import "./GradientBlur.css"; // CSS specifico per il componente

const GradientBlur = () => {
  const { darkMode } = useContext(DarkModeContext);

  const gradientColors = darkMode
    ? "rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0)"
    : "rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)";

  return (
    <>
      <div
        className="gradient-blur top"
        style={{
          background: `linear-gradient(to bottom, ${gradientColors})`,
        }}
      ></div>
      <div
        className="gradient-blur bottom"
        style={{
          background: `linear-gradient(to top, ${gradientColors})`,
        }}
      ></div>
    </>
  );
};

export default GradientBlur;
