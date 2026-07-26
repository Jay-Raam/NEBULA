"use client";

import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SizeGuidePage() {
  const [sizeUnit, setSizeUnit] = useState<'cm' | 'in'>('cm');

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">08 / SIZING CHART</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">SIZE MATRIX</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>
          
          <div className="flex space-x-2 select-none">
            <button onClick={() => setSizeUnit('cm')} className={`py-1.5 px-4 text-[10px] font-black rounded-full transition-colors ${sizeUnit === 'cm' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground'}`}>CM</button>
            <button onClick={() => setSizeUnit('in')} className={`py-1.5 px-4 text-[10px] font-black rounded-full transition-colors ${sizeUnit === 'in' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground'}`}>INCHES</button>
          </div>

          <div className="space-y-6 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 max-w-[800px]">
            <h3 className="text-xs font-black uppercase text-foreground">Apparel Sizes (Unisex)</h3>
            <table className="w-full border-collapse border border-black/10 dark:border-white/10">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest">
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Size</th>
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Chest</th>
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Waist</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black/10 dark:border-white/10 p-3 font-black">XS</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '84-88' : '33-34.5'}</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '72-76' : '28-30'}</td>
                </tr>
                <tr>
                  <td className="border border-black/10 p-3 font-black">S</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '88-92' : '34.5-36'}</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '76-80' : '30-31.5'}</td>
                </tr>
                <tr>
                  <td className="border border-black/10 p-3 font-black">M</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '92-96' : '36-37.5'}</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '80-84' : '31.5-33'}</td>
                </tr>
                <tr>
                  <td className="border border-black/10 p-3 font-black">L</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '96-100' : '37.5-39'}</td>
                  <td className="border border-black/10 p-3">{sizeUnit === 'cm' ? '84-88' : '33-34.5'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* NEW SECTION: How to Measure instructions */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] text-left space-y-4">
            <h3 className="text-xs font-black uppercase text-foreground">HOW TO MEASURE CORRECTLY</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold text-foreground/70 leading-relaxed">
              <div>
                <p className="font-black text-brand-orange mb-1">01 / CHEST</p>
                <p>Measure around the fullest part of your chest, keeping the tape horizontal and relaxed under your arms.</p>
              </div>
              <div>
                <p className="font-black text-brand-orange mb-1">02 / WAIST</p>
                <p>Measure around the narrowest part of your waistline, generally where your body bends side to side.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
