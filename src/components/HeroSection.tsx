"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] md:h-[85vh] lg:h-screen overflow-hidden bg-black select-none font-sans">
      
      {/* Video Loop Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        <video 
          className="hidden md:block w-full h-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/hero_desk_poster.png"
        >
          <source src="/assets/videos/hero_desk.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video 
          className="block md:hidden w-full h-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/hero_mob_poster.png"
        >
          <source src="/assets/videos/hero_mob.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/20" />
      </div>

      {/* Hero Content Overlay (Positioned at bottom) */}
      <div className="absolute inset-x-0 bottom-0 max-w-[1600px] mx-auto px-4 md:px-8 pb-8 md:pb-12 lg:pb-16 text-white z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4"
        >
          {/* Title (Left) */}
          <div className="md:max-w-[40%] text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-none">
              EVERYDAY MISSIONS
            </h1>
          </div>

          {/* Description (Center) */}
          <div className="md:max-w-[40%] text-left md:text-center">
            <p className="text-xs md:text-sm font-extrabold tracking-widest leading-relaxed text-white/95 uppercase max-w-sm md:mx-auto">
              MEET NEBULA PROFILES AGNES FISCHER &amp; SEBASTIAN SIMONS
            </p>
          </div>

          {/* Button (Right) */}
          <div className="flex justify-start md:justify-end">
            <Link 
              href="/nebula-profiles-agnes-and-sebastian.html"
              className="py-3 px-8 md:py-3.5 md:px-10 bg-white hover:bg-white/90 text-black text-xs font-black tracking-widest uppercase rounded-full transition-all hover:scale-102 shadow-lg"
            >
              LEARN MORE
            </Link>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
