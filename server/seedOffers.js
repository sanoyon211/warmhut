import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Offer from './models/Offer.js';

dotenv.config();

const deals = [
  {
    emoji: '🧢', title: 'Caps Sale', discount: '20% OFF',
    originalPrice: 350, salePrice: 280,
    desc: 'All premium Lyle & Scott, HUF, Nike, Puma caps on sale!',
    to: '/caps', gradient: 'from-sky-500 to-blue-700',
    badge: 'HOT', badgeColor: 'bg-red-500',
    items: ['Lyle & Scott', 'HUF', 'Nike', 'Puma', 'Tommy Hilfiger'],
  },
  {
    emoji: '🧥', title: 'Hoodie Bundle', discount: 'BUY 2 GET 1',
    originalPrice: 1400, salePrice: 933,
    desc: 'Buy any 2 hoodies and get 1 absolutely free! Limited time.',
    to: '/hoodie', gradient: 'from-purple-500 to-indigo-700',
    badge: 'BEST DEAL', badgeColor: 'bg-yellow-500',
    items: ['Olive', 'Black', 'Baby Blue', 'Cream White'],
  },
  {
    emoji: '👟', title: 'Shoes Clearance', discount: '15% OFF',
    originalPrice: 2200, salePrice: 1870,
    desc: 'Limited stock! Air Force, Air Monarch, Superstar. Grab fast.',
    to: '/shoes', gradient: 'from-emerald-500 to-green-700',
    badge: 'LIMITED', badgeColor: 'bg-orange-500',
    items: ['Air Force 107', 'Air Monarch', 'Run Four', 'Superstar II'],
  },
  {
    emoji: '👕', title: 'Sweatshirt Deal', discount: '10% OFF',
    originalPrice: 750, salePrice: 675,
    desc: 'Premium quality sweatshirts at unbeatable prices this month.',
    to: '/sweatshirt', gradient: 'from-amber-500 to-orange-600',
    badge: 'NEW', badgeColor: 'bg-green-500',
    items: ['Jack & Jones', 'Black', 'Gray', 'Light Gray'],
  },
  {
    emoji: '👛', title: 'Wallet Combo', discount: 'FREE SHIPPING',
    originalPrice: 500, salePrice: 500,
    desc: 'Free home delivery on all wallet orders across Bangladesh.',
    to: '/wallet', gradient: 'from-rose-500 to-red-700',
    badge: 'FREE', badgeColor: 'bg-blue-500',
    items: ['Eton & Coin', 'IGOR', 'RE-LOCK', 'TIMILUS', 'Quiksilver'],
  },
  {
    emoji: '🥋', title: 'Dropshoulder Mega', discount: '25% OFF',
    originalPrice: 1500, salePrice: 1125,
    desc: 'Washed Dropshoulder Hoodies mega sale. All colors available.',
    to: '/dropshoulderhoodie', gradient: 'from-teal-500 to-cyan-700',
    badge: 'MEGA', badgeColor: 'bg-purple-500',
    items: ['Blue', 'Autumn', 'Gray', 'Black'],
  },
];

const seedOffers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    await Offer.deleteMany({});
    console.log('Cleared existing offers');

    await Offer.insertMany(deals);
    console.log('Offers seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('Error seeding offers:', error);
    process.exit(1);
  }
};

seedOffers();
