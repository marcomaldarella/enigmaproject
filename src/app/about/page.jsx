'use client';

import React, { useEffect, useContext, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { DarkModeContext } from '../Providers';
import Footer from '../components/Footer/Footer';
import styles from './about.css';

export default function About() {
  const { darkMode } = useContext(DarkModeContext);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('hop-main', 'M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1');

    gsap.fromTo(
      containerRef.current.querySelectorAll('.line'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'hop-main', stagger: 0.2 }
    );
  }, []);

  const logoColors = darkMode
    ? { background: '#000000', text: '#ffffff' }
    : { background: '#ffffff', text: '#000000' };

  return (
    <div className={styles.page} style={{ backgroundColor: logoColors.background, color: logoColors.text }} ref={containerRef}>
      <div className="about-container">

        <section className="projects">
          {/* Primo paragrafo: full width */}
          <div className="project-full">
            <p className="line">
              Enigma is a non-profit research organization based at Stanford University leveraging deep learning to accelerate neuroscientific discovery.
              Our team has pioneered methods in NeuroAI, neural recording technology, and theoretical neuroscience.
            </p>
            <p className="line">
              We include key architects of <a href="https://www.science.org/doi/abs/10.1126/science.abf4588" target="_blank">Neuropixels</a>—a revolutionary high-density neural recording technology that transformed systems neuroscience by enabling simultaneous recording from thousands of neurons at single-cell resolution [<a href="https://www.economist.com/science-and-technology/2017/11/09/a-new-nerve-cell-monitor-will-help-those-studying-brains" target="_blank">Economist</a>].
            </p>
            <p className="line">
              Members of our team built the first foundation model of the mouse visual cortex as part of the <a href="https://www.nature.com/immersive/d42859-025-00001-w/index.html" target="_blank">MICrONS Project</a>—the largest initiative to date integrating neuronal function with connectomics. The outputs of this landmark initiative have been published across ten papers, including seven featured in the journal Nature [<a href="https://www.nytimes.com/2025/04/09/science/neuroscience-brain-mice-map.html" target="_blank">New York Times</a>, <a href="https://www.reuters.com/science/scientists-produce-painstaking-wiring-diagram-mouses-brain-2025-04-09/" target="_blank">Reuters</a>].
            </p>
          </div>

          {/* Due colonne per i paragrafi successivi */}
          <div className="project-columns">
            <p className="line">
              Our <strong>Inception Loops</strong> paradigm for end-to-end closed loop neural control bridges neuroscience and mechanistic interpretability—offering unprecedented insight into the neural representation.
            </p>
            <p className="line">
              Now Enigma is pushing beyond—to unlock the neural code of biological intelligence.
            </p>
          </div>
        </section>

        <section className="leadership">
          <h2 className="line">Leadership</h2>
          <ul className="leaders-list">
            <li className="line">
              <strong>Andreas Tolias</strong>
              <span>Phd, Co-Director</span>
            </li>
            <li className="line">
              <strong>Sophia Sanborn</strong>
              <span>Phd, Co-Director</span>
            </li>
            <li className="line">
              <strong>Tirin Moore</strong>
              <span>Phd, Co-Director</span>
            </li>
            <li className="line">
              <strong>Barun Dutta</strong>
              <span>Chief Scientist, IMEC & Co-Director</span>
            </li>
          </ul>
        </section>

      </div>
      <Footer />
    </div>
  );
}
