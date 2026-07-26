import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SplitTeasers from '@/components/SplitTeasers';
import LargeMediaBlock from '@/components/LargeMediaBlock';
import TrailSneaker from '@/components/TrailSneaker';
import HeritageSection from '@/components/HeritageSection';
import InstagramShowcase from '@/components/InstagramShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner and Marquee Scrolling */}
      <PromoBar />

      {/* Navigation Header Overlay */}
      <Header />

      {/* Page Sections */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero Video Banner */}
        <HeroSection />

        {/* Section 2: Split Teasers (T-shirts & Activewear) */}
        <SplitTeasers />

        {/* Section 3: Large Editorial Editorial Card (Intro: NEBULA Journals) */}
        <LargeMediaBlock />

        {/* Section 4: Trail Sneaker 2.0 Feature */}
        <TrailSneaker />

        {/* Section 5: Brand Heritage & Parachute Origin Details */}
        <HeritageSection />

        {/* Section 6: Instagram community Feed */}
        <InstagramShowcase />
      </main>

      {/* Footer Navigation and Marquees */}
      <Footer />
    </div>
  );
}
