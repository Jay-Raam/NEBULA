"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Footer() {
  const navColumn1 = {
    title: "NEBULA",
    links: [
      { name: "About NEBULA", href: "/about-nebula-pd.html" },
      { name: "NEBULA Journals", href: "/nebula-journals.html" },
      { name: "Careers", href: "/careers" },
      { name: "Responsibility", href: "/responsibility" }
    ]
  };

  const navColumn2 = {
    title: "SHOP",
    links: [
      { name: "Men", href: "/men" },
      { name: "Women", href: "/women" },
      { name: "Accessories", href: "/accessories" },
      { name: "New Arrivals", href: "/men/new-arrivals" },
      { name: "Sale", href: "/sale" }
    ]
  };

  const navColumn3 = {
    title: "HELP",
    links: [
      { name: "Contact Support", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Delivery Info", href: "/delivery" },
      { name: "Returns Policy", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" }
    ]
  };

  return (
    <footer id="footercontent" className="w-full bg-[#EBE9E3] text-black border-t border-black/10 font-sans select-none relative">
      {/* Infinite scrolling branding text ticker marquee */}
      <div className="w-full bg-black text-white py-2 overflow-hidden border-b border-white/10">
        <div className="animate-marquee flex whitespace-nowrap text-[10px] font-black tracking-widest uppercase">
          <span className="mx-4">NEBULA ACTIVEWEAR // AARHUS C</span>
          <span className="mx-4">JÆGERKORPSET TACTICAL DESIGN // AT-2</span>
          <span className="mx-4">MILITARY ENDURANCE EQUIPMENT</span>
          <span className="mx-4">NEBULA ACTIVEWEAR // AARHUS C</span>
          <span className="mx-4">JÆGERKORPSET TACTICAL DESIGN // AT-2</span>
          <span className="mx-4">MILITARY ENDURANCE EQUIPMENT</span>
          <span className="mx-4">NEBULA ACTIVEWEAR // AARHUS C</span>
          <span className="mx-4">JÆGERKORPSET TACTICAL DESIGN // AT-2</span>
          <span className="mx-4">MILITARY ENDURANCE EQUIPMENT</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">

        {/* Company Identity (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <Link href="/" className="text-xl font-black tracking-[0.25em] uppercase text-black hover:opacity-85 transition-opacity">
            NEBULA
          </Link>

          <div className="text-xs font-semibold tracking-wider leading-relaxed text-black/60">
            <span>© NEBULA A/S</span><br />
            <span>Balticagade 20</span><br />
            <span>8000 Aarhus C</span><br />
            <span>DENMARK</span>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-black">
              FOLLOW US
            </h4>
            <div className="flex items-center space-x-3">
              <Link
                href="https://www.facebook.com/nebula.official/"
                target="_blank"
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                aria-label="Facebook"
              >
                <Image src="/assets/images/facebook.svg" alt="Facebook" width={18} height={18} />
              </Link>
              <Link
                href="https://www.instagram.com/nebula.official/?hl=da"
                target="_blank"
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                aria-label="Instagram"
              >
                <Image src="/assets/images/instagram.svg" alt="Instagram" width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Column 1: NEBULA (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black border-b border-black/10 pb-2">
            {navColumn1.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn1.links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-black/60 hover:text-black hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2: SHOP (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black border-b border-black/10 pb-2">
            {navColumn2.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn2.links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-black/60 hover:text-black hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3: HELP (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black border-b border-black/10 pb-2">
            {navColumn3.title}
          </h3>
          <ul className="flex flex-col space-y-2">
            {navColumn3.links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-black/60 hover:text-black hover:pl-1 transition-all duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
          <h3 className="text-xs font-black tracking-widest uppercase text-black border-b border-black/10 pb-2">
            NEWSLETTER
          </h3>
          <div className="flex flex-col space-y-3">
            <p className="text-[11px] font-extrabold tracking-wider leading-relaxed text-black/60 uppercase">
              Sign up to receive Jægerkorpset training journals and product drops.
            </p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white border border-black/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-brand-orange text-black font-semibold uppercase"
                  required
                />
                <button type="submit" className="absolute right-2 text-black hover:text-brand-orange transition-colors" aria-label="Subscribe">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Sub Footer */}
      <div className="w-full border-t border-black/10 bg-black/5 py-6">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left select-none">
          <div className="text-[10px] font-bold tracking-widest text-black/50 uppercase">
            © {new Date().getFullYear()} NEBULA A/S. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-black tracking-wider uppercase text-black">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:underline">Terms &amp; Conditions</Link>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
