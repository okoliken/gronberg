"use client";

import Link from "next/link";
import { useRef } from "react";
import { latestWork } from "@/content/home";
import { AccentTitle } from "@/components/ui/accent-title";
import { RevealImage } from "@/components/ui/reveal-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitReveal } from "@/components/ui/split-reveal";
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Figma positions inside the 1400x1744 "projects" group, plus how fast each card drifts
const layout = [
  { pos: "lg:top-0 lg:left-0 lg:w-700", img: "aspect-[700/855.6]", sizes: "(min-width: 64rem) 42vw, 100vw", speed: 0 },
  { pos: "lg:top-34 lg:left-991 lg:w-409", img: "aspect-[409/500]", sizes: "(min-width: 64rem) 25vw, 60vw", speed: -0.18 },
  { pos: "lg:top-825 lg:left-891 lg:w-409", img: "aspect-[409/500]", sizes: "(min-width: 64rem) 25vw, 60vw", speed: -0.08 },
  { pos: "lg:top-1132 lg:left-145 lg:w-409", img: "aspect-[409/500]", sizes: "(min-width: 64rem) 25vw, 60vw", speed: -0.14 },
];

export function LatestWork() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        // Cards scroll at different speeds so the staggered grid gains depth.
        // The drift is centred, so each card sits on its Figma position mid-viewport.
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
    <section ref={ref} aria-labelledby="latest-title" className="mx-20 mt-140 lg:mx-auto lg:mt-224 lg:w-1400">
      <SectionHeading id="latest-title" title={{ text: "Latest", accent: "Work" }} href="/projects" />

      <ul className="mt-60 grid grid-cols-1 gap-60 lg:relative lg:mt-128 lg:block lg:h-1744">
        {latestWork.map((p, i) => (
          <li
            key={p.slug}
            data-speed={layout[i].speed}
            className={`lg:absolute ${layout[i].pos} ${i % 2 ? "w-[75%] justify-self-end" : "w-full"}`}
          >
            <Link href={`/projects/${p.slug}`} data-cursor="view" className="group flex flex-col gap-12">
              <SplitReveal as="h3" className="text-h3">
                <AccentTitle title={p.title} />
              </SplitReveal>
              <div data-skew>
                <RevealImage src={p.image.src} alt={p.image.alt} sizes={layout[i].sizes} className={`w-full ${layout[i].img}`} />
              </div>
              <SplitReveal as="p" className="text-body">
                {p.place}
                <br />
                {p.date}
              </SplitReveal>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
