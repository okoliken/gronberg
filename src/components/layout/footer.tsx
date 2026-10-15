import Link from "next/link";
import { infoLinks, nav } from "@/content/site";
import { RollText } from "@/components/ui/roll-text";
import { SplitReveal } from "@/components/ui/split-reveal";
import { BottomBar } from "./bottom-bar";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-24 lg:w-92 lg:gap-50">
      <h2 className="text-h3 text-accent uppercase">{title}</h2>
      <ul className="flex flex-col gap-12 lg:gap-20">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group text-body-lg">
              <RollText>{l.label}</RollText>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-20 flex flex-col gap-60 pb-24 lg:mx-auto lg:w-1400 lg:gap-94 lg:pb-48">
      <span className="h-px bg-line" aria-hidden="true" />
      <div className="flex flex-col gap-60 lg:flex-row lg:gap-299 lg:px-70">
        <div className="lg:w-478">
          <SplitReveal as="p" className="text-large leading-[0.9] text-accent" stagger={0.12}>
            Jacob
            <br />
            Grønberg
          </SplitReveal>
          <p className="mt-10 pl-[17%] text-body-lg">Photograph &amp; Visual Artist</p>
        </div>
        <div className="flex gap-80 lg:contents">
          <Column title="Menu" links={nav} />
          <Column title="Info" links={infoLinks} />
        </div>
      </div>
      <BottomBar />
    </footer>
  );
}
