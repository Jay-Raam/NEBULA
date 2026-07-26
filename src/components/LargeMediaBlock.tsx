"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LargeMediaBlock() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 select-none font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-black/5 dark:border-white/5 bg-[#EBE9E3] dark:bg-[#20201f] rounded-sm"
      >
        
        {/* Text Block (Left - Col Span 5 on desktop) */}
        <div className="md:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start text-left text-black dark:text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-tight uppercase mb-4">
            INTRODUCING:<br />NEBULA JOURNALS
          </h2>
          
          <p className="text-xs md:text-sm font-semibold tracking-wide text-black/60 dark:text-white/60 mb-8 leading-relaxed max-w-md">
            An archive of former collabs and NEBULA profiles. Dive into the history right here!
          </p>

          <Link 
            href="/nebula-journals.html"
            className="py-3 px-8 md:py-3.5 md:px-10 bg-white hover:bg-white/95 text-black hover:scale-102 border border-black/10 dark:border-white/5 text-xs font-black tracking-widest uppercase rounded-full shadow-md transition-all"
          >
            READ MORE
          </Link>
        </div>

        {/* Media Block (Right - Col Span 7 on desktop) */}
        <div className="md:col-span-7 relative aspect-video md:aspect-auto min-h-[300px] md:min-h-[450px]">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image 
              src="/assets/images/journals_desk.png"
              alt="INTRODUCING: NEBULA JOURNALS"
              fill
              className="object-cover opacity-95"
              sizes="(min-width: 768px) 60vw, 100vw"
              loading="lazy"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image 
              src="/assets/images/journals_mob.png"
              alt="INTRODUCING: NEBULA JOURNALS"
              fill
              className="object-cover opacity-95"
              sizes="100vw"
              loading="lazy"
            />
          </div>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
        </div>

      </motion.div>
    </section>
  );
}
