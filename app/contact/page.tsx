import Navigation from "../components/navigation"
import NavigationIndex from "../components/navigation-index"
import ContactOverlay from "./contact-overlay";
import { navItems } from "@/lib/navConfig";


export default function Contact() {
    const handle = "contact"
    return (
        <div>
            <Navigation navItems={navItems}></Navigation>
            <NavigationIndex></NavigationIndex>
            <ContactOverlay handle={handle}></ContactOverlay>
        </div>
    )
}
