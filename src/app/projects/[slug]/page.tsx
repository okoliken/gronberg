import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Page } from "@/components/layout/page";
import { BackLink } from "@/components/ui/back-link";
import { CircleButton } from "@/components/ui/circle-button";
import { InfoRows, LabelledRow } from "@/components/ui/info-rows";
import { RevealImage } from "@/components/ui/reveal-image";
import { SplitReveal } from "@/components/ui/split-reveal";
import { getProject, nextProject, projects, type Title } from "@/content/site";

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project ? `${plainTitle(project.title)} — Jacob Grønberg` : "Project" };
}

const plainTitle = (t: Title) => `${t.text.replace("\n", " ")} ${t.accent}`;

// Figma "images" group: 1400x3554, positions relative to its top-left
const gallerySlots = [
  { position: "lg:top-0 lg:left-0 lg:w-700", aspect: "aspect-[700/900]", sizes: "(min-width: 64rem) 42vw, 100vw" },
  { position: "lg:top-173 lg:left-846 lg:w-409", aspect: "aspect-[409/500]", sizes: "(min-width: 64rem) 25vw, 70vw" },
  { position: "lg:top-1075 lg:left-0 lg:w-1399", aspect: "aspect-square", sizes: "(min-width: 64rem) 84vw, 100vw" },
  { position: "lg:top-2699 lg:left-701 lg:w-700", aspect: "aspect-[700/855]", sizes: "(min-width: 64rem) 42vw, 100vw" },
  { position: "lg:top-2912 lg:left-125 lg:w-400", aspect: "aspect-square", sizes: "(min-width: 64rem) 24vw, 60vw" },
];

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = nextProject(project.slug);
  const lines = `${project.title.text} ${project.title.accent}`.split("\n");

  return (
    <Page>
      <BackLink href="/projects">Back to Projects</BackLink>

      {/* Hero: the card image lands here, the title overlaps its bottom edge */}
      <section className="mx-20 flex flex-col items-center pt-140 lg:mx-auto lg:w-1400 lg:pt-234">
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <RevealImage
            src={project.cover.src}
            alt={project.cover.alt}
            sizes="(min-width: 64rem) 42vw, 100vw"
            priority
            reveal={false}
            parallax
            className="aspect-[700/855.6] w-full lg:w-700"
          />
        </ViewTransition>
        <SplitReveal as="h1" immediate delay={0.3} className="relative z-10 -mt-48 text-center text-xlarge leading-[1.1] text-accent lg:-mt-128">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </SplitReveal>
      </section>

      <section className="mx-20 mt-80 flex flex-col gap-64 lg:mx-auto lg:mt-128 lg:w-1400 lg:gap-128 lg:pl-446">
        <LabelledRow label="About" labelWidth="lg:w-150">
          <div className="flex flex-col gap-[1.6em] text-body-lg lg:w-700">
            {project.about.map((p) => (
              <SplitReveal as="p" key={p} stagger={0.05}>
                {p}
              </SplitReveal>
            ))}
          </div>
        </LabelledRow>
        <LabelledRow label="Details" labelWidth="lg:w-150">
          <InfoRows
            labelClassName="text-button text-accent uppercase"
            rows={[
              { label: "Year", value: <span className="text-body-lg">{project.year}</span> },
              { label: "Service", value: <span className="text-body-lg">{project.service}</span> },
              { label: "Client", value: <span className="text-body-lg">{project.client}</span> },
            ]}
          />
        </LabelledRow>
      </section>

      <section aria-label="Gallery" className="mx-20 mt-100 flex flex-col gap-20 lg:relative lg:mx-auto lg:mt-224 lg:block lg:h-3554 lg:w-1400">
        {project.gallery.map((image, i) => (
          <div key={`${image.src}-${i}`} className={`lg:absolute ${gallerySlots[i].position} ${i % 2 ? "w-[70%] self-end" : "w-full"}`}>
            <RevealImage src={image.src} alt={image.alt} sizes={gallerySlots[i].sizes} parallax className={`w-full ${gallerySlots[i].aspect}`} />
          </div>
        ))}
      </section>

      {/* Next project: its image carries the next page's view-transition name */}
      <section aria-labelledby="next-title" className="mx-20 mt-120 flex flex-col items-center pb-120 lg:mx-auto lg:mt-224 lg:w-738 lg:pb-168">
        <SplitReveal as="p" className="text-small uppercase">
          Next Project
        </SplitReveal>
        <SplitReveal as="h2" className="mt-12 text-center text-xlarge text-accent lg:mt-20">
          <span id="next-title">
            {`${next.title.text} ${next.title.accent}`.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </span>
        </SplitReveal>
        <Link href={`/projects/${next.slug}`} data-cursor="view" className="group -mt-40 block w-full lg:-mt-80 lg:w-700" aria-label={`Open ${plainTitle(next.title)}`}>
          <ViewTransition name={`project-${next.slug}`} share="morph" default="none">
            <RevealImage src={next.cover.src} alt={next.cover.alt} sizes="(min-width: 64rem) 42vw, 100vw" parallax className="aspect-[700/855.6] w-full" />
          </ViewTransition>
        </Link>
        <div className="relative z-10 -mt-80 lg:-mt-120">
          <CircleButton href={`/projects/${next.slug}`} className="size-160 lg:size-220">
            Discover
          </CircleButton>
        </div>
      </section>
    </Page>
  );
}
