import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) return;
    showToast('🎉 Successfully subscribed to WarmHut!');
    setEmail('');
  };

  return (
    <section className="px-4 pb-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative bg-gray-900 rounded-3xl px-6 md:px-12 py-12 overflow-hidden text-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-olive/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-olive/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <span className="text-4xl block mb-4">📧</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Get Exclusive <span className="text-olive">Deals</span>
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
              Subscribe and be the first to know about new arrivals and special discounts.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-olive transition-colors text-sm backdrop-blur-sm"
                required
              />
              <button type="submit" className="px-6 py-3.5 bg-olive text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-200 text-sm whitespace-nowrap shadow-lg">
                Subscribe →
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
