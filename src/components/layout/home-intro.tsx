"use client";

import { useState, type ReactNode } from "react";
import { IntroProvider, introPlayed, useIntro } from "./intro";
import { Loader } from "./loader";
import { bootPath } from "./smooth-scroll";

function Gate({ children }: { children: ReactNode }) {
  const { done } = useIntro();
  return <div data-intro={done}>{children}</div>;
}

export function HomeIntro({ children }: { children: ReactNode }) {
  // Server render always includes it; on the client only when the visit started on "/"
  const [showLoader] = useState(() => bootPath === null || (bootPath === "/" && !introPlayed()));
  return (
    <IntroProvider initialDone={!showLoader}>
      {showLoader && <Loader />}
      <Gate>{children}</Gate>
    </IntroProvider>
  );
}
