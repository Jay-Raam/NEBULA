"use client";

import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">07 / RETURNING POLICY</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">RETURNS PROCEDURES</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="space-y-6 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 max-w-[800px]">
            <p>We provide a 14-day return window starting from the day you receive your package. All items must be returned unworn and in original technical packaging bags.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="border border-black/15 dark:border-white/15 p-4 rounded-sm bg-white/20 dark:bg-white/5">
                <span className="text-lg font-black text-[#FF8500] block mb-2">01 / REGISTRATION</span>
                <p className="text-[10px]">Contact customer care or enter order details in DHL portal to generate returns labels.</p>
              </div>
              <div className="border border-black/15 dark:border-white/15 p-4 rounded-sm bg-white/20 dark:bg-white/5">
                <span className="text-lg font-black text-[#FF8500] block mb-2">02 / DISPATCH</span>
                <p className="text-[10px]">Affix return barcodes and drop package off at GLS/DHL service shops nearby.</p>
              </div>
              <div className="border border-black/15 dark:border-white/15 p-4 rounded-sm bg-white/20 dark:bg-white/5">
                <span className="text-lg font-black text-[#FF8500] block mb-2">03 / REFUND</span>
                <p className="text-[10px]">Refund is authorized in original bank card in 7-10 processing days.</p>
              </div>
            </div>
          </div>

          {/* NEW SECTION: Returns Cost Overview */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] text-left">
            <h3 className="text-xs font-black uppercase text-foreground/50 mb-4">RETURNS COST OVERVIEW</h3>
            <table className="w-full border-collapse border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-[9px] font-black uppercase">
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Region</th>
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Return Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black/10 dark:border-white/10 p-3">Denmark &amp; EU</td>
                  <td className="border border-black/10 dark:border-white/10 p-3 text-brand-green font-black">FREE (Prepaid Label)</td>
                </tr>
                <tr>
                  <td className="border border-black/10 dark:border-white/10 p-3">Norway, Switzerland, UK</td>
                  <td className="border border-black/10 dark:border-white/10 p-3">9.95 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
