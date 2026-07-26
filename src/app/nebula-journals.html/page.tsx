"use client";

import Image from 'next/image';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function JournalsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">04 / THE JOURNALS</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">NEBULA EDITORIALS</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          {/* NEW SECTION: Spotlight Editorial Hero */}
          <div className="relative aspect-video md:aspect-[21/9] w-full bg-black overflow-hidden rounded-sm group cursor-pointer border border-black/10 dark:border-white/10">
            <Image src="/assets/images/trail_desk.png" alt="Spotlight article background" fill className="object-cover opacity-80 transition-transform duration-[1200ms] group-hover:scale-102" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end text-left text-white">
              <span className="text-[8px] font-black text-brand-orange tracking-widest uppercase mb-1">FEATURED SPOTLIGHT / JAN 26</span>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight max-w-xl group-hover:text-brand-orange transition-colors">
                TACTICAL COLD-WEATHER RUNNING PARAMETERS
              </h2>
              <p className="text-[10px] text-white/70 max-w-lg mt-2 font-medium">
                An investigation into thermal ventilation fabrics, sweat expulsion indices, and DWR protections tested along Denmark's frosty shorelines.
              </p>
            </div>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { title: "TACTICAL COLD-WEATHER RUNNING TIPS", date: "JANUARY 24, 2026", desc: "How to manage body moisture and heat during high intensity training camps in sub-zero winter temperatures.", img: "/assets/images/trail_desk.png" },
              { title: "SS26 DESIGN: MILITARY MEETS STREET STYLE", date: "DECEMBER 12, 2025", desc: "A detailed review of cut configurations and colors used in the upcoming SS26 training silhouettes.", img: "/assets/images/tshirts_desk.png" },
              { title: "INSIDE THE TRAINING: JÆGERKORPSET CAMP", date: "OCTOBER 08, 2025", desc: "A rare look at mental endurance parameters tested inside special force training drills.", img: "/assets/images/navbar_men.jpg" }
            ].map((post, idx) => (
              <div key={idx} className="group border border-black/10 dark:border-white/10 p-4 bg-white/20 dark:bg-white/5 rounded-sm flex flex-col space-y-3 cursor-pointer text-left">
                <div className="relative aspect-video w-full overflow-hidden bg-black/10 rounded-sm">
                  <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-103" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[8px] font-black text-[#FF8500]">{post.date}</span>
                  <h3 className="text-xs font-black uppercase tracking-tight line-clamp-1 group-hover:text-brand-orange transition-colors">{post.title}</h3>
                  <p className="text-[10px] text-foreground/60 leading-relaxed font-semibold">{post.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* NEW SECTION: Journal Newsletter banner */}
          <div className="border-t border-black/10 dark:border-white/10 pt-16 text-center max-w-[600px] mx-auto space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground">STAY ON MISSION</h3>
            <p className="text-xs font-semibold text-foreground/60 leading-relaxed">
              Sign up to receive our monthly journals, product drop dates, and training specifications straight to your inbox.
            </p>
            <form className="flex space-x-2 pt-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="YOUR EMAIL ADDRESS" className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2 text-xs flex-grow focus:outline-none focus:border-brand-orange font-semibold uppercase text-foreground" required />
              <button type="submit" className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-sm">SUBSCRIBE</button>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
