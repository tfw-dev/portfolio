
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useOverlayRefs } from '@/context/RefContext';


type ButtonProps = {
  label: string;
  className?: string;
  number?: string;
  handle?: string;
  dotOffsetMobile: number;
  dotOffsetDesktop: number;
};

export default function NavigationLink({ label , className, number, handle, dotOffsetMobile, dotOffsetDesktop, reference}: ButtonProps) {
    const pathname = usePathname(); // e.g. "/about"
    const isActive = pathname === `/${handle}`;

    const { registerNavRefs, contentRef } = useOverlayRefs();
    const { lineRef, dotRef } = registerNavRefs(handle!); // safe, deterministic

    const {  linkRef } = registerNavRefs(`${number}`);
    
if (pathname == `/${handle}`) {
  useEffect(() => {
    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768; // Tailwind's `md` breakpoint

    const offset = isMobile ? dotOffsetMobile : dotOffsetDesktop; // 🎯 mobile = 120px, desktop = 300px
    if (!contentRef.current) return;

    // Get left position of the body content relative to the page
    const rect = contentRef.current?.getBoundingClientRect()

    const styles = window.getComputedStyle(contentRef.current);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddedLeftEdge = rect.left + paddingLeft + window.scrollX;

    const lineContainer = lineRef.current.parentElement!;
    const containerRect = lineContainer.getBoundingClientRect();
    const lineRight = containerRect.right + window.scrollX;
 
    let distanceToMove = paddedLeftEdge - lineRight 
    // Step 1: Pre-position the dot off-screen or at default state
    gsap.set(dotRef.current, {
      x:  0, // ⬅️ This will offset the dot to the left of where we want to animate to
      opacity: 0,
    });

    tl.fromTo(
      lineRef.current,
      { opacity: 0},
      {
        opacity: 1,
        duration: 0,
        ease: 'power2.out',
      }
    )
    tl.fromTo(
      lineRef.current,
      { scaleX: 0},
      {
        scaleX: 1,
        transformOrigin: 'right center',
        duration: 2,
        ease: 'power2.out',
      }
    )
    tl.fromTo(
      dotRef.current,
      { opacity: 0},
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      },"-=1>"
    )
    tl.to(dotRef.current, {
      x: distanceToMove,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    },"-=0.5>" );

  }, []);
}

  return (
     <Link href={`/${handle}`} passHref >
    <div ref={linkRef}  className={` -translate-y-1/2 w-auto ${isActive ? "absolute" : "fixed" } ${className} ${isActive ? 'z-[3]' : ''}  ${!reference && isActive ? "opacity-0": ""}`}   suppressHydrationWarning  >
      <div className={`relative flex justify-end text-right text-small font-inter  ${isActive ? '' : ''}`} >
        <div className='text-left'>
            <div className="text-muted text-tiny">{number}</div>
            {label}
        </div>
      </div>
       <div className={`absolute right-0 w-[86vw] flex-1 h-px bg-transparent overflow-hidden mt-2 `}>
        <div
          ref={lineRef}
          className="h-px w-full bg-white/30 scale-x-0 scale-y-[0.5] "
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full" />
        </div>
        <div className={`block absolute translate-y-0.5 bottom-0 right-0 w-[5px] h-[5px] rounded-full bottom-[-8px] opacity-0 bg-white ${isActive ? 'z-[3]' : ''}`} ref={dotRef}>

      </div>
    </div>
    </Link>
  )
}