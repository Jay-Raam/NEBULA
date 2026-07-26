"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function SplitTeasers() {
  const teasers = [
    {
      title: "T-shirts",
      href: "/men/clothing/t-shirts",
      images: {
        desk: "/assets/images/tshirts_desk.png",
        mob: "/assets/images/tshirts_mob.png"
      },
      delay: 0.1,
      xOffset: -40
    },
    {
      title: "Activewear",
      href: "/women/categories/activewear",
      images: {
        desk: "/assets/images/activewear_desk.png",
        mob: "/assets/images/activewear_mob.png"
      },
      delay: 0.2,
      xOffset: 40
    }
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 select-none font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {teasers.map((teaser) => (
          <motion.div
            key={teaser.title}
            initial={{ opacity: 0, x: teaser.xOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: teaser.delay, ease: [0.16, 1, 0.3, 1] }}
            className="relative group aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm bg-black cursor-pointer"
          >
            {/* Link wrapper */}
            <Link href={teaser.href} className="block w-full h-full">
              
              {/* Desktop Image */}
              <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={teaser.images.desk}
                  alt={teaser.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                />
              </div>

              {/* Mobile Image */}
              <div className="block md:hidden absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={teaser.images.mob}
                  alt={teaser.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 transition-opacity duration-500 group-hover:from-black/70" />

              {/* Centered Heading */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase transition-all duration-500 group-hover:scale-103 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {teaser.title}
                </h3>
              </div>

              {/* Action Button (Bottom Right) */}
              <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black hover:bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#FF8500] group-hover:text-black">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>

            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
