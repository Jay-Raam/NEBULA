"use client";

import { useState } from 'react';
import Link from 'next/link';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQClient() {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'sizing'>('shipping');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] text-black font-sans selection:bg-brand-orange selection:text-white font-sans">
      <PromoBar />
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="text-left space-y-12">
          
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">05 / HELPDESK</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">FREQUENTLY ASKED QUESTIONS</h1>
            <div className="w-12 h-1 bg-[#FF8500]"></div>
          </div>

          {/* Search Query Bar */}
          <div className="max-w-[600px] border-b border-black/10 pb-4">
            <label className="text-[9px] font-black uppercase text-black/50 block mb-1">Search Help topics</label>
            <input 
              type="text" 
              placeholder="TYPE YOUR INQUIRY (e.g. returns, sizes...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-black/15 px-3 py-2 w-full text-xs font-semibold focus:outline-none focus:border-brand-orange text-black uppercase"
            />
          </div>
          
          <div className="flex space-x-4 border-b border-black/10 text-[10px] font-black tracking-widest uppercase pb-2 select-none">
            {(['shipping', 'returns', 'sizing'] as const).map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setOpenIndex(null); }} className={`pb-2 pr-4 border-b-2 transition-colors cursor-pointer ${activeTab === tab ? 'border-brand-orange text-black' : 'border-transparent text-black/50 hover:text-black'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-4 max-w-[800px]">
            {activeTab === 'shipping' && [
              { q: "How long does shipping standard delivery take?", a: "Standard shipping takes 3-6 business days. Express shipping delivers packages in 1-2 business days." },
              { q: "Do you ship internationally?", a: "Yes, we ship to most European countries and internationally. Shipping costs and custom fees are calculated at checkout." }
            ].filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
              <div key={idx} className="border-b border-black/10 pb-4">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer">
                  <span>{item.q}</span>
                  <span>{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && <p className="mt-2 text-xs leading-relaxed text-black/75 font-semibold pt-1">{item.a}</p>}
              </div>
            ))}
            {activeTab === 'returns' && [
              { q: "How do I return an item?", a: "Place items in original box, generate return labels via DHL portal, drop at local shop. Free within 14 days." },
              { q: "Can I exchange for a different size?", a: "Yes, register exchange request in our return portal or contact support within 14 days." }
            ].filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
              <div key={idx} className="border-b border-black/10 pb-4">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer">
                  <span>{item.q}</span>
                  <span>{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && <p className="mt-2 text-xs leading-relaxed text-black/75 font-semibold pt-1">{item.a}</p>}
              </div>
            ))}
            {activeTab === 'sizing' && [
              { q: "Are NEBULA sizes unisex?", a: "Most collections are unisex. Unisex sizes run slightly larger for women and smaller for men; check size chart." }
            ].filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
              <div key={idx} className="border-b border-black/10 pb-4">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer">
                  <span>{item.q}</span>
                  <span>{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && <p className="mt-2 text-xs leading-relaxed text-black/75 font-semibold pt-1">{item.a}</p>}
              </div>
            ))}
          </div>

          {/* Customer Support Card */}
          <div className="border-t border-black/10 pt-16 text-left max-w-[800px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider">STILL HAVE QUESTIONS?</h4>
              <p className="text-[10px] text-black/50 font-bold uppercase tracking-wider mt-1">Our support agents in Denmark are standing by.</p>
            </div>
            <Link href="/contact" className="py-3 px-6 bg-black text-white text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all">
              GO TO HELP CENTER
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
