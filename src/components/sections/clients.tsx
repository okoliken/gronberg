import Image from "next/image";
import { Fragment } from "react";
import { testimonials } from "@/content/home";
import { QuoteMark } from "@/components/ui/arrow";
import { OutlineButton } from "@/components/ui/section-heading";
import { SplitReveal } from "@/components/ui/split-reveal";

export function Clients() {
  return (
    <section
      aria-labelledby="clients-title"
      className="mx-20 mt-140 lg:mx-auto lg:mt-224 lg:flex lg:w-1400 lg:items-start lg:justify-between"
    >
      <div className="flex flex-col gap-32 lg:sticky lg:top-150 lg:w-480 lg:gap-48">
        <div className="flex flex-col gap-16">
          <SplitReveal as="h2" className="text-medium">
            <span id="clients-title">
              <span className="block uppercase">What my</span>
              <span className="uppercase">Clients</span> <span className="text-accent">Say</span>
            </span>
          </SplitReveal>
          <SplitReveal as="p" delay={0.15} className="text-h3 uppercase">
            Worked with Over <span className="text-accent">50 clients</span>
            <br />
            around the world
          </SplitReveal>
        </div>
        <div>
          <OutlineButton href="/contact">Work With Me</OutlineButton>
        </div>
      </div>

      <ul className="mt-60 flex flex-col gap-48 lg:mt-0 lg:w-700 lg:gap-96">
        {testimonials.map((t, i) => (
          <Fragment key={t.name}>
            {i > 0 && <li aria-hidden="true" className="h-px bg-line" />}
            <li className="flex gap-20 lg:gap-50">
              <div className="relative size-64 shrink-0 overflow-hidden lg:size-120">
                <Image src={t.avatar} alt={t.name} fill sizes="120px" className="object-cover" />
              </div>
              <figure className="flex flex-col gap-16 lg:w-530 lg:gap-24">
                <div className="flex items-center gap-16 lg:gap-30">
                  <QuoteMark className="w-28 shrink-0 text-accent lg:w-51" />
                  <SplitReveal as="p" className="text-h3 lg:w-392">
                    {t.quote}
                  </SplitReveal>
                </div>
                <div className="flex flex-col gap-24 lg:gap-40">
                  <blockquote className="flex flex-col gap-[1.6em] text-body">
                    {t.body.map((para) => (
                      <SplitReveal as="p" key={para} stagger={0.05}>
                        {para}
                      </SplitReveal>
                    ))}
                  </blockquote>
                  <figcaption className="flex items-center gap-10 text-body-sm">
                    <span>{t.name}</span>
                    <span className="h-px w-15 bg-black" aria-hidden="true" />
                    <span>{t.role}</span>
                  </figcaption>
                </div>
              </figure>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
