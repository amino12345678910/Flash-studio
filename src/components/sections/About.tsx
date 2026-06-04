"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import Image from "next/image";

function useCounter(end: number, duration: number = 2, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
}

function StatItem({ end, suffix, label }: { end: number, suffix: string, label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2.5, inView);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-serif text-4xl md:text-5xl text-gold mb-2">
        {count}{suffix}
      </span>
      <span className="uppercase tracking-widest text-xs font-semibold text-foreground/60">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      const lines = gsap.utils.toArray(".reveal-line");
      lines.forEach((line: any) => {
        gsap.fromTo(line, 
          { y: "100%" },
          {
            y: "0%",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 95%",
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 bg-background text-foreground overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
        
        {/* Left: Image with Gold Frame */}
        <div className="w-full lg:w-5/12 relative">
          <div className="absolute -inset-4 md:-inset-6 border border-gold/40 z-0 translate-x-4 translate-y-4"></div>
          <div className="relative z-10 aspect-[3/4] overflow-hidden bg-dark">
            <Image 
              ref={imageRef as any}
              src="/images/3025.jpg" 
              alt="Portrait of the photographer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale opacity-90 scale-[1.2]"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div ref={textRef} className="w-full lg:w-7/12 flex flex-col justify-center">
          <div className="overflow-hidden mb-6">
            <p className="uppercase tracking-[0.2em] text-xs text-gold font-semibold reveal-line">
              Notre Histoire
            </p>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight">
            <div className="overflow-hidden"><div className="reveal-line">L'art de capturer</div></div>
            <div className="overflow-hidden"><div className="reveal-line">vos plus beaux</div></div>
            <div className="overflow-hidden text-gold italic"><div className="reveal-line">moments.</div></div>
          </h2>
          
          <div className="space-y-6 text-foreground/70 leading-relaxed font-light mb-16 text-sm md:text-base">
            <div className="overflow-hidden"><div className="reveal-line">Fondé avec la passion de transformer de simples instants en souvenirs éternels, Flash Studio est votre partenaire de confiance pour immortaliser l'essence même de vos émotions.</div></div>
            <div className="overflow-hidden"><div className="reveal-line">Nous croyons que chaque regard, chaque sourire et chaque silence ont une histoire à raconter. Notre approche mêle l'authenticité du photojournalisme à l'esthétique exigeante de la photographie éditoriale.</div></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16 border-t border-foreground/10 pt-10">
            <StatItem end={12} suffix="K+" label="Abonnés" />
            <StatItem end={500} suffix="+" label="Mariages" />
            <StatItem end={10} suffix="+" label="Années d'expérience" />
          </div>

          <div className="overflow-hidden">
            <p className="reveal-line font-serif text-3xl md:text-4xl italic text-foreground/40">
              "La photographie est la vérité."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
