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

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

       tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power2.out" }
      )
      .fromTo(
        containerRef.current,
        { backdropFilter: "blur(0px)" },
        { backdropFilter: "blur(30px)", duration: 0.6, ease: "power2.out" },
        "+=0.1"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "+=2"
      );
    }
  }, [item]);

  return (
    <div className="overlay fixed w-full min-h-dvh top-0 left-0" ref={containerRef}>
         <div className="relative overflow-y-scroll h-200">
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
        <div className="mr-20 px-10 my-0  mt-[230px] text-left" ref={contentRef}>
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