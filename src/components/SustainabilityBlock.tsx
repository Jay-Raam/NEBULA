"use client";

import { Leaf, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SustainabilityBlock() {
  const points = [
    {
      icon: Leaf,
      title: "100% RECYCLED ACTIVE FIBERS",
      desc: "All training gear and activewear mesh sections are woven from certified marine-recycled plastic fibers, reducing footprint impacts by 60%."
    },
    {
      icon: Truck,
      title: "CARBON-NEUTRAL DELIVERIES",
      desc: "Every order is packaged in biodegradable shipping sleeves and shipped carbon-neutrally through our partnership with DHL GoGreen."
    },
    {
      icon: RefreshCw,
      title: "CIRCULAR LIFETIME LIFECYCLE",
      desc: "Return old NEBULA products at the end of their lifecycle for recycling and get an instant 15% reward voucher towards your next gear setup."
    }
  ];

  return (
    <section className="w-full bg-[#EBE9E3] text-black py-16 md:py-24 border-t border-black/10 text-left select-none">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">08 / RESPONSIBILITY</span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">SUSTAINABLE PERFORMANCE</h2>
          <p className="text-xs text-black/60 leading-relaxed font-semibold max-w-xl">
            We build gear designed to last for trails and track, engineered under circular guidelines that protect the environments we explore.
          </p>
        </div>

        {/* Grid points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={idx}
                className="flex flex-col space-y-4 p-6 bg-white border border-black/5 rounded-sm shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black tracking-widest uppercase">{point.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed font-semibold">{point.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
