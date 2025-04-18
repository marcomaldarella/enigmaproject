"use client";
import { useEffect, useState, useCallback, useRef, useLayoutEffect, useContext } from "react";
import Link from "next/link";
import "./Menu.css";
import MenuBar from "../MenuBar/MenuBar";
import LogoBar from "../LogoBar/LogoBar";

import { links, socials, address, contactInfo } from "./menuContent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { DarkModeContext } from "../../Providers";

const Menu = () => {
  const init = useRef(false);
  const container = useRef();
  const menuRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Definisci la funzione PRIMA di utilizzarla
  const getLogoColor = (darkMode) => (darkMode ? "#fff" : "#000");

  // Usa la funzione per calcolare il colore del logo
  const logoColor = getLogoColor(darkMode);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "night-mode" : "day-mode";
    if (window.networkInstance) {
      console.log("Initializing canvas for dark mode");
      window.networkInstance.applyInvertFilter(); // Ensures the filter is applied for dark mode by default
    }
  }, [darkMode]);

  useGSAP(
    () => {
      if (menuRef.current) {
        const menu = menuRef.current;
        const links = menu.querySelectorAll(".link a");
        const socials = menu.querySelectorAll(".socials .line p");

        links.forEach((link) => {
          link.addEventListener("click", toggleMenu);
        });

        gsap.set(menu, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        gsap.set(links, { y: 60 });
        gsap.set(socials, { y: 30 });

        init.current = true;
      }
    },
    { scope: container }
  );

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;
    const links = menu.querySelectorAll(".link .link-wrapper");
    const socialsCols = menu.querySelectorAll(".socials .sub-col");

    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 0.6,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      gsap.set(links, { y: 60, opacity: 0 });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });

      socialsCols.forEach((subCol) => {
        const socialCopy = subCol.querySelectorAll(".line p");
        gsap.to(socialCopy, {
          y: 0,
          stagger: 0.1,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });
      });
    } else {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.25,
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });

          gsap.set(links, { y: 60 });
          socialsCols.forEach((subCol) => {
            const socialCopy = subCol.querySelectorAll(".line p");
            gsap.set(socialCopy, { y: 30 });
          });

          setIsAnimating(false);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (init.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  }, [isAnimating]);

  const closeMenu = useCallback(() => {
    if (!isAnimating && isOpen) {
      setIsOpen(false);
    }
  }, [isAnimating, isOpen]);




  return (
    <div ref={container}>
      <MenuBar isOpen={isOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} logoColor={logoColor} />

      <div className="menu" ref={menuRef}>
        <div className="col col-2">
          <div className="links">
            {links.map((link, index) => (
              <div className="link" key={index}>
                <div className="link-wrapper">
                  <Link href={link.path}>
                    <h1>{link.label}</h1>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col col-1">
          <div className="socials">
            <div className="sub-col address">
              {address.map((line, index) => (
                <div className={`line line-${index + 1}`} key={index}>
                  {line ? <p>{line}</p> : <br />}
                </div>
              ))}
            </div>

            <div className="sub-col">
              <div className="follow-us">Follow us:</div>
              {socials.map((social, index) => (
                <div className="line" key={index}>
                  <p>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.label}
                    </a>
                  </p>
                </div>
              ))}
              <br />
              {contactInfo.map((email, index) => (
                <div className="line" key={index}>
                  <p>
                    <a href={email.url} target="_blank" rel="noopener noreferrer">
                      {email.label}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="theme-toggle-container">
          <input
            type="checkbox"
            className="sr-only"
            id="darkmode-toggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="darkmode-toggle" className="toggle">
            <span>Toggle dark mode</span>
          </label>
        </div>
        <div className="copyright">
          <p>© 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
