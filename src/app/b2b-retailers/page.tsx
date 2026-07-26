"use client";

import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function B2BPage() {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">03 / B2B PARTNERSHIPS</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">BECOME A RETAILER</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
            <div className="lg:col-span-7 bg-white/20 dark:bg-white/5 p-6 rounded-sm border border-black/5 dark:border-white/5">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-black text-brand-green uppercase tracking-wider">Application Received!</p>
                  <p className="text-xs text-foreground/60 font-semibold uppercase">Our B2B department will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Company Name</label>
                      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none font-medium text-foreground" required />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Work Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none font-medium text-foreground" required />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Retail Message &amp; Channels</label>
                    <textarea rows={4} placeholder="Tell us about your retail channels..." className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none font-medium text-foreground" required></textarea>
                  </div>
                  <button type="submit" className="py-3.5 px-8 bg-black dark:bg-white text-white dark:text-black text-xs font-black tracking-widest uppercase rounded-sm shadow-md">APPLY PARTNERSHIP</button>
                </form>
              )}
            </div>
            <div className="lg:col-span-5 text-xs font-semibold leading-relaxed tracking-wide text-foreground/70 space-y-4">
              <p>NEBULA products are sold in selected boutiques, high-end running hubs, and specialty street fashion stores worldwide.</p>
              <p>As a retail partner, you gain access to premium logistics, exclusive seasonal lookbooks, and customized marketing collaterals.</p>
            </div>
          </div>

          {/* NEW SECTION: Partner Benefits Grid */}
          <div className="border-t border-black/10 dark:border-white/10 pt-16 text-left">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground/50 mb-8">RETAIL PARTNER BENEFITS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold uppercase tracking-wider text-foreground/80">
              <div className="p-4 bg-white/20 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <p className="font-black text-brand-orange mb-1">MARGIN CONTROLS</p>
                <p className="text-[10px] text-foreground/50 font-bold">Attractive seasonal margins.</p>
              </div>
              <div className="p-4 bg-white/20 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <p className="font-black text-brand-orange mb-1">FAST ALLOCATIONS</p>
                <p className="text-[10px] text-foreground/50 font-bold">Direct inventory supply.</p>
              </div>
              <div className="p-4 bg-white/20 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <p className="font-black text-[#FF8500] mb-1">POS GRAPHICS</p>
                <p className="text-[10px] text-foreground/50 font-bold">Banners &amp; visual packages.</p>
              </div>
              <div className="p-4 bg-white/20 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                <p className="font-black text-[#FF8500] mb-1">PRIORITY ACCESS</p>
                <p className="text-[10px] text-foreground/50 font-bold">Early previews of SS26 drops.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
