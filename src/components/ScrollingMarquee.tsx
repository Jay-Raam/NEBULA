"use client";

import React from 'react';

const marqueeItems = [
  "NEBULA PERFORMANCE GEAR",
  "DESIGNED IN AARHUS, DENMARK",
  "SUSTAINABLE CARBON-NEUTRAL DELIVERY",
  "NEW SS26 FORMATION DROP",
  "TESTED BY ATHLETES IN THE WILD",
  "TACTICAL UTILITY SPECIFICATIONS"
];

export default function ScrollingMarquee() {
  return (
    <div className="w-full bg-[#FF8500] text-black py-3 overflow-hidden whitespace-nowrap border-y border-black/10 select-none relative flex">
      {/* Animation Styles injected inline to avoid global CSS clutter */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          animation: marquee 25s linear infinite;
        }
      `}</style>
      
      <div className="animate-marquee-scroll flex space-x-12">
        {/* Double array rendering to allow seamless infinite loops */}
        {[...marqueeItems, ...marqueeItems].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-6">
            <span className="text-[10px] font-black tracking-widest uppercase">
              {text}
            </span>
            <span className="text-[10px] select-none text-black/40 font-black">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
