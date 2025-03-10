'use client';

import React, { useEffect, useContext, useRef } from "react";
import styles from "../home.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { DarkModeContext } from "../Providers";
import Footer from "../components/Footer/Footer";

export default function About() {
  const { darkMode } = useContext(DarkModeContext);
  const videoRef = useRef(null);
  const videoMobileRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop-main", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");

    gsap.fromTo(
      ".hero-title .line",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "hop-main", stagger: 0.3 }
    );

    // Opacità oscillante del video
    gsap.to([videoRef.current, videoMobileRef.current], {
      opacity: 0.18,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Effetto blur oscillante
    gsap.to(".video-background video", {
      filter: "blur(0.3px)",
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // ✅ Inversione video solo dopo il toggle del tema
    if (videoRef.current && videoMobileRef.current) {
      if (darkMode) {
        videoRef.current.classList.add("dark-mode");
        videoMobileRef.current.classList.add("dark-mode");
      } else {
        videoRef.current.classList.remove("dark-mode");
        videoMobileRef.current.classList.remove("dark-mode");
      }
    }
  }, [darkMode]);

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
      {/* Video di sfondo */}
      <div className="video-background">
        <video ref={videoRef} autoPlay loop muted playsInline className="video-desktop">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video ref={videoMobileRef} autoPlay loop muted playsInline className="video-mobile">
          <source src="/video-mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="gradient-overlay"></div>
      </div>

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
