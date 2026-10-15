import Link from "next/link";
import type { Title } from "@/content/site";
import { AccentTitle } from "./accent-title";
import { Arrow } from "./arrow";
import { RollText } from "./roll-text";
import { SplitReveal } from "./split-reveal";

export function SectionHeading({ id, title, href }: { id: string; title: Title; href: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-16 lg:flex-nowrap lg:items-center">
      <SplitReveal as="h2" className="text-large">
        <span id={id}>
          <AccentTitle title={title} />
        </span>
      </SplitReveal>
      <ArrowLink href={href}>View All</ArrowLink>
    </div>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link href={href} className={`group flex shrink-0 items-center gap-12 text-button ${className}`}>
      <RollText>{children}</RollText>
      <Arrow className="w-30.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-8" />
    </Link>
  );
}

export function OutlineButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-10 overflow-hidden rounded-full border whitespace-nowrap border-accent px-20 py-16 text-button text-accent transition-colors duration-500 hover:text-white"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      />
      <span className="relative">
        <RollText>{children}</RollText>
      </span>
      <Arrow className="relative w-30.5" />
    </Link>
  );
}
