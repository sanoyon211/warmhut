import React, { useState } from 'react';
import { IoLogoYoutube } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTiktok, FaCheckCircle, FaArrowRight, FaTruck, FaUndo, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router';
import { useToast } from '../context/ToastContext';
import { subscribeNewsletter } from '../lib/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const data = await subscribeNewsletter(email);
      showToast(<span className="flex items-center gap-2"><FaCheckCircle /> {data.message || 'Successfully subscribed!'}</span>, 'success');
      setEmail('');
    } catch (error) {
      showToast(error.message || 'Failed to subscribe. Maybe you are already subscribed?', 'error');
    } finally {
      setSubscribing(false);
    }
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
                {[
                  { label: 'FAQ', to: '/faq' },
                  { label: 'Return & Refund Policy', to: '/return-policy' },
                  { label: 'Delivery Policy', to: '/delivery-policy' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Terms & Conditions', to: '/terms' },
                ].map(item => (
                  <Link key={item.label} to={item.to} className="block">
                    <p className="text-gray-400 text-sm hover:text-olive transition-colors cursor-pointer">{item.label}</p>
                  </Link>
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
                  <button type="submit" disabled={subscribing} className="w-full py-2.5 bg-olive text-white rounded-xl text-sm font-semibold hover:bg-olive/80 transition-colors disabled:opacity-50">
                    {subscribing ? 'Subscribing...' : <span className="flex items-center justify-center gap-2">Subscribe <FaArrowRight /></span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: <FaTruck />, title: 'Free Delivery', sub: 'Above BDT 1000' },
                { icon: <FaUndo />, title: 'Easy Return', sub: '7 days policy' },
                { icon: <FaShieldAlt />, title: '100% Original', sub: 'Authentic products' },
                { icon: <FaCreditCard />, title: 'bKash & COD', sub: 'Secure payment' },
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
