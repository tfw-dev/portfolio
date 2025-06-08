"use client"

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link"

export default function AboutOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        containerRef.current,
        { backdropFilter: "blur(0px)" },
        { backdropFilter: "blur(30px)", duration: 0.6, ease: "power2.out" },
        "+=0.1" // optional slight delay after opacity
      ).fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1 },
        "+=2"
      )
    }
  }, []);

  return (
    <div className="overlay w-full" ref={containerRef}>
      <div className="w-1/2 w-[40%] my-0 mx-auto mt-[400px]" ref={contentRef}>
        Taylor Ward
        Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
             <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
             <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
             <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
             <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
        v     <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          v     <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          v     <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
          v     <div>
          Taylor blends passion and expertise to craft digital experiences that combine elegance and performance. His journey as a lead developer at Minimal (2013-2017) sharpened his appetite for innovation and creative collaboration. 
        </div>
      </div>
      <Link className="close-overlay absolute right-20 bottom-20" href="/" passHref>
        X
      </Link>
    </div>
  )
}