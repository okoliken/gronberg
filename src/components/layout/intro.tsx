"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Intro = { done: boolean; finish: () => void };

// The loader runs once per visit; client-side returns to the home page skip it
let played = false;
export const introPlayed = () => played;

const IntroContext = createContext<Intro>({ done: true, finish: () => {} });

export const useIntro = () => useContext(IntroContext);

// The loader flags `done` once its last frame has landed on the hero image
export function IntroProvider({ children, initialDone }: { children: ReactNode; initialDone: boolean }) {
  const [done, setDone] = useState(initialDone);
  const finish = () => {
    played = true;
    setDone(true);
  };
  return (
    <IntroContext.Provider value={{ done, finish }}>
      {children}
    </IntroContext.Provider>
  );
}
