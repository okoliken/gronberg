"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { loaderFrames } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "./intro";

/*
  1. The logo from the Pageloader frame rises in.
  2. "Jacob" and "Grønberg" part, a frame opens between them and flicks through the portfolio.
  3. The last photo flies onto the hero image (found via [data-hero-image]) and the page takes over.
*/
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const { finish } = useIntro();

  useGSAP(
    () => {
      const root = ref.current!;
      const frame = root.querySelector<HTMLElement>("[data-frame]")!;
      const shots = gsap.utils.toArray<HTMLElement>("[data-shot]");
      const counter = root.querySelector<HTMLElement>("[data-count]")!;
      const done = () => {
        finish();
        setGone(true);
      };

      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(root, { autoAlpha: 0, duration: 0.4, delay: 0.6, onComplete: done });
        return;
      }

      gsap.set(frame, { xPercent: -50, yPercent: -50 });
      const count = { v: 0 };
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo("[data-logo-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" })
        .addLabel("open")
        .to("[data-logo='top']", { y: () => -frame.offsetHeight / 2 - 24, duration: 1.2, ease: "expo.inOut" }, "open")
        .to("[data-logo='bottom']", { y: () => frame.offsetHeight / 2 + 24, duration: 1.2, ease: "expo.inOut" }, "open")
        .fromTo(
          frame,
          { clipPath: "inset(50% 0% 50% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" },
          "open",
        )
        .to(counter, { autoAlpha: 1, duration: 0.4 }, "open")
        .to(
          count,
          {
            v: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          "open",
        );

      // Each shot is stacked on the last, like a contact sheet being flicked through
      shots.forEach((shot, i) => tl.set(shot, { autoAlpha: 1 }, `open+=${0.35 + i * 0.17}`));

      tl.addLabel("fly", "+=0.25")
        .to("[data-logo-line]", { yPercent: -110, duration: 0.8, stagger: 0.05, ease: "expo.in" }, "fly")
        .to(counter, { autoAlpha: 0, duration: 0.4 }, "fly")
        .to(
          frame,
          {
            // Measured when this tween starts, so it lands on the hero image wherever layout put it
            top: () => document.querySelector("[data-hero-image]")!.getBoundingClientRect().top,
            left: () => document.querySelector("[data-hero-image]")!.getBoundingClientRect().left,
            width: () => document.querySelector("[data-hero-image]")!.getBoundingClientRect().width,
            height: () => document.querySelector("[data-hero-image]")!.getBoundingClientRect().height,
            xPercent: 0,
            yPercent: 0,
            duration: 1.5,
            ease: "expo.inOut",
          },
          "fly+=0.4",
        )
        .to("[data-backdrop]", { autoAlpha: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .call(done);
    },
    { scope: ref },
  );

  if (gone) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[60]" aria-hidden="true">
      <div data-backdrop className="absolute inset-0 bg-bg" />

      <div
        data-frame
        className="fixed top-1/2 left-1/2 h-220 w-180 overflow-hidden [clip-path:inset(50%_0%_50%_0%)] lg:h-280 lg:w-230"
      >
        {loaderFrames.map((src, i) => (
          <div key={src} data-shot className={`absolute inset-0 ${i === 0 ? "" : "invisible opacity-0"}`}>
            <Image src={src} alt="" fill sizes="(min-width: 64rem) 45vw, 100vw" priority={i < 2} className="object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-20 text-h3 leading-[0.9] text-accent uppercase">
        <div data-logo="top" className="-my-[0.1em] overflow-hidden py-[0.1em]">
          <div data-logo-line>Jacob</div>
        </div>
        <div data-logo="bottom" className="-my-[0.1em] overflow-hidden py-[0.1em]">
          <div data-logo-line>Grønberg</div>
        </div>
      </div>

      <div
        data-count
        className="invisible absolute right-20 bottom-24 text-label tabular-nums opacity-0 lg:right-40 lg:bottom-34"
      >
        000
      </div>
    </div>
  );
}
