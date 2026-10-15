import { exhibitions } from "@/content/site";
import { ExhibitionList } from "@/components/ui/exhibition-list";
import { SectionHeading } from "@/components/ui/section-heading";

export function Exhibitions() {
  return (
    <section aria-labelledby="exhibitions-title" className="mx-20 mt-140 lg:mx-auto lg:mt-224 lg:w-1400">
      <SectionHeading id="exhibitions-title" title={{ text: "Exhibitions", accent: "‘26" }} href="/exhibitions" />
      <div className="mt-48 lg:mt-96">
        <ExhibitionList items={exhibitions.filter((e) => e.status === "current")} />
      </div>
    </section>
  );
}
