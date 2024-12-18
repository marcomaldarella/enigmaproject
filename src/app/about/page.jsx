'use client';

import React, { useEffect, useContext } from "react";
import styles from "../home.css";
import { SpaceColonization } from "../components/SpaceColonization/SpaceColonization";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { DarkModeContext } from "../Providers";
import Footer from "../components/Footer/Footer";

export default function About() {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop-main", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");

    gsap.fromTo(
      ".hero-title .line",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "hop-main", stagger: 0.3 }
    );
    console.log(darkMode);
  }, []);

  const logoColors = darkMode
    ? {
      primary: "#ffffff",
      secondary: "#aaaaaa",
      background: "#000000",
      svgFill: "#ffffff",
    }
    : {
      primary: "#000000",
      secondary: "#555555",
      background: "#ffffff",
      svgFill: "#000000",
    };

  return (
    <div className={styles.page} style={{ backgroundColor: logoColors.background }}>
      <SpaceColonization theme={darkMode ? "dark" : "light"} />

      <div className="hero-title">
        <div className="line">
          <p>Enigma is a non-profit research organization based at Stanford University</p>
        </div>
        <div className="line">
          <p>leveraging deep learning for neuroscientific insight</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
