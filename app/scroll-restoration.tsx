'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useOverlayRefs } from "@/context/RefContext";
import { useScrollTriggerContext } from "@/context/ScrollTriggerContext";


gsap.registerPlugin(ScrollToPlugin);

let lastScrollY = 0;

export function ScrollRestorationManager() {
  const pathname = usePathname();

  const { ringRef, scrollContainer, navRefs, containerRef } = useOverlayRefs()
 const { getTrigger, refreshAllTriggers } = useScrollTriggerContext();

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
            if (typeof window !== "undefined" && window.scrollY !== 0) {
                tl.to(window, {
                  scrollTo: { y: 0 },
                  duration: 2.5,
                  ease: "power2.inOut",
                });
            }
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
            tl.fromTo(
              containerRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "power2.out" },
              ">"
            )

        } else {
            ringRef.current.style.position = "fixed";
            scrollContainer.current.style.display = "block";
            console.log("reset styling")
              requestAnimationFrame(() => {
                    // 🔥 refresh all triggers from context (this calls ScrollTrigger.refresh() internally)
                    const trigger1 = getTrigger("step1-scroll");
                    const trigger2 = getTrigger("step2-scroll");
                    const trigger3 = getTrigger("step3-scroll");
                    trigger1?.enable()
                    trigger2?.enable()
                    trigger3?.enable();
                    console.log("trigger1", trigger1);
                    console.log("trigger2", trigger2);
                    console.log("trigger3", trigger3);
                                        refreshAllTriggers();

                });


        }
    });
  }, [pathname]);


  //manages the scroll disablement when overlay is open
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const scrollableChild = container.querySelector('.content') as HTMLElement;
  if (!scrollableChild) return;


  if (scrollableChild) {
    // Lock global scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Enable scroll on the child
    scrollableChild.style.overflowY = 'auto';
    scrollableChild.style.webkitOverflowScrolling = 'touch'; // for iOS
  }  else {
    // Unlock scroll globally
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (scrollableChild) {
      scrollableChild.style.overflowY = '';
      scrollableChild.style.webkitOverflowScrolling = '';
    }
  }

  return () => {
    // Reset scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (scrollableChild) {
      scrollableChild.style.overflowY = '';
      scrollableChild.style.webkitOverflowScrolling = '';
    }
  };
}, [containerRef, pathname]);


  return null;
  
}
