"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useOverlayRefs } from "@/context/RefContext";

gsap.registerPlugin(ScrollTrigger);

function RingGeometry() {
   const meshRef = useRef<THREE.Mesh>(null);

  const shouldSpin = useRef(true);

  // Spin on each frame
  useFrame(() => {
    if (meshRef.current && shouldSpin.current == true) {
      meshRef.current.rotation.y += 0.009;
    }
  });

const pathname = usePathname(); // move this inside RingGeometry

  // Animate with scroll
useEffect(() => {
  const mesh = meshRef.current;
  if (!mesh) return;
  mesh.rotation.set(Math.PI / 1, 0, 0); // Faces forward like a flat ring
  // Disable animations if on /contact
  if (pathname === "/contact") {
    shouldSpin.current = false;
    return; // skip setting up ScrollTriggers
  }
  // Step 1 scroll animation
  gsap.to(mesh.rotation, {
    x: 4,
    y: 20,
    scrollTrigger: {
      trigger: "#step-1",
      start: "top top",
      end: "bottom",
      scrub: true,
    },
    onToggle: () => {
    }
  });

    gsap.to(mesh.rotation, {
    x: 4,
    y: 20,
    scrollTrigger: {
      trigger: "#step-2",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    onToggle: () => {
      shouldSpin.current = false;
    }
  });



  // Step 3 scroll animation
  gsap.to(mesh.rotation, {
    x: 0,
    y: 0,
    scrollTrigger: {
      trigger: "#step-3",
      start: "top center",
      end: "bottom center",
      scrub: true,
    }
  });
}, []);



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

  // const texture = useMemo(() => {
  //   const loader = new THREE.TextureLoader();
  //   const map = loader.load("/textures/Metal011_2K-JPG_Roughness.jpg");
  //   map.wrapS = map.wrapT = THREE.RepeatWrapping;
  //   map.repeat.set(2, 2);
  //   return map;
  // }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow>
      <meshPhysicalMaterial
        color={0x111111}
        metalness={0.4}
        roughness={1}
      />
    </mesh>
  );
}

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        camera.zoom = 5;
      } else if (width >= 768) {
        camera.zoom = 5;
      } else {
        camera.zoom = 3;
      }
      camera.updateProjectionMatrix();
    };

    updateZoom(); // initial
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, [camera]);

  return <OrthographicCamera makeDefault position={[0, 0, 100]} />;
}

export default function Ring() {
    const pathname = usePathname(); // e.g. "/about"
  const { ringRef } = useOverlayRefs();

    const [top, setTop] = useState<string | null>(null);
    
  useEffect(() => {
    // Safe client-side calc
    const topValue = `calc(50dvh)`;
    setTop(topValue);
  }, []);
  

  
  
  return (
    <div
      className={`fixed left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-0`}
      style={{ top, pointerEvents: "none" }} ref={ringRef}
    >
      
      <Canvas
        orthographic
        gl={{ antialias: true, alpha: true }}
        camera={{ zoom: 0, position: [0, 0, 50] }}
        shadows
      >
          <ResponsiveCamera />
          <ambientLight intensity={15} />
          <spotLight intensity={1200} distance={100} angle={Math.PI / 2} penumbra={0} position={[0, 0, 45]} />
          <RingGeometry />
      </Canvas>
    </div>
  );
}
