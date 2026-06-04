"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const headline = "Flash Studio";
  const words = headline.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden text-foreground" id="hero">
      {/* Background Media */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
          className="w-full h-full object-cover"
        >
          {/* Free placeholder video for background */}
          <source src="/hero-video-2.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>
        
        {/* Specific Film Grain Noise for Hero */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.06] mix-blend-overlay pointer-events-none"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase tracking-[0.2em] text-xs md:text-sm text-gold mb-8 font-semibold"
        >
          Photographie &bull; Depuis 2018
        </motion.div>

        <motion.h1 
          variants={container}
          initial="hidden"
          animate="show"
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 flex flex-wrap justify-center gap-x-4 md:gap-x-6 uppercase tracking-wider leading-none"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordAnimation} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-sans text-lg md:text-2xl opacity-90 max-w-2xl mb-12 font-light tracking-wide mx-auto"
        >
          Capturer l'émotion. Sublimer chaque instant.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link href="#gallery" className="bg-gold text-dark border border-gold px-10 py-4 uppercase tracking-[0.15em] text-sm text-center hover:bg-transparent hover:text-gold transition-colors duration-300">
            Voir nos réalisations
          </Link>
          <Link href="#contact" className="border border-foreground/50 px-10 py-4 uppercase tracking-[0.15em] text-sm text-center hover:border-gold hover:text-gold transition-colors duration-300 backdrop-blur-sm bg-dark/20">
            Réserver une séance
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="uppercase tracking-[0.2em] text-[9px] opacity-60">Découvrir</span>
        <div className="w-[1px] h-16 bg-foreground/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-gold absolute top-0"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
