"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { useOverlayRefs } from '@/context/RefContext';

type ButtonProps = {
  label: string;
  className?: string;
  number?: string;
  handle?: string;
  dotOffsetMobile: number;
  dotOffsetDesktop: number;
  reference?: boolean;
};

export default function NavigationLink({
  label,
  className = "",
  number,
  handle,
  dotOffsetMobile,
  dotOffsetDesktop,
  reference,
}: ButtonProps) {
  

  const pathname = usePathname();
  const isActive = pathname === `/${handle}`;

  const { registerNavRefs, contentRef } = useOverlayRefs();
  const { lineRef, dotRef } = registerNavRefs(handle!);
  const { linkRef } = registerNavRefs(`${number}`);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? dotOffsetMobile : dotOffsetDesktop;

    if (!contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const styles = window.getComputedStyle(contentRef.current);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddedLeftEdge = rect.left + paddingLeft + window.scrollX;

    const lineContainer = lineRef.current.parentElement!;
    const containerRect = lineContainer.getBoundingClientRect();
    const lineRight = containerRect.right + window.scrollX;
    const distanceToMove = paddedLeftEdge - lineRight;

    gsap.set(dotRef.current, {
      x: 0,
      opacity: 0,
    });

    tl.fromTo(
        dotRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: 'power1.in' },
        "<"
      )
      // .fromTo(
      //   lineRef.current,
      //   { scaleX: 0 },
      //   {
      //     scaleX: 0.7,
      //     transformOrigin: 'right center',
      //     duration: 1.5,
      //     ease: 'power2.out',
      //   },
      //   "+=0.2"
      // )
      .to(
        dotRef.current,
        {
          x: distanceToMove,
          opacity: 1,
          duration: 1,
          ease: 'sine.out',
        },
        "+=0.1"
      );
  }, [isActive, contentRef, dotOffsetDesktop, dotOffsetMobile, dotRef, lineRef]);

  return (
    <Link href={`/${handle}`} passHref>
      <div
        ref={linkRef}
        className={`-translate-y-1/2 w-auto ${isActive ? "absolute z-[3]" : "fixed"} ${className} ${
          !reference && isActive ? "opacity-0" : ""
        }`}
        suppressHydrationWarning
      >
        <div className="relative flex justify-end text-right text-small font-inter">
          <div className="text-left">
            <div className="text-muted text-tiny">{number}</div>
            {label}
          </div>
        </div>

        <div className="absolute right-0 w-[86vw] flex-1 h-px bg-transparent overflow-hidden mt-2">
          <div
            ref={lineRef}
            className="h-px w-full opacity-0 bg-white/30 scale-x-0 scale-y-[0.5]"
          />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full" />
        </div>

        <div
          ref={dotRef}
          className={`dot block absolute bottom-[-10px] right-0 w-[5px] h-[5px] rounded-full bg-white opacity-0 ${
            isActive ? 'z-[3]' : ''
          }`}
        />

      </div>
    </Link>
  );
}
