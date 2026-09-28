import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import HeroSlider from '../components/HeroSlider';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSection from '../components/FeaturedSection';
import AgronomyGuides from '../components/AgronomyGuides';
import { ToastContainer } from '../../../components/common/Toast';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Categories Grid */}
        <CategoryGrid />

        {/* Featured Products Tabbed Section */}
        <FeaturedSection />

        {/* Agronomy Guides */}
        <AgronomyGuides />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
