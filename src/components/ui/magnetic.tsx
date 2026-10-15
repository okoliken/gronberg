"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Pulls its child toward the pointer while hovered, springs back on leave
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(`(pointer: fine) and ${MOTION_OK}`, () => {
        const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
        const move = contextSafe!((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * strength);
          y((e.clientY - (r.top + r.height / 2)) * strength);
        });
        const leave = contextSafe!(() => {
          x(0);
          y(0);
        });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
