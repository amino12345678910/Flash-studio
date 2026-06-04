"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Galerie", href: "#gallery" },
  { name: "À propos", href: "#about" },
  { name: "Avis", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="hidden lg:flex bg-gold text-dark border border-gold px-8 py-3 uppercase tracking-[0.15em] text-xs font-semibold text-center hover:bg-transparent hover:text-gold transition-colors duration-300"
    >
      {children}
    </motion.a>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });
  
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-dark/80 backdrop-blur-md border-b border-gold/30 py-4" 
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-foreground">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-[0.25em] uppercase hover:opacity-70 transition-opacity">
            [ Flash Studio ]
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="group relative uppercase tracking-[0.15em] text-xs font-medium pb-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full ease-out"></span>
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <MagneticButton href="#contact">Réserver</MagneticButton>
            
            <button 
              className="lg:hidden text-foreground hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-dark flex flex-col justify-center overflow-hidden"
          >
            {/* Background Image for Mobile Menu */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio setup" 
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
            </div>

            <div className="absolute top-6 md:top-8 left-0 w-full px-6 md:px-12 flex justify-between items-center z-10">
              <span className="font-serif text-xl tracking-[0.25em] uppercase text-gold">[ Flash Studio ]</span>
              <button 
                onClick={closeMenu}
                className="text-foreground hover:text-gold transition-colors p-2"
                aria-label="Close Menu"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative z-10 flex flex-col gap-8 px-8 mt-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="font-serif text-4xl sm:text-5xl uppercase tracking-widest text-foreground hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.5, ease: "easeOut" }}
                className="mt-8 inline-block bg-gold text-dark border border-gold px-10 py-4 uppercase tracking-[0.15em] text-sm text-center w-max"
              >
                Réserver une séance
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
