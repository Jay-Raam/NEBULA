"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Sun, 
  Moon, 
  X, 
  Menu,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

// Megadropdown Types
interface NavItem {
  name: string;
  href: string;
  dropdown?: {
    columns: {
      title?: string;
      items: { name: string; href: string }[];
    }[];
    tiles?: {
      img: string;
      label: string;
      href: string;
    }[];
  };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    isCartOpen, 
    setIsCartOpen, 
    cartCount, 
    cartTotal 
  } = useCart();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme state with DOM on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Theme Toggle Function
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems: NavItem[] = [
    {
      name: "Men",
      href: "/men",
      dropdown: {
        columns: [
          {
            items: [
              { name: "New arrivals", href: "/men/new-arrivals" },
              { name: "The festival edit", href: "/men/the-festival-edit" }
            ]
          },
          {
            title: "Clothing",
            items: [
              { name: "T-shirts", href: "/men/clothing/t-shirts" },
              { name: "Sweatshirts", href: "/men/clothing/sweatshirts" },
              { name: "Pants", href: "/men/clothing/pants" },
              { name: "Shorts", href: "/men/clothing/shorts" },
              { name: "Jackets and vests", href: "/men/clothing/jackets-and-vests" },
              { name: "Fleece", href: "/men/clothing/fleece" }
            ]
          },
          {
            title: "Categories",
            items: [
              { name: "Shoes", href: "/men/categories/shoes" },
              { name: "Activewear", href: "/men/categories/activewear" },
              { name: "Rainwear", href: "/men/categories/rainwear" },
              { name: "Outdoor", href: "/men/categories/outdoor" },
              { name: "Running", href: "/men/categories/running" }
            ]
          }
        ],
        tiles: [
          {
            img: "/assets/images/navbar_men.jpg",
            label: "NEW AW26 COLLECTION",
            href: "/men/new-arrivals"
          }
        ]
      }
    },
    {
      name: "Women",
      href: "/women",
      dropdown: {
        columns: [
          {
            items: [
              { name: "New arrivals", href: "/women/new-arrivals" },
              { name: "The festival edit", href: "/women/the-festival-edit" }
            ]
          },
          {
            title: "Clothing",
            items: [
              { name: "T-shirts", href: "/women/clothing/t-shirts" },
              { name: "Tops", href: "/women/clothing/tops" },
              { name: "Sweatshirts", href: "/women/clothing/sweatshirts" },
              { name: "Tights", href: "/women/clothing/tights" },
              { name: "Pants", href: "/women/clothing/pants" },
              { name: "Shorts", href: "/women/clothing/shorts" },
              { name: "Jackets and vests", href: "/women/clothing/jackets-and-vests" },
              { name: "Fleece", href: "/women/clothing/fleece" }
            ]
          },
          {
            title: "Categories",
            items: [
              { name: "Shoes", href: "/women/categories/shoes" },
              { name: "Activewear", href: "/women/categories/activewear" },
              { name: "Rainwear", href: "/women/categories/rainwear" },
              { name: "Outdoor", href: "/women/categories/outdoor" },
              { name: "Running", href: "/women/categories/running" }
            ]
          }
        ],
        tiles: [
          {
            img: "/assets/images/navbar_women.jpg",
            label: "NEW AW26 COLLECTION",
            href: "/women/new-arrivals"
          }
        ]
      }
    },
    {
      name: "Accessories",
      href: "/accessories",
      dropdown: {
        columns: [
          {
            items: [
              { name: "Bags", href: "/accessories/bags" },
              { name: "Hats", href: "/accessories/hats" },
              { name: "Sunglasses", href: "/accessories/sunglasses" },
              { name: "Gloves and scarves", href: "/accessories/gloves-and-scarves" },
              { name: "Socks", href: "/accessories/socks" },
              { name: "Water bottles", href: "/accessories/water-bottles" }
            ]
          },
          {
            title: "Categories",
            items: [
              { name: "Shoes", href: "/accessories/shoes" }
            ]
          }
        ],
        tiles: [
          {
            img: "/assets/images/navbar_bags.jpg",
            label: "SEASONAL BAGS",
            href: "/accessories/bags"
          },
          {
            img: "/assets/images/navbar_shoes.jpg",
            label: "THE NEBULA TRAIL SNEAKER",
            href: "/nebula-trail-sneaker.html"
          }
        ]
      }
    },
    {
      name: "Sale",
      href: "/sale",
      dropdown: {
        columns: [
          {
            title: "Sale Categories",
            items: [
              { name: "Tops", href: "/sale/tops" },
              { name: "Bottoms", href: "/sale/bottoms" },
              { name: "Outerwear", href: "/sale/outerwear" },
              { name: "Accessories", href: "/sale/accessories" }
            ]
          }
        ]
      }
    }
  ];

  return (
    <>
      {/* Sticky Main Header Wrapper */}
      <header 
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/90 dark:bg-background/85 backdrop-blur-md py-3 shadow-md border-b border-border top-0' 
            : 'bg-transparent py-5 top-[76px] md:top-[92px]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative">
          
          {/* Desktop Grid Layout (3 columns: Left Nav, Center Logo, Right Actions) */}
          <div className="hidden lg:grid grid-cols-3 items-center w-full">
            
            {/* Left Nav (MEN / WOMEN / ACCESSORIES / SALE) */}
            <nav className="flex items-center space-x-5 text-[11px] font-black tracking-widest uppercase">
              {navItems.map((item, idx) => (
                <div 
                  key={item.name} 
                  className="flex items-center space-x-5"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {idx > 0 && (
                    <span className={`text-[10px] select-none ${isScrolled ? 'text-foreground/30' : 'text-white/30'}`}>/</span>
                  )}
                  <div className="relative py-2">
                    <Link 
                      href={item.href}
                      className={`hover:opacity-75 transition-opacity relative pb-1 ${
                        isScrolled ? 'text-foreground font-black' : 'text-white font-black'
                      }`}
                    >
                      {item.name}
                      {activeDropdown === item.name && (
                        <motion.span 
                          layoutId="navUnderline"
                          className={`absolute bottom-0 left-0 w-full h-0.5 ${isScrolled ? 'bg-foreground' : 'bg-white'}`}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </div>

                  {/* Megadropdown Panel */}
                  <AnimatePresence>
                    {activeDropdown === item.name && item.dropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-full mt-3 bg-white dark:bg-[#1a1a19] shadow-2xl border border-black/10 dark:border-white/5 w-full p-8 grid grid-cols-12 gap-8 text-black dark:text-white rounded-lg z-50"
                      >
                        {/* Links Columns */}
                        <div className="col-span-8 grid grid-cols-3 gap-6 text-left">
                          {item.dropdown.columns.map((col, cIdx) => (
                            <div key={cIdx} className="flex flex-col space-y-3">
                              {col.title && (
                                <h4 className="text-[11px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase mb-1">
                                  {col.title}
                                </h4>
                              )}
                              <ul className="space-y-2">
                                {col.items.map((link) => (
                                  <li key={link.name}>
                                    <Link 
                                      href={link.href}
                                      className="text-xs font-bold hover:underline tracking-wide hover:pl-1 transition-all duration-200 block text-foreground/80 dark:text-foreground/80 hover:text-brand-orange dark:hover:text-brand-orange"
                                    >
                                      {link.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Image Tiles */}
                        {item.dropdown.tiles && (
                          <div className={`col-span-4 grid gap-4 ${item.dropdown.tiles.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {item.dropdown.tiles.map((tile, tIdx) => (
                              <Link 
                                key={tIdx} 
                                href={tile.href}
                                className="group relative block overflow-hidden rounded-md bg-black border border-black/10 dark:border-white/5 aspect-[3/4]"
                              >
                                <Image 
                                  src={tile.img} 
                                  alt={tile.label} 
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                                  <span className="text-[10px] font-black tracking-widest text-white uppercase group-hover:text-brand-orange transition-colors">
                                    {tile.label}
                                  </span>
                                  <div className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Center Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className={`text-2xl font-black tracking-[0.25em] uppercase transition-opacity hover:opacity-85 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                NEBULA
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center justify-end space-x-1.5 md:space-x-3">
              
              {/* Language Switcher */}
              <span className={`text-[10px] font-black tracking-widest hidden xl:inline-block uppercase select-none ${isScrolled ? 'text-foreground/70' : 'text-white/70'} mr-2`}>
                EN / EUR
              </span>

              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Open Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Favorites Icon */}
              <Link 
                href="/favorites"
                className={`p-2 rounded-full hidden md:inline-flex items-center justify-center transition-all duration-300 relative ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Favorites"
              >
                <Heart className="w-4.5 h-4.5" />
                <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Account Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
                  aria-label="Account Settings"
                >
                  <User className="w-4.5 h-4.5" />
                </button>
                <AnimatePresence>
                  {isAccountOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsAccountOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1a1a19] shadow-2xl border border-black/10 dark:border-white/5 rounded-lg p-5 z-50 text-left"
                      >
                        <h4 className="text-xs font-black tracking-widest text-foreground uppercase mb-1">Welcome Back</h4>
                        <p className="text-[11px] text-foreground/60 mb-4 tracking-wide">Sign in to check orders, view wishlist and save profile settings.</p>
                        <Link href="/login" onClick={() => setIsAccountOpen(false)} className="block w-full py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-center text-xs font-extrabold tracking-widest uppercase rounded-sm transition-all">LOG IN</Link>
                        <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/5 text-center">
                          <Link href="/login" onClick={() => setIsAccountOpen(false)} className="text-[10px] text-foreground/50 hover:text-brand-orange font-bold uppercase tracking-wider">Create account</Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>

              {/* Shopping Bag Icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 relative ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF8500] text-black text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Flex Layout (Left Hamburger, Center Logo, Right Actions) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            
            {/* Left Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-foreground hover:bg-black/5 dark:hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Center Logo */}
            <Link href="/" className={`text-xl font-black tracking-[0.25em] uppercase transition-opacity hover:opacity-85 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              NEBULA
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`p-2 rounded-full transition-colors relative ${isScrolled ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF8500] text-black text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* SEARCH OVERLAY (Full width slide down) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 bg-white dark:bg-[#181817] shadow-xl z-50 border-b border-black/10 dark:border-white/5 py-6 px-4 md:px-8"
          >
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
              <div className="flex-1 flex items-center relative mr-8">
                <Search className="absolute left-0 w-5 h-5 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent pl-8 pr-4 py-2 border-b border-transparent focus:border-black/20 dark:focus:border-white/20 text-sm focus:outline-none tracking-wide text-foreground font-medium"
                  autoFocus
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full text-foreground/75 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MINI-CART SLIDE-IN DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#ebe9e3] dark:bg-[#181817] shadow-2xl z-50 flex flex-col border-l border-black/10 dark:border-white/5"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-black/10 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                  <span className="font-black text-sm tracking-widest uppercase">MY BAG ({cartCount} ITEMS)</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col animate-none">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/5 flex items-center justify-center mb-6">
                      <ShoppingBag className="w-8 h-8 text-foreground/30" />
                    </div>
                    <h3 className="text-sm font-black tracking-widest uppercase text-foreground mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-xs text-foreground/60 max-w-[280px] tracking-wide mb-8 leading-relaxed">
                      Browse our collections to add sneakers, activewear, and accessories to your cart.
                    </p>
                    <Link 
                      href="/accessories/shoes"
                      onClick={() => setIsCartOpen(false)}
                      className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-md"
                    >
                      SHOP SNEAKERS
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4 divide-y divide-black/10 dark:divide-white/5">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex pt-4 first:pt-0 gap-4 text-foreground animate-none">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 bg-white dark:bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Detail Column */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="text-xs font-black tracking-tight uppercase leading-tight line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-foreground/60 mt-1 uppercase font-bold tracking-wider">
                              Size: {item.size}
                            </p>
                          </div>
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-foreground w-4 text-center select-none">
                              {item.quantity}
                            </span>
                             <button
                               onClick={() => {
                                 const { quantity, ...itemWithoutQuantity } = item;
                                 addToCart(itemWithoutQuantity);
                               }}
                               className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none"
                             >
                               +
                             </button>
                          </div>
                        </div>

                        {/* Price & Delete Column */}
                        <div className="flex flex-col justify-between items-end text-right">
                          <span className="text-xs font-black text-foreground">
                            {(item.price * item.quantity).toFixed(2)} EUR
                          </span>
                          <button
                            onClick={() => {
                              for (let i = 0; i < item.quantity; i++) {
                                removeFromCart(item.id, item.size);
                              }
                            }}
                            className="text-[10px] text-red-500 font-extrabold hover:underline uppercase tracking-wide cursor-pointer select-none"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-black/10 dark:border-white/5 bg-white/20 dark:bg-black/20">
                <div className="flex justify-between items-center mb-4 text-xs font-extrabold tracking-wider uppercase">
                  <span className="text-foreground/75">Subtotal</span>
                  <span className="text-foreground font-black">{cartTotal.toFixed(2)} EUR</span>
                </div>
                {cartItems.length > 0 ? (
                  <Link 
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg flex items-center justify-center select-none"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                ) : (
                  <button className="w-full py-4 bg-brand-orange text-white text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg select-none cursor-not-allowed opacity-50" disabled>
                    CHECKOUT
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-[320px] bg-[#ebe9e3] dark:bg-[#181817] shadow-2xl z-50 flex flex-col lg:hidden"
            >
              <div className="p-5 border-b border-black/10 dark:border-white/5 flex justify-between items-center">
                <span className="text-lg font-black tracking-[0.25em] uppercase text-foreground">
                  NEBULA
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 overflow-y-auto py-4 px-6">
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name} className="py-2 border-b border-black/5 dark:border-white/5 animate-none">
                      <Link 
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex justify-between items-center font-black tracking-widest uppercase text-foreground text-sm"
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-4 h-4 text-foreground/40" />
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-5 border-t border-black/10 dark:border-white/5 space-y-4">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-xs font-black tracking-widest text-foreground uppercase"
                >
                  <User className="w-4 h-4" />
                  <span>Log in</span>
                </Link>
                <div className="flex items-center justify-between text-xs text-foreground/60 tracking-wider">
                  <span>Language</span>
                  <span className="font-extrabold text-foreground">International (EUR)</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
