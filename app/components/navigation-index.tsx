"use client"

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { navItems } from '@/lib/navConfig';
import { usePathname } from 'next/navigation';
import { gsap } from "gsap";
import { useRouter } from 'next/navigation';
import { useOverlayRefs} from '@/context/RefContext';

let hasAnimated = false; // ✅ guard

export default function NavigationIndex() {
    const { registerNavRefs, containerRef, contentRef } = useOverlayRefs();
    const pathname = usePathname(); // e.g. "/about"
    const navIndex = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const currentIndex = navItems.findIndex(item => pathname === `/${item.handle}`);
    const isFirst = currentIndex === 0;
    const prevHandle = !isFirst && currentIndex > 0 ? navItems[currentIndex - 1].handle : null;
    const isLast = currentIndex === navItems.length - 1;
    const nextHandle = !isLast && currentIndex !== -1 ? navItems[currentIndex + 1].handle : null;


    const { lineRef, dotRef } = registerNavRefs(pathname.replace(/^\//, "") ); // safe, deterministic
    
    function handleOverlayClose(handle)  {
    
        event?.preventDefault()
        const tl = gsap.timeline({
            onComplete: () => {
                router.push(handle); // ✅ client-side navigation
            },
        });
        console.log(containerRef.current)
        if (typeof containerRef.current !== "undefined" && containerRef.current.scrollTop !== 0) {
            console.log('scroll')
            tl.to(containerRef.current, {
                scrollTo: { y: 0 },
                duration: .5,
                ease: "power2.inOut",
            });
        }
        tl.fromTo(
        contentRef.current,
        {opacity: 1},
        {opacity: 0, duration: .5, ease: "circ.in"},
        "<")
        tl.fromTo(
        navIndex.current,
        {opacity: 1},
        {opacity: 0, duration: .5, ease: "circ.in"},
        "<")
        tl.fromTo(
        containerRef.current,
        { backdropFilter: "blur(15px)" },
        { backdropFilter: "blur(0px)", duration: .9, ease: "power2.in" },
        "<")
        tl.fromTo(
        lineRef.current,
        {
        scaleX: 1,
        },
        { scaleX: 0,transformOrigin: 'right center',
        duration: 2, ease: "back.out"},
        "")
        tl.to(
        dotRef.current,{
        x: 0,
        duration: .5,
        ease: "power2.out",
        },"<");
        
   

    }

    
    useEffect(() => {
        if (hasAnimated || !navIndex.current) return;
        hasAnimated = true; // ✅ set after first run

        const tl = gsap.timeline()

        tl.fromTo(
            navIndex.current,
            {opacity: 0},
            {opacity: 1, duration: 3, ease: "power2.out"}
        )
    }, [])


    return (
        <div>
            <div className={`fixed z-10 w-20% mx-auto top-[53%] -translate-y-1/2 right-6 text-center`} ref={navIndex}>
                {/* <span className="block rotate-90 mb-16 text-tiny tracking-widest
    font-extralight ">Navigation</span> */}
    <div className="align-center">
  <Link
    href={`/${isFirst || !prevHandle ? "" : prevHandle}`}
    className={`${isFirst || !prevHandle ? "opacity-0 pointer-events-none" : ""}`}
  >
    <svg
      className="w-6 h-6 text-white animate-bounce mx-auto mb-6 rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </Link>
</div>

                <div className="flex flex-col gap-3">
                    {navItems.map((item, index) => (
                    <div  key={index + 1}  onClick={ () => handleOverlayClose(item.handle)}  className={pathname == ("/" + item.handle) ? "font-normal" : "font-extralight"} >0{index + 1}</div>
                    // <Link key={index + 1} onClick={ () => handleOverlayClose(item.handle)} href={`/${item.handle}`} className={pathname == ("/" + item.handle) ? "font-normal" : "font-extralight"} >0{index + 1}</Link>
                    ))}
                </div>
                <div className='align-center'>
                <Link href={`/${isLast ? "" : nextHandle}`} className={isLast || nextHandle == null ? "opacity-0 pointer-events-none": ""}>
                    <svg
                    className="w-6 h-6 text-white animate-bounce mx-auto mt-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </Link>
                </div>
            </div>
        
        </div>
    )
}