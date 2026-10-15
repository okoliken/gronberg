"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/*
  The red dot from the design as a cursor.
  [data-cursor="view"] grows it into the "View" disc from the Projects frame; links make it a little larger.
*/
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const el = ref.current!;
      document.documentElement.classList.add("has-cursor");
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.09 });

      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      let state = "";

      const setState = (next: string) => {
        if (next === state) return;
        state = next;
        gsap.to(el, { scale: next === "view" ? 1 : next === "link" ? 0.2 : 0.09, duration: 0.6, ease: "expo.out" });
        gsap.to(icon.current, { autoAlpha: next === "view" ? 1 : 0, scale: next === "view" ? 1 : 0.4, duration: 0.4 });
      };

      const move = (e: PointerEvent) => {
        gsap.to(el, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
        x(e.clientX);
        y(e.clientY);
        const target = e.target as Element;
        if (target.closest('[data-cursor="view"]')) setState("view");
        else if (target.closest("a, button")) setState("link");
        else setState("default");
      };
      const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });

      window.addEventListener("pointermove", move);
      document.documentElement.addEventListener("pointerleave", hide);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] invisible grid size-140 place-items-center rounded-full bg-accent text-white opacity-0 max-lg:hidden"
    >
      <div ref={icon} className="invisible text-button uppercase opacity-0">
        View
      </div>
    </div>
  );
}
