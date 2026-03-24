import React, { useState, useEffect } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const reviews = [
  {
    id: 1,
    name: 'Rakibul Islam',
    location: 'Dhaka',
    rating: 5,
    text: 'Excellent quality hoodie! Exactly as shown in photos. Fast delivery within 2 days. Will definitely order again from WarmHut!',
    avatar: 'RI',
    product: 'SUPER Hoodie - Black',
    color: 'bg-olive',
  },
  {
    id: 2,
    name: 'Fatema Khanam',
    location: 'Chittagong',
    rating: 5,
    text: 'Loved the caps collection! Very stylish and fits perfectly. The olive color is stunning. Customer service was super helpful too.',
    avatar: 'FK',
    product: 'Lyle & Scott Cap (Olive)',
    color: 'bg-olive',
  },
  {
    id: 3,
    name: 'Sabbir Ahmed',
    location: 'Sylhet',
    rating: 4,
    text: 'Great quality sweatshirt at a very reasonable price. Delivery was quick and packaging was secure. Happy with my purchase!',
    avatar: 'SA',
    product: 'Sweatshirt - Gray',
    color: 'bg-olive',
  },
  {
    id: 4,
    name: 'Nusrat Jahan',
    location: 'Rajshahi',
    rating: 5,
    text: 'The IGOR wallet is premium quality! Looks even better in person than the photos. Very happy with WarmHut.',
    avatar: 'NJ',
    product: 'IGOR Wallet - Black',
    color: 'bg-olive',
  },
  {
    id: 5,
    name: 'Tanvir Hossain',
    location: 'Khulna',
    rating: 5,
    text: 'Ordered the Dropshoulder Hoodie in Blue — absolutely love it! Great stitching, perfect fit, and color is beautiful.',
    avatar: 'TH',
    product: 'Dropshoulder Hoodie - Blue',
    color: 'bg-olive',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent(p => (p + 1) % reviews.length), 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => { setAutoPlay(false); setCurrent(p => (p === 0 ? reviews.length - 1 : p - 1)); };
  const next = () => { setAutoPlay(false); setCurrent(p => (p + 1) % reviews.length); };

  const r = reviews[current];

  return (
    <section className="py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-olive font-bold uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">What Customers Say</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Review Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olive/50 to-olive rounded-t-3xl" />
            <span className="absolute top-5 left-7 text-7xl text-gray-100 font-serif leading-none select-none">"</span>

            <div className={`w-14 h-14 ${r.color} text-white font-black text-lg rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              {r.avatar}
            </div>

            <div className="flex justify-center gap-x-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <BsStarFill key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 relative z-10 font-semibold">
              "{r.text}"
            </p>

            <p className="font-black text-gray-900 text-sm">{r.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{r.location} · <span className="text-olive">{r.product}</span></p>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-x-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-olive hover:text-olive flex items-center justify-center transition-colors">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-x-1.5">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-olive' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-olive hover:text-olive flex items-center justify-center transition-colors">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
