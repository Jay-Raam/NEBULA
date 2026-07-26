"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const athletes = [
  {
    name: "AGNES FISCHER & SEBASTIAN SIMONS",
    role: "Trail Running Duo",
    diary: "04 / WEEKLY DIARY",
    desc: "Training on the wind-swept sand dunes of Cold Hawaii, pushing technical apparel boundary lines to their extremes.",
    image: "/assets/images/navbar_men.jpg",
    slug: "nebula-profiles-agnes-and-sebastian.html"
  },
  {
    name: "OLIVER HARTKOPP",
    role: "Professional Surf Rider",
    diary: "06 / TRAINING ROUTINES",
    desc: "Balancing off-shore Atlantic storms and coastal trails wearing ripstop storm jackets designed to breathe.",
    image: "/assets/images/navbar_women.jpg",
    slug: "nebula-profiles-oliver-hartkopp.html"
  },
  {
    name: "DIDDE MIE",
    role: "Athletic Conditioning",
    diary: "08 / ATHLETE CHRONICLES",
    desc: "Speed sprints and weight training sequences in Aarhus industrial shipyard hangars to test fabric wear limits.",
    image: "/assets/images/navbar_bags.jpg",
    slug: "nebula-profiles-didde-mie.html"
  }
];

export default function AthleteSpotlight() {
  return (
    <section className="w-full bg-[#EBE9E3] dark:bg-[#151515] text-black dark:text-white py-16 md:py-24 border-t border-black/10 dark:border-white/5 text-left select-none">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">06 / TEAM NEBULA</span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">ATHLETE PROFILE SPOTLIGHT</h2>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed font-semibold max-w-xl">
            Meet the professional runners, surfers, and trainers who design and wear our seasonal gear under extreme outdoor conditions.
          </p>
        </div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {athletes.map((athlete, idx) => (
            <motion.div
              key={idx}
              className="group flex flex-col space-y-4 bg-white/40 dark:bg-white/5 p-5 border border-black/5 dark:border-white/5 rounded-sm relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 rounded-sm">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-102 filter grayscale hover:grayscale-0 transition-all"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  loading="lazy"
                />
              </div>

              {/* Info Block */}
              <div className="flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <span className="text-[9px] font-black tracking-wider text-[#FF8500] uppercase">{athlete.diary}</span>
                  <h3 className="text-base font-black tracking-tight uppercase mt-1 leading-tight">{athlete.name}</h3>
                  <p className="text-[10px] font-bold text-black/50 dark:text-white/50 tracking-wider uppercase mt-0.5">{athlete.role}</p>
                  <p className="text-xs text-black/70 dark:text-white/75 mt-3 leading-relaxed font-semibold">{athlete.desc}</p>
                </div>

                <Link
                  href={`/${athlete.slug}`}
                  className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                >
                  <span>READ ATHLETE JOURNAL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
