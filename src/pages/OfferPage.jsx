import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const deals = [
  {
    id: 1, emoji: '🧢', title: 'Caps Sale', discount: '20% OFF',
    originalPrice: 350, salePrice: 280,
    desc: 'All premium Lyle & Scott, HUF, Nike, Puma caps on sale!',
    to: '/caps', gradient: 'from-sky-500 to-blue-700',
    badge: 'HOT', badgeColor: 'bg-red-500',
    items: ['Lyle & Scott', 'HUF', 'Nike', 'Puma', 'Tommy Hilfiger'],
  },
  {
    id: 2, emoji: '🧥', title: 'Hoodie Bundle', discount: 'BUY 2 GET 1',
    originalPrice: 1400, salePrice: 933,
    desc: 'Buy any 2 hoodies and get 1 absolutely free! Limited time.',
    to: '/hoodie', gradient: 'from-purple-500 to-indigo-700',
    badge: 'BEST DEAL', badgeColor: 'bg-yellow-500',
    items: ['Olive', 'Black', 'Baby Blue', 'Cream White'],
  },
  {
    id: 3, emoji: '👟', title: 'Shoes Clearance', discount: '15% OFF',
    originalPrice: 2200, salePrice: 1870,
    desc: 'Limited stock! Air Force, Air Monarch, Superstar. Grab fast.',
    to: '/shoes', gradient: 'from-emerald-500 to-green-700',
    badge: 'LIMITED', badgeColor: 'bg-orange-500',
    items: ['Air Force 107', 'Air Monarch', 'Run Four', 'Superstar II'],
  },
  {
    id: 4, emoji: '👕', title: 'Sweatshirt Deal', discount: '10% OFF',
    originalPrice: 750, salePrice: 675,
    desc: 'Premium quality sweatshirts at unbeatable prices this month.',
    to: '/sweatshirt', gradient: 'from-amber-500 to-orange-600',
    badge: 'NEW', badgeColor: 'bg-green-500',
    items: ['Jack & Jones', 'Black', 'Gray', 'Light Gray'],
  },
  {
    id: 5, emoji: '👛', title: 'Wallet Combo', discount: 'FREE SHIPPING',
    originalPrice: 500, salePrice: 500,
    desc: 'Free home delivery on all wallet orders across Bangladesh.',
    to: '/wallet', gradient: 'from-rose-500 to-red-700',
    badge: 'FREE', badgeColor: 'bg-blue-500',
    items: ['Eton & Coin', 'IGOR', 'RE-LOCK', 'TIMILUS', 'Quiksilver'],
  },
  {
    id: 6, emoji: '🥋', title: 'Dropshoulder Mega', discount: '25% OFF',
    originalPrice: 1500, salePrice: 1125,
    desc: 'Washed Dropshoulder Hoodies mega sale. All colors available.',
    to: '/dropshoulderhoodie', gradient: 'from-teal-500 to-cyan-700',
    badge: 'MEGA', badgeColor: 'bg-purple-500',
    items: ['Blue', 'Autumn', 'Gray', 'Black'],
  },
];

const useCountdown = () => {
  const [time, setTime] = useState({ days: 2, hours: 14, mins: 35, secs: 20 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

const OfferPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const time = useCountdown();
  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-olive/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-olive/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-block bg-red-500 text-white text-xs font-black px-5 py-1.5 rounded-full mb-5 animate-bounce tracking-wider uppercase">
            🔥 Limited Time Offers
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
            Special <span className="text-olive">Deals</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md mx-auto">
            Grab the best deals before they expire. New offers added every week!
          </p>

          {/* Live Countdown */}
          <div className="flex justify-center items-center gap-x-2 md:gap-x-4">
            {[
              { val: pad(time.days), label: 'Days' },
              { val: pad(time.hours), label: 'Hours' },
              { val: pad(time.mins), label: 'Mins' },
              { val: pad(time.secs), label: 'Secs' },
            ].map((t, i) => (
              <React.Fragment key={t.label}>
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 border border-olive/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-olive font-black text-xl md:text-2xl">{t.val}</span>
                  </div>
                  <span className="text-gray-500 text-[10px] mt-1 block uppercase tracking-wider">{t.label}</span>
                </div>
                {i < 3 && <span className="text-olive font-black text-2xl pb-5">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Perks Strip */}
      <div className="bg-olive">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-8 gap-y-1">
          {['🚚 Free Delivery above 1000TK', '🔄 7-Day Easy Return', '💳 bKash & Cash on Delivery', '🛡️ 100% Original'].map(s => (
            <span key={s} className="text-white text-xs font-semibold">{s}</span>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs text-olive font-bold uppercase tracking-widest mb-2">Exclusive Savings</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Today's Best Offers</h2>
          <p className="text-gray-400 text-sm mt-2">Click any deal card to explore the collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map(deal => (
            <div
              key={deal.id}
              onMouseEnter={() => setHoveredId(deal.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 ${hoveredId === deal.id ? 'shadow-2xl scale-[1.02] border-transparent' : ''}`}
            >
              {/* Top gradient */}
              <div className={`bg-gradient-to-br ${deal.gradient} p-7 relative overflow-hidden`}>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-black/10 rounded-full" />
                <span className={`absolute top-4 right-4 ${deal.badgeColor} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider`}>
                  {deal.badge}
                </span>
                <div className="text-5xl mb-3 relative z-10">{deal.emoji}</div>
                <h3 className="text-white font-black text-2xl relative z-10">{deal.title}</h3>
                <div className="mt-2 inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1 rounded-full relative z-10">
                  {deal.discount}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{deal.desc}</p>

                {deal.salePrice !== deal.originalPrice && (
                  <div className="flex items-center gap-x-3 mb-4">
                    <span className="text-gray-300 line-through text-sm">BDT {deal.originalPrice}TK</span>
                    <span className="text-olive font-black text-xl">BDT {deal.salePrice}TK</span>
                    <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-lg">
                      Save {deal.originalPrice - deal.salePrice}TK
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {deal.items.map(item => (
                    <span key={item} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-lg font-medium">
                      {item}
                    </span>
                  ))}
                </div>

                <Link to={deal.to}>
                  <button className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r ${deal.gradient} hover:opacity-90 transition-opacity shadow-lg`}>
                    Shop {deal.title} →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl overflow-hidden relative bg-gray-900 p-10 text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #6b7c4e 0%, transparent 60%), radial-gradient(circle at 80% 50%, #6b7c4e 0%, transparent 60%)'
          }} />
          <div className="relative z-10">
            <p className="text-olive text-sm font-bold uppercase tracking-widest mb-3">Don't miss out</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Browse All Collections</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
              Explore our complete range of premium winter wear at unbeatable prices.
            </p>
            <Link to="/">
              <button className="px-10 py-4 bg-olive text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-xl shadow-olive/20 text-sm">
                Explore All Products →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
