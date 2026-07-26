"use client";

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  SlidersHorizontal, 
  X, 
  Grid3X3,
  Heart
} from 'lucide-react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Dynamic Catch-all params using Promise style
interface CatchAllProps {
  params: Promise<{ category: string[] }>;
}

// Catalog Product Interface
interface CatalogProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isSale?: boolean;
  isNew?: boolean;
  gender: 'men' | 'women' | 'unisex';
  type: 'clothing' | 'shoes' | 'accessories';
  subType: 't-shirts' | 'tights' | 'shorts' | 'bags' | 'socks' | 'outerwear';
  image: string;
  slug: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

// Comprehensive Product Database for Listings
const catalogProducts: CatalogProduct[] = [
  {
    id: "plp-trail-green",
    title: "NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0",
    price: 139.95,
    oldPrice: 169.95,
    isSale: true,
    gender: "unisex",
    type: "shoes",
    subType: "t-shirts",
    image: "/assets/images/navbar_shoes.jpg",
    slug: "nebula-lightweight-trail-sneaker-2.0",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
    colors: [
      { name: "Gunmetal", hex: "#4A4D4A" },
      { name: "Lunar Rock", hex: "#B9BBB6" }
    ]
  },
  {
    id: "plp-shorts-slate",
    title: "NEBULA WAFFLE TECH SHORTS",
    price: 79.95,
    isNew: true,
    gender: "men",
    type: "clothing",
    subType: "shorts",
    image: "/assets/images/tshirts_desk.png",
    slug: "nebula-waffle-tech-shorts",
    sizes: ["2XS", "XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Slate Grey", hex: "#5C5E62" },
      { name: "Dark Green", hex: "#2A3A2C" }
    ]
  },
  {
    id: "plp-tights-black",
    title: "NEBULA ACTIVEWEAR TIGHTS",
    price: 89.95,
    gender: "women",
    type: "clothing",
    subType: "tights",
    image: "/assets/images/activewear_desk.png",
    slug: "nebula-activewear-tights",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Black", hex: "#111111" },
      { name: "Army Green", hex: "#3B4033" }
    ]
  },
  {
    id: "plp-bag-olive",
    title: "NEBULA TACTICAL BACKPACK",
    price: 109.95,
    gender: "unisex",
    type: "accessories",
    subType: "bags",
    image: "/assets/images/navbar_bags.jpg",
    slug: "nebula-bags",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Olive Drab", hex: "#4B5320" }
    ]
  },
  {
    id: "plp-shorts-olive",
    title: "NEBULA ATHLETIC SHORTS",
    price: 69.95,
    oldPrice: 89.95,
    isSale: true,
    gender: "men",
    type: "clothing",
    subType: "shorts",
    image: "/assets/images/navbar_men.jpg",
    slug: "nebula-waffle-tech-shorts",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Olive Drab", hex: "#4B5320" },
      { name: "Black", hex: "#111111" }
    ]
  },
  {
    id: "plp-tshirt-women",
    title: "NEBULA WOMEN LOGO T-SHIRT",
    price: 39.95,
    gender: "women",
    type: "clothing",
    subType: "t-shirts",
    image: "/assets/images/navbar_women.jpg",
    slug: "nebula-activewear-tights",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Marshmallow", hex: "#FDFDFD" },
      { name: "Black", hex: "#111111" }
    ]
  },
  {
    id: "plp-trail-grey",
    title: "NEBULA TRAIL RUNNING SHOES",
    price: 159.95,
    isNew: true,
    gender: "unisex",
    type: "shoes",
    subType: "t-shirts",
    image: "/assets/images/trail_desk.png",
    slug: "nebula-lightweight-trail-sneaker-2.0",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Lunar Rock", hex: "#B9BBB6" }
    ]
  },
  {
    id: "plp-tshirt-unisex",
    title: "NEBULA GRAPHIC BOXY T-SHIRT",
    price: 49.95,
    gender: "unisex",
    type: "clothing",
    subType: "t-shirts",
    image: "/assets/images/tshirts_mob.png",
    slug: "nebula-waffle-tech-shorts",
    sizes: ["2XS", "XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Slate Grey", hex: "#5C5E62" }
    ]
  }
];

