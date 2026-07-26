"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

export default function InstagramShowcase() {
  const posts = [
    {
      img: "/assets/images/navbar_men.jpg",
      handle: "@sebastian.simons",
      likes: "1,424",
      comments: "56"
    },
    {
      img: "/assets/images/navbar_women.jpg",
      handle: "@agnes.fischer",
      likes: "2,198",
      comments: "84"
    },
    {
      img: "/assets/images/trail_desk.png",
      handle: "@hartkopp_runs",
      likes: "3,110",
      comments: "102"
    },
    {
      img: "/assets/images/activewear_desk.png",
      handle: "@sandramartens",
      likes: "1,894",
      comments: "67"
    }
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24 select-none font-sans text-center">
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <span className="text-[10px] font-black tracking-widest text-[#FF8500] uppercase mb-2">
          COMMUNITY FEED
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase text-foreground">
          WEAR YOUR MISSION
        </h2>
        <p className="text-xs font-semibold tracking-widest text-foreground/45 uppercase mt-2">
          TAG @NEBULA.OFFICIAL TO BE FEATURED
        </p>
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {posts.map((post, idx) => (
          <motion.div 
            key={idx}
            className="relative aspect-square group overflow-hidden bg-black rounded-sm border border-black/5 dark:border-white/5 cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Image */}
            <Image 
              src={post.img} 
              alt={`Instagram post by ${post.handle}`}
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-104 opacity-90"
              sizes="(min-width: 1024px) 25vw, 50vw"
              loading="lazy"
            />

            {/* Hover overlay details */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              {/* Handle */}
              <div className="text-left text-xs font-black tracking-wider uppercase">
                {post.handle}
              </div>

              {/* Likes & Comments Icons */}
              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>{post.comments}</span>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="text-right text-[9px] font-black tracking-widest uppercase opacity-60">
                #NEBULA
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
