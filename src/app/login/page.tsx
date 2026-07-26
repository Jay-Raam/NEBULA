"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage({ defaultRegister = false }: { defaultRegister?: boolean }) {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(defaultRegister);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do I need a NEBULA profile to make a purchase?",
      a: "No, you can check out as a guest. However, creating a profile lets you save shipping addresses, track deliveries, and unlock early access to new collections."
    },
    {
      q: "How do I reset my account password?",
      a: "Simply click on the 'Forgot password?' link on the login panel. Enter your registered email address and we will send you a secure link to reset your password."
    },
    {
      q: "Are my personal data and payment cards secure?",
      a: "Yes. All transactions are processed using secure SSL encryption. We never store credit card numbers on our servers, complying fully with PCI standards."
    }
  ];

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register Form State
  const [regEmail, setRegEmail] = useState('');
  const [regConfirmEmail, setRegConfirmEmail] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Action mock states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both your email address and password.');
      return;
    }
    setLoginError('');
    setIsLoggedIn(true);
    // Redirect to home after 1.5s
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regConfirmEmail || !regFirstName || !regLastName || !regPassword || !regConfirmPassword) {
      setRegError('Please fill out all required fields.');
      return;
    }
    if (regEmail !== regConfirmEmail) {
      setRegError('Email addresses do not match.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setRegError('You must read and accept the privacy policy.');
      return;
    }
    
    setRegError('');
    setRegSuccess(true);
    // Toggle back to login view after 2s
    setTimeout(() => {
      setIsRegistering(false);
      setRegSuccess(false);
      setLoginEmail(regEmail);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white">
      <PromoBar />
      <Header />

      {/* Main Account Section */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        
        {/* Go Back Nav Link */}
        <div className="mb-8 md:mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-1 text-xs font-black tracking-widest uppercase hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>GO BACK</span>
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-center uppercase mb-12 md:mb-16">
          CREATE ACCOUNT OR LOGIN
        </h1>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start max-w-[1000px] mx-auto">
          
          {/* LEFT COLUMN: NEW CUSTOMER / REGISTER */}
          <div className="flex flex-col space-y-6 md:border-r border-black/10 dark:border-white/10 md:pr-12 lg:pr-16 min-h-[350px]">
            <h2 className="text-lg md:text-xl font-black tracking-widest uppercase pb-3 border-b border-black/10 dark:border-white/10">
              NEW CUSTOMER
            </h2>

            <AnimatePresence mode="wait">
              {!isRegistering ? (
                <motion.div 
                  key="create-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pt-6 flex flex-col space-y-6"
                >
                  <p className="text-xs font-semibold leading-relaxed text-black/60 dark:text-white/60 max-w-sm">
                    Creating an account has many benefits: check out faster, keep more than one address, track orders and more.
                  </p>
                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-full shadow-md transition-all self-start"
                  >
                    CREATE ACCOUNT
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="register-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleRegisterSubmit}
                  className="flex flex-col space-y-4 pt-4"
                >
                  {regSuccess ? (
                    <div className="p-4 border border-brand-green/30 bg-brand-green/5 text-brand-green rounded-sm text-center">
                      <p className="text-xs font-black uppercase tracking-wider mb-1">Account Created Successfully!</p>
                      <p className="text-[10px] opacity-75">Redirecting you to the login screen...</p>
                    </div>
                  ) : (
                    <>
                      {/* Email fields */}
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          Email
                        </label>
                        <input 
                          type="email" 
                          placeholder="Example@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          Repeat email
                        </label>
                        <input 
                          type="email" 
                          placeholder="Example@example.com"
                          value={regConfirmEmail}
                          onChange={(e) => setRegConfirmEmail(e.target.value)}
                          className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                          required
                        />
                      </div>

                      {/* Name fields */}
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          First name
                        </label>
                        <input 
                          type="text" 
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          Last name
                        </label>
                        <input 
                          type="text" 
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                          required
                        />
                      </div>

                      {/* Passwords */}
                      <div className="flex flex-col relative">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          Password
                        </label>
                        <div className="relative w-full">
                          <input 
                            type={showRegPassword ? 'text' : 'password'} 
                            placeholder="xxxxxxx"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 pl-3 pr-10 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest text-foreground/50 hover:text-foreground uppercase cursor-pointer"
                          >
                            {showRegPassword ? 'HIDE' : 'SHOW'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col relative">
                        <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                          Repeat password
                        </label>
                        <div className="relative w-full">
                          <input 
                            type={showRegConfirmPassword ? 'text' : 'password'} 
                            placeholder="xxxxxxx"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 pl-3 pr-10 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest text-foreground/50 hover:text-foreground uppercase cursor-pointer"
                          >
                            {showRegConfirmPassword ? 'HIDE' : 'SHOW'}
                          </button>
                        </div>
                      </div>

                      {/* Checkboxes */}
                      <div className="flex items-start space-x-2 pt-2">
                        <input 
                          type="checkbox" 
                          id="privacy-terms-checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 w-3 h-3 rounded-none border border-black/15 accent-brand-orange"
                          required
                        />
                        <label htmlFor="privacy-terms-checkbox" className="text-[10px] text-black/60 dark:text-white/60 leading-normal select-none">
                          I have read and accept the privacy policy. <Link href="/privacy-policy" className="underline hover:text-brand-orange">Read more</Link>.
                        </label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <input 
                          type="checkbox" 
                          id="newsletter-checkbox"
                          checked={subscribeNewsletter}
                          onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                          className="mt-0.5 w-3 h-3 rounded-none border border-black/15 accent-brand-orange"
                        />
                        <label htmlFor="newsletter-checkbox" className="text-[10px] text-black/60 dark:text-white/60 leading-normal select-none">
                          Yes, I want to subscribe to the NEBULA newsletter with information about exclusive sales, new collections and much more. You can unsubscribe from the newsletter at any time. Read the terms and conditions.
                        </label>
                      </div>

                      {regError && (
                        <p className="text-[10px] font-black text-red-500 tracking-wide uppercase pt-1">{regError}</p>
                      )}

                      <div className="flex space-x-3 pt-3">
                        <button 
                          type="submit"
                          className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-full shadow-md transition-all"
                        >
                          CREATE ACCOUNT
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsRegistering(false)}
                          className="py-3 px-6 bg-transparent text-foreground hover:opacity-75 text-xs font-black tracking-widest uppercase transition-all"
                        >
                          CANCEL
                        </button>
                      </div>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: LOGIN */}
          <div className="flex flex-col space-y-6 min-h-[350px]">
            <h2 className="text-lg md:text-xl font-black tracking-widest uppercase pb-3 border-b border-black/10 dark:border-white/10">
              LOGIN
            </h2>

            <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-5 pt-4">
              {isLoggedIn ? (
                <div className="p-4 border border-brand-green/30 bg-brand-green/5 text-brand-green rounded-sm text-center">
                  <p className="text-xs font-black uppercase tracking-wider mb-1">Login Successful!</p>
                  <p className="text-[10px] opacity-75">Redirecting you to the home page...</p>
                </div>
              ) : (
                <>
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                      Email
                    </label>
                    <input 
                      type="email" 
                      placeholder="Example@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col relative">
                    <label className="text-[10px] font-black tracking-wider uppercase text-black/75 dark:text-white/75 mb-1.5">
                      Password
                    </label>
                    <div className="relative w-full">
                      <input 
                        type={showLoginPassword ? 'text' : 'password'} 
                        placeholder="xxxxxxx"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 pl-3 pr-10 py-2.5 rounded-none text-xs w-full focus:outline-none focus:border-brand-orange text-foreground font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest text-foreground/50 hover:text-foreground uppercase cursor-pointer"
                      >
                        {showLoginPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot Password */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 border border-black/15 accent-brand-orange"
                      />
                      <label htmlFor="rememberMe" className="text-[10px] text-black/60 dark:text-white/60 font-bold select-none cursor-pointer">
                        Remember me
                      </label>
                    </div>
                    <Link 
                      href="/forgot-password"
                      className="text-[10px] text-foreground/60 hover:text-foreground font-bold underline uppercase tracking-wider"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {loginError && (
                    <p className="text-[10px] font-black text-red-500 tracking-wide uppercase">{loginError}</p>
                  )}

                  <button 
                    type="submit"
                    className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-full shadow-md transition-all self-start mt-4"
                  >
                    LOGIN TO YOUR ACCOUNT
                  </button>
                </>
              )}
            </form>
          </div>

        </div>

        {/* Trust Grid Section */}
        <div className="mt-20 border-t border-black/10 dark:border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1000px] mx-auto text-left">
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1.5">FAST SHIPPING</h3>
            <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Delivered within 3-6 business days.</p>
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1.5">EASY RETURNS</h3>
            <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">14-day full refund policy.</p>
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1.5">SECURE PAYMENTS</h3>
            <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">SSL Encrypted checkout protection.</p>
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-1.5">CUSTOMER SUPPORT</h3>
            <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Call us Mon-Fri 9 AM - 3 PM.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-24 border-t border-black/10 dark:border-white/10 pt-16 max-w-[800px] mx-auto text-left">
          <h2 className="text-lg md:text-xl font-black tracking-widest uppercase mb-8 border-b border-black/10 dark:border-white/10 pb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-black/10 dark:border-white/10 pb-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-xs font-black tracking-wider uppercase hover:text-[#FF8500] transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-normal">{openFaq === idx ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
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

      </main>

      <Footer />
    </div>
  );
}
