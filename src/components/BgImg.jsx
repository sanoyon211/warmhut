import React from 'react';
import TypedEffect from './TypedEffect';
import { Link } from 'react-router';
import { FaArrowRight, FaStar, FaTruck, FaUndo, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { FaSparkles } from 'react-icons/fa6';

const BgImg = () => {
  return (
    <section className="px-3 pt-4 pb-2">
      {/* Main Hero */}
      <div className="relative w-full rounded-3xl overflow-hidden min-h-[380px] md:min-h-[500px] flex flex-col justify-center items-center text-center px-6 py-14 shadow-2xl">
        {/* Dynamic Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 opacity-40 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-olive blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/30 blur-[150px] mix-blend-screen"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-900/40 blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-x-2 bg-white/5 border border-white/10 text-gray-200 text-xs font-bold px-5 py-2 rounded-full mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-olive shadow-[0_0_10px_rgba(75,83,32,0.8)] animate-pulse"></span>
            Premium Winter Collection '26
          </div>

          <TypedEffect />

          <p className="mt-5 text-gray-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Discover ultra-premium winter wear crafted for style and unmatched comfort. Trusted by <span className="text-white font-bold">10,000+</span> customers across Bangladesh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/caps">
              <button className="group relative px-8 py-4 bg-olive text-white font-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(75,83,32,0.4)] hover:shadow-[0_0_60px_rgba(75,83,32,0.6)] transition-all duration-300">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-x-2 text-sm md:text-base tracking-wide">Explore Collection <FaArrowRight /></span>
              </button>
            </Link>
            <Link to="/offers">
              <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md text-sm md:text-base">
                <FaSparkles className="text-yellow-400" /> View Hot Offers
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-white/10 w-full max-w-2xl">
            {[
              { num: '500+', label: 'Premium Items' },
              { num: '10K+', label: 'Happy Customers' },
              { num: '100%', label: 'Authentic' },
              { num: <span className="flex items-center justify-center gap-1"><FaStar className="text-yellow-400" /> 4.9</span>, label: 'Average Rating' },
            ].map((s, index) => (
              <div key={index} className="text-center group">
                <p className="text-white font-black text-xl md:text-3xl group-hover:text-olive transition-colors">{s.num}</p>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { icon: <FaTruck />, title: 'Free Premium Delivery', sub: 'On orders above 1000TK' },
          { icon: <FaUndo />, title: 'Hassle-Free Returns', sub: '7 days no-questions policy' },
          { icon: <FaShieldAlt />, title: '100% Authentic', sub: 'Guaranteed original products' },
          { icon: <FaCreditCard />, title: 'Secure Payment', sub: 'bKash, Cards & Cash on Delivery' },
        ].map(badge => (
          <div key={badge.title} className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-x-4 bg-white border border-gray-100/60 rounded-3xl px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-olive/20 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-olive/5 transition-all duration-300 mb-3 sm:mb-0">
              {badge.icon}
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">{badge.title}</p>
              <p className="text-[11px] font-medium text-gray-500 mt-0.5">{badge.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BgImg;
