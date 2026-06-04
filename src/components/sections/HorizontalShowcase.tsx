"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const showcaseItems = [
  { id: 1, title: "L'Élégance", desc: "Reportage Editorial", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" },
  { id: 2, title: "L'Émotion", desc: "Instants Volés", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, title: "La Lumière", desc: "Direction Artistique", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
  { id: 4, title: "Le Mouvement", desc: "Saisir l'Instant", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" },
];

export default function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const sections = gsap.utils.toArray(".horizontal-item");
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + scrollWrapperRef.current!.offsetWidth,
          }
        });

        // Parallax inner images
        sections.forEach((section: any) => {
          const img = section.querySelector(".parallax-img");
          gsap.fromTo(img, 
            { x: "-20vw" },
            {
              x: "20vw",
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: "top top",
                end: () => "+=" + scrollWrapperRef.current!.offsetWidth,
              }
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-dark md:h-screen md:overflow-hidden">
      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col md:flex-row md:h-full md:w-[400vw]"
      >
        {showcaseItems.map((item, index) => (
          <div 
            key={item.id} 
            className="horizontal-item relative w-full h-[60vh] md:h-full md:w-screen flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-foreground/10"
          >
            {/* Parallax Image Container */}
            <div className="absolute inset-0 w-full h-full md:w-[140%] md:-left-[20%]">
              <img 
                src={item.img} 
                alt={item.title} 
                className="parallax-img w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-dark/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 mix-blend-difference text-white">
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                {item.desc}
              </span>
              <h3 className="font-serif text-5xl md:text-8xl">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
