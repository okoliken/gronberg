"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, REDUCED, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** false = wait (e.g. for the page loader); true = play when scrolled into view */
  play?: boolean;
  /** play immediately instead of on scroll */
  immediate?: boolean;
  stagger?: number;
};

// Masked line-by-line rise. Splits again on resize/font load so lines stay correct.
export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  play = true,
  immediate = false,
  stagger = 0.1,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !play) return;

      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, reduced: REDUCED }, (ctx) => {
        if (ctx.conditions?.reduced) {
          gsap.set(el, { autoAlpha: 1 });
          return;
        }
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            return gsap.from(self.lines, {
              yPercent: 110,
              rotate: 2,
              duration: 1.5,
              stagger,
              delay,
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
            });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
