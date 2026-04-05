import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyChooseUs from "./components/WhyChooseUs";
import Team from "./components/Team";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import CinematicLandingHero from "@/components/ui/cinematic-landing-hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-light text-text-dark selection:bg-brand-accent/30 relative">
      <Hero />
      <CinematicLandingHero />
      <About />
      <Services />
      <Process />
      <WhyChooseUs />
      <Team />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
