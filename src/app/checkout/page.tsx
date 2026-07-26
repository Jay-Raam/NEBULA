"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  HelpCircle,
  CheckCircle,
  Truck,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [openCheckoutFaq, setOpenCheckoutFaq] = useState<number | null>(null);

  const checkoutFaqs = [
    {
      q: "When will my card be charged?",
      a: "Your card is only authorized when placing the order and is officially charged only when your items leave our warehouse in Aarhus, Denmark."
    },
    {
      q: "Can I modify my delivery address after placing the order?",
      a: "Because our order fulfillment processes are automated for fast shipping, changes can only be made within 15 minutes of placing your order by calling us directly at +45 88 70 49 60."
    },
    {
      q: "What is the return policy for sale items?",
      a: "All items, including sale items, are covered under our standard 14-day return policy. Items must be returned in their original packaging and unworn."
    }
  ];

  // Progress Steps: 'address' | 'shipping' | 'payment' | 'success'
  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'success'>('address');

  // Address State
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showAdditional, setShowAdditional] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Austria');
  const [phone, setPhone] = useState('');
  const [differentDelivery, setDifferentDelivery] = useState(false);
  const [addressError, setAddressError] = useState('');

  // Shipping State
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  
  // Payment State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Discount Code State
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in EUR
  const [discountAppliedText, setDiscountAppliedText] = useState('');

  // Calculate live values
  const shippingCost = shippingMethod === 'standard' ? 0 : 9.95;
  const finalTotal = cartTotal + shippingCost - appliedDiscount;

  // Hydration safety redirect if cart is empty (only when not in success step)
  useEffect(() => {
    if (cartItems.length === 0 && step !== 'success') {
      // Small timeout to allow state to hydrate
      const timer = setTimeout(() => {
        if (cartItems.length === 0) {
          router.push('/');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems, step, router]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !confirmEmail || !firstName || !lastName || !address || !zipCode || !city || !phone) {
      setAddressError('Please fill out all required shipping fields.');
      return;
    }
    if (email !== confirmEmail) {
      setAddressError('Email addresses do not match.');
      return;
    }
    setAddressError('');
    setStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      setPaymentError('Please fill out your card details to place the order.');
      return;
    }
    setPaymentError('');
    setStep('success');
    // Clear items in context
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.toUpperCase() === 'EXTRA10') {
      setAppliedDiscount(cartTotal * 0.10);
      setDiscountAppliedText('EXTRA10 (10% OFF)');
      setDiscountCode('');
    } else {
      alert('Invalid coupon code. Try code: EXTRA10');
    }
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans">
        {/* Minimal Header */}
        <header className="py-6 border-b border-black/10 dark:border-white/10 bg-white/20 dark:bg-black/20">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex justify-center">
            <Link href="/" className="relative block w-24 h-8 select-none">
              <Image src="/assets/images/logo_black.svg" alt="NEBULA Logo" fill className="object-contain dark:hidden" />
              <Image src="/assets/images/logo_white.svg" alt="NEBULA Logo" fill className="object-contain hidden dark:block" />
            </Link>
          </div>
        </header>

        {/* Success Container */}
        <main className="flex-grow flex items-center justify-center py-16 px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[550px] bg-white dark:bg-[#1f1f1e] p-8 md:p-12 shadow-xl rounded-sm text-center border border-black/5 dark:border-white/5"
          >
            <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-6" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-4 text-foreground">
              ORDER PLACED!
            </h1>
            <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-sm mx-auto mb-8 font-medium">
              Thank you for shopping with NEBULA. We have received your order and are preparing it for shipping. A confirmation email has been sent to {email || 'your email'}.
            </p>

            {/* Mock Order Details */}
            <div className="text-left border-y border-black/10 dark:border-white/10 py-6 mb-8 text-xs font-semibold space-y-3 uppercase tracking-wide text-foreground/75">
              <div className="flex justify-between">
                <span className="opacity-60">Order Number:</span>
                <span className="font-black text-foreground">#HL-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Deliver to:</span>
                <span className="font-black text-foreground">{firstName} {lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Shipping address:</span>
                <span className="font-black text-foreground">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Shipping Method:</span>
                <span className="font-black text-foreground">{shippingMethod === 'standard' ? 'Standard Home Delivery' : 'Express Air Shipping'}</span>
              </div>
            </div>

            <Link
              href="/"
              className="py-4 px-8 bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all inline-flex items-center space-x-2 select-none"
            >
              <span>RETURN TO HOME</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-black/10 dark:border-white/10 py-6 bg-black/5 dark:bg-black/20 text-[10px] uppercase font-bold text-foreground/50 tracking-wider">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex justify-center text-center">
            <span>© HUMMEL A/S, ALL RIGHTS RESERVED</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans select-none relative">
      
      {/* Minimal Header */}
      <header className="py-6 border-b border-black/10 dark:border-white/10 bg-white/20 dark:bg-black/20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="relative block w-24 h-8">
            <Image src="/assets/images/logo_black.svg" alt="NEBULA Logo" fill className="object-contain dark:hidden" />
            <Image src="/assets/images/logo_white.svg" alt="NEBULA Logo" fill className="object-contain hidden dark:block" />
          </Link>
          <Link href="/" className="text-xs font-black tracking-widest uppercase flex items-center space-x-1.5 opacity-75 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            <span>CONTINUE SHOPPING</span>
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-grow max-w-[1600px] mx-auto w-full px-4 md:px-8 py-8 md:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Progress forms (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* STAGE 1: ADDRESS */}
          <div className="border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 p-6 rounded-sm">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black tracking-wider ${step === 'address' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-brand-green text-white'}`}>
                  {step !== 'address' ? <Check className="w-3.5 h-3.5" /> : '1'}
                </span>
                <h2 className="text-sm font-black tracking-widest uppercase text-foreground">ADDRESS</h2>
              </div>
              <span className="text-[10px] font-extrabold opacity-60">1/3</span>
            </div>

            {step === 'address' ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Your email</label>
                    <input 
                      type="email" 
                      placeholder="Example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Confirm your email</label>
                    <input 
                      type="email" 
                      placeholder="Example@example.com"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">First name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Last name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Address</label>
                  <input 
                    type="text" 
                    placeholder="E.g. 3 Stripes Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                    required
                  />
                </div>

                {/* Additional Info Toggle */}
                <div className="flex flex-col">
                  <button 
                    type="button"
                    onClick={() => setShowAdditional(!showAdditional)}
                    className="text-[10px] font-black tracking-widest uppercase text-foreground/60 hover:text-foreground flex items-center space-x-1.5 select-none self-start"
                  >
                    <span>{showAdditional ? '- LESS INFORMATION' : '+ ADDITIONAL INFORMATION (OPTIONAL)'}</span>
                  </button>
                  <AnimatePresence>
                    {showAdditional && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-2"
                      >
                        <input 
                          type="text" 
                          placeholder="Apartment, suite, unit, gate code etc."
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                          className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Zip code</label>
                    <input 
                      type="text" 
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">City</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Country</label>
                    <select 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-semibold uppercase"
                    >
                      <option value="Austria">Austria</option>
                      <option value="Germany">Germany</option>
                      <option value="Denmark">Denmark</option>
                      <option value="International">International</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Phone number (Used for tracking)</label>
                    <div className="flex">
                      <span className="flex items-center justify-center border border-r-0 border-black/15 dark:border-white/15 px-3 py-2.5 bg-black/5 dark:bg-white/5 text-xs text-foreground/60 select-none font-bold">
                        +43
                      </span>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="diff-delivery"
                    checked={differentDelivery}
                    onChange={(e) => setDifferentDelivery(e.target.checked)}
                    className="w-3.5 h-3.5 border border-black/15 accent-brand-orange"
                  />
                  <label htmlFor="diff-delivery" className="text-[10px] font-bold text-foreground/70 uppercase select-none cursor-pointer">
                    Different delivery address
                  </label>
                </div>

                {addressError && (
                  <p className="text-[10px] font-black text-red-500 tracking-wide uppercase pt-1">{addressError}</p>
                )}

                <button 
                  type="submit"
                  className="py-4 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all w-full md:w-auto"
                >
                  PROCEED TO SHIPPING METHOD
                </button>
              </form>
            ) : (
              <div className="text-xs font-semibold space-y-1.5 uppercase text-foreground/70 tracking-wide">
                <p><span className="opacity-55">Name:</span> {firstName} {lastName}</p>
                <p><span className="opacity-55">Email:</span> {email}</p>
                <p><span className="opacity-55">Address:</span> {address}, {zipCode} {city}, {country}</p>
                <button 
                  onClick={() => setStep('address')}
                  className="text-[10px] text-brand-orange font-black uppercase hover:underline mt-2 flex items-center space-x-1"
                >
                  <span>Edit Address details</span>
                </button>
              </div>
            )}
          </div>

          {/* STAGE 2: SHIPPING METHOD */}
          <div className="border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 p-6 rounded-sm">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black tracking-wider ${step === 'shipping' ? 'bg-black text-white dark:bg-white dark:text-black' : step === 'payment' ? 'bg-brand-green text-white' : 'bg-black/10 text-foreground/40'}`}>
                  {step === 'payment' ? <Check className="w-3.5 h-3.5" /> : '2'}
                </span>
                <h2 className="text-sm font-black tracking-widest uppercase text-foreground">SHIPPING METHOD</h2>
              </div>
              <span className="text-[10px] font-extrabold opacity-60">2/3</span>
            </div>

            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="space-y-3">
                  
                  {/* Option 1: Standard */}
                  <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-brand-orange bg-brand-orange/5' : 'border-black/10 dark:border-white/10 bg-white dark:bg-black/20'}`}>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-brand-orange w-4 h-4"
                      />
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-wider text-foreground">Standard Home Delivery</p>
                        <p className="text-[10px] text-foreground/50 font-semibold lowercase">delivers in 3-6 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase text-brand-green">Free</span>
                  </label>

                  {/* Option 2: Express */}
                  <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-brand-orange bg-brand-orange/5' : 'border-black/10 dark:border-white/10 bg-white dark:bg-black/20'}`}>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-brand-orange w-4 h-4"
                      />
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-wider text-foreground">Express Air Shipping</p>
                        <p className="text-[10px] text-foreground/50 font-semibold lowercase">delivers in 1-2 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-foreground">9.95 EUR</span>
                  </label>

                </div>

                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit"
                    className="py-4 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all"
                  >
                    PROCEED TO PAYMENT METHOD
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('address')}
                    className="py-4 px-6 bg-transparent text-foreground hover:opacity-75 text-xs font-black tracking-widest uppercase transition-all"
                  >
                    BACK
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="text-xs font-semibold uppercase text-foreground/75 tracking-wide flex justify-between">
                <span>{shippingMethod === 'standard' ? 'Standard Home Delivery' : 'Express Air Shipping'}</span>
                <span className="font-black text-foreground">{shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)} EUR`}</span>
              </div>
            )}
          </div>

          {/* STAGE 3: PAYMENT METHOD */}
          <div className="border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 p-6 rounded-sm">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black tracking-wider ${step === 'payment' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-black/10 text-foreground/40'}`}>
                  3
                </span>
                <h2 className="text-sm font-black tracking-widest uppercase text-foreground">PAYMENT METHOD</h2>
              </div>
              <span className="text-[10px] font-extrabold opacity-60">3/3</span>
            </div>

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                
                {/* Credit Card inputs */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Cardholder name</label>
                  <input 
                    type="text" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Card number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 pl-10 pr-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">Expiry date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium text-center"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-foreground/75 mb-1.5">CVV</label>
                    <input 
                      type="password" 
                      placeholder="***"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium text-center"
                      required
                    />
                  </div>
                </div>

                {paymentError && (
                  <p className="text-[10px] font-black text-red-500 tracking-wide uppercase pt-1">{paymentError}</p>
                )}

                <div className="flex space-x-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <button 
                    type="submit"
                    className="py-4 px-8 bg-[#FF6600] hover:bg-[#ff771a] text-white text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all flex-1 md:flex-none flex items-center justify-center space-x-2"
                  >
                    <span>PLACE ORDER</span>
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="py-4 px-6 bg-transparent text-foreground hover:opacity-75 text-xs font-black tracking-widest uppercase transition-all"
                  >
                    BACK
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Summary Card */}
          <div className="border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 rounded-sm flex flex-col">
            <h2 className="text-sm font-black tracking-widest uppercase border-b border-black/10 dark:border-white/10 pb-3 mb-4 text-foreground">
              SUMMARY
            </h2>

            {/* Cart Items List */}
            <div className="max-h-[300px] overflow-y-auto mb-6 pr-1 space-y-4 divide-y divide-black/10 dark:divide-white/10">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex pt-4 first:pt-0 gap-3 text-foreground">
                  <div className="relative w-14 h-14 bg-white dark:bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5 text-xs font-bold uppercase tracking-wide">
                    <div>
                      <h4 className="font-black text-[10px] leading-tight line-clamp-1">{item.title}</h4>
                      <p className="text-[9px] text-foreground/50 mt-0.5">Size: {item.size} / Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[10px] font-black">{(item.price * item.quantity).toFixed(2)} EUR</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2 text-xs font-semibold uppercase tracking-wide text-foreground/75">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-black text-foreground">{cartTotal.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-black text-foreground">{shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)} EUR`}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-brand-orange">
                  <span>Discount ({discountAppliedText})</span>
                  <span className="font-black">-{appliedDiscount.toFixed(2)} EUR</span>
                </div>
              )}
              <div className="flex justify-between border-t border-black/10 dark:border-white/10 pt-4 text-sm font-black text-foreground">
                <span>Total (incl. VAT)</span>
                <span>{finalTotal.toFixed(2)} EUR</span>
              </div>
            </div>

            {/* Main Action Button duplicated if on desktop and in Address Step */}
            {step === 'address' && (
              <button 
                onClick={handleAddressSubmit}
                className="w-full mt-6 py-4 bg-[#FF6600] hover:bg-[#ff771a] text-white text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-md select-none hidden md:block"
              >
                PROCEED TO SHIPPING METHOD
              </button>
            )}
          </div>

          {/* Discount Code Section */}
          <div className="border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-4 rounded-sm">
            <button 
              onClick={() => setShowDiscount(!showDiscount)}
              className="w-full flex items-center justify-between text-xs font-black tracking-widest uppercase text-foreground hover:opacity-85"
            >
              <span>ADD DISCOUNT CODE</span>
              <span className="text-lg font-normal">{showDiscount ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {showDiscount && (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleApplyDiscount}
                  className="overflow-hidden mt-3 flex space-x-2"
                >
                  <input 
                    type="text" 
                    placeholder="ENTER CODE (e.g. EXTRA10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2 text-xs flex-grow focus:outline-none focus:border-brand-orange text-foreground font-semibold uppercase"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[10px] font-black tracking-widest uppercase rounded-none shadow-sm transition-all"
                  >
                    APPLY
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Help Info */}
          <div className="border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 p-4 rounded-sm text-left space-y-4">
            <p className="text-[10px] font-black tracking-wide uppercase text-foreground/50">We accept following payment...</p>
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase text-foreground/60 tracking-wider">
              <span>Pay with promo coupon</span>
            </div>
            
            <div className="border-t border-black/10 dark:border-white/10 pt-4 flex flex-col space-y-1">
              <span className="text-xs font-black uppercase text-foreground flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                Need help?
              </span>
              <span className="text-xs font-black text-foreground hover:text-brand-orange transition-colors cursor-pointer">+45 88 70 49 60.</span>
              <span className="text-[10px] text-foreground/50 font-bold uppercase">Mon-Fri 9 AM - 3 PM</span>
            </div>
          </div>

        </div>

      </main>

      {/* Trust Badges & FAQ Section */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 pb-16 border-t border-black/10 dark:border-white/10 pt-12 text-left">
          
          {/* Trust Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-foreground/80">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <p className="font-black">SECURE CHECKOUT</p>
                <p className="text-[9px] text-foreground/45">256-bit SSL encrypted</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-foreground/80">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full">
                <Truck className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <p className="font-black">RELIABLE COURIERS</p>
                <p className="text-[9px] text-foreground/45">DHL &amp; GLS partners</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-foreground/80">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full">
                <RotateCcw className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="font-black">HASSLE-FREE RETURNS</p>
                <p className="text-[9px] text-foreground/45">14-day window policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-foreground/80">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full">
                <MapPin className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="font-black">DANISH HERITAGE</p>
                <p className="text-[9px] text-foreground/45">Shipped from Denmark</p>
              </div>
            </div>
          </div>

          {/* Checkout FAQ Accordion */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12 max-w-[800px] mx-auto">
            <h3 className="text-xs font-black tracking-widest uppercase mb-6 text-foreground/60">
              CHECKOUT ASSISTANCE &amp; FAQS
            </h3>
            <div className="space-y-4">
              {checkoutFaqs.map((faq, idx) => (
                <div key={idx} className="border-b border-black/10 dark:border-white/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setOpenCheckoutFaq(openCheckoutFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-xs font-black tracking-wider uppercase hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-sm font-normal">{openCheckoutFaq === idx ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openCheckoutFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3 text-xs leading-relaxed text-foreground/75 font-semibold"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>

      {/* Minimal Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-8 bg-black/5 dark:bg-black/20 text-[10px] uppercase font-bold text-foreground/50 tracking-wider">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1 cursor-pointer hover:opacity-75 transition-opacity">
            <span>International (EUR)</span>
          </div>
          <span>© HUMMEL A/S, ALL RIGHTS RESERVED</span>
          <div className="flex items-center space-x-6 text-foreground/60">
            <Link href="/terms-and-conditions" className="hover:underline">Terms and conditions</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy policy</Link>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
