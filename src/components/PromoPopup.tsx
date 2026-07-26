"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const seen = localStorage.getItem('nebula_welcome_promo_seen');
      if (!seen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 5000); // 5 seconds delay
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('nebula_welcome_promo_seen', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Auto close after 2.5 seconds upon successful signup
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[500px] bg-[#EBE9E3] border border-black/10 p-8 md:p-10 rounded-sm shadow-2xl z-10 text-black text-center font-sans overflow-hidden"
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-black hover:text-brand-orange transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] font-black tracking-widest text-brand-orange uppercase">WELCOME EXCLUSIVE</span>
                <h3 className="text-2xl font-black uppercase tracking-tight">JOIN THE MISSION</h3>
                <div className="w-12 h-0.5 bg-brand-orange mx-auto"></div>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 py-6"
                >
                  <span className="text-3xl text-brand-green">✓</span>
                  <h4 className="text-xs font-black tracking-widest uppercase">DISCOUNT UNLOCKED</h4>
                  <p className="text-[10px] text-black/60 font-semibold uppercase leading-relaxed max-w-xs mx-auto">
                    Use code <span className="text-black font-black text-xs">EXTRA10</span> at checkout for 10% off your first order.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <p className="text-xs leading-relaxed text-black/70 font-semibold uppercase tracking-wider max-w-sm mx-auto">
                    Sign up to receive Jægerkorpset training journals and product drops. Claim a <span className="text-brand-orange font-black">10% Welcome Discount</span> on your first order.
                  </p>

                  <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <div className="relative flex items-center">
                      <input 
                        type="email" 
                        placeholder="ENTER YOUR EMAIL" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-black/15 rounded-sm py-3 px-4 text-xs focus:outline-none focus:border-brand-orange text-black font-semibold uppercase"
                        required 
                      />
                      <Mail className="absolute right-4 w-4 h-4 text-black/40" />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-black hover:bg-black/95 text-white text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all cursor-pointer"
                    >
                      SUBSCRIBE &amp; UNLOCK
                    </button>
                  </form>
                </div>
              )}

              <div className="text-[9px] font-bold text-black/40 uppercase tracking-widest pt-2">
                100% SECURE CHECKOUT // DANISH ACTIVEWEAR DESIGN
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
