"use client";

import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DeliveryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">06 / SHIPPING INFO</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">DELIVERY OPTIONS</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="space-y-6 text-xs font-semibold leading-relaxed tracking-wide text-foreground/75 max-w-[800px]">
            <table className="w-full border-collapse border border-black/10 dark:border-white/10">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest">
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Courier Option</th>
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Time</th>
                  <th className="border border-black/10 dark:border-white/10 p-3 text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black/10 dark:border-white/10 p-3 font-black uppercase">GLS Home Delivery</td>
                  <td className="border border-black/10 dark:border-white/10 p-3">3-6 Business Days</td>
                  <td className="border border-black/10 dark:border-white/10 p-3 font-black text-brand-green">FREE ON ORDERS &gt; 50 EUR (Else 4.95)</td>
                </tr>
                <tr>
                  <td className="border border-black/10 dark:border-white/10 p-3 font-black uppercase">DHL Express Cargo</td>
                  <td className="border border-black/10 dark:border-white/10 p-3">1-2 Business Days</td>
                  <td className="border border-black/10 dark:border-white/10 p-3 font-black text-foreground">9.95 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* NEW SECTION: Sustainable shipping card */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] flex items-center space-x-4 bg-brand-green/5 p-6 rounded-sm border border-brand-green/20">
            <span className="text-2xl">🌱</span>
            <div>
              <h4 className="text-xs font-black uppercase text-brand-green tracking-wider">CARBON-NEUTRAL COURIERS</h4>
              <p className="text-[10px] text-foreground/60 leading-relaxed font-semibold uppercase tracking-wide mt-1">
                Both GLS and DHL shipments are offset for CO2 neutrality, supporting global environmental logistics campaigns.
              </p>
            </div>
          </div>

          {/* NEW SECTION: Shipping Restrictions */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] text-left">
            <h3 className="text-xs font-black uppercase text-foreground/50 mb-4">DELIVERY POLICIES &amp; RESTRICTIONS</h3>
            <ul className="list-disc pl-4 text-xs font-semibold text-foreground/70 space-y-2 leading-relaxed">
              <li>Deliveries are not dispatched during official Danish holidays.</li>
              <li>A signature may be required upon receipt of DHL Express boxes.</li>
              <li>Addresses outside the EU (e.g. UK, Switzerland) might incur custom VAT duties at the border.</li>
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
