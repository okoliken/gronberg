"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({ ease: "expo.out", duration: 1.2 });

// Lets the console (and browser automation in background tabs) step animations by hand
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  Object.assign(window, { gsap, ScrollTrigger });
}

export const DESKTOP = "(min-width: 64rem)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
