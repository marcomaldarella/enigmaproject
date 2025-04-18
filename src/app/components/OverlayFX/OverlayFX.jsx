'use client';

import React, { useEffect, useRef, useContext } from 'react';
import { DarkModeContext } from '../../Providers'; // importa il contesto
import './OverlayFX.css';

export default function OverlayFX() {
  const { darkMode } = useContext(DarkModeContext);
  const grainRef = useRef(null);

  useEffect(() => {
    const grain = grainRef.current;
    if (grain) {
      grain.style.backgroundPosition = `${Math.random() * 100}px ${Math.random() * 100}px`;
    }
  }, []);

  return (
    <>
      <div className={`overlay-header ${darkMode ? 'dark' : 'light'}`} />
      <div className={`overlay-footer ${darkMode ? 'dark' : 'light'}`} />
      <div className="overlay-grain" ref={grainRef} />
    </>
  );
}
