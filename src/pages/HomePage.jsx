import React from 'react';
import BgImg from '../components/BgImg';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import {
  CapsSection,
  HoodieSection,
  ShoesSection,
  DropsholderHoodieSection,
  SweetShirtSection,
  WalletSection,
} from '../homepage-component/HomeSections';

const HomePage = () => {
  return (
    <div>
      <BgImg />
      <div data-aos="fade-up"><CapsSection /></div>
      <div data-aos="fade-up"><HoodieSection /></div>
      <div data-aos="fade-up"><ShoesSection /></div>
      <div data-aos="fade-up"><DropsholderHoodieSection /></div>
      <div data-aos="fade-up"><SweetShirtSection /></div>
      <div data-aos="fade-up"><WalletSection /></div>
      <div data-aos="fade-up"><Testimonials /></div>
      <Newsletter />
    </div>
  );
};

export default HomePage;
