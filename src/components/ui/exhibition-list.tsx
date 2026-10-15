import Link from "next/link";
import { Fragment, ViewTransition } from "react";
import { MAILTO, type Exhibition } from "@/content/site";
import { AccentTitle } from "./accent-title";
import { Arrow } from "./arrow";
import { RevealImage } from "./reveal-image";
import { RollText } from "./roll-text";
import { SplitReveal } from "./split-reveal";

// Rows from the Figma "exhibitions" list; the thumbnail morphs into the exhibition page hero
export function ExhibitionList({ items }: { items: Exhibition[] }) {
  return (
    <ul className="flex flex-col gap-32 lg:gap-50">
      {items.map((ex, i) => (
        <Fragment key={ex.slug}>
          {i > 0 && <li aria-hidden="true" className="h-px bg-line" />}
          <li className="group relative grid grid-cols-[auto_1fr] gap-x-16 gap-y-16 lg:flex lg:items-center lg:justify-between">
            <div className="flex gap-16 max-lg:contents lg:items-center lg:gap-48">
              <Link
                href={`/exhibitions/${ex.slug}`}
                data-cursor="view"
                className="block size-100 shrink-0 lg:size-230"
                tabIndex={-1}
                aria-hidden="true"
              >
                <ViewTransition name={`exhibition-${ex.slug}`} share="morph" default="none">
                  <RevealImage src={ex.thumb.src} alt="" sizes="(min-width: 64rem) 14vw, 100px" className="size-full" />
                </ViewTransition>
              </Link>
              <div className="flex flex-col gap-12 lg:w-689 lg:gap-20">
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="flex flex-wrap items-center gap-x-10 text-body">
                    {ex.meta.map((m, j) => (
                      <Fragment key={m}>
                        {j > 0 && <span className="h-px w-15 bg-black" aria-hidden="true" />}
                        <span>{m}</span>
                      </Fragment>
                    ))}
                  </p>
                  <h3 className="text-h2 transition-transform duration-700 ease-out-expo lg:group-hover:translate-x-20">
                    <Link href={`/exhibitions/${ex.slug}`} className="after:absolute after:inset-0">
                      <AccentTitle title={ex.title} />
                    </Link>
                  </h3>
                </div>
                <SplitReveal as="p" className="text-body max-lg:hidden" stagger={0.05}>
                  {ex.summary}
                </SplitReveal>
              </div>
            </div>

            <div className="col-span-2 flex items-end justify-between lg:contents">
              {ex.status === "current" ? (
                <a href={MAILTO} className="relative z-10 flex items-center gap-12 text-button text-accent">
                  <RollText>Buy Ticket</RollText>
                  <Arrow external className="w-15.5" />
                </a>
              ) : (
                <span className="flex items-center gap-12 text-button text-accent">
                  Read More
                  <Arrow className="w-30.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-8" />
                </span>
              )}

              <p className="flex flex-col items-end text-accent">
                <span className="text-h3">{ex.month}</span>
                <span className="text-large">
                  <RollText>{ex.day}</RollText>
                </span>
              </p>
            </div>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
