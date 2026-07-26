"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSignUpError('Please provide a valid email address');
      return;
    }
    if (!acceptedTerms) {
      setSignUpError('Please accept terms and conditions in order to continue');
      return;
    }
    
    setSignUpError('');
    setIsSignedUp(true);
  };

  const navColumn1 = {
    title: "01 / NEBULA",
    links: [
      { name: "About NEBULA", href: "/about-nebula-pd.html" },
      { name: "Contact", href: "/contact" },
      { name: "Become a retailer", href: "/b2b-retailers" },
      { name: "NEBULA journals", href: "/nebula-journals.html" }
    ]
  };

  const navColumn2 = {
    title: "02 / Customer Service",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Delivery", href: "/delivery" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "My Account", href: "/my-account" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Cookies", href: "/cookies" }
    ]
  };

  const navColumn3 = {
    title: "03 / NEBULA PROFILES",
    links: [
      { name: "Agnes Fischer & Sebastian Simons", href: "/nebula-profiles-agnes-and-sebastian.html" },
      { name: "NEBULA athletes", href: "/nebula-ss26-formation.html" },
      { name: "Oliver Hartkopp", href: "/nebula-profiles-oliver-hartkopp.html" },
      { name: "Sandra Martens", href: "/nebula-profiles-sandra-martens.html" },
      { name: "Didde-Mie", href: "/nebula-profiles-didde-mie.html" }
    ]
  };

  return (
    <footer id="footercontent" className="w-full bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white border-t border-black/10 dark:border-white/5 font-sans select-none relative">
      
      {/* Footer Top Marquee Ticker */}
      <div className="w-full bg-black dark:bg-[#121211] text-white py-2 overflow-hidden border-b border-white/10 dark:border-white/5">
        <div className="flex w-full overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center">
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

      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
        
        {/* Address and Socials Block (Col Span 3) */}
        <div className="lg:col-span-3 flex flex-col space-y-6 text-left order-last sm:order-first">

          <Link href="/" className="text-xl font-black tracking-[0.25em] uppercase text-foreground hover:opacity-85 transition-opacity">
            NEBULA
          </Link>

          <div className="text-xs font-semibold tracking-wider leading-relaxed text-black/60 dark:text-white/60">
            <span>© HUMMEL A/S</span><br />
            <span>Balticagade 20</span><br />
            <span>8000 Aarhus C</span><br />
            <span>DENMARK</span>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-black dark:text-white">
              FOLLOW US
            </h4>
            <div className="flex items-center space-x-3">
              <Link 
                href="https://www.facebook.com/newline.halo/" 
                target="_blank"
                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Facebook"
              >
                <Image src="/assets/images/facebook.svg" alt="Facebook" width={18} height={18} className="dark:filter dark:invert" />
              </Link>
              <Link 
                href="https://www.instagram.com/newline.halo/?hl=da" 
                target="_blank"
                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Instagram"
              >
                <Image src="/assets/images/instagram.svg" alt="Instagram" width={18} height={18} className="dark:filter dark:invert" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Column 1: NEBULA (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-2">
            {navColumn1.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn1.links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-xs font-semibold tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2: Customer Service (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-2">
            {navColumn2.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn2.links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-xs font-semibold tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3: Profiles (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-2">
            {navColumn3.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn3.links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-xs font-semibold tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup (Col Span 3) */}
        <div className="lg:col-span-3 flex flex-col text-left space-y-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-2">
            SUBSCRIBE
          </h3>

          <AnimatePresence mode="wait">
            {!isSignedUp ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe} 
                className="flex flex-col space-y-3"
              >
                <p className="text-[11px] font-extrabold tracking-wider leading-relaxed text-black/60 dark:text-white/60 uppercase">
                  SUBSCRIBE TO TAKE 10% OFF ALL NEW ARRIVALS
                </p>
                
                <div className="flex flex-col relative w-full">
                  <input 
                    type="email" 
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-orange dark:focus:border-brand-orange text-foreground font-medium"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="footer-terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-3 h-3 rounded-sm accent-brand-orange"
                  />
                  <label htmlFor="footer-terms" className="text-[10px] text-black/50 dark:text-white/50 leading-tight select-none">
                    I have read and accept the <Link href="/newsletter-terms-conditions.html" className="underline hover:text-brand-orange">terms and conditions</Link> for the NEBULA newsletter
                  </label>
                </div>

                {signUpError && (
                  <p className="text-[10px] font-extrabold text-red-500 tracking-wide">
                    {signUpError}
                  </p>
                )}

                <button 
                  type="submit"
                  className="py-2.5 bg-[#FF6600] hover:bg-[#ff771a] text-white text-[11px] font-black tracking-widest uppercase rounded-sm shadow-md transition-colors w-full flex items-center justify-center space-x-2 select-none"
                >
                  <span>SIGN UP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 border border-brand-green/30 bg-brand-green/5 rounded-md text-center"
              >
                <CheckCircle className="w-10 h-10 text-brand-green mb-3" />
                <h4 className="text-xs font-black tracking-widest uppercase text-foreground mb-2">
                  THANK YOU!
                </h4>
                <p className="text-[11px] text-foreground/75 leading-relaxed tracking-wide">
                  You’ve successfully signed up for the newsletter and will receive your 10% discount code shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="w-full border-t border-black/10 dark:border-white/5 bg-black/5 dark:bg-black/20 py-6">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* CVR (Left) */}
          <div className="text-[10px] font-bold tracking-widest text-black/50 dark:text-white/50 uppercase">
            <span>CVR: 81198411</span> <span className="mx-2">/</span> <span>ALL RIGHTS RESERVED</span>
          </div>

          {/* Region / Logo Selector (Right) */}
          <div className="flex items-center space-x-6 text-[10px] font-black tracking-wider uppercase text-black dark:text-white">
            
            <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-75 transition-opacity">
              <Globe className="w-3.5 h-3.5" />
              <span>International (EUR)</span>
            </div>

            <Link href="http://www.thornico.com/" target="_blank" className="relative block w-14 h-5 opacity-55 hover:opacity-85 transition-opacity">
              <Image 
                src="/assets/images/thornico_logo.svg" 
                alt="Thornico" 
                fill 
                className="object-contain dark:filter dark:invert" 
              />
            </Link>

          </div>

        </div>
      </div>

    </footer>
  );
}
