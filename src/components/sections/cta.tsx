import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitReveal } from "@/components/ui/split-reveal";

export function Cta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-20 flex flex-col-reverse items-center gap-40 py-140 lg:mx-auto lg:w-1400 lg:flex-row lg:justify-center lg:gap-69 lg:py-224"
    >
      <Magnetic strength={0.25}>
        <Link href="/contact" className="group relative block size-180 lg:size-220">
          {/* The red disc sits slightly off-centre in its ring; hovering pulls them together */}
          <span className="absolute top-[4.8%] -left-[4.5%] grid size-[91%] place-items-center rounded-full bg-accent px-20 text-center text-h4 text-white uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-[10%]">
            Get in Touch
          </span>
          <span aria-hidden="true" className="absolute inset-0 rounded-full border border-accent" />
        </Link>
      </Magnetic>
      <SplitReveal as="h2" className="text-large max-lg:text-center">
        <span id="cta-title">
          <span className="block uppercase">Let’s Work</span>
          <span className="block leading-none text-accent">Together</span>
        </span>
      </SplitReveal>
    </section>
  );
}
