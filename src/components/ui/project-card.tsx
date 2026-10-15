import Link from "next/link";
import { ViewTransition } from "react";
import type { Img, Project } from "@/content/site";
import { AccentTitle } from "./accent-title";
import { RevealImage } from "./reveal-image";
import { SplitReveal } from "./split-reveal";

type Props = {
  project: Project;
  image: Img;
  /** Tailwind aspect class for the Figma frame */
  aspect: string;
  sizes: string;
};

// The image carries a view-transition name, so it morphs into the project page hero
export function ProjectCard({ project, image, aspect, sizes }: Props) {
  return (
    <Link href={`/projects/${project.slug}`} data-cursor="view" className="group flex flex-col gap-12">
      <SplitReveal as="h3" className="text-h3">
        <AccentTitle title={project.title} />
      </SplitReveal>
      <div data-skew>
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <RevealImage src={image.src} alt={image.alt} sizes={sizes} className={`w-full ${aspect}`} />
        </ViewTransition>
      </div>
      <SplitReveal as="p" className="text-body">
        {project.place}
        <br />
        {project.date}
      </SplitReveal>
    </Link>
  );
}
