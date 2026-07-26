import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ScrollingMarquee from '@/components/ScrollingMarquee';
import SplitTeasers from '@/components/SplitTeasers';
import TrendingProducts from '@/components/TrendingProducts';
import LargeMediaBlock from '@/components/LargeMediaBlock';
import TrailSneaker from '@/components/TrailSneaker';
import TechSpecs from '@/components/TechSpecs';
import HeritageSection from '@/components/HeritageSection';
import AthleteSpotlight from '@/components/AthleteSpotlight';
import SustainabilityBlock from '@/components/SustainabilityBlock';
import InstagramShowcase from '@/components/InstagramShowcase';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';

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

        {/* Scrolling Ticker Announcement */}
        <ScrollingMarquee />

        {/* Section 2: Split Teasers (T-shirts & Activewear) */}
        <SplitTeasers />

        {/* Section 3: Trending Bestsellers Shop Grid */}
        <TrendingProducts />

        {/* Section 4: Large Editorial Editorial Card (Intro: NEBULA Journals) */}
        <LargeMediaBlock />

        {/* Section 5: Trail Sneaker 2.0 Feature */}
        <TrailSneaker />

        {/* Section 6: NEBULA Fabric Technology Specs */}
        <TechSpecs />

        {/* Section 7: Brand Heritage & Parachute Origin Details */}
        <HeritageSection />

        {/* Section 8: Athlete Spotlight */}
        <AthleteSpotlight />

        {/* Section 9: Green Manufacturing & Sustainability */}
        <SustainabilityBlock />

        {/* Section 10: Instagram community Feed */}
        <InstagramShowcase />
      </main>

      {/* Footer Navigation and Marquees */}
      <Footer />

      {/* Timed Welcome Promotional Popup */}
      <PromoPopup />
    </div>
  );
}
