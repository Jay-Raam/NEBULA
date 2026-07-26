"use client";

import { Wind, Shield, Droplets, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const specs = [
  {
    icon: Wind,
    title: "3D TEMPERATURE GRID",
    desc: "Engineered mesh micro-channels that actively channel body heat away during high-output sessions while maintaining core heat insulation."
  },
  {
    icon: Shield,
    title: "MILITARY RIPSTOP NYLON",
    desc: "Constructed with dual-reinforced grid stitching to restrict punctures and tears during rugged forest trails and wilderness expeditions."
  },
  {
    icon: Droplets,
    title: "DWR RAIN SHIELD",
    desc: "A fluorine-free, durable water-repellent layer that causes water to bead up and roll off instantly, keeping you dry under heavy downpours."
  },
  {
    icon: Zap,
    title: "COMPRESSION CORE STRETCH",
    desc: "High-density weave providing secure muscle compression to reduce fatigue while ensuring 4-way elastic fluidity during movement."
  }
];

export default function TechSpecs() {
  return (
    <section className="w-full bg-[#1a1a19] text-white py-16 md:py-24 border-t border-white/5 text-left select-none">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">04 / MATERIAL ENGINEERING</span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">NEBULA FABRIC TECHNOLOGY</h2>
          <p className="text-xs text-white/60 leading-relaxed font-semibold max-w-xl">
            Designed for outdoor endurance, our proprietary textiles are certified, tested, and optimized at our Aarhus training grounds to survive wind, water, and rough terrain.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, idx) => {
            const IconComponent = spec.icon;
            return (
              <motion.div
                key={idx}
                className="flex flex-col space-y-4 p-6 border border-white/10 rounded-sm bg-white/5 hover:border-[#FF8500]/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black tracking-wider uppercase">{spec.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-semibold">{spec.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
