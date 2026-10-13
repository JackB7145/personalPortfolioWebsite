// Ambient JSX augmentation for @react-three/fiber.
//
// Under this project's classic `moduleResolution: "node"` combined with the
// React 18 runtime + @types/react 19, R3F's own `ThreeElements` augmentation of
// the global JSX namespace is not auto-merged. This file wires three.js element
// tags (<points>, <bufferGeometry>, <pointsMaterial>, …) into
// JSX.IntrinsicElements so the Canvas scene graph is type-checked.
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
