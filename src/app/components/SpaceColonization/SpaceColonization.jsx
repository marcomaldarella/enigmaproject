'use client';

import { useEffect, useRef } from 'react';
import * as Vec2 from 'vec2';
import Network from './core/Network';
import { getGridOfAttractors } from './core/AttractorPatterns';
import Node from './core/Node';
import { random } from './core/Utilities';
import { Light, Dark } from './core/ColorPresets';

const Settings = {
  VenationType: 'Open',
  SegmentLength: 5,
  AttractionDistance: 30,
  KillDistance: 5,
  IsPaused: false,
  EnableCanalization: true,
  EnableOpacityBlending: false,
  ShowAttractors: false,
  ShowNodes: true,
  ShowTips: false,
  ShowAttractionZones: false,
  ShowKillZones: false,
  ShowInfluenceLines: false,
  ShowBounds: false,
  ShowObstacles: false,
  RenderMode: 'Dots',
  UseBranchColors: false,
  BranchThickness: 0.2,
  TipThickness: 2,
  BoundsBorderThickness: 1,
};

export function SpaceColonization({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const networkRef = useRef(null);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  const createNetwork = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
    createNetwork();

    const handleResize = () => {
      setupCanvas(); // Reset del canvas
      if (networkRef.current) {
        networkRef.current.reset(); // Resetta la rete
        createNetwork(); // Ricrea la rete
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (networkRef.current) {
        networkRef.current.reset(); // Pulizia della rete
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

  return (
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
  );
}