"use client";

import { useRef } from "react";
import type { Img, Project } from "@/content/site";
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ProjectCard } from "./project-card";

export type GridItem = {
  project: Project;
  image: Img;
  size: "lg" | "sm";
  /** lg:top-* lg:left-* from the Figma frame */
  position: string;
  speed: number;
};

const SIZES = {
  lg: { width: "lg:w-700", aspect: "aspect-[700/855.6]", sizes: "(min-width: 64rem) 42vw, 100vw" },
  sm: { width: "lg:w-409", aspect: "aspect-409/500", sizes: "(min-width: 64rem) 25vw, 75vw" },
};

// Absolutely positioned on desktop exactly as in Figma; a staggered single column on mobile
export function ProjectGrid({ items, height, priorityCount = 0 }: { items: GridItem[]; height: string; priorityCount?: number }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        // Cards drift at different speeds; centred so each sits on its Figma spot mid-viewport
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((card) => {
          const speed = Number(card.dataset.speed);
          if (!speed) return;
          gsap.fromTo(
            card,
            { y: () => (-speed * window.innerHeight) / 2 },
            {
              y: () => (speed * window.innerHeight) / 2,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
            },
          );
        });

        // Images lean with scroll velocity and settle when scrolling stops
        const frames = gsap.utils.toArray<HTMLElement>("[data-skew]");
        const skew = gsap.quickTo(frames, "skewY", { duration: 0.6, ease: "power3" });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => skew(gsap.utils.clamp(-4, 4, self.getVelocity() / -400)),
          onToggle: () => skew(0),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className={`grid grid-cols-1 gap-60 lg:relative lg:block ${height}`}>
      {items.map((item, i) => {
        const size = SIZES[item.size];
        return (
          <li
            key={item.project.slug}
            data-speed={item.speed}
            className={`lg:absolute ${item.position} ${size.width} ${i % 2 ? "w-[75%] justify-self-end" : "w-full"}`}
          >
            <ProjectCard project={item.project} image={item.image} aspect={size.aspect} sizes={size.sizes} priority={i < priorityCount} />
          </li>
        );
      })}
    </ul>
  );
}
