"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Menu } from "./menu";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Slides away while scrolling down, returns on any scroll up
  useGSAP(() => {
    const el = ref.current!;
    ScrollTrigger.create({
      start: 120,
      end: "max",
      onUpdate: (self) =>
        gsap.to(el, { yPercent: self.direction === 1 ? -150 : 0, duration: 0.6, ease: "expo.out", overwrite: true }),
      onLeaveBack: () => gsap.to(el, { yPercent: 0, duration: 0.6, overwrite: true }),
    });
  });

  return (
    <>
      <header
        ref={ref}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-20 pt-24 lg:px-40 lg:pt-50"
      >
        <Link href="/" className="text-h4 uppercase" aria-label="Jacob Grønberg, home">
          Jacob Grønberg
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          className="group flex h-23 w-56 flex-col items-end justify-between py-0"
        >
          <span className="h-px w-50 bg-black transition-[width] duration-500 ease-out-expo group-hover:w-56" />
          <span className="h-px w-35 bg-black transition-[width] duration-500 ease-out-expo group-hover:w-56" />
          <span className="h-px w-45 bg-black transition-[width] duration-500 ease-out-expo group-hover:w-56" />
        </button>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} returnFocus={toggleRef} />
    </>
  );
}