export default function CategoryPage({ params }: CatchAllProps) {
  const resolvedParams = use(params);
  const pathArray = resolvedParams.category || [];

  // Standard Product Listing States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Category filters logic
  const isSaleCategory = pathArray.some(p => p.toLowerCase() === 'sale');
  const isMenCategory = pathArray.some(p => p.toLowerCase() === 'men');
  const isWomenCategory = pathArray.some(p => p.toLowerCase() === 'women');
  const isAccessoriesCategory = pathArray.some(p => p.toLowerCase() === 'accessories');
  
  const isTshirts = pathArray.some(p => p.toLowerCase().includes('t-shirt'));
  const isTights = pathArray.some(p => p.toLowerCase().includes('tight'));
  const isShorts = pathArray.some(p => p.toLowerCase().includes('short'));
  const isBags = pathArray.some(p => p.toLowerCase().includes('bag'));
  const isShoes = pathArray.some(p => p.toLowerCase().includes('shoe') || p.toLowerCase().includes('footwear') || p.toLowerCase().includes('sneaker'));

  // Header Title details
  const headerInfo = useMemo(() => {
    let title = "NEBULA COLLECTION";
    let desc = "Explore premium sportswear, athletic footwear, and functional gear designed for everyday missions.";

    if (isSaleCategory) {
      title = "FINAL SALE";
      desc = "Take extra discounts on select technical apparel, trail sneakers, and activewear.";
    } else if (isMenCategory) {
      title = "MEN'S COLLECTION";
      if (isShoes) title = "MEN'S TRAIL SHOES";
      else if (isShorts) title = "MEN'S RUNNING SHORTS";
      else if (isTshirts) title = "MEN'S T-SHIRTS & TOPS";
    } else if (isWomenCategory) {
      title = "WOMEN'S COLLECTION";
      if (isTights) title = "WOMEN'S ATHLETIC TIGHTS";
      else if (isTshirts) title = "WOMEN'S T-SHIRTS & TOPS";
    } else if (isAccessoriesCategory) {
      title = "ACCESSORIES & GEAR";
    }

    return { title, desc };
  }, [isSaleCategory, isMenCategory, isWomenCategory, isAccessoriesCategory, isShoes, isShorts, isTshirts, isTights]);

  // Product Grid calculations
  const filteredProducts = useMemo(() => {
    let result = [...catalogProducts];

    if (isSaleCategory) result = result.filter(p => p.isSale);
    if (isMenCategory) result = result.filter(p => p.gender === 'men' || p.gender === 'unisex');
    if (isWomenCategory) result = result.filter(p => p.gender === 'women' || p.gender === 'unisex');
    if (isAccessoriesCategory) result = result.filter(p => p.type === 'accessories');

    if (isTshirts) result = result.filter(p => p.subType === 't-shirts');
    if (isTights) result = result.filter(p => p.subType === 'tights');
    if (isShorts) result = result.filter(p => p.subType === 'shorts');
    if (isBags) result = result.filter(p => p.subType === 'bags');
    if (isShoes) result = result.filter(p => p.type === 'shoes');

    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name)));
    }

    if (sortOption === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [isSaleCategory, isMenCategory, isWomenCategory, isAccessoriesCategory, isTshirts, isTights, isShorts, isBags, isShoes, selectedSizes, selectedColors, sortOption]);

  const filterSizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "36", "38", "40", "42", "44", "46"];
  const filterColors = [
    { name: "Black", hex: "#111111" },
    { name: "Grey", hex: "#5C5E62" },
    { name: "Green", hex: "#3B4033" },
    { name: "White", hex: "#FDFDFD" }
  ];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortOption('featured');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white font-sans">
      <PromoBar />
      <Header />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-6 select-none">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          {pathArray.map((path, idx) => (
            <span key={idx} className="flex items-center space-x-1">
              <span className={idx === pathArray.length - 1 ? "text-foreground font-black" : "hover:text-foreground"}>
                {path}
              </span>
              {idx < pathArray.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </nav>

        {/* Category Header */}
        <header className="border-b border-black/10 dark:border-white/10 pb-6 mb-8 md:mb-12 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-4 text-foreground">
            {headerInfo.title}
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-wide text-foreground/60 max-w-2xl leading-relaxed">
            {headerInfo.desc}
          </p>
        </header>

        {/* Toolbar Section (Filters & Sort Summary) */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5 dark:border-white/5">
          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setShowFiltersMobile(true)}
            className="flex items-center space-x-2 text-xs font-black tracking-widest uppercase md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTERS ({selectedSizes.length + selectedColors.length})</span>
          </button>

          {/* Product count (desktop) */}
          <div className="hidden md:block text-xs font-black tracking-widest uppercase text-foreground/60">
            {filteredProducts.length} PRODUCTS FOUND
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider">
            <span className="text-foreground/50 hidden sm:inline">SORT BY:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 py-1.5 px-3 rounded-none text-xs text-foreground font-bold focus:outline-none focus:border-brand-orange uppercase cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Trending Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 items-center text-left">
          <span className="text-[10px] font-black tracking-widest text-foreground/45 uppercase mr-2 select-none">TRENDING:</span>
          {["Waterproof", "Military Spec", "OrthoLite Soles", "Recycled", "Vibram Grip", "Breathable"].map((tag) => (
            <button
              key={tag}
              type="button"
              className="py-1.5 px-3.5 bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-orange text-[10px] font-black tracking-wider uppercase rounded-full transition-all text-foreground select-none cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Main Grid: Filters Sidebar + Listings */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR (Col Span 1) */}
          <aside className="hidden md:flex flex-col text-left space-y-8 border-r border-black/10 dark:border-white/10 pr-6">
            
            {/* Header reset button */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-black tracking-widest uppercase text-foreground">FILTERS</span>
              {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[10px] text-brand-orange font-black uppercase hover:underline tracking-widest"
                >
                  RESET ALL
                </button>
              )}
            </div>

            {/* Sizes filter */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                Filter by Size
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {filterSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`py-1.5 text-center text-[10px] font-black rounded-sm border transition-all ${selectedSizes.includes(size) ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-black/10 dark:border-white/10 bg-white/20 dark:bg-white/5 hover:border-foreground text-foreground'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors filter */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                Filter by Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-6 h-6 rounded-full border transition-all ${selectedColors.includes(color.name) ? 'scale-110 border-brand-orange outline outline-2 outline-offset-1 outline-brand-orange' : 'border-black/20 dark:border-white/20'}`}
                    aria-label={`Filter ${color.name}`}
                  />
                ))}
              </div>
            </div>

          </aside>

          {/* PRODUCT CARDS LISTING GRID (Col Span 3) */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col justify-center items-center">
                <SlidersHorizontal className="w-12 h-12 text-foreground/20 mb-4" />
                <h3 className="text-sm font-black tracking-widest uppercase text-foreground mb-2">No products match filters</h3>
                <p className="text-xs text-foreground/60 max-w-[280px] leading-relaxed mb-6 font-medium">Try clearing your filters or choosing another category.</p>
                <button 
                  onClick={handleResetFilters}
                  className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-y-12">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="group flex flex-col space-y-3 text-left relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/products/${product.slug}`} className="block w-full h-full">
                      {/* Product Image Wrapper */}
                      <div className="relative aspect-square w-full overflow-hidden bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-sm">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                          sizes="(min-width: 1024px) 30vw, 50vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 dark:bg-black/10 transition-opacity opacity-0 group-hover:opacity-100" />
                        
                        {/* Dynamic category badge */}
                        {(product.isSale || product.isNew) && (
                          <span className={`absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white ${product.isSale ? 'bg-[#FF6600]' : 'bg-brand-green'}`}>
                            {product.isSale ? 'SALE' : 'NEW'}
                          </span>
                        )}
                      </div>

                      {/* Detail Text Box */}
                      <div className="mt-3 flex flex-col">
                        <h3 className="text-xs font-black tracking-tight uppercase line-clamp-1 group-hover:text-brand-orange transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 text-[10px] font-extrabold tracking-wider">
                          <span className="text-foreground">{product.price.toFixed(2)} EUR</span>
                          {product.oldPrice && (
                            <span className="text-foreground/40 line-through">
                              {product.oldPrice.toFixed(2)} EUR
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-foreground/45 mt-1 font-bold uppercase tracking-widest">
                          {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Editorial Info Section */}
        <div className="mt-20 md:mt-28 border-t border-black/10 dark:border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-[#FF8500]">
              DANISH DESIGN &amp; MILITARY SPECIFICATION
            </h3>
            <p className="text-xs font-semibold text-foreground/70 leading-relaxed tracking-wide">
              NEBULA collections are developed and refined in Aarhus, Denmark. Our technical running apparel and trail footwear are engineered to meet military specifications, ensuring maximum protection, breathability, and comfort in any environment.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground/50">
              ORIGINS IN AARHUS TRAINING CAMPS
            </h3>
            <p className="text-xs font-semibold text-foreground/70 leading-relaxed tracking-wide">
              Drawing direct inspiration from Danish special forces tactical training routines, our garments prioritize ventilation, storage utility, and visibility. Every cut line is designed to support high-intensity movements, balancing athletic requirements with modern street style.
            </p>
          </div>
        </div>

      </main>

      {/* MOBILE FILTER SIDE-DRAWER */}
      <AnimatePresence>
        {showFiltersMobile && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-[320px] bg-[#ebe9e3] dark:bg-[#181817] shadow-2xl z-50 flex flex-col md:hidden text-left"
            >
              {/* Mobile Drawer Header */}
              <div className="p-6 border-b border-black/10 dark:border-white/5 flex items-center justify-between">
                <span className="text-sm font-black tracking-widest uppercase">FILTERS</span>
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="p-2 rounded-full text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Sizes filter */}
                <div className="flex flex-col space-y-3">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                    Filter by Size
                  </h3>
                  <div className="grid grid-cols-4 gap-1.5">
                    {filterSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`py-1.5 text-center text-[10px] font-black rounded-sm border transition-all ${selectedSizes.includes(size) ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-black/10 dark:border-white/10 bg-white/20 dark:bg-white/5 hover:border-foreground text-foreground'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors filter */}
                <div className="flex flex-col space-y-3">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                    Filter by Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorToggle(color.name)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-6 h-6 rounded-full border transition-all ${selectedColors.includes(color.name) ? 'scale-110 border-brand-orange outline outline-2 outline-offset-1 outline-brand-orange' : 'border-black/20 dark:border-white/20'}`}
                        aria-label={`Filter ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-6 border-t border-black/10 dark:border-white/5 bg-white/20 dark:bg-black/20 flex space-x-3">
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[10px] font-black tracking-widest uppercase rounded-sm shadow-md transition-all text-center flex items-center justify-center"
                >
                  VIEW PRODUCTS
                </button>
                <button 
                  onClick={handleResetFilters}
                  className="py-3 px-4 bg-transparent border border-black/10 dark:border-white/10 text-foreground text-[10px] font-black tracking-widest uppercase rounded-sm transition-all"
                >
                  RESET
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
