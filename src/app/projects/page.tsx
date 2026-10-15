import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Cta } from "@/components/sections/cta";
import { CircleButton } from "@/components/ui/circle-button";
import { ProjectGrid, type GridItem } from "@/components/ui/project-grid";
import { SplitReveal } from "@/components/ui/split-reveal";
import { getProject, MAILTO, projectsIntro } from "@/content/site";

export const metadata: Metadata = { title: "Projects — Jacob Grønberg" };

// Figma "Projects" frame, positions relative to a grid that starts at y=645
const layout: { slug: string; size: GridItem["size"]; position: string; speed: number }[] = [
  { slug: "style-and-fashion", size: "sm", position: "lg:top-0 lg:left-845", speed: -0.12 },
  { slug: "dancing-in-black-and-white", size: "lg", position: "lg:top-176 lg:left-2", speed: 0 },
  { slug: "one-eye", size: "sm", position: "lg:top-791 lg:left-845", speed: -0.18 },
  { slug: "be-silent", size: "lg", position: "lg:top-1607 lg:left-700", speed: -0.06 },
  { slug: "week-fashion", size: "sm", position: "lg:top-1608 lg:left-147", speed: -0.16 },
  { slug: "cigarette-and-tobacco", size: "lg", position: "lg:top-2804 lg:left-2", speed: 0 },
  { slug: "wonderful-body", size: "sm", position: "lg:top-2803 lg:left-845", speed: -0.14 },
];

export default function ProjectsPage() {
  const items: GridItem[] = layout.map(({ slug, ...rest }) => {
    const project = getProject(slug)!;
    return { project, image: rest.size === "lg" ? project.cover : project.card, ...rest };
  });

  return (
    <Page>
      <section className="mx-20 pt-140 lg:relative lg:mx-auto lg:h-645 lg:w-1400 lg:pt-0">
        <div className="lg:absolute lg:top-196 lg:left-0 lg:w-797">
          <SplitReveal as="h1" immediate className="text-xlarge text-accent">
            Projects
          </SplitReveal>
          <SplitReveal as="p" immediate delay={0.2} className="mt-20 text-intro lg:mt-29 lg:w-600">
            {projectsIntro}
          </SplitReveal>
        </div>
        <div className="mt-40 flex justify-end lg:absolute lg:top-185 lg:left-913 lg:mt-0">
          <CircleButton href={MAILTO} className="size-140 lg:size-220">
            Get in Touch
          </CircleButton>
        </div>
      </section>

      <div className="mx-20 mt-80 lg:mx-auto lg:mt-0 lg:w-1400">
        <ProjectGrid items={items} height="lg:h-3862" priorityCount={2} />
      </div>

      <Cta />
    </Page>
  );
}
