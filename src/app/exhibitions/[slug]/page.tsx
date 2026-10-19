import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Page } from "@/components/layout/page";
import { Cta } from "@/components/sections/cta";
import { Arrow } from "@/components/ui/arrow";
import { BackLink } from "@/components/ui/back-link";
import { InfoRows } from "@/components/ui/info-rows";
import { RevealImage } from "@/components/ui/reveal-image";
import { RollText } from "@/components/ui/roll-text";
import { OutlineButton } from "@/components/ui/section-heading";
import { SplitReveal } from "@/components/ui/split-reveal";
import { exhibitions, getExhibition, MAILTO } from "@/content/site";

export const generateStaticParams = () => exhibitions.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: PageProps<"/exhibitions/[slug]">): Promise<Metadata> {
  const ex = getExhibition((await params).slug);
  return { title: ex ? `${ex.title.text} ${ex.title.accent} — Jacob Grønberg` : "Exhibition" };
}

export default async function ExhibitionPage({ params }: PageProps<"/exhibitions/[slug]">) {
  const ex = getExhibition((await params).slug);
  if (!ex) notFound();
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ex.address)}`;

  return (
    <Page>
      <BackLink href="/exhibitions">Back to Exhibitions</BackLink>

      {/* Hero: date + title, the image overlaps the title's last 64px */}
      <section className="mx-20 flex flex-col items-center pt-140 text-center lg:mx-auto lg:w-1200 lg:pt-204">
        <SplitReveal as="p" immediate className="text-intro">
          {`${ex.day} ${ex.month} ${ex.meta[2]}`}
        </SplitReveal>
        <SplitReveal as="h1" immediate delay={0.15} className="mt-12 text-xlarge text-accent max-lg:text-large lg:mt-16">
          <span className="block">{ex.title.text}</span>
          <span className="block">{ex.title.accent}</span>
        </SplitReveal>
        <ViewTransition name={`exhibition-${ex.slug}`} share="morph" default="none">
          <RevealImage
            src={ex.hero.src}
            alt={ex.hero.alt}
            sizes="(min-width: 64rem) 48vw, 100vw"
            priority
            reveal={false}
            parallax
            className="relative -mt-24 aspect-800/975 w-full lg:-mt-64 lg:w-800"
          />
        </ViewTransition>
      </section>

      <section className="mx-20 mt-80 flex flex-col gap-48 lg:mx-auto lg:mt-96 lg:w-1400 lg:flex-row lg:items-start lg:gap-184 lg:pl-200">
        <div className="lg:w-176.5 lg:shrink-0">
          <OutlineButton href={MAILTO}>Get Tickets</OutlineButton>
        </div>
        <div className="flex flex-col gap-64 lg:w-640 lg:gap-96">
          <div className="flex flex-col gap-24 lg:gap-40">
            <h2 className="text-h3 uppercase">About</h2>
            <div className="flex flex-col gap-[1.6em] text-body-lg">
              {ex.about.map((p) => (
                <SplitReveal as="p" key={p} stagger={0.05}>
                  {p}
                </SplitReveal>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-24 lg:gap-40">
            <h2 className="text-h3 uppercase">Information</h2>
            <div className="flex flex-col gap-20 lg:gap-32">
              <InfoRows
                labelClassName="text-h4 text-accent"
                rows={[
                  { label: "Date", value: <span className="text-body">{ex.dates}</span> },
                  { label: "Opening Hours", value: <span className="text-body">{ex.hours}</span> },
                  {
                    label: "Location",
                    value: (
                      <span className="flex flex-col items-end gap-10">
                        <span className="text-body">{ex.location}</span>
                        <a href={directions} target="_blank" rel="noreferrer" className="group flex items-center gap-12 text-button text-accent">
                          <RollText>Get Directions</RollText>
                          <Arrow external className="w-15.5" />
                        </a>
                      </span>
                    ),
                  },
                  { label: "Address", value: <span className="text-body">{ex.address}</span> },
                ]}
              />
              <span aria-hidden="true" className="h-px bg-line" />
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </Page>
  );
}
