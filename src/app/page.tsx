import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HorizontalShowcase />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}
