import Link from "next/link";
import { Magnetic } from "./magnetic";

/*
  The design's red disc in an offset ring (220 box, 200 disc at -10/+10.5).
  Hovering slides the disc into the centre of its ring.
*/
export function CircleButton({ href, children, className = "size-160 lg:size-220" }: { href: string; children: string; className?: string }) {
  return (
    <Magnetic strength={0.25}>
      <Link href={href} className={`group relative block ${className}`}>
        <span className="absolute top-[4.8%] -left-[4.5%] grid size-[91%] place-items-center rounded-full bg-accent px-[9%] text-center text-h4 text-white uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-[10%]">
          {children}
        </span>
        <span aria-hidden="true" className="absolute inset-0 rounded-full border border-accent" />
      </Link>
    </Magnetic>
  );
}
