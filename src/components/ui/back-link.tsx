import Link from "next/link";
import { Arrow } from "./arrow";
import { RollText } from "./roll-text";

// "← Back to …", centred in the header row (Figma y=53)
export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <div className="absolute inset-x-0 top-70 z-30 flex justify-center lg:top-53">
      <Link href={href} className="group flex items-center gap-12 text-button">
        <Arrow className="w-30.5 rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-8" />
        <RollText>{children}</RollText>
      </Link>
    </div>
  );
}
