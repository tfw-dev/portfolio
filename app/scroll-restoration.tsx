'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useOverlayRefs } from "@/context/RefContext";

gsap.registerPlugin(ScrollToPlugin);

let lastScrollY = 0;

export function ScrollRestorationManager() {
  const pathname = usePathname();

  const { ringRef, scrollContainer, navRefs} = useOverlayRefs()

  useEffect(() => {
    const handleBeforeUnload = () => {
      lastScrollY = window.scrollY;
    };

    const handleRouteChange = () => {
      lastScrollY = window.scrollY;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    // Save scroll on link click or programmatic navigation
    document.addEventListener('click', handleRouteChange, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      document.removeEventListener('click', handleRouteChange, true);
    };
  }, []);

  useEffect(() => {
    // Wait a tick after pathname change to restore scroll
    requestAnimationFrame(() => {
        window.scrollTo(0, lastScrollY);
        if (pathname == "/contact") {
            const tl = gsap.timeline();

            tl.to(window, {
                scrollTo: { y: 0 },
                duration: 2.5, // seconds – increase for slower scroll
                ease: "power2.inOut",
            });
            tl.to(ringRef.current, {
                position: "absolute",
                duration: 0
            });
            tl.set(scrollContainer.current, {
                display: "none",
                duration: 0
            }, "<");
           tl.add(() => {
            Object.values(navRefs.current).forEach(({ linkRef }) => {
                if (linkRef.current) {
                linkRef.current.style.position = 'absolute';
                }
            });
            });

        } else {
            ringRef.current.style.position = "fixed";
            scrollContainer.current.style.display = "block";
        }
    });
  }, [pathname]);

  return null;
}
