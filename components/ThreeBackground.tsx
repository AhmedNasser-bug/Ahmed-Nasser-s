import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth < 768) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const geometry1 = new THREE.IcosahedronGeometry(8, 0);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0x1c10c1,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(-15, 5, -10);
    scene.add(mesh1);

    const geometry2 = new THREE.TorusKnotGeometry(6, 1.5, 64, 8);
    const material2 = new THREE.MeshBasicMaterial({
      color: 0x1c10c1,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(20, -5, -20);
    scene.add(mesh2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };

    document.addEventListener('mousemove', onDocumentMouseMove, { passive: true });

    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      mesh1.rotation.x += 0.005;
      mesh1.rotation.y += 0.005;

      mesh2.rotation.x -= 0.003;
      mesh2.rotation.y -= 0.003;

      scene.rotation.x += 0.05 * (targetY - scene.rotation.x);
      scene.rotation.y += 0.05 * (targetX - scene.rotation.y);

      renderer.render(scene, camera);
    };

    animate();

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
      resizeTimeout = setTimeout(onWindowResize, 100);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', debouncedResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if(container.contains(renderer.domElement)){
        container.removeChild(renderer.domElement);
      }
      geometry1.dispose();
      material1.dispose();
      geometry2.dispose();
      material2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="canvas-container" 
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-50"
    />
  );
};

export default ThreeBackground;
