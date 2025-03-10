'use client';

import React, { useEffect, useContext, useRef } from "react";
import styles from "./home.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { DarkModeContext } from "./Providers";
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";

export default function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const videoRef = useRef(null);
  const videoMobileRef = useRef(null);
  const logoRef = useRef(null);
  const firstRender = useRef(true);

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

    gsap.to([videoRef.current, videoMobileRef.current], {
      opacity: 0.3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    if (videoRef.current && videoMobileRef.current) {
      videoRef.current.classList.remove("dark-mode");
      videoMobileRef.current.classList.remove("dark-mode");
    }

    if (!firstRender.current) {
      if (darkMode) {
        videoRef.current?.classList.add("dark-mode");
        videoMobileRef.current?.classList.add("dark-mode");
      }
    } else {
      firstRender.current = false;
    }

    gsap.fromTo(
      "#logo-container .rotating-g",
      { rotation: 90, transformOrigin: "50% 50%" },
      { rotation: 0, duration: 1.5, ease: "power2.out", delay: 0.2 }
    );

    gsap.fromTo(
      ["#logo-container .letter-E", "#logo-container .letter-N", "#logo-container .letter-I", "#logo-container .letter-G", "#logo-container .letter-M", "#logo-container .letter-A"],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "hop-main", stagger: 0.1, delay: 0.2 }
    );

    gsap.to(".video-background video", {
      filter: "blur(0.01px)",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".gradient-overlay", {
      opacity: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
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
        <div className="gradient-overlay"></div>
        <video ref={videoRef} autoPlay loop muted playsInline className="video-desktop">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <video ref={videoMobileRef} autoPlay loop muted playsInline className="video-mobile">
          <source src="/video-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-title">
        <div id="logo-container" ref={logoRef}>
          <Logo fillColor={logoColors.svgFill} />
        </div>
        <div className="line">
          <h1>A quest to decrypt the neural code</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
