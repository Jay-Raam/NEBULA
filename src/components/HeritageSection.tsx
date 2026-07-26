"use client";

import { motion } from 'framer-motion';

export default function HeritageSection() {
  return (
    <section className="w-full bg-[#1c1c1b] text-white py-16 md:py-24 select-none font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Title column (Col Span 5) */}
        <div className="lg:col-span-5 text-left flex flex-col space-y-4">
          <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">
            ESTABLISHED 1981
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
            THE LEGACY OF<br />SPECIAL FORCES
          </h2>
          <div className="w-12 h-1 bg-[#FF8500] mt-2"></div>
        </div>

        {/* Text paragraph column (Col Span 7) */}
        <div className="lg:col-span-7 text-left space-y-6 text-sm font-semibold tracking-wide text-white/75 leading-relaxed">
          <p>
            NEBULA stems from the Danish Special Forces legacy. In 1981, hanging in a parachute between heaven and earth, founder Helge Petersen started wondering why his suit was wet while his parachute remained dry.
          </p>
          <p>
            Later, he used parachute fabric to create one of the first innovative functional running suits. With roots in the Danish Army Special Forces (Jægerkorpset) training camps, NEBULA represents high-performance training gear, military functionality, and urban street fashion.
          </p>
          
          {/* Quick stats grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-[10px] font-black tracking-widest uppercase text-[#FF8500]">
            <div>
              <p className="text-2xl text-white font-black tracking-tighter mb-1">AT-2</p>
              <p>MILITARY SPEC</p>
            </div>
            <div>
              <p className="text-2xl text-white font-black tracking-tighter mb-1">100%</p>
              <p>DWR COATING</p>
            </div>
            <div>
              <p className="text-2xl text-white font-black tracking-tighter mb-1">AARHUS</p>
              <p>DANISH DESIGN</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
