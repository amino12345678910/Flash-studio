"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Zap } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Component for magnetic hover effect
function MagneticButton({ children, onClick, className }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      whileHover={{ scale: 1.1, rotate: 2 }}
    >
      {children}
    </motion.button>
  );
}

// Component for typewriter text effect
function TypewriterText({ text, onComplete }: { text: string, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayedText(text);
      onComplete?.();
      return;
    }

    let i = 0;
    setDisplayedText("");
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        onComplete?.();
      }
    }, 15);
    
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial tooltip pop after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Bonjour et bienvenue chez Flash Studio ✨ Comment puis-je vous aider ? Mariage, portrait, shooting, ou réservation ?",
          id: Date.now().toString()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Build conversation history for API
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
      apiMessages.push({ role: "user", content: text });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "Désolé, je rencontre un petit problème technique.";
      
      setMessages(prev => [...prev, { role: "assistant", content: botReply, id: Date.now().toString() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "Désolé, je suis momentanément indisponible.", id: Date.now().toString() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    "Voir les tarifs", "Réserver une séance", "Nos services", "Nous contacter"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 mr-2 bg-dark text-foreground px-4 py-3 rounded-2xl rounded-br-sm border border-gold/30 shadow-2xl relative flex items-start gap-3 backdrop-blur-md cursor-pointer"
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
          >
            <p className="text-sm font-sans pr-4 pt-0.5">Bonjour 👋 Une question ? Je suis là !</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }} 
              className="absolute top-2 right-2 text-foreground/50 hover:text-gold transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mb-6 w-[90vw] md:w-[380px] h-[600px] max-h-[80vh] bg-dark/85 backdrop-blur-xl border border-gold/40 shadow-2xl flex flex-col overflow-hidden"
            style={{ borderRadius: "24px" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex items-center justify-between bg-dark/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B7A3D] to-[#E5CD90] flex items-center justify-center">
                    <span className="font-serif text-dark font-bold text-lg">FS</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-serif text-gold text-lg leading-tight">Assistant Flash Studio</h3>
                  <p className="text-xs text-foreground/60 font-sans">En ligne • Répond en quelques secondes</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-gold/20 text-foreground hover:text-gold transition-colors"
                aria-label="Fermer le chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm font-sans ${
                      msg.role === "user" 
                        ? "bg-[#C9A86A] text-dark rounded-br-sm" 
                        : "bg-[#111111] text-[#F5F1EA] rounded-bl-sm border border-gold/20"
                    }`}
                  >
                    {msg.role === "assistant" && idx === messages.length - 1 ? (
                      <TypewriterText text={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="px-3 py-1.5 text-xs font-sans text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-dark transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#111111] p-4 rounded-2xl rounded-bl-sm flex gap-1 items-center border border-gold/20">
                    <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gold/20 bg-dark/90">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="w-full bg-[#111111] border border-gold/20 text-foreground text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 w-9 h-9 flex items-center justify-center bg-gold text-dark rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Envoyer le message"
                >
                  <Send size={16} className="ml-[-2px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <MagneticButton 
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#9B7A3D] to-[#E5CD90] flex items-center justify-center shadow-[0_0_25px_rgba(201,168,106,0.3)] relative border border-white/20"
      >
        {/* Breathing Ripple effect */}
        <div className="absolute inset-0 rounded-full border border-gold opacity-0 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        
        {isOpen ? (
          <X className="text-dark w-6 h-6 md:w-8 md:h-8" />
        ) : (
          <div className="relative">
            <MessageCircle className="text-dark w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
            <Zap className="text-dark w-3 h-3 absolute -top-1 -right-1 fill-dark" />
          </div>
        )}
      </MagneticButton>
    </div>
  );
}
