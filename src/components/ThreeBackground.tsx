// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/threejs-fundamentals/SKILL.md
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    // Only run on desktop/tablet views for performance hygiene
    if (!container || window.innerWidth < 768) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    // 2. Renderer Setup with Best Practice parameters
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Initialize Particle Array Data (120 nodes for smooth density)
    const particleCount = 120;
    interface NodeParticle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseVx: number;
      baseVy: number;
      baseVz: number;
    }

    const particles: NodeParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 40 - 10;
      
      const vx = (Math.random() - 0.5) * 0.05;
      const vy = (Math.random() - 0.5) * 0.05;
      const vz = (Math.random() - 0.5) * 0.03;

      particles.push({
        x, y, z,
        vx, vy, vz,
        baseVx: vx,
        baseVy: vy,
        baseVz: vz
      });
    }

    // 5. Pre-allocate Buffer for Constellation Lines (Performance Hygiene: Prevents memory allocation cycles)
    const maxLines = 350;
    const linePositions = new Float32Array(maxLines * 2 * 3); // 2 vertices, 3 coords
    const lineColors = new Float32Array(maxLines * 2 * 3);    // 2 vertices, 3 color channels (RGB)

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 1, // linewith > 1 is unsupported on many GPUs, keep at 1 for compatibility
      depthWrite: false
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 6. Interactive Mouse Tracker
    let mouseX = 0;
    let mouseY = 0;
    const targetMouse = new THREE.Vector3(0, 0, 0);

    const onDocumentMouseMove = (event: MouseEvent) => {
      // Scale mouse position to NDC (-1 to 1)
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', onDocumentMouseMove, { passive: true });

    let isVisible = true;
    let animationFrameId: number;

    // Visibility gating observer
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    // 7. Core Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Map mouse NDC coordinates to estimated 3D plane at Z = 0
      const mouse3D = new THREE.Vector3(mouseX * 40, mouseY * 25, 0);
      targetMouse.lerp(mouse3D, 0.08); // smooth interpolation

      // Update Particle Physics & Mouse Repulsion
      particles.forEach((p) => {
        // Subtle drift movement
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Apply mouse force field (repulsion radius = 15 units)
        const dx = p.x - targetMouse.x;
        const dy = p.y - targetMouse.y;
        const dz = p.z - targetMouse.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 15.0) {
          const force = (15.0 - dist) * 0.003;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;

          // Clamp speed to avoid scattering particles off-screen
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentSpeed > 0.25) {
            p.vx = (p.vx / currentSpeed) * 0.25;
            p.vy = (p.vy / currentSpeed) * 0.25;
          }
        } else {
          // Slow drag recovery back to base drift velocity
          p.vx += (p.baseVx - p.vx) * 0.02;
          p.vy += (p.baseVy - p.vy) * 0.02;
          p.vz += (p.baseVz - p.vz) * 0.02;
        }

        // Boundary Wrapping/Rebound
        if (p.x < -48) p.vx *= -1;
        if (p.x > 48) p.vx *= -1;
        if (p.y < -30) p.vy *= -1;
        if (p.y > 30) p.vy *= -1;
        if (p.z < -45) p.vz *= -1;
        if (p.z > 15) p.vz *= -1;

      });

      // Compute Constellation Lines (O(N) visual range check)
      let lineCount = 0;
      const maxDistance = 10.0;

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          if (lineCount >= maxLines) break;
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const intensity = 1.0 - (dist / maxDistance); // Closer = brighter line

            // Insert line coordinates
            const lIdx = lineCount * 6;
            linePositions[lIdx] = p1.x;
            linePositions[lIdx + 1] = p1.y;
            linePositions[lIdx + 2] = p1.z;

            linePositions[lIdx + 3] = p2.x;
            linePositions[lIdx + 4] = p2.y;
            linePositions[lIdx + 5] = p2.z;

            // Generate custom color gradient (matching brand theme)
            const cIdx = lineCount * 6;
            const r = 0.22 * intensity; // #3730A3 Red channel scaling
            const g = 0.19 * intensity; // #3730A3 Green channel scaling
            const b = 0.64 * intensity; // #3730A3 Blue channel scaling

            lineColors[cIdx] = r;
            lineColors[cIdx + 1] = g;
            lineColors[cIdx + 2] = b;
            lineColors[cIdx + 3] = r;
            lineColors[cIdx + 4] = g;
            lineColors[cIdx + 5] = b;

            lineCount++;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount * 2);

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // 8. Debounced Resize Handler
    const onWindowResize = () => {
      if (container) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    
    let resizeTimeout: any;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onWindowResize, 120);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });

    // 9. Thorough Memory Cleanup on Unmount (Best Practice compliance)
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', debouncedResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose all geometry and materials
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="canvas-container" 
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40"
    />
  );
};

export default ThreeBackground;
