"use client";

import { useRef } from "react";
import { services } from "@/content/home";
import { SplitReveal } from "@/components/ui/split-reveal";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function Services() {
  const ref = useRef<HTMLElement>(null);

  // Divider lines draw across as each one enters
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) =>
          gsap.fromTo(line, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: line, start: "top 90%", once: true },
          }),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Services" className="mx-20 mt-120 lg:mx-auto lg:mt-159 lg:flex lg:w-1400">
      <p className="flex items-center gap-10 self-start text-body lg:w-499 lg:shrink-0 lg:pt-3 lg:pl-244">
        <span className="h-px w-15 bg-black" aria-hidden="true" />
        Services
      </p>
      <ol className="mt-32 flex flex-col gap-32 lg:mt-0 lg:w-800 lg:gap-50">
        {services.map((s, i) => (
          <li key={s.title} className="contents">
            {i > 0 && <span data-line className="block h-px w-full bg-line" aria-hidden="true" />}
            <div className="flex flex-col gap-12 lg:gap-20">
              <h3 className="flex gap-24 text-h3 uppercase lg:gap-50">
                <SplitReveal as="span" className="w-40 shrink-0 text-accent lg:w-60">
                  {s.number}
                </SplitReveal>
                <SplitReveal as="span" delay={0.08}>
                  {s.title}
                </SplitReveal>
              </h3>
              <SplitReveal as="p" delay={0.1} className="pl-64 text-body-lg lg:pl-111" stagger={0.06}>
                {s.body}
              </SplitReveal>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
