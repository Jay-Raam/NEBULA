"use client";

import Link from 'next/link';

export default function PromoBar() {
  const tickerItems = [
    "FREE SHIPPING ON ORDERS OVER 50 EUR",
    "DELIVERY WITHIN 3-6 BUSINESS DAYS",
    "FREE SHIPPING ON ORDERS OVER 50 EUR",
    "DELIVERY WITHIN 3-6 BUSINESS DAYS",
    "FREE SHIPPING ON ORDERS OVER 50 EUR",
    "DELIVERY WITHIN 3-6 BUSINESS DAYS",
    "FREE SHIPPING ON ORDERS OVER 50 EUR",
    "DELIVERY WITHIN 3-6 BUSINESS DAYS",
  ];

  return (
    <div className="w-full flex flex-col z-50 relative font-sans">
      {/* Orange discount banner */}
      <Link 
        href="/sale" 
        className="w-full bg-[#FF8500] hover:bg-[#ff9426] transition-colors py-2 text-center text-black flex flex-col items-center justify-center select-none"
      >
        <span className="font-black text-lg md:text-xl tracking-widest leading-none">FINAL SALE</span>
        <span className="font-medium text-[11px] md:text-xs tracking-wider mt-1 uppercase">
          Save extra 10% with code: <strong className="font-extrabold">EXTRA10</strong>
        </span>
      </Link>

      {/* Black scrolling ticker marquee */}
      <div className="w-full bg-black dark:bg-[#121211] text-white py-2 overflow-hidden border-b border-white/10 dark:border-white/5">
        <div className="flex w-full overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center select-none">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center text-[10px] md:text-[11px] font-bold tracking-widest px-8">
                {item}
                <span className="ml-16 w-1 h-1 bg-white inline-block"></span>
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {tickerItems.map((item, idx) => (
              <span key={`dup-${idx}`} className="inline-flex items-center text-[10px] md:text-[11px] font-bold tracking-widest px-8">
                {item}
                <span className="ml-16 w-1 h-1 bg-white inline-block"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
