import { ViewTransition, type ReactNode } from "react";

// Each route fades in/out on navigation; named images inside morph across on their own
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="relative">{children}</div>
    </ViewTransition>
  );
}
