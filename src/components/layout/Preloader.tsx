"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 30) + 10;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          window.dispatchEvent(new Event("preloaderComplete"));
        }, 250);
      }
      setProgress(current);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark text-gold backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="font-serif text-3xl md:text-5xl tracking-[0.25em] mb-8 overflow-hidden">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              [ FLASH STUDIO ]
            </motion.div>
          </div>
          <div className="font-sans text-sm tracking-widest tabular-nums text-gold/80">
            {progress}%
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
