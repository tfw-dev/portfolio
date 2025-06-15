"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useOverlayRefs } from "@/context/RefContext";

export default function ContactOverlay({handle}) {
  const { containerRef, contentRef,  } = useOverlayRefs();

  const pathname = usePathname(); // e.g. "/about"

  const { navRefs } = useOverlayRefs();

  const refs = navRefs.current[handle];
  const lineRef = refs?.lineRef;
  const dotRef = refs?.dotRef;

  useEffect(() => {
      const delay = window.scrollY === 0 ? 0 : 3;

    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
        `+=${delay}`
      )
      .fromTo(
        containerRef.current,
        { backdropFilter: "blur(0px)" },
        { backdropFilter: "blur(30px)", duration: 0.6, ease: "power2.out" },
        "<"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
      .fromTo(
        lineRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
      .fromTo(
        dotRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "<"
      )
    }
  }, []);

  return (
    <div>
    <div className={`${pathname == "/contact" ? "absolute" : "fixed"} overlay scroll top top-1/2 left-0 bot-0 w-full `}  style={{
            WebkitMaskImage: 'radial-gradient(circle at top, transparent 93px, black 93px)',
            maskImage: 'radial-gradient(circle at top, transparent 93px, black 93px)',
        }} ref={containerRef}><section className="!mb-90 relative flex flex-col gap-8 z-6 top-70 w-3/4 mx-auto">
                <form  className="max-w-md mx-auto p-4 space-y-4 border rounded ">
        <input
            name="name"
            type="text"
            placeholder="Your name"

            required
            className="w-full p-2 border rounded"
        />
        <input
            name="email"
            type="email"
            placeholder="Your email"
        
            required
            className="w-full p-2 border rounded"
        />
        <textarea
            name="message"
            placeholder="Your message"

            required
            className="w-full p-2 border rounded h-24"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
            Send
        </button>

        </form>
            </section></div>
        <div className=" px-10 my-0  mt-[250px] text-left" ref={contentRef}>

        </div>
    </div>
  );
}