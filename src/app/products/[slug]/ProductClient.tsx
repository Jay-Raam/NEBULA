"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Star,
  X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define Props for Dynamic Page using React 19 Promise style
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Product Interface
interface ProductData {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  description: string[];
  colors: { name: string; image: string; hex: string }[];
  sizes: string[];
  gallery: string[];
}

// Product Database Mock
export const productDatabase: Record<string, ProductData> = {
  "nebula-lightweight-trail-sneaker-2.0": {
    id: "prod-trail-20",
    title: "NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0",
    price: 139.95,
    oldPrice: 169.95,
    badge: "SALE",
    description: [
      "Lightweight materials with DWR water-resistant coating.",
      "High stability midsole structure for demanding terrains.",
      "Great shock absorption with Ortholite foam cushion.",
      "Excellent traction featuring Vibram rubber compound outsoles.",
      "Reflective accents for low-light outdoor visibility."
    ],
    colors: [
      { name: "Gunmetal", image: "/assets/images/navbar_shoes.jpg", hex: "#4A4D4A" },
      { name: "Lunar Rock", image: "/assets/images/trail_desk.png", hex: "#B9BBB6" }
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
    gallery: ["/assets/images/navbar_shoes.jpg", "/assets/images/trail_desk.png"]
  },
  "nebula-waffle-tech-shorts": {
    id: "prod-shorts-tech",
    title: "NEBULA WAFFLE TECH SHORTS",
    price: 79.95,
    badge: "NEW",
    description: [
      "Elasticated waistband with adjustable custom drawstrings.",
      "Breathable waffle fabric structures for sweat ventilation.",
      "Spacious side zipper pockets and back phone pockets.",
      "Relaxed design details for active-training or casual comfort."
    ],
    colors: [
      { name: "Slate Grey", image: "/assets/images/tshirts_desk.png", hex: "#5C5E62" },
      { name: "Dark Green", image: "/assets/images/navbar_men.jpg", hex: "#2A3A2C" }
    ],
    sizes: ["2XS", "XS", "S", "M", "L", "XL", "2XL"],
    gallery: ["/assets/images/tshirts_desk.png", "/assets/images/navbar_men.jpg"]
  },
  "nebula-activewear-tights": {
    id: "prod-active-tights",
    title: "NEBULA ACTIVEWEAR TIGHTS",
    price: 89.95,
    description: [
      "High waistband design providing support and muscle security.",
      "Recycled active wear compression fabrics with stretch stretch.",
      "Integrated side pockets for secure phone and cards storage.",
      "Sweat-wicking technology keeping you cool during training."
    ],
    colors: [
      { name: "Deep Black", image: "/assets/images/navbar_women.jpg", hex: "#111111" },
      { name: "Army Green", image: "/assets/images/activewear_desk.png", hex: "#3B4033" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    gallery: ["/assets/images/navbar_women.jpg", "/assets/images/activewear_desk.png"]
  },
  "nebula-bags": {
    id: "prod-tactical-bag",
    title: "NEBULA TACTICAL BACKPACK",
    price: 109.95,
    badge: "BESTSELLER",
    description: [
      "Heavyweight tactical canvas fabric resisting rips and tears.",
      "Molle loop system for utility attachments.",
      "Spacious main compartment with a padded 16 inch laptop sleeve.",
      "Water-repellent security zipper covers."
    ],
    colors: [
      { name: "Olive Drab", image: "/assets/images/navbar_bags.jpg", hex: "#4B5320" }
    ],
    sizes: ["ONE SIZE"],
    gallery: ["/assets/images/navbar_bags.jpg"]
  }
};

export default function ProductClient({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { addToCart } = useCart();

  // Retrieve product or default to sneaker
  const product = productDatabase[slug] || productDatabase["nebula-lightweight-trail-sneaker-2.0"];

  // Page local states
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || '');
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'washing'>('description');
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModel, setShowModel] = useState<'men' | 'women'>('men');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  // Load and track recently viewed products in local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recently_viewed_products');
      let list = stored ? JSON.parse(stored) : [];
      list = list.filter((item) => item !== slug);
      list.unshift(slug);
      const trimmed = list.slice(0, 5);
      localStorage.setItem('recently_viewed_products', JSON.stringify(trimmed));
      const resolvedList = trimmed
        .filter((s) => s !== slug)
        .map((s) => {
          const item = productDatabase[s];
          if (!item) return null;
          return {
            slug: s,
            title: item.title,
            price: item.price,
            img: item.colors[0]?.image || item.gallery[0] || '/assets/images/navbar_shoes.jpg'
          };
        })
        .filter(Boolean);
      setRecentlyViewed(resolvedList);
    } catch (e) {
      print('Error tracking recently viewed products', e)
    }
  }, [slug]);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    setShowSizeWarning(false);
    
    // Add item to global cart
    addToCart({
      id: `${product.id}-${activeColor}`,
      title: product.title,
      price: product.price,
      size: selectedSize,
      image: product.colors.find(c => c.name === activeColor)?.image || product.gallery[0],
      slug: slug
    });
  };

  // Alternative Products list
  const alternatives = [
    { title: "NEBULA GRAPHIC DIVISION SHORTS", price: 89.95, img: "/assets/images/tshirts_desk.png", slug: "nebula-waffle-tech-shorts" },
    { title: "NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0", price: 139.95, img: "/assets/images/navbar_shoes.jpg", slug: "nebula-lightweight-trail-sneaker-2.0" },
    { title: "NEBULA WOMEN SCOUT TANK", price: 59.95, img: "/assets/images/navbar_women.jpg", slug: "nebula-activewear-tights" },
    { title: "NEBULA TACTICAL BACKPACK", price: 109.95, img: "/assets/images/navbar_bags.jpg", slug: "nebula-bags" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        
        {/* Dynamic PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Gallery (Col Span 7) */}
          <div className="lg:col-span-7 relative group bg-white/20 dark:bg-white/5 p-4 rounded-sm border border-black/5 dark:border-white/5 select-none">
            
            {/* Gallery Image Display */}
            <div className="relative aspect-square w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src={product.gallery[activeImageIndex]}
                    alt={`${product.title} view ${activeImageIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-102"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bookmark Favorited Star Icon */}
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-white dark:bg-[#181817] text-foreground shadow-md hover:scale-105 transition-transform"
                aria-label="Add to wishlist"
              >
                <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground/70'}`} />
              </button>

              {/* Swipe Indicators */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-[#181817]/70 text-foreground flex items-center justify-center hover:bg-white dark:hover:bg-[#181817] shadow-md transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-[#181817]/70 text-foreground flex items-center justify-center hover:bg-white dark:hover:bg-[#181817] shadow-md transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {product.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${activeImageIndex === idx ? 'bg-black dark:bg-white w-4' : 'bg-foreground/30'}`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Details & buy options (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col text-left space-y-6">
            
            {/* Header section info */}
            <div>
              {product.badge && (
                <span className="inline-block text-[9px] font-black tracking-widest bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-sm uppercase mb-3.5">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none text-foreground mb-3">
                {product.title}
              </h1>
              <div className="flex items-center space-x-3 text-sm font-extrabold tracking-wider">
                <span className="text-foreground">{product.price.toFixed(2)} EUR</span>
                {product.oldPrice && (
                  <span className="text-foreground/40 line-through">{product.oldPrice.toFixed(2)} EUR</span>
                )}
              </div>
            </div>

            {/* Model Gender Selection */}
            {slug === 'nebula-lightweight-trail-sneaker-2.0' && (
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-black tracking-wider uppercase text-foreground/50">Show on model</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowModel('men')}
                    className={`py-2 px-6 text-xs font-black tracking-widest uppercase rounded-full transition-colors ${showModel === 'men' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground'}`}
                  >
                    Men
                  </button>
                  <button 
                    onClick={() => setShowModel('women')}
                    className={`py-2 px-6 text-xs font-black tracking-widest uppercase rounded-full transition-colors ${showModel === 'women' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground'}`}
                  >
                    Women
                  </button>
                </div>
              </div>
            )}

            {/* Color selection swatches */}
            {product.colors.length > 0 && (
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-black tracking-wider uppercase text-foreground/50">Color: {activeColor}</span>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button 
                      key={color.name}
                      onClick={() => setActiveColor(color.name)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-6 h-6 rounded-full border shadow-sm transition-transform ${activeColor === color.name ? 'scale-115 border-brand-orange outline outline-2 outline-offset-1 outline-brand-orange' : 'border-black/20 dark:border-white/20'}`}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizing grid selectors */}
            <div className="flex flex-col space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-black tracking-wider uppercase">
                <span className="text-foreground/50">Choose Size</span>
                <button onClick={() => setShowSizeModal(true)} className="underline hover:text-brand-orange transition-colors cursor-pointer uppercase">Size Chart /</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeWarning(false);
                    }}
                    className={`py-2 px-2 border text-center text-xs font-black tracking-wide rounded-sm transition-all select-none ${selectedSize === size ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-black/15 dark:border-white/15 bg-white/20 dark:bg-white/5 hover:border-foreground text-foreground'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Fit Indicator */}
            <div className="border-t border-b border-black/10 dark:border-white/10 py-3 text-[10px] font-bold uppercase tracking-wider text-foreground/75 space-y-1 bg-black/5 dark:bg-white/5 px-4 rounded-sm">
              <p>⚡ FIT TYPE: True to Size</p>
              <p className="text-[9px] opacity-60 font-semibold uppercase tracking-wider leading-relaxed">
                Model Agnes is 176cm wearing size S. Model Sebastian is 185cm wearing size L.
              </p>
            </div>

            {/* Add to Bag and error outputs */}
            <div className="flex flex-col space-y-3 pt-2">
              <AnimatePresence>
                {showSizeWarning && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-black text-red-500 tracking-wide uppercase"
                  >
                    Please select a size to proceed
                  </motion.p>
                )}
              </AnimatePresence>

              <button 
                onClick={handleAddToBag}
                className="py-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>{selectedSize ? 'ADD TO BAG' : 'SELECT SIZE'}</span>
              </button>
            </div>

            {/* Technical expandable details tabs */}
            <div className="pt-4 border-t border-black/15 dark:border-white/15">
              <div className="flex border-b border-black/10 dark:border-white/10 text-[10px] font-black tracking-widest uppercase">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`pb-2.5 pr-4 border-b-2 transition-colors ${activeTab === 'description' ? 'border-brand-orange text-foreground' : 'border-transparent text-foreground/45 hover:text-foreground'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors ${activeTab === 'shipping' ? 'border-brand-orange text-foreground' : 'border-transparent text-foreground/45 hover:text-foreground'}`}
                >
                  Shipping &amp; Returns
                </button>
                <button 
                  onClick={() => setActiveTab('washing')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors ${activeTab === 'washing' ? 'border-brand-orange text-foreground' : 'border-transparent text-foreground/45 hover:text-foreground'}`}
                >
                  Washing &amp; Materials
                </button>
              </div>

              <div className="py-4 text-xs leading-relaxed tracking-wide text-foreground/75 font-semibold">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.ul 
                      key="desc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="list-disc pl-4 space-y-2 text-left"
                    >
                      {product.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </motion.ul>
                  )}
                  {activeTab === 'shipping' && (
                    <motion.div 
                      key="ship"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3 text-left"
                    >
                      <p>✓ FREE SHIPPING ON ORDERS OVER 50 EUR</p>
                      <p>✓ DELIVERY WITHIN 3-6 BUSINESS DAYS</p>
                      <p>✓ 14 DAYS FULL REFUND RETURNS POLICY</p>
                    </motion.div>
                  )}
                  {activeTab === 'washing' && (
                    <motion.div 
                      key="wash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3 text-left"
                    >
                      <p>• Machine wash cold at 30°C / Wash inside out</p>
                      <p>• Do not tumble dry / Do not bleach</p>
                      <p>• Materials: 100% Recycled active fibers and synthetic mesh linings</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick trust metrics logos */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-black/10 dark:border-white/10 text-[9px] font-black tracking-wider uppercase text-foreground/50">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                <span>2 Year Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-brand-orange" />
                <span>14 Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-foreground" />
                <span>Original Quality</span>
              </div>
            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 md:mt-28 border-t border-black/10 dark:border-white/10 pt-16 text-left">
          <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-10">
            CUSTOMER REVIEWS &amp; RATINGS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Reviews Summary Column (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black tracking-tighter">4.8</span>
                <span className="text-sm font-extrabold text-foreground/50">/ 5.0</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF6600] text-[#FF6600]" />
                ))}
              </div>
              <p className="text-xs font-semibold text-foreground/60">Based on 142 certified reviews</p>

              {/* Rating Bars list */}
              <div className="space-y-2 pt-4 border-t border-black/10 dark:border-white/10 text-[10px] font-black tracking-wider uppercase text-foreground/60">
                <div className="flex items-center justify-between">
                  <span className="w-10 font-black">5 Star</span>
                  <div className="flex-1 mx-3 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-[#FF6600]"></div>
                  </div>
                  <span className="w-8 text-right font-black text-foreground">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-10 font-black">4 Star</span>
                  <div className="flex-1 mx-3 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[10%] h-full bg-[#FF6600]"></div>
                  </div>
                  <span className="w-8 text-right font-black text-foreground">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="w-10 font-black">3 Star</span>
                  <div className="flex-1 mx-3 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[2%] h-full bg-[#FF6600]"></div>
                  </div>
                  <span className="w-8 text-right font-black text-foreground">2%</span>
                </div>
              </div>
            </div>

            {/* Individual Reviews Cards List (Col Span 8) */}
            <div className="lg:col-span-8 flex flex-col space-y-6 divide-y divide-black/10 dark:divide-white/10 text-left">
              
              {/* Review 1 */}
              <div className="pt-6 first:pt-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black tracking-widest uppercase">Perfect Fit and Material</h4>
                    <div className="flex space-x-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FF6600] text-[#FF6600]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-foreground/45 uppercase tracking-widest text-right">
                    <span>AGNES F.</span>
                    <span className="block text-brand-green mt-0.5 font-extrabold text-[9px] tracking-wider">VERIFIED BUYER</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-foreground/75 font-semibold tracking-wide mt-2">
                  The material is extremely premium and holds up well during running sessions. The Vibram outsoles are super stable. Worth every cent.
                </p>
              </div>

              {/* Review 2 */}
              <div className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black tracking-widest uppercase">Great Sneaker, Slightly Narrow</h4>
                    <div className="flex space-x-0.5 mt-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FF6600] text-[#FF6600]" />
                      ))}
                      <Star className="w-3 h-3 text-foreground/20" />
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-foreground/45 uppercase tracking-widest text-right">
                    <span>SEBASTIAN S.</span>
                    <span className="block text-foreground/50 mt-0.5 font-extrabold text-[9px] tracking-wider">GUEST REVIEW</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-foreground/75 font-semibold tracking-wide mt-2">
                  I love the design and stability. It runs slightly narrow, so if you are between sizes, I recommend sizing up.
                </p>
              </div>

              {/* Review 3 */}
              <div className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-black tracking-widest uppercase">Absolute Recommendation</h4>
                    <div className="flex space-x-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FF6600] text-[#FF6600]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-foreground/45 uppercase tracking-widest text-right">
                    <span>MARTIN H.</span>
                    <span className="block text-brand-green mt-0.5 font-extrabold text-[9px] tracking-wider">VERIFIED BUYER</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-foreground/75 font-semibold tracking-wide mt-2">
                  Excellent comfort, water-resistant coating actually works great in rain. Worth every penny.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Alternative Product Cards Section */}
        <section className="mt-20 md:mt-28 border-t border-black/10 dark:border-white/10 pt-16">
          <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-10 text-left">
            ALTERNATIVE PRODUCTS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {alternatives.map((altItem, idx) => (
              <motion.div 
                key={idx}
                className="group flex flex-col space-y-3 cursor-pointer text-left"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/products/${altItem.slug}`} className="block w-full">
                  <div className="relative aspect-square w-full overflow-hidden bg-white/20 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5">
                    <Image 
                      src={altItem.img} 
                      alt={altItem.title} 
                      fill 
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-103" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/5 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xs font-black tracking-tight uppercase line-clamp-1 group-hover:text-brand-orange transition-colors">
                      {altItem.title}
                    </h3>
                    <span className="text-[10px] font-extrabold text-foreground/60">
                      {altItem.price.toFixed(2)} EUR
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Products Section */}
        {recentlyViewed.length > 0 && (
          <section className="mt-20 md:mt-28 border-t border-black/10 pt-16">
            <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-10 text-left">
              RECENTLY VIEWED PRODUCTS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recentlyViewed.map((viewedItem, idx) => (
                <motion.div 
                  key={idx}
                  className="group flex flex-col space-y-3 cursor-pointer text-left"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/products/${viewedItem.slug}`} className="block w-full">
                    <div className="relative aspect-square w-full overflow-hidden bg-white/20 rounded-sm border border-black/5">
                      <Image 
                        src={viewedItem.img} 
                        alt={viewedItem.title} 
                        fill 
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-103" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-xs font-black tracking-tight uppercase line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {viewedItem.title}
                      </h3>
                      <span className="text-[10px] font-extrabold text-foreground/60">
                        {viewedItem.price.toFixed(2)} EUR
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Sizing Guide Modal Overlay */}
      <AnimatePresence>
        {showSizeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[600px] bg-[#EBE9E3] border border-black/10 p-6 md:p-8 rounded-sm shadow-xl z-10 text-black max-h-[85vh] overflow-y-auto font-sans"
            >
              <button 
                onClick={() => setShowSizeModal(false)}
                className="absolute top-4 right-4 text-black hover:text-brand-orange transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-6">
                <div className="space-y-2 text-left">
                  <span className="text-[9px] font-black tracking-widest text-brand-orange uppercase">FIT GUIDE</span>
                  <h3 className="text-xl font-black uppercase">NEBULA SIZE CHART</h3>
                  <div className="w-10 h-0.5 bg-brand-orange"></div>
                </div>

                <div className="space-y-4 text-left">
                  <p className="text-[10px] font-semibold text-black/70 leading-relaxed uppercase tracking-wider">
                    Our performance training apparel is designed with an athletic, streamlined silhouette. Measure your chest, waist, and hips to select your optimal size.
                  </p>

                  <div className="border border-black/10 overflow-hidden rounded-sm text-[10px] font-semibold">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black/5 border-b border-black/10 text-[9px] font-black tracking-wider uppercase">
                          <th className="p-3">SIZE</th>
                          <th className="p-3">CHEST (CM)</th>
                          <th className="p-3">WAIST (CM)</th>
                          <th className="p-3">HIPS (CM)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 uppercase font-medium">
                        <tr>
                          <td className="p-3 font-black">XS</td>
                          <td className="p-3">80 - 86</td>
                          <td className="p-3">68 - 74</td>
                          <td className="p-3">82 - 88</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-black">S</td>
                          <td className="p-3">87 - 93</td>
                          <td className="p-3">75 - 81</td>
                          <td className="p-3">89 - 95</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-black">M</td>
                          <td className="p-3">94 - 101</td>
                          <td className="p-3">82 - 89</td>
                          <td className="p-3">96 - 103</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-black">L</td>
                          <td className="p-3">102 - 109</td>
                          <td className="p-3">90 - 97</td>
                          <td className="p-3">104 - 111</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-black">XL</td>
                          <td className="p-3">110 - 117</td>
                          <td className="p-3">98 - 105</td>
                          <td className="p-3">112 - 119</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-black">XXL</td>
                          <td className="p-3">118 - 125</td>
                          <td className="p-3">106 - 113</td>
                          <td className="p-3">120 - 127</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-black/5 p-4 rounded-sm space-y-2 text-[10px] leading-relaxed text-black/60 font-semibold uppercase">
                    <p className="font-black text-black">How to measure:</p>
                    <p><span className="font-bold text-black">Chest:</span> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                    <p><span className="font-bold text-black">Waist:</span> Measure around the narrowest part (typically where your body bends side to side).</p>
                    <p><span className="font-bold text-black">Hips:</span> Measure around the fullest part of your hips, keeping feet together.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
