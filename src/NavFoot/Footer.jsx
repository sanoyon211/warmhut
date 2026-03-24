import React, { useState } from 'react';
import { IoLogoYoutube } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('🎉 Successfully subscribed!');
    setEmail('');
  };

  return (
    <>
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="lg:col-span-1">
              <h1 className="font-black text-2xl mb-3">Warm<span className="text-olive">Hut</span></h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-[220px]">
                Premium winter clothing crafted for comfort, style, and confidence. Delivering across Bangladesh.
              </p>
              <div className="flex gap-x-3">
                {[
                  { icon: <FaFacebook className="w-4 h-4" />, color: 'hover:bg-blue-600', href: '#' },
                  { icon: <IoLogoYoutube className="w-4 h-4" />, color: 'hover:bg-red-600', href: '#' },
                  { icon: <FaInstagram className="w-4 h-4" />, color: 'hover:bg-pink-600', href: '#' },
                  { icon: <FaTiktok className="w-4 h-4" />, color: 'hover:bg-gray-600', href: '#' },
                ].map((s, i) => (
                  <a key={i} href={s.href} className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center ${s.color} transition-colors duration-200`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-5">Collections</h3>
              <div className="space-y-3">
                {[
                  { to: '/caps', label: 'Caps' },
                  { to: '/hoodie', label: 'Hoodies' },
                  { to: '/dropshoulderhoodie', label: 'Dropshoulder Hoodies' },
                  { to: '/sweatshirt', label: 'Sweatshirts' },
                  { to: '/shoes', label: 'Shoes' },
                  { to: '/wallet', label: 'Wallets' },
                ].map(link => (
                  <Link key={link.to} to={link.to}>
                    <p className="text-gray-400 text-sm hover:text-olive transition-colors cursor-pointer">{link.label}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-5">Information</h3>
              <div className="space-y-3">
                {['About Us', 'Delivery Policy', 'Return & Refund', 'Terms & Conditions', 'Privacy Policy', 'How to Order'].map(item => (
                  <p key={item} className="text-gray-400 text-sm hover:text-olive transition-colors cursor-pointer">{item}</p>
                ))}
              </div>
            </div>

            {/* Newsletter + Contact */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-5">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="mb-6">
                <p className="text-gray-400 text-sm mb-3">Get exclusive deals in your inbox.</p>
                <div className="flex flex-col gap-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-olive transition-colors"
                    required
                  />
                  <button type="submit" className="w-full py-2.5 bg-olive text-white rounded-xl text-sm font-semibold hover:bg-olive/80 transition-colors">
                    Subscribe →
                  </button>
                </div>
              </form>
              <div className="space-y-2">
                <p className="text-sm text-gray-400"><span className="text-gray-300 font-medium">📍</span> Dhaka, Bangladesh</p>
                <p className="text-sm text-gray-400"><span className="text-gray-300 font-medium">📞</span> 01715825331</p>
                <p className="text-sm text-gray-400"><span className="text-gray-300 font-medium">✉️</span> warmhutbd@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: '🚚', title: 'Free Delivery', sub: 'Above BDT 1000' },
                { icon: '🔄', title: 'Easy Return', sub: '7 days policy' },
                { icon: '🛡️', title: '100% Original', sub: 'Authentic products' },
                { icon: '💳', title: 'bKash & COD', sub: 'Secure payment' },
              ].map(f => (
                <div key={f.title} className="flex flex-col items-center gap-y-1">
                  <span className="text-xl">{f.icon}</span>
                  <p className="text-white text-xs font-semibold">{f.title}</p>
                  <p className="text-gray-500 text-[10px]">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom bar */}
      <div className="bg-gray-950 py-4 text-center">
        <p className="text-gray-500 text-xs">
          © 2025 WarmHut. All rights reserved. Developed by <span className="text-olive font-semibold">SA Noyon</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
