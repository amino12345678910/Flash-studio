"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const marqueeWords = ["MARIAGE", "•", "PORTRAIT", "•", "MODE", "•", "ÉMOTION", "•", "ART", "•", "LUMIÈRE", "•"];

  return (
    <footer className="bg-dark text-foreground relative overflow-hidden">
      {/* Marquee */}
      <div className="w-full border-t border-b border-foreground/10 py-4 flex overflow-hidden whitespace-nowrap bg-background text-gold">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-8 px-4"
        >
          {/* Duplicate the array twice for seamless looping */}
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className={`font-serif text-2xl md:text-3xl tracking-widest ${word === '•' ? 'text-foreground/20' : ''}`}>
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Col 1: Wordmark & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-3xl tracking-[0.25em] uppercase text-gold block mb-6 hover:opacity-80 transition-opacity">
              [ FLASH STUDIO ]
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed font-light mb-8">
              L'art de capturer vos plus beaux moments avec une approche cinématographique et intemporelle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold text-foreground mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li><Link href="#hero" className="hover:text-gold transition-colors">Accueil</Link></li>
              <li><Link href="#services" className="hover:text-gold transition-colors">Nos Services</Link></li>
              <li><Link href="#gallery" className="hover:text-gold transition-colors">Galerie</Link></li>
              <li><Link href="#about" className="hover:text-gold transition-colors">Notre Histoire</Link></li>
              <li><Link href="#testimonials" className="hover:text-gold transition-colors">Témoignages</Link></li>
              <li><Link href="#contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold text-foreground mb-8">Studio</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li>12 Avenue de l'Art</li>
              <li>Quartier du Lac, Tunis</li>
              <li className="pt-4 border-t border-foreground/10">
                Lun - Sam : 09h00 - 19h00
              </li>
              <li>Dimanche : Fermé</li>
              <li className="pt-4">
                <a href="tel:22255400" className="hover:text-gold transition-colors block mb-1">T: +216 22 255 400</a>
                <a href="mailto:contact@flashstudio.com" className="hover:text-gold transition-colors block">E: contact@flashstudio.com</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold text-foreground mb-8">Restez Inspirés</h4>
            <p className="text-sm text-foreground/60 mb-6 font-light">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières inspirations et offres exclusives.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full bg-transparent border-b border-foreground/20 py-3 pr-10 text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50 group-hover:text-gold transition-colors"
                aria-label="S'inscrire"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gold/20 text-xs text-foreground/40 uppercase tracking-widest gap-6">
          <p>© {new Date().getFullYear()} Flash Studio. Tous droits réservés.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:text-gold transition-colors group"
          >
            Retour en haut
            <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-gold transition-colors group-hover:-translate-y-1">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
