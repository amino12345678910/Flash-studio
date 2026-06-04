"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Mariage",
    subtitle: "Reportage de mariage",
    desc: "Capturer l'essence de votre plus beau jour avec une approche photojournalistique et cinématographique.",
    img: "/images/service-mariage.jpg",
    className: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    id: "02",
    title: "Bébés & Famille",
    subtitle: "Séances portrait bébés",
    desc: "Des souvenirs intemporels de vos moments en famille, réalisés en lumière naturelle.",
    img: "/images/service-bebes.jpg",
    className: "md:col-span-2 md:row-span-1 aspect-video md:aspect-auto md:h-[350px]",
  },
  {
    id: "03",
    title: "Mode & Modèles",
    subtitle: "Photographie de modèles",
    desc: "Shooting éditorial haut de gamme pour books, agences et créateurs.",
    img: "/images/3055.jpg",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto md:h-[350px]",
  },
  {
    id: "04",
    title: "Shooting Créatif",
    subtitle: "Séances shooting",
    desc: "Laissez libre cours à l'imagination pour des portraits conceptuels uniques.",
    img: "/images/3057.jpg",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto md:h-[350px]",
  }
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.to(".service-card", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-6 md:px-12 bg-background text-foreground overflow-hidden" id="services">
      {/* Background Typography */}
      <div className="absolute top-0 right-0 overflow-hidden pointer-events-none select-none z-0 opacity-40">
        <span className="text-[15rem] md:text-[25rem] font-serif font-bold text-foreground/[0.03] leading-none -tracking-[0.05em] block -mt-20 -mr-10">
          01
        </span>
      </div>
      <div className="absolute bottom-0 left-0 overflow-hidden pointer-events-none select-none z-0 opacity-40">
        <span className="text-[8rem] md:text-[15rem] font-sans font-bold text-foreground/[0.02] leading-none uppercase tracking-widest block -mb-10 -ml-10">
          Services
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="uppercase tracking-[0.2em] text-xs text-gold mb-4 font-semibold">Notre Expertise</p>
          <h2 className="font-serif text-5xl md:text-7xl">Nos Services</h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:grid-rows-2">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`group relative overflow-hidden bg-dark cursor-pointer service-card opacity-0 translate-y-16 will-change-transform ${service.className}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                />
              </div>
              
              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end overflow-hidden">
                <div className="relative transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-[90px] group-hover:translate-y-0">
                  {/* Title block */}
                  <div className="mb-4">
                    <p className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-2 opacity-80">{service.subtitle}</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground">{service.title}</h3>
                  </div>
                  
                  {/* Hidden content */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-[90px]">
                    <p className="text-foreground/80 text-sm md:text-base opacity-90 mb-4 line-clamp-2 pr-4 font-light">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-2 text-gold uppercase tracking-[0.2em] text-xs font-bold">
                      Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
