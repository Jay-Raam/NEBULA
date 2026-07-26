"use client";

import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          {/* Header Block */}
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">01 / BRAND HISTORY</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">ABOUT NEWLINE NEBULA</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          {/* Narrative Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 pt-4">
            <div className="space-y-4">
              <p>NEBULA stems from a Danish Special Forces legacy. Hanging in a parachute between heaven and earth in 1981, founder Helge Petersen noticed his suit was wet while his parachute remained dry.</p>
              <p>This spark of curiosity led to the creation of technical sportswear utilizing parachute materials. Today, NEBULA represents high-performance training gear, military functionality, and urban street style.</p>
            </div>
            <div className="space-y-4">
              <p>Every design is built in Aarhus, Denmark, ensuring rigorous standards for ventilation, storage utility, and visibility. The collection merges military aesthetics (named after the Jægerkorpset base AT-2) with athletic needs.</p>
            </div>
          </div>

          {/* NEW SECTION: Core Values Grid */}
          <div className="border-t border-black/10 dark:border-white/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-sm font-black text-brand-orange">01 / MILITARY UTILITY</span>
              <p className="text-xs font-semibold text-foreground/75 leading-relaxed">
                Garments feature Jægerkorpset-grade tactical layouts including utility zipper sleeves, MOLLE strap integration, and water-repellent zippers.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-sm font-black text-brand-orange">02 / COASTAL PROTECTION</span>
              <p className="text-xs font-semibold text-foreground/75 leading-relaxed">
                Engineered for changing winds on Danish shores, fabrics incorporate DWR water-resistant barriers and high-density thread weaves.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-sm font-black text-brand-orange">03 / PERFORMANCE COMFORT</span>
              <p className="text-xs font-semibold text-foreground/75 leading-relaxed">
                We integrate quick-dry microfiber structures and OrthoLite shoe cushioning, facilitating endurance training routines.
              </p>
            </div>
          </div>

          {/* NEW SECTION: Aarhus Lab Teaser */}
          <div className="border-t border-black/10 dark:border-white/10 pt-16 bg-black/5 dark:bg-white/5 p-6 rounded-sm">
            <h3 className="text-xs font-black uppercase text-foreground mb-2">THE AARHUS DESIGN LAB</h3>
            <p className="text-xs font-semibold text-foreground/70 leading-relaxed max-w-3xl">
              Our lab in Aarhus C acts as the testing ground for every single prototype. Undergoing rigorous training assessments against maritime winds, salt water, and cold rainfall, only the most resilient gear makes it to the final collection.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
