"use client";

import { createContext, useContext, useRef, createRef } from "react";

type NavItemRefs = {
  lineRef: React.RefObject<HTMLDivElement>;
  dotRef: React.RefObject<HTMLDivElement>;
  linkRef: React.RefObject<HTMLDivElement>;
};

type OverlayRefContextType = {
  containerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  ringRef: React.RefObject<HTMLDivElement>;
  scrollContainer: React.RefObject<HTMLDivElement>;
  navRefs: React.RefObject<Record<string, NavItemRefs>>;
  registerNavRefs: (handle: string) => NavItemRefs;
};

const OverlayRefContext = createContext<OverlayRefContextType | null>(null);

export function RefContextProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, NavItemRefs>>({}); // ✅ avoid state

  const registerNavRefs = (handle: string): NavItemRefs => {
    if (!navRefs.current[handle]) {
      navRefs.current[handle] = {
        lineRef: createRef<HTMLDivElement>(),
        dotRef: createRef<HTMLDivElement>(),
        linkRef: createRef<HTMLDivElement>()
      };
    }
    return navRefs.current[handle];
  };

  return (
    <OverlayRefContext.Provider value={{ containerRef, contentRef, navRefs, ringRef, scrollContainer, registerNavRefs }}>
      {children}
    </OverlayRefContext.Provider>
  );
}

export const useOverlayRefs = () => {
  const ctx = useContext(OverlayRefContext);
  if (!ctx) throw new Error("useOverlayRefs must be used within RefContextProvider");
  return ctx;
};
