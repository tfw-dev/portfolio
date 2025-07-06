"use client"
import { createContext, useContext, useRef } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollTriggerLib from "gsap/ScrollTrigger";

type ScrollTriggerMap = Record<string, ScrollTrigger | null>;

type ContextType = {
  registerTrigger: (id: string, trigger: ScrollTrigger) => void;
  getTrigger: (id: string) => ScrollTrigger | null;
  refreshAllTriggers: () => void;
};

const ScrollTriggerContext = createContext<ContextType | null>(null);

export function ScrollTriggerProvider({ children }: { children: React.ReactNode }) {
  const triggers = useRef<ScrollTriggerMap>({});

  const registerTrigger = (id: string, trigger: ScrollTrigger) => {
    triggers.current[id] = trigger;
  };

  const getTrigger = (id: string) => {
    return triggers.current[id] ?? null;
  };

  const refreshAllTriggers = () => {
    ScrollTriggerLib.refresh();
  };

  return (
    <ScrollTriggerContext.Provider value={{ registerTrigger, getTrigger, refreshAllTriggers }}>
      {children}
    </ScrollTriggerContext.Provider>
  );
}

export function useScrollTriggerContext() {
  const ctx = useContext(ScrollTriggerContext);
  if (!ctx) throw new Error("useScrollTriggerContext must be used within a ScrollTriggerProvider");
  return ctx;
}
