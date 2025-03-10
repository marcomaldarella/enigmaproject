'use client';

import React, { useEffect, useRef, useState } from "react";
import "./jobs.css";
import Footer from "../components/Footer/Footer";
import { ReactLenis } from "@studio-freight/react-lenis";
import { cvItems } from "./cvItems";
import Image from "next/image";

const JobsPageContent = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const accordionContents = useRef([]);
  const jobsCopyRef = useRef(null);

  useEffect(() => {
    // Import dinamico di GSAP e SplitType lato client
    const loadGSAP = async () => {
      const { default: gsap } = await import("gsap");
      const { default: CustomEase } = await import("gsap/CustomEase");
      const { default: SplitType } = await import("../lib/SplitType/index");

      gsap.registerPlugin(CustomEase);

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
          delay: 0.2,
        });
      }
    };

    loadGSAP();
  }, []);

  const toggleCvItem = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    accordionContents.current.forEach((content, idx) => {
      const isOpening = index === idx && expandedIndex !== idx;
      if (content) {
        import("gsap").then(({ default: gsap }) => {
          gsap.to(content, {
            maxHeight: isOpening ? content.scrollHeight : 0,
            opacity: isOpening ? 1 : 0,
            duration: 0.4,
            ease: isOpening ? "expo.out" : "expo.in",
          });
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="jobs-intro">
        <div className="col jobs-copy-wrapper">
          <div className="jobs-copy" ref={jobsCopyRef}>
            <h1>Join us</h1>
            <h3>
              Our team at Stanford has pioneered methods in NeuroAI, neural decoding, interpretability, neuroscience theory, and neural recording technology.
              <br></br>
            </h3>
          </div>
        </div>
      </div>

      <div className="cv-wrapper">
        <div className="cv-header">
          <h1 className="h1-spacer">Jobs</h1>
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
                    transition: "transform 0.2s ease",
                  }}
                >
                  +
                </div>
              </div>
              <div
                ref={(el) => (accordionContents.current[index] = el)}
                className={`cv-content ${expandedIndex === index ? "expanded" : ""}`}
                style={{ overflow: "hidden", maxHeight: 0, opacity: 0 }}
              >
                <pre style={{ whiteSpace: "pre-line" }}>{item.description}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobsPage = () => {
  return (
    <ReactLenis root>
      <div className="jobs-page">
        <JobsPageContent />
        <Footer />
        <div className="page-logo-container">
          <Image
            src="/jobs/stanford.png"
            alt="Stanford Logo"
            className="page-logo"
            width={100}
            height={100}
          />
        </div>
      </div>
    </ReactLenis>
  );
};

export default JobsPage;
