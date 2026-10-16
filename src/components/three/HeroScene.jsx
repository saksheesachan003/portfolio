import { useEffect, useRef } from "react";
import * as THREE from "three";

// A slowly-turning wireframe "head" of points — a nod to the 3D avatar work.
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(1.9, 3);
    const wireMat = new THREE.LineBasicMaterial({ color: 0xf2b880, transparent: true, opacity: 0.16 });
    const pointsMat = new THREE.PointsMaterial({ color: 0xf2b880, size: 0.035, transparent: true, opacity: 0.85 });
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), wireMat);
    const points = new THREE.Points(geo, pointsMat);
    group.add(wire, points);

    // Distant dust
    const dustGeo = new THREE.BufferGeometry();
    const dust = new Float32Array(600 * 3);
    for (let i = 0; i < dust.length; i++) dust[i] = (Math.random() - 0.5) * 18;
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    scene.add(
      new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({ color: 0x8fa3c7, size: 0.02, transparent: true, opacity: 0.5 })
      )
    );

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // push the sphere right on wide screens, centre it on phones
      group.position.x = w > 900 ? 2.2 : 0;
      group.position.y = w > 900 ? 0 : 1.2;
      camera.updateProjectionMatrix();
      if (!running) render();
    };
    let frame = 0;
    let running = false;
    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };

    const render = () => {
      const t = clock.getElapsedTime();
      // 0 at the top of the page → 1 once the hero has scrolled away
      const scroll = Math.min(1, window.scrollY / window.innerHeight);
      group.rotation.y = t * 0.12 + mouse.x * 0.6 + scroll * 1.2;
      group.rotation.x = Math.sin(t * 0.2) * 0.15 + mouse.y * 0.4;
      group.scale.setScalar((1 + Math.sin(t * 1.4) * 0.015) * (1 + scroll * 0.35)); // gentle "breathing"
      wireMat.opacity = 0.16 * (1 - scroll * 0.7);
      pointsMat.opacity = 0.85 * (1 - scroll * 0.7);
      renderer.render(scene, camera);
    };
    const tick = () => {
      render();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);

    // Don't burn GPU once the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(mount);

    const onMove = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    render();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      dustGeo.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="scene-mount" />;
}
