"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// The route the visitor first opened; captured when the layout's bundle evaluates
export const bootPath = typeof window === "undefined" ? null : window.location.pathname;

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis runs on GSAP's ticker so ScrollTrigger and smooth scroll share one frame loop
    const instance = new Lenis({ lerp: 0.1, autoRaf: false, anchors: true });
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

  // New route: start at the top (or the #hash), then let ScrollTrigger re-measure the new page
  useEffect(() => {
    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    if (target) lenis.current?.scrollTo(target as HTMLElement, { immediate: true });
    else lenis.current?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
