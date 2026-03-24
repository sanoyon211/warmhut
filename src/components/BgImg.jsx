import React from 'react';
import TypedEffect from './TypedEffect';
import { Link } from 'react-router';

const BgImg = () => {
  return (
    <section className="px-3 pt-4 pb-2">
      {/* Main Hero */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gray-900 min-h-[320px] md:min-h-[420px] flex flex-col justify-center items-center text-center px-6 py-10">
        {/* Animated BG blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-olive/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-olive/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-x-2 bg-olive/20 border border-olive/30 text-olive text-xs font-bold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"></span>
            New Season Collection 2026
          </div>

          <TypedEffect />

          <p className="mt-3 text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Discover premium winter wear crafted for style and comfort. 500+ products, 10K+ happy customers across Bangladesh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <Link to="/caps">
              <button className="px-8 py-3.5 bg-olive text-white font-bold rounded-2xl hover:bg-olive/80 transition-all duration-200 shadow-lg shadow-olive/25 text-sm">
                Shop Now →
              </button>
            </Link>
            <Link to="/offers">
              <button className="px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-sm">
                ✨ View Offers
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-x-8 mt-6 pt-8 border-t border-white/10">
            {[
              { num: '500+', label: 'Products' },
              { num: '10K+', label: 'Customers' },
              { num: '100%', label: 'Original' },
              { num: '⭐ 4.9', label: 'Rating' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-olive font-black text-lg md:text-xl">{s.num}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        {[
          { icon: '🚚', title: 'Free Delivery', sub: 'Orders above 1000TK' },
          { icon: '🔄', title: 'Easy Return', sub: '7 days return policy' },
          { icon: '🛡️', title: '100% Original', sub: 'Authentic products' },
          { icon: '💳', title: 'bKash & COD', sub: 'Flexible payment' },
        ].map(badge => (
          <div key={badge.title} className="flex items-center gap-x-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:border-olive/20 transition-all duration-200">
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <p className="text-xs font-bold text-gray-800">{badge.title}</p>
              <p className="text-[10px] text-gray-400">{badge.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BgImg;
