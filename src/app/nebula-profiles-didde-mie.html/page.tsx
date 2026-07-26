"use client";

import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DiddeMiePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">11 / ATHLETE BIOGRAPHY</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">DIDDE-MIE</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start text-left font-semibold">
            <div className="md:col-span-8 space-y-4 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 font-semibold">
              <p>NEBULA profiles represent athletes testing limits. Every silhouette has been verified in high efficiency training runs, surf sessions, and active workouts.</p>
              <p>Aarhus base specifications support these athletes, optimizing breathability and DWR water resistant coating in coastal climates.</p>
            </div>
            <div className="md:col-span-4 bg-white/20 dark:bg-white/5 p-4 rounded-sm border border-black/5 dark:border-white/5">
              <h4 className="text-[10px] font-black text-brand-orange uppercase tracking-wider mb-2">FAVORITE GEAR</h4>
              <ul className="text-xs font-bold uppercase tracking-wider space-y-2 text-foreground/80">
                <li>• NEBULA TRAIL SNEAKER 2.0</li>
                <li>• WAFFLE TECH SHORTS</li>
              </ul>
            </div>
          </div>

          {/* NEW SECTION: Weekly Training Calendar */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 text-left">
            <h3 className="text-xs font-black uppercase text-foreground/50 mb-6">ATHLETE LOGS: TRAINING WEEK</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-wider text-foreground/80">
              <div className="p-3 bg-white/20 dark:bg-white/5 border border-black/10">
                <span className="text-brand-orange">MON / CARDIO</span>
                <p className="mt-1 font-semibold text-[9px] lowercase font-sans">15km seaside runs</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-white/5 border border-black/10">
                <span className="text-brand-orange">WED / STRENGTH</span>
                <p className="mt-1 font-semibold text-[9px] lowercase font-sans">weighted jumps &amp; core</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-white/5 border border-black/10">
                <span className="text-[#FF8500]">FRI / DRILLS</span>
                <p className="mt-1 font-semibold text-[9px] lowercase font-sans">interval sprints</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-white/5 border border-black/10">
                <span className="text-[#FF8500]">SUN / ENDURANCE</span>
                <p className="mt-1 font-semibold text-[9px] lowercase font-sans">long duration outdoor trek</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
