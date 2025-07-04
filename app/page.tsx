""
import Ring from "./components/ring"
import Navigation from "./components/navigation"
import { navItems } from "@/lib/navConfig";

export default function Home() {
  return (
    <div className=" min-h-screen absolute top-0 right-0 left-0">
      
        <Navigation navItems={navItems}></Navigation>
    </div>
  );
}
