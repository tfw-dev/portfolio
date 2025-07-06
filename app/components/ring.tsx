"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useOverlayRefs } from "@/context/RefContext";
import { useScrollTriggerContext } from "@/context/ScrollTriggerContext";
import { ScrollTrigger }from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      camera.zoom = width >= 768 ? 5 : 3;
      camera.updateProjectionMatrix();
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, [camera]);

  return <OrthographicCamera makeDefault position={[0, 0, 100]} />;
}

export default function Ring() {
      function RingGeometry() {
           const { registerTrigger } = useScrollTriggerContext(); // ✅ safe here

      const meshRef = useRef<THREE.Mesh>(null);
      const shouldSpin = useRef(true);
      const pathname = usePathname();

      
    useFrame(() => {
      const mesh = meshRef.current;
      if (mesh && shouldSpin.current) {
        mesh.rotation.y += 0.009;
      }
    });



    useEffect(() => {
      const mesh = meshRef.current;
      if (!mesh) return;

        if (pathname === "/contact") {
          shouldSpin.current = false
          gsap.to(mesh.rotation, {
            x: 0,
            y: 0,
            duration: 3,
            ease: "power2.out",
          });
           }



      // === Step 1 ScrollTrigger ===
      const step1Trigger = gsap.to(mesh.rotation, {
        x: 4,
        y: 20,
        scrollTrigger: {
          id: "step1-scroll",
          trigger: "#step-1",
          start: "top top",
          end: "bottom",
          scrub: true,
          onUpdate: (self) => {
            console.log("[step-1] progress:", self.progress.toFixed(2));
          },
          onEnter: () => console.log("[step-1] onEnter"),
          onEnterBack: () => {
            console.log("[step-1] onEnterBack");
            if (pathname === "/contact") {
              shouldSpin.current = false;
              gsap.to(mesh.rotation, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          },
          onLeave: () => console.log("[step-1] onLeave"),
          onLeaveBack: () => console.log("[step-1] onLeaveBack"),
        },
      }).scrollTrigger;

      // === Step 2 ScrollTrigger ===
      const step2Trigger = gsap.to(mesh.rotation, {
        x: 4,
        y: 20,
        scrollTrigger: {
          id: "step2-scroll",
          trigger: "#step-2",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            console.log("[step-2] progress:", self.progress.toFixed(2));
          },
          onEnter: () => console.log("[step-2] onEnter"),
          onEnterBack: () => console.log("[step-2] onEnterBack"),
          onLeave: () => console.log("[step-2] onLeave"),
          onLeaveBack: () => console.log("[step-2] onLeaveBack"),
        },
      }).scrollTrigger;

      // === Step 3 ScrollTrigger ===
      const step3Trigger = ScrollTrigger.create({
        id: "step3-scroll",
        trigger: "#step-3",
        start: "top center",
        end: "bottom center",
        scrub: false,
        onEnter: () => {
          console.log("[step-3] onEnter");
          shouldSpin.current = false;
          step1Trigger.disable();
          step2Trigger.disable();
          gsap.to(mesh.rotation, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          console.log("[step-3] onEnterBack");
          shouldSpin.current = false;
          step1Trigger.disable();
          step2Trigger.disable();
          gsap.to(mesh.rotation, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          console.log("[step-3] onLeaveBack");
          const step1 = ScrollTrigger.getById("step1-scroll");
          const step2 = ScrollTrigger.getById("step2-scroll");
          const step3 = ScrollTrigger.getById("step3-scroll");

          gsap.to(mesh.rotation, {
            x: 4,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              console.log("[step-3] onLeaveBack → re-enable triggers");
              if (step1) step1.enable();
              if (step2) step2.enable();
              if (step3) step3.enable();
              ScrollTrigger.refresh();
              shouldSpin.current = true;
            },
          });
        },
        onLeave: () => {
          console.log("[step-3] onLeave");
          shouldSpin.current = true;
        },
      });
      registerTrigger("step1-scroll", step1Trigger);
      registerTrigger("step2-scroll", step2Trigger);
      registerTrigger("step3-scroll", step3Trigger);

      // Optional: Log all ScrollTriggers
      console.log("Active ScrollTriggers:", ScrollTrigger.getAll().map(t => t.vars?.id || "[unnamed]"));

      return () => {
        step1Trigger.kill();
        step2Trigger.kill();
        step3Trigger.kill();
      };
    }, [pathname]);

    
      const geometry = useMemo(() => {
        const outerRadius = 30;
        const innerRadius = 27;
        const height = 15;

        const arcShape = new THREE.Shape();
        arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);

        const holePath = new THREE.Path();
        holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
        arcShape.holes.push(holePath);

        const geo = new THREE.ExtrudeGeometry(arcShape, {
          depth: height,
          bevelEnabled: false,
          steps: 1,
          curveSegments: 240,
        });

        geo.center();
        return geo;
      }, []);

      return (
        <mesh ref={meshRef} geometry={geometry} castShadow>
          <meshPhysicalMaterial color={0x111111} metalness={0.4} roughness={1} />
        </mesh>
      );
    }




  const pathname = usePathname();
  const { ringRef } = useOverlayRefs();

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [top, setTop] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.opacity = "0";
        canvas.style.transition = "opacity 0s";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
    setTop("calc(50dvh)");
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-0"
      style={{ top, pointerEvents: "none" }}
      ref={ringRef}
    >
      {ready && (
        <Canvas
          orthographic
          gl={{ alpha: true, antialias: true }}
          camera={{ zoom: 0, position: [0, 0, 50] }}
          style={{ background: "transparent" }}
          shadows
        >
          <ResponsiveCamera />
          <ambientLight intensity={15} />
          <spotLight
            intensity={1200}
            distance={100}
            angle={Math.PI / 2}
            penumbra={0}
            position={[0, 0, 45]}
          />
          <RingGeometry />
        </Canvas>
      )}
    </div>
  );
}
