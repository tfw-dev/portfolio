"use client"

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { navItems } from '@/lib/navConfig';
import { usePathname } from 'next/navigation';
import { gsap } from "gsap";
import { useRouter } from 'next/navigation';
import { useOverlayRefs } from '@/context/RefContext';

let hasAnimated = false; // ✅ guard

export default function NavigationIndex() {
    const { containerRef, contentRef } = useOverlayRefs();
    const pathname = usePathname(); // e.g. "/about"
    const navIndex = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const currentIndex = navItems.findIndex(item => pathname === `/${item.handle}`);
    const isFirst = currentIndex === 0;
    const prevHandle = !isFirst && currentIndex > 0 ? navItems[currentIndex - 1].handle : null;
    const isLast = currentIndex === navItems.length - 1;
    const nextHandle = !isLast && currentIndex !== -1 ? navItems[currentIndex + 1].handle : null;
    
    function handleOverlayClose()  {
        const tl = gsap.timeline({
            onComplete: () => {
                router.push("/"); // ✅ client-side navigation
            },
        });
        tl.fromTo(
        navIndex.current,
        {opacity: 1},
        {opacity: 0, duration: .5, ease: "power2.out"}
        )
        .fromTo(
        containerRef.current,
        { opacity: 1 },
        { opacity: 0, duration: .5, ease: "power2.in" }
        )
        .fromTo(
        contentRef.current,
        { opacity: 1 },
        { opacity: 0 },
        )
        .fromTo(
        containerRef.current,
        { backdropFilter: "blur(30px)" },
        { backdropFilter: "blur(0px)", duration: 0.6, ease: "power2.in" },
        "+=0.1"
        )
        

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
                    <Link key={index + 1} href={`/${item.handle}`} className={pathname == ("/" + item.handle) ? "font-normal" : "font-extralight"} >0{index + 1}</Link>
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