// Rolls to a duplicate of itself when an ancestor with `group` is hovered
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
