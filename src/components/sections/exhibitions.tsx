"use client";

import Link from "next/link";
import { Fragment } from "react";
import { exhibitions } from "@/content/home";
import { AccentTitle } from "@/components/ui/accent-title";
import { Arrow } from "@/components/ui/arrow";
import { RevealImage } from "@/components/ui/reveal-image";
import { RollText } from "@/components/ui/roll-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitReveal } from "@/components/ui/split-reveal";

export function Exhibitions() {
  return (
    <section aria-labelledby="exhibitions-title" className="mx-20 mt-140 lg:mx-auto lg:mt-224 lg:w-1400">
      <SectionHeading id="exhibitions-title" title={{ text: "Exhibitions", accent: "‘22" }} href="/exhibitions" />

      <ul className="mt-48 flex flex-col gap-32 lg:mt-96 lg:gap-50">
        {exhibitions.map((ex, i) => (
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
                  <RevealImage
                    src={ex.image.src}
                    alt=""
                    sizes="(min-width: 64rem) 14vw, 100px"
                    position={ex.image.position}
                    parallax={false}
                    className="size-full"
                  />
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
                    {ex.body}
                  </SplitReveal>
                </div>
              </div>

              <div className="col-span-2 flex items-end justify-between lg:contents">
                <a href="#" className="relative z-10 flex items-center gap-12 text-button text-accent">
                  <RollText>Buy Ticket</RollText>
                  <Arrow external className="w-15.5" />
                </a>

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
    </section>
  );
}
