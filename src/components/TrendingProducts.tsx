"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const bestSellers = [
  {
    id: "real-prod-1",
    title: "NEBULA WAFFLE TECH SHORTS",
    price: 79.95,
    image: "/assets/images/products/real_prod_1.jpg",
    slug: "nebula-waffle-tech-shorts-gunmetal"
  },
  {
    id: "real-prod-3",
    title: "NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0",
    price: 139.95,
    image: "/assets/images/products/real_prod_3.jpg",
    slug: "nebula-lightweight-trail-sneaker-2.0-lunar-rock"
  },
  {
    id: "real-prod-7",
    title: "NEBULA RAIN JACKET",
    price: 99.95,
    image: "/assets/images/products/real_prod_7.jpg",
    slug: "nebula-rain-jacket-gunmetal"
  },
  {
    id: "real-prod-43",
    title: "NEBULA TRAVEL BAG",
    price: 119.95,
    image: "/assets/images/products/real_prod_43.jpg",
    slug: "nebula-travel-bag-black"
  }
];

export default function TrendingProducts() {
  const { addToCart, setIsCartOpen } = useCart();

  const handleQuickAdd = (product: typeof bestSellers[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      slug: product.slug,
      size: "M" // Default size
    });
    setIsCartOpen(true);
  };

  return (
    <section className="w-full bg-[#EBE9E3] text-black py-16 md:py-24 border-t border-black/10 text-left select-none">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase">02 / SHOP BESTSELLERS</span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">TRENDING EQUIPMENT</h2>
          </div>
          <Link href="/men" className="text-xs font-black tracking-widest uppercase border-b-2 border-black pb-1 hover:text-brand-orange hover:border-brand-orange transition-colors">
            VIEW ALL PRODUCT LISTING
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              className="group flex flex-col space-y-3 relative bg-white/20 border border-black/5 p-4 rounded-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Product Image Link */}
              <Link href={`/products/${product.slug}`} className="block relative aspect-square w-full overflow-hidden bg-black/5 rounded-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 transition-opacity opacity-0 group-hover:opacity-100" />
              </Link>

              {/* Text Info */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xs font-black tracking-tight uppercase line-clamp-1 group-hover:text-brand-orange transition-colors">
                    {product.title}
                  </h3>
                  <span className="text-[10px] font-extrabold tracking-wider mt-1 block">
                    {product.price.toFixed(2)} EUR
                  </span>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="mt-4 w-full py-2.5 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
