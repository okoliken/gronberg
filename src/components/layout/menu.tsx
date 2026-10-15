"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type RefObject } from "react";
import { nav } from "@/content/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { RollText } from "@/components/ui/roll-text";
import { useLenis } from "./smooth-scroll";
import { BottomBar } from "./bottom-bar";

type Props = { open: boolean; onClose: () => void; returnFocus: RefObject<HTMLButtonElement | null> };

export function Menu({ open, onClose, returnFocus }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  // The panel grows out of the close ring in the top-right corner
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(ref.current, { visibility: "visible" })
        .fromTo(
          ref.current,
          { clipPath: "circle(0% at 95% 3%)" },
          { clipPath: "circle(150% at 95% 3%)", duration: reduced ? 0.01 : 1.2 },
        )
        .fromTo(
          "[data-menu-line]",
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.06, duration: reduced ? 0.01 : 1.1, ease: "expo.out" },
          "-=0.55",
        )
        .fromTo("[data-menu-fade]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "<0.2");
    },
    { scope: ref },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      lenis.current?.stop();
      t.timeScale(1).play();
      closeRef.current?.focus();
    } else if (t.progress() > 0) {
      lenis.current?.start();
      t.timeScale(1.6).reverse();
      returnFocus.current?.focus();
    }
  }, [open, lenis, returnFocus]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className="invisible fixed inset-0 z-50 flex flex-col overflow-hidden bg-bg"
    >
      <div className="flex items-start justify-between px-20 pt-24 lg:px-50 lg:pt-49">
        <Link href="/" onClick={onClose} className="text-h4 uppercase" data-menu-fade>
          Jacob Grönberg
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="group absolute -top-40 -right-32 size-200 rounded-full border border-accent max-lg:-top-60 max-lg:-right-60 max-lg:size-160"
        >
          <span className="absolute top-1/2 left-1/2 h-px w-50 -translate-x-1/2 rotate-45 bg-black transition-transform duration-700 ease-out-expo group-hover:rotate-[135deg]" />
          <span className="absolute top-1/2 left-1/2 h-px w-50 -translate-x-1/2 -rotate-45 bg-black transition-transform duration-700 ease-out-expo group-hover:rotate-45" />
        </button>
      </div>

      <nav className="flex flex-1 items-center justify-center" aria-label="Main">
        <ul className="flex flex-col items-center gap-24 lg:gap-40">
          {nav.map((item, i) => {
            const active = item.href === pathname;
            return (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  data-menu-line
                  className={`group flex items-center gap-24 transition-colors duration-500 hover:text-accent lg:gap-50 ${active ? "text-accent" : ""}`}
                >
                  <span className="text-h3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-large uppercase">
                    <RollText>{item.label}</RollText>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div data-menu-fade className="px-20 pb-24 lg:px-40 lg:pb-34">
        <BottomBar />
      </div>
    </div>
  );
}
