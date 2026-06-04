"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const showcaseItems = [
  { id: 1, title: "L'Élégance", desc: "Reportage Editorial", img: "/images/3014.jpg" },
  { id: 2, title: "L'Émotion", desc: "Instants Volés", img: "/images/3017.jpg" },
  { id: 3, title: "La Lumière", desc: "Direction Artistique", img: "/images/3019.jpg" },
  { id: 4, title: "Le Mouvement", desc: "Saisir l'Instant", img: "/images/3023.jpg" },
];

export default function HorizontalShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-dark md:h-[80vh] overflow-hidden group">
      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-dark/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gold hover:text-dark cursor-pointer border border-white/10"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-dark/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gold hover:text-dark cursor-pointer border border-white/10"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {showcaseItems.map((item, index) => (
          <div 
            key={item.id} 
            className="snap-center shrink-0 w-full md:w-screen h-[60vh] md:h-full relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-foreground/10"
          >
            {/* Image Container */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={item.img} 
                alt={item.title} 
                fill
                sizes="100vw"
                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-dark/40 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 mix-blend-difference text-white pointer-events-none">
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
