"use client";

export default function NewsletterForm() {
  return (
    <form className="flex space-x-2 pt-2" onSubmit={(e) => e.preventDefault()}>
      <input 
        type="email" 
        placeholder="YOUR EMAIL ADDRESS" 
        className="bg-white border border-black/15 px-3 py-2 text-xs flex-grow focus:outline-none focus:border-brand-orange font-semibold uppercase text-black" 
        required 
      />
      <button 
        type="submit" 
        className="px-6 py-2 bg-black text-white text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-sm cursor-pointer"
      >
        SUBSCRIBE
      </button>
    </form>
  );
}
