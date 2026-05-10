/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const container = document.getElementById('canvas-container');

// Optimize: Only load and render Three.js on desktop
if (container && window.innerWidth >= 768) {
    import('https://cdn.skypack.dev/three@0.132.2').then((module) => {
        const THREE = module;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Optimize: Disable antialias for performance, it's just a blurry background
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(container.clientWidth, container.clientHeight);
        // Optimize: Cap pixel ratio to 1.5 to prevent massive GPU load on high-DPI displays
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

        // Optimize: Reduce segment count for performance (from 100,16 to 64,8)
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

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.0005;
            mouseY = (event.clientY - windowHalfY) * 0.0005;
        }, { passive: true });

        let isVisible = true;
        let animationFrameId = null;
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
            if(isVisible && !animationFrameId) {
                animate();
            } else if(!isVisible && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }, { threshold: 0 });
        observer.observe(container);

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            // Optimize: Don't render when not visible
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
        }

        animate();

        // Optimize: Use passive event listener and debounce
        window.addEventListener('resize', debounce(() => {
            if(container) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        }, 100), { passive: true });
    }).catch(err => console.error("Failed to load Three.js:", err));
}
