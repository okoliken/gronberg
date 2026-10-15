"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  /** inner drift while the image crosses the viewport */
  parallax?: boolean;
  /** skip the scroll reveal (the hero is revealed by the loader instead) */
  reveal?: boolean;
};

/*
  Layers, outside in:
  1. frame    – the clip-path wipe on scroll
  2. hover    – insets a few % when a parent `.group` is hovered
  3. drift    – parallax + the settle-in scale
  4. image    – zooms on hover
*/
export const RevealImage = forwardRef<HTMLDivElement, Props>(function RevealImage(
  { src, alt, sizes, className = "", position = "50% 50%", priority, parallax = true, reveal = true },
  forwarded,
) {
  const frame = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwarded, () => frame.current!);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (reveal) {
          gsap
            .timeline({ scrollTrigger: { trigger: frame.current, start: "top 92%", once: true } })
            .fromTo(
              frame.current,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
            )
            .fromTo(drift.current, { scale: 1.35 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
        }
      });
      if (parallax) {
        mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
          gsap.fromTo(
            drift.current,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden transition-[clip-path] duration-1000 ease-out-expo [clip-path:inset(0%)] group-hover:[clip-path:inset(2.5%)]">
        <div ref={drift} className="absolute inset-x-0 -inset-y-[6%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]"
            style={{ objectPosition: position }}
          />
        </div>
      </div>
    </div>
  );
});
