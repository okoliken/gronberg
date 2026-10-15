"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  /** skip the scroll reveal (the hero is revealed by the loader instead) */
  reveal?: boolean;
};

/*
  Layers, outside in:
  1. frame    – the clip-path wipe on scroll
  2. hover    – insets a few % when a parent `.group` is hovered
  3. settle   – scales from 1.35 down to exactly 1 during the reveal
  4. image    – zooms on hover

  At rest the image fills the frame exactly, so the crop matches the Figma export.
*/
export const RevealImage = forwardRef<HTMLDivElement, Props>(function RevealImage(
  { src, alt, sizes, className = "", position = "50% 50%", priority, reveal = true },
  forwarded,
) {
  const frame = useRef<HTMLDivElement>(null);
  const settle = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwarded, () => frame.current!);

  useGSAP(
    () => {
      if (!reveal) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: frame.current, start: "top 92%", once: true } })
          .fromTo(
            frame.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
          )
          .fromTo(settle.current, { scale: 1.35 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
      });
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden transition-[clip-path] duration-1000 ease-out-expo [clip-path:inset(0%)] group-hover:[clip-path:inset(2.5%)]">
        <div ref={settle} className="absolute inset-0">
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
