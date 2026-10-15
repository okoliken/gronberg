import { HomeIntro } from "@/components/layout/home-intro";
import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";
import { Exhibitions } from "@/components/sections/exhibitions";
import { Hero } from "@/components/sections/hero";
import { LatestWork } from "@/components/sections/latest-work";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <HomeIntro>
      <Hero />
      <Services />
      <LatestWork />
      <Exhibitions />
      <Clients />
      <Cta />
    </HomeIntro>
  );
}
