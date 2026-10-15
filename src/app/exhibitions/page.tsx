import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Cta } from "@/components/sections/cta";
import { ScrollArrow } from "@/components/ui/arrow";
import { ExhibitionList } from "@/components/ui/exhibition-list";
import { SplitReveal } from "@/components/ui/split-reveal";
import { exhibitions, exhibitionsIntro } from "@/content/site";

export const metadata: Metadata = { title: "Exhibitions — Jacob Grønberg" };

function Group({ id, lead, items }: { id: string; lead: string; items: typeof exhibitions }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-48 lg:gap-96">
      <SplitReveal as="h2" className="text-h1 uppercase">
        <span id={id}>
          {lead} <span className="text-accent">Exhibitions</span>
        </span>
      </SplitReveal>
      <ExhibitionList items={items} />
    </section>
  );
}

export default function ExhibitionsPage() {
  return (
    <Page>
      {/* Figma: headline at y=203, list starts at y=918 */}
      <section className="mx-20 flex flex-col items-center pt-140 text-center lg:mx-auto lg:h-918 lg:w-1400 lg:pt-203">
        <SplitReveal as="h1" immediate className="text-xlarge text-accent">
          Exhibitions
        </SplitReveal>
        <SplitReveal as="p" immediate delay={0.2} className="mt-16 text-intro lg:w-600">
          {exhibitionsIntro}
        </SplitReveal>
        <a href="#current" className="group mt-60 flex items-end gap-21 lg:mt-93">
          <ScrollArrow className="h-120 w-20 text-accent transition-transform duration-700 ease-out-expo group-hover:translate-y-8 lg:h-164" />
          <span className="text-left text-body">
            Check Out
            <br />
            The Dates
          </span>
        </a>
      </section>

      <div id="current" className="mx-20 mt-100 flex flex-col gap-60 lg:mx-auto lg:mt-0 lg:w-1400 lg:gap-96">
        <Group id="current-title" lead="Current" items={exhibitions.filter((e) => e.status === "current")} />
        <span aria-hidden="true" className="-mx-20 h-px bg-line lg:-mx-[calc((100vw-var(--spacing)*1400)/2)]" />
        <Group id="past-title" lead="Past" items={exhibitions.filter((e) => e.status === "past")} />
      </div>

      <Cta />
    </Page>
  );
}
