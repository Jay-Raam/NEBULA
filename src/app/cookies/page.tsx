import type { Metadata } from 'next';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "NEBULA | Cookies Declarations & Tracking Policies",
  description: "Review NEBULA's cookies policy, including how functional cookies sustain active shopping sessions and account preferences.",
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] text-black font-sans selection:bg-brand-orange selection:text-white font-sans">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12 max-w-[800px]">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">10 / LEGAL DETAILS</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">COOKIES POLICY</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          {/* TL;DR Executive Summary */}
          <div className="bg-brand-orange/5 border border-brand-orange/20 p-5 rounded-sm">
            <h4 className="text-xs font-black text-brand-orange uppercase mb-1">TL;DR EXECUTIVE SUMMARY</h4>
            <p className="text-[10px] text-black/75 leading-relaxed font-semibold uppercase tracking-wider">
              We leverage functional cookies to sustain shopping bags and preserve account logins. Analytical tracking helps optimize design configurations. Toggles are managed in your browser.
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold leading-relaxed tracking-wide text-black/75 pt-4">
            <p>By using the NEBULA e-commerce site, you fully accept and agree to comply with our regulations, terms, and cookies declarations.</p>
            <p>We process all data safely in accordance with Danish and European GDPR frameworks, ensuring that payment records, billing codes, and address entries remain highly confidential.</p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
