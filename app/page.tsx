""
import Ring from "./components/ring"
import Navigation from "./components/navigation"
import { navItems } from "@/lib/navConfig";

export default function Home() {
  return (
    <div className=" min-h-screen">
        <Navigation navItems={navItems}></Navigation>
     
    </div>
  );
}
