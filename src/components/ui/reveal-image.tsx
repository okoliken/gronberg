"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import blur from "@/content/blur.json";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const placeholders: Record<string, string> = blur;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  /** skip the scroll reveal (the hero is revealed by the loader instead) */
  reveal?: boolean;
  /** drift the photo inside its frame while scrolling (large images only) */
  parallax?: boolean;
};

/*
  Layers, outside in:
  1. frame    – the clip-path wipe on scroll
  2. hover    – insets a few % when a parent `.group` is hovered
  3. settle   – scales from 1.35 to 1 during the reveal; with `parallax` it is 8% taller
                than the frame and drifts ±3.5%, so the crop stays within 4% of the Figma framing
  4. image    – zooms on hover
*/
export const RevealImage = forwardRef<HTMLDivElement, Props>(function RevealImage(
  { src, alt, sizes, className = "", position = "50% 50%", priority, reveal = true, parallax = false },
  forwarded,
) {
  const frame = useRef<HTMLDivElement>(null);
  const settle = useRef<HTMLDivElement>(null);
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
            .fromTo(settle.current, { scale: 1.35 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
        }
        if (parallax) {
          gsap.fromTo(
            settle.current,
            { yPercent: -3.5 },
            {
              yPercent: 3.5,
              ease: "none",
              scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: frame },
  );

  const placeholder = placeholders[src];

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden transition-[clip-path] duration-1000 ease-out-expo [clip-path:inset(0%)] group-hover:[clip-path:inset(2.5%)]">
        <div ref={settle} className={`absolute inset-x-0 ${parallax ? "inset-y-[-4%]" : "inset-y-0"}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={placeholder ? "blur" : "empty"}
            blurDataURL={placeholder}
            className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]"
            style={{ objectPosition: position }}
          />
        </div>
      </div>
    </div>
  );
});
