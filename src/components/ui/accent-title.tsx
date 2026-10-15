import type { Title } from "@/content/home";

// The design's title pattern: uppercase ink words, then a title-case accent word in red
export function AccentTitle({ title, accentClassName = "" }: { title: Title; accentClassName?: string }) {
  const lines = title.text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={i < lines.length - 1 ? "block" : undefined}>
          <span className="uppercase">{line}</span>
          {i === lines.length - 1 && (
            <>
              {" "}
              <span className={`text-accent ${accentClassName}`}>{title.accent}</span>
            </>
          )}
        </span>
      ))}
    </>
  );
}
