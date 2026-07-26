"use client";

import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyAccountPage() {
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">09 / MEMBER DASHBOARD</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">MY ACCOUNT</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
            
            {/* Profile Card */}
            <div className="md:col-span-4 bg-white/20 dark:bg-white/5 p-6 rounded-sm border border-black/5 dark:border-white/5 text-xs font-semibold uppercase tracking-wider text-foreground/75 space-y-4">
              <div>
                <span className="text-[9px] opacity-60">Soldier Handle</span>
                <h3 className="text-sm font-black text-foreground">GUEST MEMBER</h3>
              </div>
              <div>
                <span className="text-[9px] opacity-60">Registered email</span>
                <p className="lowercase font-bold text-foreground">guest@newlinehalo.com</p>
              </div>
              <div>
                <span className="text-[9px] opacity-60">shipping address</span>
                <p>Balticagade 20</p>
                <p>8000 Aarhus C</p>
                <p>Denmark</p>
              </div>
            </div>

            {/* Orders Card */}
            <div className="md:col-span-8 bg-white/20 dark:bg-white/5 p-6 rounded-sm border border-black/5 dark:border-white/5 space-y-4 text-left">
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground">ORDER HISTORY</h3>
              <div className="border border-black/10 dark:border-white/10 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-bold uppercase tracking-wider gap-3">
                <div>
                  <p className="font-black text-[#FF8500]">ORDER #HL-9824</p>
                  <p className="text-[9px] text-foreground/50">Placed: January 20, 2026 / Total: 139.95 EUR</p>
                </div>
                <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-[9px] font-black rounded-sm">SHIPPED (GLS Tracker: 39284)</span>
              </div>
            </div>

          </div>

          {/* NEW SECTION: Profile Preferences */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] text-left space-y-4">
            <h3 className="text-xs font-black uppercase text-foreground">ACCOUNT SETTINGS &amp; COMMUNICATIONS</h3>
            <div className="flex items-center space-x-3 text-xs font-semibold text-foreground/80">
              <input 
                type="checkbox" 
                id="prefSub" 
                checked={subscribeNewsletter} 
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                className="accent-brand-orange w-4 h-4 cursor-pointer"
              />
              <label htmlFor="prefSub" className="cursor-pointer">
                Subscribe to NEBULA Jægerkorpset training intelligence journals
              </label>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
