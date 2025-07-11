"use client"

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import headshot from '../../public/headshot.png'
import { useOverlayRefs } from "@/context/RefContext";
import NavigationLink from "../components/navigation-links";
import { navItems } from "@/lib/navConfig";

export default function AboutOverlay({handle}) {
  const { containerRef, contentRef } = useOverlayRefs();

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
        <div className="grain" ref={grainRef}></div>
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
        <div className=" mr-20 px-10 my-0 mt-[30dvh] text-left md:mt-[35dvh] md:w-[70dvh]  md:m-auto" ref={contentRef}>
          <section>
            <Image src={headshot}
            width={150}
            height={500}
            className="mx-auto mb-10"
            alt="Picture of the author"></Image>
            <h2 className="mb-10">Taylor Ward</h2>
            <p>
              Taylor blends passion and expertise to craft digital experiences that combine elegance and performance.
              His journey as a lead developer at Minimal (2013–2017) sharpened his appetite for innovation and creative collaboration.
            </p>
          </section>
          <section >
            <h2 className="text-[1.5rem] font-inter"><span className="font-along-sans-s2 text-[2.5rem]">6</span> Years Working In</h2>
            <br></br>
            <p>Web Development <br></br>Design <br></br> Ecommerce</p>
            <br></br>
            <p>Over the past 5+ years, I’ve led web initiatives for startups, enterprise,and DTC brands. My journey began as a designer, evolved into full-stack dev, and today I work primarily as a Shopify expert — handling everything from theme architecture to custom checkout logic. Here are a few project i”ve touched led.</p>
          </section>
      </div>
      </div>
    </div> // ✅ this line was missing
  );
}