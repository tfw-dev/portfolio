"use client"
import { useOverlayRefs } from "@/context/RefContext"

export default function ScrollContainer() {

const { scrollContainer } = useOverlayRefs()


return( 
    <div ref={scrollContainer} id="scroll-container" className=" w-full bg-transparent">
        <section id="step-1" className="h-[200dvh] !mb-0"></section>
        <section id="step-2" className="h-[500dvh] !mb-0"></section>
        <section id="step-3" className="h-[100dvh] !mb-0"></section>
    </div>
 )
}