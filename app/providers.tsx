// app/providers.tsx
"use client";

import { ScrollTriggerProvider } from "@/context/ScrollTriggerContext";
import { RefContextProvider } from "@/context/RefContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <RefContextProvider>
      <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
    </RefContextProvider>
  );
}