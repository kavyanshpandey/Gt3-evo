import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Transformation } from "@/components/sections/Transformation";
import { Showcase } from "@/components/sections/Showcase";
import { Timeline } from "@/components/sections/Timeline";
import { Aerodynamics } from "@/components/sections/Aerodynamics";
import { Engine } from "@/components/sections/Engine";
import { Performance } from "@/components/sections/Performance";
import { Garage } from "@/components/sections/Garage";
import { RacingExperience } from "@/components/sections/RacingExperience";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Transformation />
      <Showcase />
      <Timeline />
      <Aerodynamics />
      <Engine />
      <Performance />
      <Garage />
      <RacingExperience />
      <Stats />
      <Gallery />
      <Footer />
    </main>
  );
}
