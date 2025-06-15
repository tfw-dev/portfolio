import Navigation from "../components/navigation";
import PortfolioOverlay from "./portfolio-overlay";
import NavigationIndex from "../components/navigation-index"
import { navItems } from "@/lib/navConfig";


export default function Portfolio() {
const handle = "portfolio"
    return (
        <div>
            <Navigation navItems={navItems}></Navigation>
            <PortfolioOverlay handle={handle}></PortfolioOverlay>
            <NavigationIndex></NavigationIndex>
        </div>
    )
}
