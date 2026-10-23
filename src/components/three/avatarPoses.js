// Poses for a VRM humanoid, as [x, y, z] Euler rotations (radians) on its normalized bones.
// Normalized bones start in a T-pose facing +Z (the camera), so:
//   upper arm z  — lowers/raises the arm (left: negative = down, right: positive = down)
//   upper arm y  — swings it forward (left: negative, right: positive)
//   lower arm y  — bends the elbow forward; lower arm z bends it up/down
// The avatar's right hand is on the left of the screen, i.e. towards the page content.

const curl = (side, amount) => {
  const s = side === "left" ? -1 : 1;
  const out = {};
  for (const f of ["Middle", "Ring", "Little"]) {
    out[`${side}${f}Proximal`] = [0, 0, amount * s];
    out[`${side}${f}Intermediate`] = [0, 0, amount * s];
  }
  return out;
};

// Relaxed standing: arms at the sides, elbows a touch bent.
const rest = {
  leftUpperArm: [0, -0.1, -1.2],
  rightUpperArm: [0, 0.1, 1.2],
  leftLowerArm: [0, -0.25, 0],
  rightLowerArm: [0, 0.25, 0],
  ...curl("left", 0.3),
  ...curl("right", 0.3),
};

export const POSES = {
  rest: { bones: rest, look: "cursor", mood: { relaxed: 0.3 } },

  wave: {
    bones: {
      ...rest,
      rightUpperArm: [0, 0.25, 0.25],
      rightLowerArm: [0, 0, -1.85],
      ...curl("right", 0.05),
      head: [0, 0, 0.06],
    },
    // the hand waves side to side at the elbow
    motion: (t) => ({ rightLowerArm: [0, 0, Math.sin(t * 9) * 0.32], head: [0, 0, Math.sin(t * 4.5) * 0.03] }),
    look: "cursor",
    mood: { happy: 0.55 },
  },

  think: {
    bones: {
      ...rest,
      leftUpperArm: [0, -0.45, -1.15],
      leftLowerArm: [0, -1.1, 0],
      rightUpperArm: [0, 0.45, 1.15],
      rightLowerArm: [0, 1.1, 0],
      head: [0.05, 0, 0.12],
      neck: [0, 0, 0.04],
    },
    motion: (t) => ({ head: [Math.sin(t * 0.9) * 0.03, 0, 0] }),
    look: [0.35, 0.25],
    mood: { relaxed: 0.5 },
  },

  point: {
    bones: {
      ...rest,
      rightUpperArm: [0, 0.55, -0.05],
      rightLowerArm: [0, 0.15, 0],
      ...curl("right", 1.25),
      spine: [0, -0.08, 0],
      neck: [0, -0.15, 0],
      head: [0, -0.3, 0.04],
    },
    motion: (t) => ({ rightUpperArm: [0, 0, Math.sin(t * 2.2) * 0.04] }),
    look: [-1.2, 0],
    mood: { happy: 0.25 },
  },

  present: {
    bones: {
      ...rest,
      leftUpperArm: [0, -0.55, -0.95],
      leftLowerArm: [0, -0.85, 0],
      rightUpperArm: [0, 0.55, 0.95],
      rightLowerArm: [0, 0.85, 0],
      ...curl("left", 0.1),
      ...curl("right", 0.1),
      head: [0.06, -0.1, 0],
    },
    motion: (t) => ({ spine: [Math.sin(t * 1.8) * 0.02, 0, 0] }),
    look: [-0.6, -0.1],
    mood: { happy: 0.4 },
  },

  // ── While the chat is open (it sits to the avatar's left, the right of the screen) ──

  listen: {
    bones: { ...rest, neck: [0, 0.1, 0], head: [0.04, 0.22, -0.06] },
    motion: (t) => ({ head: [Math.sin(t * 1.1) * 0.02, 0, 0] }),
    look: [1.2, -0.15],
    mood: { relaxed: 0.4, happy: 0.15 },
  },

  explain: {
    bones: {
      ...rest,
      leftUpperArm: [0, -0.55, -0.7],
      leftLowerArm: [0, -0.95, 0],
      ...curl("left", 0.1),
      neck: [0, 0.08, 0],
      head: [0, 0.15, -0.03],
    },
    // talking-with-hands: the forearm and head keep moving a little
    motion: (t) => ({
      leftLowerArm: [0, Math.sin(t * 2.6) * 0.18, 0],
      leftUpperArm: [0, 0, Math.sin(t * 1.3) * 0.06],
      head: [Math.sin(t * 3.1) * 0.035, Math.sin(t * 0.8) * 0.05, 0],
    }),
    look: [0.9, 0],
    mood: { happy: 0.35 },
  },
};

// Every bone any pose touches, so switching poses also eases the others back to zero.
export const POSED_BONES = [...new Set(Object.values(POSES).flatMap((p) => Object.keys(p.bones)).concat(["spine", "chest", "neck", "head", "hips"]))];
export const MOODS = ["happy", "relaxed"];
