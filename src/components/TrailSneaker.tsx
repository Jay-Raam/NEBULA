"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TrailSneaker() {
  return (
    <section className="relative w-full aspect-[4/3] md:aspect-auto md:h-[75vh] lg:h-[85vh] overflow-hidden bg-black select-none font-sans">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image 
            src="/assets/images/trail_desk.png"
            alt="TRAIL SNEAKER 2.0"
            fill
            className="object-cover opacity-95"
            sizes="100vw"
            priority
          />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0 w-full h-full">
          <Image 
            src="/assets/images/trail_mob.png"
            alt="TRAIL SNEAKER 2.0"
            fill
            className="object-cover opacity-95"
            sizes="100vw"
            priority
          />
        </div>

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Sneaker Content Footer Overlay (Horizontal on desktop, stacked on mobile) */}
      <div className="absolute inset-x-0 bottom-0 max-w-[1600px] mx-auto px-4 md:px-8 pb-8 md:pb-12 lg:pb-16 text-white z-10">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4"
        >
          {/* Left Title */}
          <div className="md:max-w-[30%] text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-none uppercase">
              TRAIL SNEAKER 2.0
            </h2>
          </div>

          {/* Center Info Text */}
          <div className="md:max-w-[40%] text-left md:text-center">
            <p className="text-xs md:text-sm font-extrabold tracking-widest leading-relaxed text-white/95 uppercase max-w-sm md:mx-auto">
              INTRODUCING NEW COLOURWAYS AND UPDATED COMFORT
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            <Link 
              href="/accessories/shoes"
              className="py-3 px-6 md:py-3.5 md:px-8 bg-white hover:bg-white/90 text-black text-xs font-black tracking-widest uppercase rounded-full shadow-lg transition-all hover:scale-102"
            >
              Shop sneakers
            </Link>
            <Link 
              href="/nebula-trail-sneaker.html"
              className="py-3 px-6 md:py-3.5 md:px-8 bg-white hover:bg-white/90 text-black text-xs font-black tracking-widest uppercase rounded-full shadow-lg transition-all hover:scale-102"
            >
              Learn more
            </Link>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
