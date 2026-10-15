import { latestWork } from "@/content/site";
import { ProjectGrid, type GridItem } from "@/components/ui/project-grid";
import { SectionHeading } from "@/components/ui/section-heading";

// Figma positions inside the 1400x1744 "projects" group
const placement: Pick<GridItem, "size" | "position" | "speed">[] = [
  { size: "lg", position: "lg:top-0 lg:left-0", speed: 0 },
  { size: "sm", position: "lg:top-34 lg:left-991", speed: -0.18 },
  { size: "sm", position: "lg:top-825 lg:left-891", speed: -0.08 },
  { size: "sm", position: "lg:top-1132 lg:left-145", speed: -0.14 },
];

export function LatestWork() {
  const items = latestWork.map((w, i) => ({ ...w, ...placement[i] }));
  return (
    <section aria-labelledby="latest-title" className="mx-20 mt-140 lg:mx-auto lg:mt-224 lg:w-1400">
      <SectionHeading id="latest-title" title={{ text: "Latest", accent: "Work" }} href="/projects" />
      <div className="mt-60 lg:mt-128">
        <ProjectGrid items={items} height="lg:h-1744" />
      </div>
    </section>
  );
}
