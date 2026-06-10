import React from 'react';
import BgImg from '../components/BgImg';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
  NewArrivalsSection,
  DynamicCategorySection,
} from '../homepage-component/HomeSections';

const HomePage = () => {
  return (
    <div>
      <BgImg />
      <div data-aos="fade-up"><NewArrivalsSection /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Premium Caps" subtitle="New Arrivals" viewAllLink="/caps" category="Caps" /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Premium Hoodies" subtitle="Best Sellers" viewAllLink="/hoodie" category="Hoodie" /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Dropshoulder Hoodies" subtitle="Trending Now" viewAllLink="/dropshoulderhoodie" category="Dropshoulder Hoodie" /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Premium Sweatshirts" subtitle="Staff Picks" viewAllLink="/sweatshirt" category="Sweatshirt" /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Premium Shoes" subtitle="Top Picks" viewAllLink="/shoes" category="Shoes" /></div>
      <div data-aos="fade-up"><DynamicCategorySection title="Premium Wallets" subtitle="Accessories" viewAllLink="/wallet" category="Wallet" /></div>
      <div data-aos="fade-up"><Testimonials /></div>
      <Newsletter />
    </div>
  );
};

export default HomePage;
