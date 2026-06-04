"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          // Optional: Dispatch event when loading is complete
          window.dispatchEvent(new Event("preloaderComplete"));
        }, 800);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark text-gold"
          initial={{ y: "0%" }}
          exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="font-serif text-3xl md:text-5xl tracking-[0.25em] mb-8 overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              [ FLASH STUDIO ]
            </motion.div>
          </div>
          <div className="font-sans text-sm tracking-widest tabular-nums">
            {progress}%
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
