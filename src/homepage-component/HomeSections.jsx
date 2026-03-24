// All homepage product sections

import React from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';

// ─── Caps ────────────────────────────────────────────────
import CapBlack from '../assets/Caps/BASEBALL UNISEX - Cap - jet black.webp';
import Capdeep from '../assets/Caps/BASEBALL UNISEX - Cap - deep depths.webp';
import Capgray from '../assets/Caps/BASEBALL UNISEX - Cap - grey taupe.webp';
import Capespresso from '../assets/Caps/BASEBALL UNISEX - Cap - espresso.webp';

export const CapsSection = () => (
  <section className="px-4 pt-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader title="Premium Caps" subtitle="New Arrivals" viewAllLink="/caps" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: CapBlack, name: 'Lyle & Scott Cap (Jet Black)', price: 'BDT 350TK' },
          { img: Capdeep, name: 'Lyle & Scott Cap (Deep Depths)', price: 'BDT 350TK' },
          { img: Capgray, name: 'Lyle & Scott Cap (Grey Taupe)', price: 'BDT 350TK' },
          { img: Capespresso, name: 'Lyle & Scott Cap (Espresso)', price: 'BDT 350TK' },
        ].map((p, i) => <Card key={i} id={`cap-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);

// ─── Hoodies ────────────────────────────────────────────────
import Olive from '../assets/Hoodie/SUPER - Hoodie - olive.webp';
import CreameWhite from '../assets/Hoodie/SUPER - Hoodie - creamwhite.webp';
import HoodieBlack from '../assets/Hoodie/SUPER - Hoodie - black.webp';
import BabyBlue from '../assets/Hoodie/SUPER - Hoodie - babyblue.webp';

export const HoodieSection = () => (
  <section className="px-4 pt-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader title="Premium Hoodies" subtitle="Best Sellers" viewAllLink="/hoodie" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: Olive, name: 'SUPER Hoodie (Olive)', price: 'BDT 1400TK' },
          { img: CreameWhite, name: 'SUPER Hoodie (Cream White)', price: 'BDT 1400TK' },
          { img: HoodieBlack, name: 'SUPER Hoodie (Black)', price: 'BDT 1400TK' },
          { img: BabyBlue, name: 'SUPER Hoodie (Baby Blue)', price: 'BDT 1400TK' },
        ].map((p, i) => <Card key={i} id={`hoodie-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);

// ─── Shoes ────────────────────────────────────────────────
import Shoe1 from '../assets/Shoes/AIR FORCE 1 07 - Trainers - black.webp';
import Shoe2 from '../assets/Shoes/AIR MONARCH IV - Training shoe.webp';
import Shoe3 from '../assets/Shoes/RUN FOUR - Trainers.webp';
import Shoe4 from '../assets/Shoes/SUPERSTAR II  - Trainers.webp';

export const ShoesSection = () => (
  <section className="px-4 pt-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader title="Premium Shoes" subtitle="Top Picks" viewAllLink="/shoes" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: Shoe1, name: 'Air Force 107 (Black)', price: 'BDT 2200TK' },
          { img: Shoe2, name: 'Air Monarch IV', price: 'BDT 2300TK' },
          { img: Shoe3, name: 'Run Four Trainers', price: 'BDT 2100TK' },
          { img: Shoe4, name: 'Superstar II Trainers', price: 'BDT 2500TK' },
        ].map((p, i) => <Card key={i} id={`shoe-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);

// ─── Dropshoulder ────────────────────────────────────────────────
import DBlue from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-blue.jpg';
import DAutumn from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-Autunm.jpg';
import DGray from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-gray.jpg';
import DBlack from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-black.jpg';

export const DropsholderHoodieSection = () => (
  <section className="px-4 pt-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader title="Dropshoulder Hoodies" subtitle="Trending Now" viewAllLink="/dropshoulderhoodie" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: DBlue, name: 'Washed Dropshoulder (Blue)', price: 'BDT 1500TK' },
          { img: DAutumn, name: 'Washed Dropshoulder (Autumn)', price: 'BDT 1500TK' },
          { img: DGray, name: 'Washed Dropshoulder (Gray)', price: 'BDT 1500TK' },
          { img: DBlack, name: 'Washed Dropshoulder (Black)', price: 'BDT 1500TK' },
        ].map((p, i) => <Card key={i} id={`dhoodie-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);

// ─── Sweatshirt ────────────────────────────────────────────────
import Jackjony from '../assets/Sweetshirt/Jack & Jonys -Sweet Shirt.webp';
import SwBlack from '../assets/Sweetshirt/Sweet Shirt -Black.webp';
import SwGray from '../assets/Sweetshirt/Sweet Shirt -Gray.webp';
import SwLightGray from '../assets/Sweetshirt/Sweet Shirt -Light Gray.webp';

export const SweetShirtSection = () => (
  <section className="px-4 pt-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader title="Premium Sweatshirts" subtitle="Staff Picks" viewAllLink="/sweatshirt" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: Jackjony, name: 'Jack & Jones Sweatshirt', price: 'BDT 750TK' },
          { img: SwBlack, name: 'Sweatshirt (Black)', price: 'BDT 650TK' },
          { img: SwGray, name: 'Sweatshirt (Gray)', price: 'BDT 650TK' },
          { img: SwLightGray, name: 'Sweatshirt (Light Gray)', price: 'BDT 650TK' },
        ].map((p, i) => <Card key={i} id={`sw-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);

// ─── Wallet ────────────────────────────────────────────────
import Wallet1 from '../assets/Wallet/ETON AND COIN SET - Wallet - black.webp';
import Wallet2 from '../assets/Wallet/IGOR - Wallet - black.webp';
import Wallet3 from '../assets/Wallet/RE-LOCK LARGE ZIP AROUND - Wallet - black.webp';
import Wallet4 from '../assets/Wallet/TIMILUS - Wallet - black.webp';

export const WalletSection = () => (
  <section className="px-4 pt-10 pb-4">
    <div className="max-w-[1400px] mx-auto">
      {/* BUG FIX: was linking to /sweatshirt, now correctly /wallet */}
      <SectionHeader title="Premium Wallets" subtitle="Accessories" viewAllLink="/wallet" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          { img: Wallet1, name: 'Eton & Coin Set (Black)', price: 'BDT 450TK' },
          { img: Wallet2, name: 'IGOR Wallet (Black)', price: 'BDT 500TK' },
          { img: Wallet3, name: 'RE-LOCK Large (Black)', price: 'BDT 550TK' },
          { img: Wallet4, name: 'TIMILUS Wallet (Black)', price: 'BDT 400TK' },
        ].map((p, i) => <Card key={i} id={`wallet-home-${i}`} bgImg={p.img} title={p.price} subTitle={p.name} />)}
      </div>
    </div>
  </section>
);
