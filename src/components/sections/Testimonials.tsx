"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { id: 1, quote: "Une expérience inoubliable. L'équipe a su nous mettre à l'aise et le résultat est au-delà de nos espérances.", name: "Sara & Karim", event: "Mariage" },
  { id: 2, quote: "Des photos d'une élégance rare. La lumière, les angles, tout est pensé avec une précision cinématographique.", name: "Emma L.", event: "Portrait Editorial" },
  { id: 3, quote: "La patience et la douceur de l'équipe avec notre nouveau-né étaient remarquables. Des souvenirs éternels.", name: "Famille Ben Ali", event: "Séance Bébés" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }));

  return (
    <section className="relative min-h-[80vh] py-32 bg-[#050505] text-foreground flex items-center justify-center overflow-hidden" id="testimonials">
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              y: ["0%", "-100%", "0%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <p className="uppercase tracking-[0.2em] text-xs text-gold mb-16 font-semibold">Témoignages</p>
        
        <div className="min-h-[250px] flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-3xl md:text-5xl leading-tight mb-8 text-foreground/90 italic">
                "{testimonials[current].quote}"
              </p>
              <p className="uppercase tracking-[0.15em] text-sm text-gold font-bold">
                {testimonials[current].name}
              </p>
              <p className="text-foreground/50 text-xs tracking-widest uppercase mt-1">
                {testimonials[current].event}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-12 h-[1px] transition-all duration-300 ${current === idx ? 'bg-gold' : 'bg-foreground/20 hover:bg-foreground/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
