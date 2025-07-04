"use client"

import Navigation from "../components/navigation"
import AboutOverlay from "./about-overlay"
import NavigationIndex from "../components/navigation-index"
import { navItems } from "@/lib/navConfig";
import { useRef } from "react";

export default function About() {
    const handle = "about"
    
    return (
        <div>
            <Navigation navItems={navItems}></Navigation>
            <AboutOverlay handle={handle} ></AboutOverlay>
            <NavigationIndex ></NavigationIndex>
        </div>
    )
}
