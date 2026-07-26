"use client";

import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('orders');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quickFaqs = [
    { q: "How can I track my package?", a: "Once your package is shipped from Aarhus, a GLS or DHL tracking number will be emailed to you immediately." },
    { q: "Can I modify my shipping address?", a: "To ensure rapid delivery, orders are dispatched quickly. Contact support within 15 minutes of placing an order to adjust shipping details." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">02 / CONTACT US</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">SUPPORT CENTER</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
            <div className="lg:col-span-7 bg-white/20 dark:bg-white/5 p-6 rounded-sm border border-black/5 dark:border-white/5">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-black text-brand-green uppercase tracking-wider">Message Received!</p>
                  <p className="text-xs text-foreground/60 font-semibold uppercase">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none focus:border-brand-orange font-medium text-foreground" required />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none focus:border-brand-orange font-medium text-foreground" required />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Subject</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none focus:border-brand-orange uppercase font-bold text-foreground">
                      <option value="orders">Orders &amp; Shipping</option>
                      <option value="returns">Returns &amp; Exchanges</option>
                      <option value="b2b">Retail Partnership</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 text-xs focus:outline-none focus:border-brand-orange font-medium text-foreground" required></textarea>
                  </div>
                  <button type="submit" className="py-3.5 px-8 bg-black dark:bg-white text-white dark:text-black text-xs font-black tracking-widest uppercase rounded-sm hover:opacity-90 transition-all shadow-md">SEND MESSAGE</button>
                </form>
              )}
            </div>
            <div className="lg:col-span-5 flex flex-col space-y-6 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1">HEADQUARTERS</h3>
                <p>hummel A/S</p>
                <p>Balticagade 20</p>
                <p>8000 Aarhus C</p>
                <p>Denmark</p>
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1">PHONE</h3>
                <p className="font-black text-[#FF8500] text-sm">+45 88 70 49 60</p>
                <p className="text-[9px] opacity-60">Mon-Fri 9:00 AM - 3:00 PM</p>
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1">EMAIL SUPPORT</h3>
                <p className="lowercase font-bold">support@newlinehalo.com</p>
              </div>
            </div>
          </div>

          {/* NEW SECTION: Quick Help FAQ Accordion */}
          <div className="border-t border-black/10 dark:border-white/10 pt-16 max-w-[800px] text-left">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground/50 mb-6">QUICK HELP FAQS</h3>
            <div className="space-y-4">
              {quickFaqs.map((faq, idx) => (
                <div key={idx} className="border-b border-black/10 dark:border-white/10 pb-4">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider focus:outline-none">
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && <p className="mt-2 text-xs leading-relaxed text-foreground/75 font-semibold pt-1">{faq.a}</p>}
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
