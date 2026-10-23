// Tiny event channel between the "Ask about me" chat and the 3D avatar, so neither imports the other.
//   "state"        assistant → avatar   { open, phase: "idle" | "thinking" | "talking", text }
//   "request-open" avatar → assistant   (someone clicked the avatar)
const bus = new EventTarget();

export const emit = (type, detail) => bus.dispatchEvent(new CustomEvent(type, { detail }));

export const on = (type, fn) => {
  const handler = (e) => fn(e.detail);
  bus.addEventListener(type, handler);
  return () => bus.removeEventListener(type, handler);
};
