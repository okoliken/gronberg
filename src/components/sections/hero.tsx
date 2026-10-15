"use client";

import Link from "next/link";
import { useRef } from "react";
import { useIntro } from "@/components/layout/intro";
import { ScrollArrow } from "@/components/ui/arrow";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealImage } from "@/components/ui/reveal-image";
import { SplitReveal } from "@/components/ui/split-reveal";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Positions are the Figma coordinates inside the 1400px content box (hero starts at y=154)
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { done } = useIntro();

  useGSAP(
    () => {
      if (!done) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.3 })
          .fromTo(
            "[data-hero-thumb]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          )
          .fromTo("[data-hero-cta]", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 1.4, ease: "expo.out" }, 0.4)
          .fromTo(
            "[data-hero-scroll]",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
            0.5,
          )
          .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.8);
      });

      // The big name drifts up and the photo sinks a little as the hero scrolls out
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        gsap.to("[data-hero-name]", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-image]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [done] },
  );

  return (
    <section
      ref={ref}
      className="relative mx-20 pt-110 lg:mx-auto lg:h-1160 lg:w-1400 lg:pt-0"
      aria-labelledby="hero-title"
    >
      <div data-hero-name className="relative z-10 lg:absolute lg:top-231 lg:left-0">
        <SplitReveal as="h1" play={done} immediate className="text-xlarge text-accent" stagger={0.12}>
          <span id="hero-title">
            Jacob
            <br />
            Grønberg
          </span>
        </SplitReveal>
      </div>

      <div className="relative z-10 mt-16 flex flex-col text-small uppercase max-lg:items-end lg:contents">
        <SplitReveal as="p" play={done} immediate delay={0.25} className="lg:absolute lg:top-602 lg:left-180 lg:z-10">
          Photographer
        </SplitReveal>
        <SplitReveal as="p" play={done} immediate delay={0.35} className="lg:absolute lg:top-679 lg:left-273 lg:z-10">
          &amp; Visual artist
        </SplitReveal>
      </div>

      <div
        data-hero-image
        className={`mt-40 lg:absolute lg:top-154 lg:left-648.5 lg:z-[5] lg:mt-0 ${done ? "" : "invisible"}`}
      >
        <RevealImage
          src="/images/ballet-tutu.jpg"
          alt="Male dancer in a white tutu, arms raised against a wall"
          sizes="(min-width: 64rem) 45vw, 100vw"
          priority
          reveal={false}
          parallax={false}
          className="aspect-[751.5/918] w-full lg:w-751.5"
        />
      </div>

      <div className="mt-40 flex items-end justify-between lg:contents">
        <figure className="lg:absolute lg:top-896 lg:left-59">
          <div data-hero-thumb>
            <RevealImage
              src="/images/curly-cigarette.jpg"
              alt="Portrait of Jacob Grønberg"
              sizes="180px"
              reveal={false}
              parallax={false}
              className="size-120 lg:size-180"
            />
          </div>
          <figcaption data-hero-fade className="mt-10 text-body">
            Hi, Im Jacob
          </figcaption>
        </figure>

        <div className="relative mr-20 size-110 lg:absolute lg:top-999 lg:left-208 lg:mr-0 lg:size-140">
          <Magnetic className="size-full">
            <Link
              href="/contact"
              data-hero-cta
              className="group relative grid size-full place-items-center rounded-full bg-accent text-center text-button text-white uppercase"
            >
              <span>
                Work
                <br />
                With Me
              </span>
              <span
                aria-hidden="true"
                className="absolute -top-[6.4%] left-[7.1%] size-[114.3%] rounded-full border border-accent transition-transform duration-700 ease-out-expo group-hover:-translate-x-[12.5%]"
              />
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="hidden lg:block">
        <div data-hero-scroll className="absolute top-996 left-1167.75">
          <ScrollArrow className="h-164 w-20 text-accent" />
        </div>
        <p data-hero-fade className="absolute top-1093 left-1209 text-body whitespace-pre-line">
          {"Scroll Down\n& Explore"}
        </p>
      </div>
    </section>
  );
}
