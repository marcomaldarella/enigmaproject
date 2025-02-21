'use client';

import React, { useEffect, useContext } from "react";
import styles from "./home.css";
import { SpaceColonization } from "./components/SpaceColonization/SpaceColonization";
import Logo from "./components/Logo/Logo";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { DarkModeContext } from "./Providers";
import Footer from "./components/Footer/Footer";

export default function Home() {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop-main", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");

    gsap.fromTo(
      "#logo-container",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "hop-main" }
    );

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
        <div id="logo-container">
          <Logo fillColor={logoColors.svgFill} />
        </div>
        <div className="line">
          <h1>A quest to decrypt the neural code</h1>
        </div>
      </div>
      <Footer></Footer>

    </div>
  );
}
