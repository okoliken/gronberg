import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { Page } from "@/components/layout/page";
import { Cta } from "@/components/sections/cta";
import { LabelledRow } from "@/components/ui/info-rows";
import { RevealImage } from "@/components/ui/reveal-image";
import { SplitReveal } from "@/components/ui/split-reveal";
import { about } from "@/content/site";

export const metadata: Metadata = { title: "About — Jacob Grønberg" };

function Table({ rows }: { rows: { title: string; sub: string; aside: ReactNode }[] }) {
  return (
    <ul className="flex flex-col gap-20">
      {rows.map((row, i) => (
        <Fragment key={row.title}>
          {i > 0 && <li aria-hidden="true" className="h-px bg-line" />}
          <li className="flex items-start justify-between gap-24 lg:gap-50">
            <div className="flex flex-col gap-5">
              <p className="text-button uppercase">{row.title}</p>
              <p className="text-body-sm">{row.sub}</p>
            </div>
            <div className="shrink-0 text-button text-accent uppercase">{row.aside}</div>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <Page>
      {/* Figma "hero": portrait at x=1, name block overlapping its right edge */}
      <section className="mx-20 pt-140 lg:relative lg:mx-auto lg:h-903 lg:w-1400 lg:pt-0">
        <div className="lg:absolute lg:top-203 lg:left-1">
          <RevealImage
            src="/images/about-portrait.jpg"
            alt="Portrait of Jacob Grønberg"
            sizes="(min-width: 64rem) 42vw, 100vw"
            priority
            parallax
            className="aspect-square w-full lg:w-700"
          />
        </div>
        <SplitReveal as="p" immediate delay={0.2} className="mt-24 text-small uppercase lg:absolute lg:top-355 lg:left-760 lg:z-10 lg:mt-0">
          About
        </SplitReveal>
        <SplitReveal
          as="h1"
          immediate
          delay={0.35}
          className="relative z-10 -mt-8 flex flex-col text-xlarge text-accent lg:absolute lg:top-431 lg:left-492 lg:mt-0 lg:w-944 lg:items-center"
        >
          <span>Jacob</span>
          <span>Grønberg</span>
        </SplitReveal>
      </section>

      <section className="mx-20 mt-80 flex flex-col gap-64 lg:mx-auto lg:mt-128 lg:w-1400 lg:gap-128 lg:px-100">
        <LabelledRow label="About" labelWidth="lg:w-300">
          <div className="flex flex-col gap-[1.6em] text-body-lg lg:w-743">
            {about.bio.map((p) => (
              <SplitReveal as="p" key={p} stagger={0.05}>
                {p}
              </SplitReveal>
            ))}
          </div>
        </LabelledRow>
        <LabelledRow label="Experiences" labelWidth="lg:w-300">
          <div className="lg:w-743">
            <Table
              rows={about.experiences.map((e) => ({
                title: e.role,
                sub: e.place,
                aside: (
                  <span className="flex items-center gap-10">
                    {e.dates.map((d, i) => (
                      <Fragment key={d}>
                        {i > 0 && <span className="h-px w-15 bg-accent" aria-hidden="true" />}
                        <span>{d}</span>
                      </Fragment>
                    ))}
                  </span>
                ),
              }))}
            />
          </div>
        </LabelledRow>
        <LabelledRow label="Recognitions" labelWidth="lg:w-300">
          <div className="lg:w-743">
            <Table rows={about.recognitions.map((r) => ({ title: r.title, sub: r.date, aside: r.by }))} />
          </div>
        </LabelledRow>
      </section>

      <Cta />
    </Page>
  );
}
