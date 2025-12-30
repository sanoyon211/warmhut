import React from 'react'
import Button1 from '../components/Button1'
import HoodieSection from '../homepage-component/HoodieSection'
import ShoesSection from '../homepage-component/ShoesSection';
import DropsholderHoodieSection from '../homepage-component/DropsholderHoodieSection';
import CapsSection from '../homepage-component/CapsSection';
import BgImg from '../components/BgImg';
import SweetShirtSection from '../homepage-component/SweetShirtSection';
import WalletSection from '../homepage-component/WalletSection';






const HomePage = () => {
  return (
    <div className='max-w-[1500px] mx-auto'>
      <BgImg data-aos="fade-up" />

      <div data-aos="fade-up">
        <CapsSection />
      </div>

      <div data-aos="fade-up">
        <HoodieSection />
      </div>

      <div data-aos="fade-up">
        <ShoesSection />
      </div>

      <div data-aos="fade-up">
        <DropsholderHoodieSection />
      </div>

      <div data-aos="fade-up">
        <SweetShirtSection />
      </div>

      <div data-aos="fade-up">
        <WalletSection />
      </div>
    </div>
  );
};

export default HomePage