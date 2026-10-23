import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { gsap, prefersReducedMotion } from "../../lib/motion.js";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { emit, on } from "../../lib/assistantBus.js";
import { avatar } from "../../data/portfolio.js";
import { POSES, POSED_BONES, MOODS } from "./avatarPoses.js";

const SECTION_IDS = Object.keys(avatar.sections);
const damp = THREE.MathUtils.damp;
const REDUCE_MOTION = prefersReducedMotion();

// A VRM avatar that greets you in the hero, then shrinks into the bottom-right corner
// and keeps you company: it changes pose and says a line for each section.
// It's also the face of the "Ask about me" chat: click it to open the chat, and it
// steps aside, thinks while a reply is coming, then talks it through.
export default function Avatar() {
  const dockRef = useRef(null);
  const bubbleRef = useRef(null);
  const hitRef = useRef(null);
  const tweenRef = useRef(null);
  const poseRef = useRef(POSES.rest);
  const talkingRef = useRef(false);
  const chatRef = useRef({ open: false, phase: "idle", waveUntil: 0, talkUntil: 0 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState(false);
  const [chat, setChat] = useState({ open: false, big: false });
  const section = useActiveSection(SECTION_IDS) || "top";
  const { pose, line } = avatar.sections[section];

  // ── Scene, model, render loop ──────────────────────────────
  useEffect(() => {
    const dock = dockRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    dock.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(1, 1.5, 2);
    const rim = new THREE.DirectionalLight(0xf2b880, 3); // warm accent from behind
    rim.position.set(-1.5, 1.2, -1.5);
    scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.8));

    const lookTarget = new THREE.Object3D();
    scene.add(lookTarget);

    let vrm = null;
    let head = null;
    let headY = 1.4;
    let disposed = false;

    const frame = () => {
      // Waist-up framing, worked out from wherever this model's head is
      camera.position.set(0, headY - 0.12, 2.8);
      camera.lookAt(0, headY - 0.3, 0);
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = dock;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    loader.load(
      import.meta.env.BASE_URL + avatar.model, // relative to the site's base, so subfolder hosting works
      (gltf) => {
        if (disposed) return;
        vrm = gltf.userData.vrm;
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.combineSkeletons(gltf.scene);
        VRMUtils.rotateVRM0(vrm); // older VRM 0.x models face the other way
        vrm.scene.traverse((o) => (o.frustumCulled = false));
        scene.add(vrm.scene);

        vrm.update(0);
        head = vrm.humanoid.getNormalizedBoneNode("head");
        headY = head.getWorldPosition(new THREE.Vector3()).y;
        frame();
        if (vrm.lookAt) vrm.lookAt.target = lookTarget;
        setReady(true);
      },
      undefined,
      (err) => {
        console.warn("Avatar failed to load — falling back to the hero scene.", err);
        setFailed(true);
      }
    );

    // Where the pointer is, relative to the avatar (−1…1)
    const pointer = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      pointer.x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      pointer.y = (e.clientY - (r.top + r.height * 0.25)) / (window.innerHeight / 2);
    };
    window.addEventListener("pointermove", onMove);

    const clock = new THREE.Clock();
    const base = {}; // current (eased) rotation per bone
    const moods = { happy: 0, relaxed: 0 };
    let nextBlink = 2;
    const headPos = new THREE.Vector3();
    const hipsPos = new THREE.Vector3();
    let raf = 0;

    // Chat: wave hello when it opens; once a reply starts, keep "talking" for roughly as long as it'd take to say it
    const offChat = on("state", ({ open, phase, text }) => {
      const c = chatRef.current;
      const now = clock.elapsedTime;
      if (open && !c.open) c.waveUntil = now + 1.8;
      if (phase === "talking" && c.phase !== "talking") c.talkUntil = now + Math.min(7, 0.8 + text.length * 0.045);
      if (!open) c.talkUntil = c.waveUntil = 0;
      c.open = open;
      c.phase = phase;
      // Full-size in the hero? Then it also shrinks a little to make room for the chat.
      const docked = REDUCE_MOTION || (tweenRef.current?.scrollTrigger?.progress ?? 0) >= 0.5;
      setChat({ open, big: open && !docked });
    });

    const chatPose = (t) => {
      const c = chatRef.current;
      if (!c.open) return null;
      if (t < c.waveUntil) return POSES.wave;
      if (c.phase === "thinking") return POSES.think;
      if (t < c.talkUntil) return POSES.explain;
      return POSES.listen;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!vrm) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.elapsedTime;
      const p = chatPose(t) || poseRef.current;
      const talking = talkingRef.current || (chatRef.current.open && t < chatRef.current.talkUntil);
      // Reduced motion: poses still change, but without the waving / gesturing loops
      const motion = p.motion && !REDUCE_MOTION ? p.motion(t) : {};

      // Ease every bone towards the pose, then add the pose's own motion on top
      for (const name of POSED_BONES) {
        const node = vrm.humanoid.getNormalizedBoneNode(name);
        if (!node) continue;
        const target = p.bones[name] || [0, 0, 0];
        const cur = (base[name] ||= [0, 0, 0]);
        const add = motion[name] || [0, 0, 0];
        for (let i = 0; i < 3; i++) cur[i] = damp(cur[i], target[i], 5, dt);
        node.rotation.set(cur[0] + add[0], cur[1] + add[1], cur[2] + add[2]);
      }

      // Breathing and a slow idle sway
      const spine = vrm.humanoid.getNormalizedBoneNode("chest");
      if (spine) spine.rotation.x += Math.sin(t * 1.6) * 0.025;
      const hips = vrm.humanoid.getNormalizedBoneNode("hips");
      if (hips) hips.rotation.y += Math.sin(t * 0.5) * 0.04;

      // Eyes: follow the pointer, or look where the pose says
      const [lx, ly] = p.look === "cursor" ? [pointer.x * 1.4, -pointer.y * 0.9] : p.look;
      lookTarget.position.set(damp(lookTarget.position.x, lx, 4, dt), damp(lookTarget.position.y, headY + ly, 4, dt), 2.5);

      const em = vrm.expressionManager;
      if (em) {
        for (const m of MOODS) {
          moods[m] = damp(moods[m], p.mood?.[m] || 0, 3, dt);
          em.setValue(m, moods[m]);
        }
        // Blink every few seconds
        nextBlink -= dt;
        if (nextBlink < 0) nextBlink = 2 + Math.random() * 3.5;
        em.setValue("blink", nextBlink < 0.14 ? Math.sin((nextBlink / 0.14) * Math.PI) : 0);
        // Mouth moves while it's "speaking": the bubble typing, or a chat reply
        const talk = talking ? 0.35 + 0.35 * Math.sin(t * 17) * Math.sin(t * 6.3) : 0;
        em.setValue("aa", Math.max(0, talk));
        em.setValue("oh", talking ? Math.max(0, Math.sin(t * 9.1)) * 0.25 : 0);
      }

      vrm.update(dt);
      renderer.render(scene, camera);

      // Keep the speech bubble pinned to the head, wherever the dock has moved to:
      // beside it (clear of the waving hand) in the hero, above it once docked in the corner.
      const bubble = bubbleRef.current;
      if (head && bubble) {
        const r = renderer.domElement.getBoundingClientRect();
        const corner = r.height < dock.clientHeight * 0.6;
        head.getWorldPosition(headPos);
        if (corner) headPos.y += 0.22;
        else headPos.x -= 0.5;
        headPos.project(camera);
        let x = r.left + ((headPos.x + 1) / 2) * r.width;
        const y = r.top + ((1 - headPos.y) / 2) * r.height;
        if (corner) x = Math.min(x + 70, window.innerWidth - 12);
        bubble.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-100%, ${corner ? "-100%" : "-50%"})`;
        if (bubble.classList.contains("is-corner") !== corner) bubble.classList.toggle("is-corner", corner);
      }

      // Clickable area over the head and upper body (the canvas itself ignores the pointer)
      const hit = hitRef.current;
      if (head && hit) {
        const r = renderer.domElement.getBoundingClientRect();
        head.getWorldPosition(headPos);
        headPos.y += 0.15;
        headPos.project(camera);
        vrm.humanoid.getNormalizedBoneNode("hips").getWorldPosition(hipsPos).project(camera);
        const top = r.top + ((1 - headPos.y) / 2) * r.height;
        const h = r.top + ((1 - hipsPos.y) / 2) * r.height - top;
        const cx = r.left + ((headPos.x + 1) / 2) * r.width;
        hit.style.transform = `translate(${(cx - h * 0.3).toFixed(1)}px, ${top.toFixed(1)}px)`;
        hit.style.width = `${(h * 0.6).toFixed(1)}px`;
        hit.style.height = `${h.toFixed(1)}px`;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      offChat();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (vrm) VRMUtils.deepDispose(vrm.scene);
      renderer.dispose();
      dock.removeChild(renderer.domElement);
    };
  }, []);

  // ── Scroll: full size beside the hero → small companion in the corner ──
  // With reduced motion it simply starts (and stays) in the corner.
  useEffect(() => {
    if (!ready) return;
    const docked = {
      scale: 0.34,
      transformOrigin: "100% 100%",
      x: -6,
      y: -64, // sits just above the "Ask about me" button
    };
    if (REDUCE_MOTION) {
      gsap.set(dockRef.current, docked);
      return;
    }
    document.documentElement.classList.add("has-avatar");
    const tween = gsap.to(dockRef.current, {
      ...docked,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#top", start: "top top", end: "bottom 20%", scrub: 0.8 },
    });
    tweenRef.current = tween;
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      tweenRef.current = null;
      document.documentElement.classList.remove("has-avatar");
    };
  }, [ready]);

  // ── Pose + line for the current section, typed out while the mouth moves ──
  // Outside the hero the bubble fades a few seconds after it finishes, so it doesn't sit over the content.
  useEffect(() => {
    poseRef.current = POSES[pose] || POSES.rest;
    if (!ready) return;
    let i = 0;
    let hide = 0;
    setTyped("");
    setShown(true);
    talkingRef.current = true;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        talkingRef.current = false;
        if (section !== "top") hide = setTimeout(() => setShown(false), 4500);
      }
    }, 30);
    return () => {
      clearInterval(id);
      clearTimeout(hide);
      talkingRef.current = false;
    };
  }, [section, pose, line, ready]);

  if (failed) return null;

  // The stage slides the avatar left of the chat window while it's open; the dock inside handles scroll.
  return (
    <>
      <div className={`avatar-stage ${chat.open ? "is-chatting" : ""} ${chat.big ? "is-big" : ""}`}>
        <div ref={dockRef} className={`avatar-dock ${ready ? "is-ready" : ""}`} aria-hidden="true" />
      </div>
      {/* Mouse shortcut to the chat; keyboard users already have the "Ask about me" button and "/" */}
      {ready && !chat.open && (
        <button
          ref={hitRef}
          className="avatar-hit"
          onClick={() => emit("request-open")}
          tabIndex={-1}
          aria-hidden="true"
          title="Chat with me"
        />
      )}
      {/* Decorative: everything it says is already on the page */}
      <p ref={bubbleRef} className={`avatar-bubble ${ready && shown && typed && !chat.open ? "is-on" : ""}`} aria-hidden="true">
        {typed}
      </p>
    </>
  );
}
