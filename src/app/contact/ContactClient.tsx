"use client";

import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const quickFaqs = [
    {
      q: "HOW LONG DOES SHIPPING TO DENMARK TAKE?",
      a: "Standard shipping takes 1-3 business days. Free shipping is available for all orders over 99 EUR."
    },
    {
      q: "CAN I RETURN OUTDOOR/RAIN GEAR AFTER TRIAL?",
      a: "Yes, you have 30 days to return any items in their original, un-worn packaging. Contact support to request a free return label."
    },
    {
      q: "ARE SIZES STANDARD COMPARED TO GENERAL ACTIVEWEAR?",
      a: "NEBULA gear runs slightly athletic/slim-fit. If you prefer a loose fit, we recommend ordering one size larger."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] text-black font-sans selection:bg-brand-orange selection:text-white font-sans">
      <PromoBar />
      <Header />
      
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">03 / CONTACT</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">CONNECT WITH NEBULA</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            <div className="lg:col-span-7 bg-white/20 p-6 rounded-sm border border-black/5">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <span className="text-2xl">✓</span>
                  <h3 className="text-sm font-black tracking-widest uppercase">MESSAGE DISPATCHED</h3>
                  <p className="text-xs text-black/60 font-semibold max-w-sm mx-auto leading-relaxed">
                    Thank you. Your message has been sent to our Aarhus support desk. We will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-black tracking-widest uppercase">FULL NAME</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-white border border-black/15 px-3 py-2 text-xs focus:outline-none focus:border-brand-orange font-semibold uppercase text-black" required />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-black tracking-widest uppercase">EMAIL ADDRESS</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-black/15 px-3 py-2 text-xs focus:outline-none focus:border-brand-orange font-semibold uppercase text-black" required />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-black tracking-widest uppercase">MESSAGE</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="bg-white border border-black/15 px-3 py-2.5 text-xs focus:outline-none focus:border-brand-orange font-semibold uppercase text-black" required></textarea>
                  </div>
                  <button type="submit" className="py-3.5 px-8 bg-black text-white text-xs font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-all shadow-md cursor-pointer">SEND MESSAGE</button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col space-y-6 text-xs font-semibold uppercase tracking-wider text-black/70">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black mb-1">HEADQUARTERS</h3>
                <p>hummel A/S</p>
                <p>Balticagade 20</p>
                <p>8000 Aarhus C</p>
                <p>Denmark</p>
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black mb-1">PHONE</h3>
                <p className="font-black text-[#FF8500] text-sm">+45 88 70 49 60</p>
                <p className="text-[9px] opacity-60">Mon-Fri 9:00 AM - 3:00 PM</p>
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-black mb-1">EMAIL SUPPORT</h3>
                <p className="lowercase font-bold">support@nebula.com</p>
              </div>
            </div>
          </div>

          {/* Quick Help FAQ Accordion */}
          <div className="border-t border-black/10 pt-16 max-w-[800px] text-left">
            <h3 className="text-xs font-black tracking-widest uppercase text-black/50 mb-6">QUICK HELP FAQS</h3>
            <div className="space-y-4">
              {quickFaqs.map((faq, idx) => (
                <div key={idx} className="border-b border-black/10 pb-4">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer">
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && <p className="mt-2 text-xs leading-relaxed text-black/75 font-semibold pt-1">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
