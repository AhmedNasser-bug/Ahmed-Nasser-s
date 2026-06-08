// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/threejs-fundamentals/SKILL.md
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ScrollPaintStrokeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  active?: boolean;
}

const ScrollPaintStroke: React.FC<ScrollPaintStrokeProps> = ({
  children,
  color = 'text-primary',
  className = '',
  active
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Sync with active prop if provided
  useEffect(() => {
    if (active !== undefined) {
      if (active) {
        setCompleted(false);
        setIsVisible(true);
      } else {
        setCompleted(false);
        setIsVisible(false);
      }
    }
  }, [active]);

  useEffect(() => {
    // Only set up intersection observer if active prop is not controlled
    if (active !== undefined) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger animation once
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || completed) return;

    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || 120;
    const height = container.clientHeight || 14;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Set up camera to map 1:1 with canvas pixel layout. Top = 0, Bottom = height.
    const camera = new THREE.OrthographicCamera(0, width, 0, height, -10, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Generate Brush Stroke Coordinates (Cubic Bezier Curves in pixel space)
    const p0 = new THREE.Vector2(0, height * 0.5);
    const p1 = new THREE.Vector2(width * 0.25, height * 0.25);
    const p2 = new THREE.Vector2(width * 0.5, height * 0.75);
    const p3 = new THREE.Vector2(width, height * 0.35);
    const curve1 = new THREE.CubicBezierCurve(p0, p1, p2, p3);

    const b0 = new THREE.Vector2(width * 0.02, height * 0.6);
    const b1 = new THREE.Vector2(width * 0.27, height * 0.4);
    const b2 = new THREE.Vector2(width * 0.52, height * 0.85);
    const b3 = new THREE.Vector2(width * 0.99, height * 0.45);
    const curve2 = new THREE.CubicBezierCurve(b0, b1, b2, b3);

    // Helper to generate a continuous, thick 3D Ribbon mesh from a 2D bezier curve
    const createRibbonGeometry = (curve: THREE.CubicBezierCurve, strokeWidth: number, segments: number) => {
      const geometry = new THREE.BufferGeometry();
      const points = curve.getPoints(segments);
      const vertexCount = (segments + 1) * 2;
      
      const positions = new Float32Array(vertexCount * 3);
      const uvs = new Float32Array(vertexCount * 2);
      const indices: number[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const pt = points[i];
        
        // Calculate normal vector perpendicular to curve tangent
        const tangent = curve.getTangent(t).normalize();
        const normal = new THREE.Vector2(-tangent.y, tangent.x).normalize();
        const halfW = strokeWidth * 0.5;

        // Vertex A (top edge of brush segment)
        positions[i * 6] = pt.x + normal.x * halfW;
        positions[i * 6 + 1] = pt.y + normal.y * halfW;
        positions[i * 6 + 2] = 0;

        // Vertex B (bottom edge of brush segment)
        positions[i * 6 + 3] = pt.x - normal.x * halfW;
        positions[i * 6 + 4] = pt.y - normal.y * halfW;
        positions[i * 6 + 5] = 0;

        // UV Coordinates for texture alignment & drawing transition
        uvs[i * 4] = t;     // U (progress along line)
        uvs[i * 4 + 1] = 1; // V (top)
        uvs[i * 4 + 2] = t; // U
        uvs[i * 4 + 3] = 0; // V (bottom)

        if (i < segments) {
          const a = i * 2;
          const b = i * 2 + 1;
          const c = (i + 1) * 2;
          const d = (i + 1) * 2 + 1;

          // Triangle 1
          indices.push(a, b, c);
          // Triangle 2
          indices.push(b, d, c);
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(indices);

      return geometry;
    };

    const geom1 = createRibbonGeometry(curve1, 8.0, 60); // Thick main stroke
    const geom2 = createRibbonGeometry(curve2, 3.0, 60); // Thin bristle stroke

    // Resolve color code of the brand Tailwind class at runtime using a temporary DOM query
    const dummy = document.createElement('span');
    dummy.className = color;
    dummy.style.display = 'none';
    document.body.appendChild(dummy);
    const computedColor = window.getComputedStyle(dummy).color || 'rgb(55, 48, 163)';
    document.body.removeChild(dummy);

    const colorMatch = computedColor.match(/\d+/g);
    let baseR = 55 / 255;
    let baseG = 48 / 255;
    let baseB = 163 / 255;
    if (colorMatch && colorMatch.length >= 3) {
      baseR = parseInt(colorMatch[0]) / 255;
      baseG = parseInt(colorMatch[1]) / 255;
      baseB = parseInt(colorMatch[2]) / 255;
    }

    // Shader materials mapping progress to UV coordinate discard checks (solid lines!)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Thick brush texture fragment shader
    const fragmentShader1 = `
      varying vec2 vUv;
      uniform vec3 color;
      uniform float progress;
      void main() {
        if (vUv.x > progress) discard;
        // Soften outer brush stroke boundaries
        float edgeFade = smoothstep(0.0, 0.15, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
        // Add realistic wet brush bristle lines
        float bristle = 0.8 + 0.2 * sin(vUv.y * 60.0 + sin(vUv.x * 15.0));
        gl_FragColor = vec4(color, edgeFade * bristle * 0.85);
      }
    `;

    // Thin bristle fragment shader
    const fragmentShader2 = `
      varying vec2 vUv;
      uniform vec3 color;
      uniform float progress;
      void main() {
        if (vUv.x > progress) discard;
        float edgeFade = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.8, 1.0, vUv.y));
        float bristle = 0.75 + 0.25 * sin(vUv.y * 80.0 + sin(vUv.x * 25.0));
        gl_FragColor = vec4(color, edgeFade * bristle * 0.60);
      }
    `;

    const strokeMaterial1 = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(baseR, baseG, baseB) },
        progress: { value: 0.0 }
      },
      vertexShader,
      fragmentShader: fragmentShader1,
      transparent: true,
      depthWrite: false
    });

    const strokeMaterial2 = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(Math.max(0, baseR - 0.06), Math.max(0, baseG - 0.06), Math.max(0, baseB - 0.02)) },
        progress: { value: 0.0 }
      },
      vertexShader,
      fragmentShader: fragmentShader2,
      transparent: true,
      depthWrite: false
    });

    const mesh1 = new THREE.Mesh(geom1, strokeMaterial1);
    const mesh2 = new THREE.Mesh(geom2, strokeMaterial2);
    scene.add(mesh1);
    scene.add(mesh2);

    // 3. Pre-allocate splash particles geometry (Max 250 active particles)
    const maxParticles = 250;
    const particlePositions = new Float32Array(maxParticles * 3);
    const particleColors = new Float32Array(maxParticles * 4); // RGBA
    const particleSizes = new Float32Array(maxParticles);

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 4));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec4 color;
        varying vec4 vColor;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        varying vec4 vColor;
        void main() {
          vec2 temp = gl_PointCoord - vec2(0.5);
          float dist = dot(temp, temp);
          if (dist > 0.25) discard;
          float alpha = 1.0 - smoothstep(0.12, 0.25, dist);
          gl_FragColor = vec4(vColor.rgb, vColor.a * alpha);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    const particlesPoints = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesPoints);

    interface ActiveParticle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      r: number;
      g: number;
      b: number;
      alpha: number;
      size: number;
      decay: number;
      gravity: number;
      drag: number;
    }

    let activeParticles: ActiveParticle[] = [];

    // 4. Animation Loop
    let startTime: number | null = null;
    const duration = 500; // Swift 500ms draw
    let animationFrameId: number;

    const animateLoop = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 4.1 Update stroke progress uniforms
      strokeMaterial1.uniforms.progress.value = progress;
      strokeMaterial2.uniforms.progress.value = progress;

      // 4.2 Spawn particles at current ribbon tip
      if (progress < 1) {
        const tip = curve1.getPointAt(progress);

        // Spawn a burst/blurp of paint particles
        const numToSpawn = Math.floor(Math.random() * 2) + 2; // 2-3 per frame
        for (let k = 0; k < numToSpawn; k++) {
          if (activeParticles.length < maxParticles) {
            const cVar = Math.random() * 0.12;
            activeParticles.push({
              x: tip.x,
              y: tip.y,
              z: (Math.random() - 0.5) * 1.5,
              // Spray slightly backward/downward under gravity
              vx: -1.0 - Math.random() * 2.0 + (Math.random() - 0.5) * 1.2,
              vy: -0.4 + (Math.random() - 0.5) * 1.5,
              vz: (Math.random() - 0.5) * 0.4,
              r: baseR + cVar,
              g: baseG + cVar,
              b: baseB + 0.08,
              alpha: 0.95,
              size: 1.2 + Math.random() * 2.0,
              decay: 0.025 + Math.random() * 0.03,
              gravity: 0.08 + Math.random() * 0.05, // Pull downwards in pixel space (+Y is downwards)
              drag: 0.96
            });
          }
        }
      }

      // 4.3 Update particles buffer
      const particlePosArr = particlesGeometry.attributes.position.array as Float32Array;
      const particleColorArr = particlesGeometry.attributes.color.array as Float32Array;
      const particleSizeArr = particlesGeometry.attributes.size.array as Float32Array;

      const stillActive: ActiveParticle[] = [];
      let pIdx = 0;

      activeParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vy += p.gravity; // Gravity adds velocity downwards
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vz *= p.drag;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          stillActive.push(p);

          particlePosArr[pIdx * 3] = p.x;
          particlePosArr[pIdx * 3 + 1] = p.y;
          particlePosArr[pIdx * 3 + 2] = p.z;

          particleColorArr[pIdx * 4] = p.r;
          particleColorArr[pIdx * 4 + 1] = p.g;
          particleColorArr[pIdx * 4 + 2] = p.b;
          particleColorArr[pIdx * 4 + 3] = p.alpha;

          particleSizeArr[pIdx] = p.size;

          pIdx++;
        }
      });

      activeParticles = stillActive;

      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;
      particlesGeometry.attributes.size.needsUpdate = true;
      particlesGeometry.setDrawRange(0, pIdx);

      // Render Scene
      renderer.render(scene, camera);

      // Continue frame updates until paint line is full and all particles are dead
      if (progress < 1 || activeParticles.length > 0) {
        animationFrameId = requestAnimationFrame(animateLoop);
      } else {
        // Complete the WebGL lifecycle cleanly
        setCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    // 5. Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geom1.dispose();
      geom2.dispose();
      particlesGeometry.dispose();
      strokeMaterial1.dispose();
      strokeMaterial2.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isVisible, completed]);

  return (
    <span ref={elementRef} className={`relative inline-block ${className}`}>
      <span className="relative z-10 px-1">{children}</span>
      {!completed && (
        <div 
          ref={canvasContainerRef} 
          className="absolute -bottom-1.5 left-0 w-full h-[14px] -z-0 pointer-events-none" 
        />
      )}
      {completed && (
        <svg 
          className="absolute -bottom-1.5 left-0 w-full h-[14px] -z-0 opacity-80" 
          viewBox="0 0 100 20" 
          preserveAspectRatio="none"
        >
          {/* Main paint brush stroke path */}
          <path
            d="M0,10 C25,4 50,14 75,8 C85,6 95,9 100,6"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            className={`${color} paint-stroke-path`}
          />
          {/* Secondary thinner bristle path for realistic texture */}
          <path
            d="M2,12 C27,7 52,16 77,10 C87,8 96,11 99,8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`${color} paint-stroke-path opacity-60`}
          />
        </svg>
      )}
    </span>
  );
};

export default ScrollPaintStroke;
