"use client";
import React, { useEffect, useRef } from "react";
import "./contact.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";
import Footer from "../components/Footer/Footer";

const Page = () => {
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.delayedCall(1.1, () => {
        sectionsRef.current.forEach((section) => {
          gsap.to(section.querySelectorAll("p"), {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className="contact-page" ref={container}>
        <div className="container">
          <div className="col">
            <div className="contact-header">
              <h1 ref={headerRef}>Contact</h1>
            </div>
            <div className="where" ref={(el) => (sectionsRef.current[0] = el)}>
              <div className="title">
                <p>Where</p>
              </div>
              <div className="item">
                <p>Stanford University</p>
              </div>
              <div className="item">
                <p> 450 Jane Stanford Waym</p>
              </div>
              <div className="item">
                <p>Stanford, CA 94305, United States</p>
              </div>
            </div>
            <div className="vat" ref={(el) => (sectionsRef.current[1] = el)}>
              <div className="title">
                <p>Mail</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">info@enigmaproject.ai</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="socials"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className="title">
                <p> Socials </p>
              </div>
              <div className="item">
                <p>
                  <a href="https://www.linkedin.com/company/enigma-project/"> Linkedin</a>
                </p>
              </div>
              <div className="item">
                <p>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="#"> </a>
                </p>
              </div>
            </div>
            <div className="mail" ref={(el) => (sectionsRef.current[3] = el)}>
              <div className="title">
                <p>Recruiting</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">recruiting@enigmaproject.ai</a>
                </p>
              </div>
            </div>
          </div>
          <Footer></Footer>

        </div>
      </div>
    </ReactLenis>

  );
};

export default Page;
