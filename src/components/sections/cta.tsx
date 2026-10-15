import { MAILTO } from "@/content/site";
import { CircleButton } from "@/components/ui/circle-button";
import { SplitReveal } from "@/components/ui/split-reveal";

export function Cta() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="mx-20 flex flex-col-reverse items-center gap-40 py-140 lg:mx-auto lg:w-1400 lg:flex-row lg:justify-center lg:gap-69 lg:py-224"
    >
      <CircleButton href={MAILTO} className="size-180 lg:size-220">
        Get in Touch
      </CircleButton>
      <SplitReveal as="h2" className="text-large max-lg:text-center">
        <span id="cta-title">
          <span className="block uppercase">Let’s Work</span>
          <span className="block leading-none text-accent">Together</span>
        </span>
      </SplitReveal>
    </section>
  );
}
