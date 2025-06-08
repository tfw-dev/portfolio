
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


type ButtonProps = {
  label: string;
  style?: React.CSSProperties;
  className?: string;
  number?: number,
  handle?: string
};

export default function NavigationLink({ label , style , number, handle}: ButtonProps) {
   const pathname = usePathname(); // e.g. "/about"
    const isActive = pathname === `/${handle}`;


const lineRef = useRef(null);
const dotRef = useRef(null);

// Combine the passed style with override if active
const combinedStyle: React.CSSProperties = {
...style,
...(isActive ? { position: 'absolute' } : {}),
};

if (pathname == `/${handle}`) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'right center',
        duration: 2,
        ease: 'power2.out',
      }
    )
    tl.fromTo(
        dotRef.current,
        { x: "0"},
        {
            x: "-300px",
            duration: 1.5,
            ease: "power2.out",
        }
    )
  }, []);
}


  return (
     <Link href={`/${handle}`} passHref >
    <div style={combinedStyle} className='w-1/2' suppressHydrationWarning  >
      <div className={`relative flex justify-end text-right text-small font-inter  ${isActive ? 'z-[3]' : ''}`} >
        <div className='text-left'>
            <div className="text-muted text-tiny">{number}</div>
            {label}
        </div>
      </div>
       <div className={`relative flex-1 h-px bg-transparent overflow-hidden mt-2 ${isActive ? 'z-[3]' : ''}`}>
        <div
          ref={lineRef}
          className="h-px w-full bg-white/30 scale-x-0 scale-y-[0.5] "
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full" />
        </div>
        <div className={`block absolute translate-y-0.5 bottom-0 right-0 w-[5px] h-[5px] rounded-full  bg-white ${isActive ? 'z-[3]' : ''}`} ref={dotRef}>

      </div>
    </div>
    </Link>
  )
}