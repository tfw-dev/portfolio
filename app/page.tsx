import Image from "next/image";
import Ring from "./components/ring"
import Navigation from "./components/navigation"

export default function Home() {
  return (
    <div className=" min-h-screen">
        <Navigation></Navigation>
        <Ring></Ring>
    </div>
  );
}
