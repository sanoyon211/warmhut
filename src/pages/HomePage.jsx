import React, { useEffect, useState } from 'react';
import BgImg from '../components/BgImg';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import {
  NewArrivalsSection,
  DynamicCategorySection,
} from '../homepage-component/HomeSections';
import { fetchCategories } from '../lib/api';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);
  return (
    <div>
      <BgImg />
      <div data-aos="fade-up"><NewArrivalsSection /></div>
      
      {categories.map((cat) => {
        let title = `Premium ${cat}`;
        let subtitle = "Our Collection";
        
        if (cat === 'Caps') { title = 'Premium Caps'; subtitle = 'New Arrivals'; }
        else if (cat === 'Hoodie') { title = 'Premium Hoodies'; subtitle = 'Best Sellers'; }
        else if (cat === 'Dropshoulder Hoodie') { title = 'Dropshoulder Hoodies'; subtitle = 'Trending Now'; }
        else if (cat === 'Sweatshirt') { title = 'Premium Sweatshirts'; subtitle = 'Staff Picks'; }
        else if (cat === 'Shoes') { title = 'Premium Shoes'; subtitle = 'Top Picks'; }
        else if (cat === 'Wallet') { title = 'Premium Wallets'; subtitle = 'Accessories'; }
        
        return (
          <div key={cat} data-aos="fade-up">
            <DynamicCategorySection 
              title={title} 
              subtitle={subtitle} 
              viewAllLink={`/shop?category=${encodeURIComponent(cat)}`} 
              category={cat} 
            />
          </div>
        );
      })}
      <div data-aos="fade-up"><Testimonials /></div>
      <Newsletter />
    </div>
  );
};

export default HomePage;
