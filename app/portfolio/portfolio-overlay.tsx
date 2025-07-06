"use client"

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useOverlayRefs } from "@/context/RefContext";
import { portfolioProjects } from "@/lib/portfolioConfig";
import PortfolioProject from "./portfolio-project";
import NavigationLink from "../components/navigation-links";
import { navItems } from "@/lib/navConfig";

export default function PortfolioOverlay({handle}) {
  const { containerRef, contentRef} = useOverlayRefs();

  const pathname = usePathname(); // e.g. "/about"

  const { navRefs } = useOverlayRefs();

  const refs = navRefs.current[handle];
  const lineRef = refs?.lineRef;
  const dotRef = refs?.dotRef;
  const item = navItems.find(item => item["handle"] == handle)

  const navCopy = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
     const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "sine.in" }
      )
      tl.fromTo(
        grainRef.current,
        { opacity: 0 },
        { opacity: .12, duration: 0.2, ease: "sine.in" },
        "<"
      )
      .fromTo(
        containerRef.current,
        { backdropFilter: "blur(0px)" },
        { backdropFilter: "blur(10px)", duration: 0.6, ease: "sine.in" },
        "<"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, filter: "blur(0.1px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.6 , ease: "sine.in"},
        "+=1.5"
      );
    }
  }, [item]);

  return (
    <div className="overlay fixed inset-0 w-full overflow-y-auto" ref={containerRef}>
      <div className="relative content">
        <div className="grain"></div>
               <NavigationLink ref={navCopy}
                    key={item.handle}
                    label={item.label}
                    handle={item.handle}
                    number={item.number}
                    className={item.className}
                    dotOffsetMobile={item.dotOffsetMobile}
                    dotOffsetDesktop={item.dotOffsetDesktop}
                    reference={navCopy}
                  />
        <div className="mr-20 px-10 my-0  relative mt-[35dvh] text-left  md:w-[70dvh]  md:mx-auto md:mt-[50dvh]" ref={contentRef}>
        <section className="flex flex-col gap-8">
          {portfolioProjects.map((item, index) => (
            <PortfolioProject key={index + 1} item={item}></PortfolioProject>
          ))}
        </section>
      </div>
      </div>
    </div> // ✅ this line was missing
  );
}