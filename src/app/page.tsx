import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { MiniAbout } from "@/components/sections/mini-about";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { getPublicProjects } from "@/lib/content";

export default async function HomePage() {
  const projects = await getPublicProjects();

  return (
    <MotionConfigProvider>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Process />
        <Portfolio projects={projects} />
        <TechMarquee />
        <MiniAbout />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
