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
    <div
      className={styles.page}
      style={{ backgroundColor: logoColors.background, color: logoColors.text }}
      ref={containerRef}
    >
      <div className="about-container">

        <section className="projects">
          <div className="project-full">
            <p className="line">
              Enigma is a non-profit research organization based at Stanford University leveraging deep learning to accelerate neuroscientific discovery.<br></br> Our team has pioneered methods in NeuroAI, neural recording technology, and theoretical neuroscience, and includes key architects of{' '}
              <a
                href="https://www.science.org/doi/abs/10.1126/science.abf4588"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neuropixels
              </a>{' '}
              and the{' '}
              <a
                href="https://www.nature.com/immersive/d42859-025-00001-w/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                MICrONS Project
              </a>.
            </p>
          </div>
        </section>

        <section className="leadership">
          <h2 className="line">Leadership</h2>
          <ul className="leaders-list">
            <li className="line">
              <strong>Andreas Tolias</strong>
              <span>PhD, Co-Director</span>
            </li>
            <li className="line">
              <strong>Sophia Sanborn</strong>
              <span>PhD, Co-Director</span>
            </li>
            <li className="line">
              <strong>Tirin Moore</strong>
              <span>PhD, Co-Director</span>
            </li>
            <li className="line">
              <strong>Barun Dutta</strong>
              <span>Chief Scientist, IMEC &amp; Co-Director</span>
            </li>
          </ul>
        </section>

      </div>
      <Footer />
    </div>
  );
}
