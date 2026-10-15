"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis runs on GSAP's ticker so ScrollTrigger and smooth scroll share one frame loop
    const instance = new Lenis({ lerp: 0.1, autoRaf: false });
    const raf = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
