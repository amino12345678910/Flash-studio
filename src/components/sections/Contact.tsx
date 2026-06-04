"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Instagram, Facebook, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", type: "", date: "", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormState({ name: "", email: "", phone: "", type: "", date: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-gold transition-colors duration-300 peer placeholder-transparent";
  const labelClass = "absolute left-0 -top-3.5 text-foreground/50 text-xs uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold pointer-events-none";

  return (
    <section className="relative min-h-screen py-32 px-6 md:px-12 bg-background text-foreground overflow-hidden" id="contact">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none z-0 w-full text-center opacity-[0.02]">
        <span className="text-[12vw] font-sans font-bold leading-none uppercase tracking-widest whitespace-nowrap">
          FLASH STUDIO
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 md:gap-24">
        {/* Left Form */}
        <div className="w-full lg:w-7/12">
          <p className="uppercase tracking-[0.2em] text-xs text-gold mb-4 font-semibold">Contact</p>
          <h2 className="font-serif text-5xl md:text-7xl mb-12">Réservons votre séance.</h2>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-dark/50 border border-gold/30 p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-gold mb-4">Demande Envoyée</h3>
                <p className="text-foreground/70 font-light max-w-md mx-auto">
                  Merci pour votre message. Nous vous contacterons très prochainement pour sublimer vos projets.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input type="text" name="name" id="name" required placeholder="Nom" value={formState.name} onChange={handleChange} className={inputClass} />
                    <label htmlFor="name" className={labelClass}>Nom Complet</label>
                  </div>
                  <div className="relative">
                    <input type="email" name="email" id="email" required placeholder="Email" value={formState.email} onChange={handleChange} className={inputClass} />
                    <label htmlFor="email" className={labelClass}>Email</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input type="tel" name="phone" id="phone" required placeholder="Téléphone" value={formState.phone} onChange={handleChange} className={inputClass} />
                    <label htmlFor="phone" className={labelClass}>Téléphone</label>
                  </div>
                  <div className="relative">
                    <select name="type" id="type" required value={formState.type} onChange={handleChange} className={`w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-gold transition-colors duration-300 uppercase tracking-widest text-xs ${formState.type ? 'text-foreground' : 'text-foreground/50'}`}>
                      <option value="" disabled className="bg-dark text-foreground/50">Type de séance</option>
                      <option value="mariage" className="bg-dark text-foreground">Mariage</option>
                      <option value="portrait" className="bg-dark text-foreground">Portrait</option>
                      <option value="mode" className="bg-dark text-foreground">Mode</option>
                      <option value="bebes" className="bg-dark text-foreground">Bébés & Famille</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <input type="date" name="date" id="date" placeholder="Date" value={formState.date} onChange={handleChange} className={`w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-gold transition-colors duration-300 uppercase tracking-widest text-xs ${formState.date ? 'text-foreground' : 'text-foreground/50'}`} />
                </div>

                <div className="relative">
                  <textarea name="message" id="message" required placeholder="Message" rows={4} value={formState.message} onChange={handleChange} className={`${inputClass} resize-none`}></textarea>
                  <label htmlFor="message" className={labelClass}>Votre Projet</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gold text-dark border border-gold px-12 py-4 uppercase tracking-[0.15em] text-sm font-semibold hover:bg-transparent hover:text-gold transition-colors duration-300 disabled:opacity-50 flex items-center justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Envoyer la demande"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Info */}
        <div className="w-full lg:w-4/12 flex flex-col justify-center">
          <div className="bg-dark p-10 md:p-14 border border-foreground/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[100px] rounded-full"></div>
            
            <h3 className="font-serif text-3xl mb-8">Informations</h3>
            
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-[10px] text-foreground/50 mb-2">Téléphone</span>
                <a href="tel:22255400" className="text-xl md:text-2xl font-serif text-gold hover:text-white transition-colors flex items-center gap-3">
                  <Phone size={20} /> 22 255 400
                </a>
              </div>
              
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-[10px] text-foreground/50 mb-2">Email</span>
                <a href="mailto:contact@flashstudio.com" className="text-lg font-light hover:text-gold transition-colors">
                  contact@flashstudio.com
                </a>
              </div>
              
              <div className="flex flex-col">
                <span className="uppercase tracking-widest text-[10px] text-foreground/50 mb-4">Studio</span>
                <p className="text-sm font-light leading-relaxed text-foreground/80">
                  12 Avenue de l'Art<br />
                  Quartier du Lac, Tunis<br />
                  Sur rendez-vous uniquement
                </p>
              </div>

              <div className="pt-8 border-t border-foreground/10 space-y-4">
                <a href="#" className="flex items-center justify-center gap-2 w-full bg-[#0084FF] hover:bg-[#0074e0] text-white py-3 rounded-full transition-colors text-sm font-medium">
                  <MessageCircle size={18} /> Discuter sur Messenger
                </a>
                
                <div className="flex gap-4 pt-4">
                  <a href="#" className="w-10 h-10 border border-foreground/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-foreground/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
