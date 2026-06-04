"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";

const categories = ["Tous", "Mariage", "Portrait", "Mode", "Bébés"];

const galleryData = [
  { id: 1, category: "Mariage", src: "/images/gallery/mariage-1.jpg", aspect: "aspect-[3/4]" },
  { id: 2, category: "Portrait", src: "/images/gallery/portrait-1.jpg", aspect: "aspect-[4/5]" },
  { id: 3, category: "Bébés", src: "/images/gallery/bebe-1.jpg", aspect: "aspect-[4/5]" },
  { id: 4, category: "Mode", src: "/images/gallery/mode-1.jpg", aspect: "aspect-[3/4]" },
  { id: 5, category: "Mariage", src: "/images/gallery/mariage-2.jpg", aspect: "aspect-square" },
  { id: 6, category: "Portrait", src: "/images/gallery/portrait-2.jpg", aspect: "aspect-[4/3]" },
  { id: 7, category: "Bébés", src: "/images/gallery/bebe-2.jpg", aspect: "aspect-[3/4]" },
  { id: 8, category: "Mode", src: "/images/gallery/mode-2.jpg", aspect: "aspect-[4/3]" },
  { id: 9, category: "Mariage", src: "/images/gallery/mariage-3.jpg", aspect: "aspect-[3/4]" },
  { id: 10, category: "Portrait", src: "/images/gallery/portrait-3.jpg", aspect: "aspect-square" },
  { id: 11, category: "Bébés", src: "/images/gallery/bebe-3.jpg", aspect: "aspect-[4/3]" },
  { id: 12, category: "Mode", src: "/images/gallery/mode-3.jpg", aspect: "aspect-[3/4]" },
  { id: 13, category: "Portrait", src: "/images/gallery/portrait-4.jpg", aspect: "aspect-[4/5]" },
  { id: 14, category: "Bébés", src: "/images/gallery/bebe-4.jpg", aspect: "aspect-square" },
  { id: 15, category: "Mode", src: "/images/gallery/mode-4.jpg", aspect: "aspect-[4/5]" },
  { id: 16, category: "Bébés", src: "/images/gallery/bebe-5.jpg", aspect: "aspect-[3/4]" },
];

function GalleryImage({ item, onClick }: { item: any, onClick: (item: any) => void }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6 cursor-pointer group relative overflow-hidden cursor-voir will-change-transform"
      onClick={() => onClick(item)}
    >
      <div className={`relative w-full ${item.aspect} bg-dark overflow-hidden`}>
        <Image
          src={item.src}
          alt={`${item.category} photography`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${loaded ? 'blur-0 grayscale-0' : 'blur-xl grayscale scale-110'}`}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gold/70 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Eye size={32} className="text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" strokeWidth={1.5} />
          <span className="text-foreground uppercase tracking-widest text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = galleryData.filter(item => activeTab === "Tous" ? true : item.category === activeTab);

  const openLightbox = (item: any) => {
    const idx = galleryData.findIndex(i => i.id === item.id);
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % galleryData.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + galleryData.length) % galleryData.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [lightboxOpen]);

  return (
    <section className="min-h-screen py-32 bg-dark text-foreground relative" id="gallery">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 overflow-hidden pointer-events-none select-none z-0 opacity-10">
        <span className="text-[10rem] md:text-[20rem] font-serif font-bold text-background leading-none -tracking-[0.05em] block -mt-10 -mr-10">
          02
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="uppercase tracking-[0.2em] text-xs text-gold mb-4 font-semibold">Portfolio</p>
            <h2 className="font-serif text-5xl md:text-7xl">Galerie</h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`uppercase tracking-widest text-xs font-medium px-2 py-2 transition-colors relative ${activeTab === cat ? "text-gold" : "text-foreground hover:text-gold"}`}
              >
                {activeTab === cat && (
                  <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <GalleryImage key={item.id} item={item} onClick={openLightbox} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 flex justify-center">
          <a href="#" className="border border-foreground/30 px-10 py-4 uppercase tracking-[0.15em] text-sm text-center hover:border-gold hover:text-gold transition-colors duration-300">
            Voir toute la galerie
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground hover:text-gold transition-colors z-50">
              <X size={36} strokeWidth={1} />
            </button>

            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-foreground font-serif text-2xl tracking-widest uppercase text-gold z-50">
              {currentIndex + 1} / {galleryData.length}
            </div>

            <button onClick={prevImage} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors p-4 z-50">
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button onClick={nextImage} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors p-4 z-50">
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center px-16">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={galleryData[currentIndex].src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                  alt={`Gallery image ${currentIndex + 1}`}
                />
              </AnimatePresence>
            </div>
            
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-foreground uppercase tracking-[0.3em] text-xs font-semibold opacity-60">
              {galleryData[currentIndex].category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
