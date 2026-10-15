"use client";

import type { ReactNode } from "react";
import { IntroProvider, useIntro } from "./intro";
import { Loader } from "./loader";

function Gate({ children }: { children: ReactNode }) {
  const { done } = useIntro();
  return <div data-intro={done}>{children}</div>;
}

export function HomeIntro({ children }: { children: ReactNode }) {
  return (
    <IntroProvider>
      <Loader />
      <Gate>{children}</Gate>
    </IntroProvider>
  );
}
