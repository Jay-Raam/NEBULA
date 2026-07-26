"use client";

import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SS26Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">12 / SS26 COLLECTION</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">NEBULA ATHLETES &amp; FORMATION</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="space-y-4 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 pt-4">
            <p>The SS26 collection focuses on technical running formations, blending specialized athletic gear configurations with premium street aesthetics.</p>
            <p>Built with materials designed for low visibility and quick dry capabilities, SS26 is dedicated to athletes demanding peak utility from their gear.</p>
          </div>

          {/* NEW SECTION: SS26 Technical Fabric specs */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-5 bg-white/20 dark:bg-white/5 border border-black/10">
              <h4 className="text-[10px] font-black text-brand-orange uppercase mb-1">RIPSTOP MICROFABRICS</h4>
              <p className="text-[10px] text-foreground/60 leading-relaxed font-semibold">
                Woven synthetic fibers provide extreme structural resistance while keeping the weight close to zero grams.
              </p>
            </div>
            <div className="p-5 bg-white/20 dark:bg-white/5 border border-black/10">
              <h4 className="text-[10px] font-black text-[#FF8500] uppercase mb-1">3D MESH VENTING</h4>
              <p className="text-[10px] text-foreground/60 leading-relaxed font-semibold">
                Targeted ventilation panels under the armpit and lower waist ensure core temperature stays balanced during active treks.
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
