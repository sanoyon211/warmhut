import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaPhone } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdAccountCircle, MdClose } from 'react-icons/md';
import { FiShoppingCart, FiHeart, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Logo from '../assets/logo.png';

const navLinks = [
  { to: '/caps', label: 'Caps' },
  { to: '/dropshoulderhoodie', label: 'Dropshoulder' },
  { to: '/hoodie', label: 'Hoodie' },
  { to: '/sweatshirt', label: 'Sweatshirt' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/shoes', label: 'Shoes' },
  { to: '/offers', label: '🔥 Offers', special: true },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen, isCartOpen } = useCart(); // isCartOpen add kora hoyeche highlight er jonno
  const { totalWishlist } = useWishlist();
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpenMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenMenu(false);
    setOpenSearch(false);
  }, [location.pathname]);

  const isActive = path => location.pathname === path;

  return (
    <>
      {/* ── Sticky Navbar wrapper ── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}
      >
        {/* Top bar — hidden on mobile */}
        {/* max-height bebohar kora hoyeche jate flickering na hoy */}
        <div
          className={`hidden md:block bg-gray-900 overflow-hidden transition-all duration-500 ${scrolled ? 'max-h-0' : 'max-h-10 py-1.5'}`}
        >
          <div className="px-4 text-center">
            <p className="text-xs text-gray-400 tracking-wide">
              🚚 Free delivery above BDT 1000&nbsp;&nbsp;·&nbsp;&nbsp; 🔥 New
              arrivals every week&nbsp;&nbsp;·&nbsp;&nbsp; 📞 01715825331
            </p>
          </div>
        </div>

        {/* Main row */}
        <div
          className={`max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-x-2 flex-shrink-0 group"
          >
            <img
              src={Logo}
              alt="WarmHut"
              className={`rounded-xl object-cover transition-all duration-300 ${scrolled ? 'w-9 h-9' : 'w-10 h-10 md:w-12 md:h-12'}`}
            />
            <div className="leading-none">
              <span
                className={`font-black text-gray-900 transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}
              >
                Warm<span className="text-olive">Hut</span>
              </span>
              <p
                className={`text-[9px] text-gray-400 tracking-widest uppercase hidden md:block mt-0.5 transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
              >
                Premium Winter Wear
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-6">
            <div className="w-full flex items-center bg-gray-50 border border-gray-200 rounded-xl focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/10 transition-all overflow-hidden px-3">
              <FaSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-2.5 py-2.5 bg-transparent text-gray-700 text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop nav links + actions */}
          <div className="hidden lg:flex items-center gap-x-1">
            {/* Category links inline */}
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}>
                <span
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer
                  ${
                    link.special
                      ? 'text-amber-600 hover:bg-amber-50'
                      : isActive(link.to)
                        ? 'bg-olive/10 text-olive'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mx-2" />

            {/* Account - Highlighted if active */}
            <Link to="/login">
              <button
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive('/login') || isActive('/signup')
                    ? 'bg-olive/10 text-olive shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MdAccountCircle className="w-6 h-6" />
              </button>
            </Link>

            {/* Wishlist - Highlighted if active */}
            <Link to="/wishlist">
              <button
                className={`relative p-2 rounded-xl transition-all duration-200 ${
                  isActive('/wishlist')
                    ? 'bg-red-50 text-red-500 shadow-sm'
                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <FiHeart
                  className={`w-5 h-5 ${isActive('/wishlist') ? 'fill-red-500' : ''}`}
                />
                {totalWishlist > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center leading-none border-2 border-white">
                    {totalWishlist}
                  </span>
                )}
              </button>
            </Link>

            {/* Cart - Highlighted if open */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-xl transition-all duration-200 ${
                isCartOpen
                  ? 'bg-olive text-white shadow-lg'
                  : 'text-gray-500 hover:text-olive hover:bg-olive/10'
              }`}
            >
              <FiShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className={`absolute top-0.5 right-0.5 w-4 h-4 text-[9px] font-black rounded-full flex items-center justify-center leading-none border-2 ${
                    isCartOpen
                      ? 'bg-white text-olive border-olive'
                      : 'bg-olive text-white border-white'
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-x-1">
            <button
              onClick={() => setOpenSearch(v => !v)}
              className={`p-2 rounded-xl transition-colors ${openSearch ? 'text-olive bg-olive/5' : 'text-gray-500'}`}
            >
              <FaSearch className="w-4 h-4" />
            </button>
            <Link to="/wishlist">
              <button
                className={`relative p-2 rounded-xl ${isActive('/wishlist') ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}
              >
                <FiHeart
                  className={`w-5 h-5 ${isActive('/wishlist') ? 'fill-red-500' : ''}`}
                />
                {totalWishlist > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
                    {totalWishlist}
                  </span>
                )}
              </button>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-xl ${isCartOpen ? 'text-olive bg-olive/5' : 'text-gray-500'}`}
            >
              <FiShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-olive text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpenMenu(v => !v)}
              className="p-2 rounded-xl text-gray-500"
            >
              {openMenu ? (
                <MdClose className="w-6 h-6 text-olive" />
              ) : (
                <GiHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${openSearch ? 'max-h-20 border-t border-gray-100 py-3 px-4' : 'max-h-0'}`}
        >
          <div className="flex items-center gap-x-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <FaSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-gray-700 text-sm focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar Menu ── */}
      {openMenu && (
        <div className="fixed inset-0 z-[200] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpenMenu(false)}
          />

          {/* Drawer */}
          <div
            ref={menuRef}
            className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
              <Link
                to="/"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-x-2"
              >
                <img
                  src={Logo}
                  alt="WarmHut"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-black text-gray-900">
                  Warm<span className="text-olive">Hut</span>
                </span>
              </Link>
              <button
                onClick={() => setOpenMenu(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
              >
                <MdClose className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] px-3 pb-3">
                Collections
              </p>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpenMenu(false)}
                >
                  <div
                    className={`px-3 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all
                    ${
                      link.special
                        ? 'text-amber-600 bg-amber-50/60'
                        : isActive(link.to)
                          ? 'bg-olive text-white shadow-lg shadow-olive/20'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}

              <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] px-3 pb-2">
                  Account
                </p>
                <Link to="/login" onClick={() => setOpenMenu(false)}>
                  <div
                    className={`px-3 py-3 rounded-xl text-sm font-bold flex items-center gap-x-3 transition-all ${isActive('/login') ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <MdAccountCircle
                      className={`w-5 h-5 ${isActive('/login') ? 'text-white' : 'text-gray-400'}`}
                    />{' '}
                    Log In
                  </div>
                </Link>
                <Link to="/signup" onClick={() => setOpenMenu(false)}>
                  <div
                    className={`px-3 py-3 rounded-xl text-sm font-black flex items-center gap-x-3 transition-all ${isActive('/signup') ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-olive bg-olive/5'}`}
                  >
                    <span>✦</span> Sign Up
                  </div>
                </Link>
                <Link to="/wishlist" onClick={() => setOpenMenu(false)}>
                  <div
                    className={`px-3 py-3 rounded-xl text-sm font-bold flex items-center gap-x-3 transition-all ${isActive('/wishlist') ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isActive('/wishlist') ? 'text-white' : 'text-red-400'}`}
                    />
                    Wishlist
                    {totalWishlist > 0 && (
                      <span
                        className={`ml-auto w-5 h-5 text-[9px] font-black rounded-full flex items-center justify-center border ${isActive('/wishlist') ? 'bg-white text-red-500 border-red-500' : 'bg-red-500 text-white border-white'}`}
                      >
                        {totalWishlist}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-x-3 text-sm text-gray-900 font-bold">
                <FaPhone className="w-3.5 h-3.5 text-olive" />
                <span>01715825331</span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                warmhutbd@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
