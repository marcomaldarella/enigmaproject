'use client';

import React, { useEffect, useRef, useState } from "react";
import "./jobs.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitType from "../lib/SplitType/index";
import Footer from "../components/Footer/Footer";
import { ReactLenis } from "@studio-freight/react-lenis";
import { cvItems } from "./cvItems";

const JobsPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const accordionContents = useRef([]); // This is the proper initialization
  const container = useRef();
  const jobsCopyRef = useRef(null);
  const cvWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop2",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    if (jobsCopyRef.current) {
      const split = new SplitType(jobsCopyRef.current.querySelectorAll("h3, h1"), {
        types: "lines",
        tagName: "span",
      });

      gsap.to(split.lines, {
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5,
      });
    }
  }, []);

  const toggleCvItem = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    accordionContents.current.forEach((content, idx) => {
      const isOpening = index === idx && expandedIndex !== idx;
      if (content) {
        gsap.to(content, {
          maxHeight: isOpening ? content.scrollHeight : 0,
          opacity: isOpening ? 1 : 0,
          duration: 0.4,
          ease: isOpening ? "expo.out" : "expo.in"
        });
      }
    });
  };

  return (
    <ReactLenis root>
      <div className="jobs-page" ref={container}>
        <div className="container">
          <div className="jobs-intro">
            <div className="col jobs-copy-wrapper">
              <div className="jobs-copy" ref={jobsCopyRef}>
                <h1>Join us</h1>
                <h3>
                  Our dedicated team at Stanford University specializes in cutting-edge NeuroAI research, focusing on advanced neural decoding techniques, AI interpretability, comprehensive neuroscience theories, and innovative neural recording technologies.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="cv-wrapper" ref={cvWrapperRef}>
            <div className="cv-header">
              <h1>Jobs</h1>
            </div>
            <div className="cv-list">
              {cvItems.map((item, index) => (
                <div className="cv-item" key={index}>
                  <div
                    className="cv-name cv-toggle"
                    onClick={() => toggleCvItem(index)}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <h3>{item.name}</h3>
                    <div
                      className="cv-toggle-icon"
                      style={{
                        transform: expandedIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div
                    ref={el => accordionContents.current[index] = el} // Assign each content div to the ref array
                    className={`cv-content ${expandedIndex === index ? "expanded" : ""}`}
                    style={{ overflow: 'hidden', maxHeight: 0, opacity: 0 }}
                  >
                    <pre style={{ whiteSpace: "pre-line" }}>{item.description}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <div className="page-logo-container">
          <img
            src="/jobs/standford-png.png"
            alt="Stanford Logo"
            className="page-logo"
          />
        </div>
      </div>
    </ReactLenis>
  );
};

export default JobsPage;