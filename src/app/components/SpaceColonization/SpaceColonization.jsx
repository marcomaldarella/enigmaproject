'use client';

import { useEffect, useRef } from 'react';
import * as Vec2 from 'vec2';
import Network from './core/Network';
import { getGridOfAttractors } from './core/AttractorPatterns';
import Node from './core/Node';
import { random } from './core/Utilities';
import { Light, Dark } from './core/ColorPresets';
import gsap from 'gsap';

const Settings = {
  VenationType: 'Open',
  SegmentLength: 2,
  AttractionDistance: 90,
  KillDistance: 0.95,
  GrowthSpeed: 0.1,
  IsPaused: false,
  EnableCanalization: true,
  EnableOpacityBlending: true,
  ShowAttractors: false,
  ShowNodes: true,
  ShowTips: true,
  RenderMode: 'Dots',
  UseBranchColors: true,
  BranchThickness: 0.3,
  TipThickness: 2,
};

export function SpaceColonization({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const noiseCanvasRef = useRef(null);
  const networkRef = useRef(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  const setupNoiseCanvas = () => {
    const noiseCanvas = noiseCanvasRef.current;
    if (!noiseCanvas) return;
    const ctx = noiseCanvas.getContext('2d');
    if (!ctx) return;
    const rect = noiseCanvas.getBoundingClientRect();

    noiseCanvas.width = rect.width;
    noiseCanvas.height = rect.height;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, noiseCanvas.width, noiseCanvas.height);
  };

  const generateNoise = () => {
    const noiseCanvas = noiseCanvasRef.current;
    if (!noiseCanvas) return;
    const ctx = noiseCanvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = (Math.random() * 255) << 24;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(generateNoise);
  };

  const createNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const Colors = theme === 'dark' ? Dark : Light;

    const network = new Network(ctx, {
      ...Settings,
      Colors,
    });

    const gridAttractors = getGridOfAttractors(50, 100, ctx, 10);
    network.attractors = gridAttractors;

    for (let i = 0; i < 10; i++) {
      network.addNode(
        new Node(
          null,
          new Vec2(random(window.innerWidth), random(window.innerHeight)),
          true,
          ctx,
          { ...Settings, Colors }
        )
      );
    }

    networkRef.current = network;
  };

  useEffect(() => {
    setupCanvas();
    setupNoiseCanvas();
    createNetwork();
    generateNoise();

    const handleResize = () => {
      setupCanvas();
      setupNoiseCanvas();
      if (networkRef.current) {
        networkRef.current.reset();
        createNetwork();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (networkRef.current) {
        networkRef.current.reset();
      }
    };
  }, [theme]);

  useEffect(() => {
    const updateCanvas = () => {
      if (networkRef.current) {
        networkRef.current.update();
        networkRef.current.draw();
      }
      requestAnimationFrame(updateCanvas);
    };

    requestAnimationFrame(updateCanvas);
  }, []);

  useEffect(() => {
    const cycleAnimation = () => {
      if (networkRef.current) {
        gsap.to(networkRef.current, {
          duration: 6,
          progress: 0,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(networkRef.current, {
              duration: 6,
              progress: 1,
              ease: 'power1.inOut',
              onComplete: cycleAnimation,
            });
          },
        });
      }
    };

    cycleAnimation();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="sketch"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: '30%'
        }}
      />
      <canvas
        ref={noiseCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          filter: 'blur(0.6px)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
