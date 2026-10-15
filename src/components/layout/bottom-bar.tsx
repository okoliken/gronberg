import { socials } from "@/content/site";
import { RollText } from "@/components/ui/roll-text";

// Credits + socials row shared by the menu and the footer
export function BottomBar() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
      <p className="flex flex-wrap items-center gap-x-10 text-body">
        <span className="whitespace-nowrap">© Design by Pawel Gola</span>
        <span className="h-px w-15 bg-black" aria-hidden="true" />
        <span className="whitespace-nowrap">Built with Next.js &amp; GSAP</span>
      </p>
      <ul className="flex gap-30">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" className="group text-label uppercase">
              <RollText>{s.label}</RollText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
