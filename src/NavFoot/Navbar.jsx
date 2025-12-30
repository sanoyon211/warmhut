import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import { FaPhone } from 'react-icons/fa6';
import { GiElectric, GiHamburgerMenu, GiBeachBag } from 'react-icons/gi';
import { MdAccountCircle } from 'react-icons/md';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const menuRef = useRef(null);
  const location = useLocation();

  // ⭐ 1. Outside Click Hide Menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⭐ 2. Route change হলে menu auto-close
  useEffect(() => {
    setOpenMenu(false);
    setOpenSearch(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white hidden lg:block ">
        <div className="max-w-[1320px] w-full h-auto flex justify-between mx-auto border-b border-gray-500 items-center ">
          <Link to="/">
            <div className="flex flex-row gap-x-2 items-center">
              <img src={Logo} alt="warmhut" className="w-17 h-17" />
              <h1 className=" font-bold text-3xl text-gray-700">
                Warm<span className="text-olive">Hut</span>
              </h1>
            </div>
          </Link>

          {/* Search */}
          <div className="w-full max-w-sm">
            <form className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="grow px-4 py-2 text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-olive hover:bg-gray-600 text-white px-4 py-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* Contact + Account */}
          <div className="w-auto h-auto flex flex-row gap-x-4 items-center justify-center">
            <div className="flex flex-row gap-3">
              <FaPhone className="w-8 h-8 text-olive font-semibold animate-pulse my-auto" />
              <div className="cursor-pointer">
                <h3 className="text-xl text-gray-700 font-semibold">
                  01715825331
                </h3>
                <p className="text-sm text-olive font-normal">Hotline</p>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <GiElectric className="w-9 h-9 text-olive my-auto" />
              <div className="cursor-pointer">
                <h3 className="text-xl text-gray-700 font-semibold">OFFERS</h3>
                <p className="text-sm text-olive font-normal">Special Deals</p>
              </div>
            </div>
            <div className="flex flex-row gap-3 ">
              <MdAccountCircle className="w-9 h-9 text-olive  my-auto" />
              <Link to="/login">
                <div className=" cursor-pointer">
                  <h3 className="text-xl text-gray-700 font-semibold">
                    ACCOUNT
                  </h3>
                  <p className="text-sm text-olive font-light">
                    Register & Login
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Bottom Menu */}
      <div className="flex justify-center items-center sticky top-0 z-50 bg-white w-full ">
        <div className="hidden lg:block">
          <div className="flex flex-row gap-x-6 text-base font-semibold text-gray-700 py-4">
            <h3>
              <Link to="/caps">Caps</Link>
            </h3>
            <h3>
              <Link to="/dropshoulderhoodie">Dropshoulder Hoodie</Link>
            </h3>
            <h3>
              <Link to="/hoodie">Hoodie</Link>
            </h3>
            <h3>
              <Link to="/sweatshirt">Sweat Shirt</Link>
            </h3>
            <h3>
              <Link to="/wallet">Wallets</Link>
            </h3>
            <h3>
              <Link to="/shoes">Shoes</Link>
            </h3>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- */}
      {/* MOBILE NAVBAR */}
      {/* ---------------------------------------------- */}
      <nav className="bg-white shadow-xl lg:hidden">
        <div className="flex flex-row justify-between items-center py-3 mx-4">
          {/* Hamburger Button */}
          <GiHamburgerMenu
            onClick={() => setOpenMenu(!openMenu)}
            className="h-7 w-10 cursor-pointer"
          />

          {/* Logo */}
          <Link to="/">
            <div className="flex flex-row gap-x-1 items-center">
              <img src={Logo} alt="warmhut" className="w-14 h-14" />
              <h1 className=" font-bold text-2xl text-gray-700">
                Warm<span className="text-olive">Hut</span>
              </h1>
            </div>
          </Link>

          {/* Icons */}
          <div className="flex flex-row gap-x-4">
            <FaSearch
              onClick={() => setOpenSearch(!openSearch)}
              className="h-5 w-5 cursor-pointer"
            />
            <GiBeachBag className="h-5 w-5" />
          </div>
        </div>
      </nav>

      {/* search bur dropdown */}
      {openSearch && (
        <div className="lg:hidden animate-slideDown">
          {' '}
          <form className="w-full relative">
            {' '}
            <input
              type="search"
              placeholder="Search"
              required
              className="w-full pl-10 pr-4 py-2 outline-none border-b border-gray-800"
            />{' '}
            <button
              type="submit"
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700"
            >
              {' '}
              <FaSearch />{' '}
            </button>{' '}
          </form>{' '}
        </div>
      )}

      {/* MOBILE MENU DROPDOWN */}
      {openMenu && (
        <div
          ref={menuRef}
          className="lg:hidden bg-gray-100 py-4 px-6 space-y-4 animate-slideDown absolute z-100"
        >
          <Link to="/caps" className="block text-lg font-semibold">
            Caps
          </Link>
          <Link
            to="/dropshoulderhoodie"
            className="block text-lg font-semibold"
          >
            Dropshoulder Hoodie
          </Link>
          <Link to="/hoodie" className="block text-lg font-semibold">
            Hoodie
          </Link>
          <Link to="/sweatshirt" className="block text-lg font-semibold">
            Sweat Shirt
          </Link>
          <Link to="/wallet" className="block text-lg font-semibold">
            Wallets
          </Link>
          <Link to="/shoes" className="block text-lg font-semibold">
            Shoes
          </Link>
          <Link to="/login" className="block text-lg text-olive font-semibold">
            Log in
          </Link>
          <Link to="/signup" className="block text-lg text-olive font-semibold">
            Sign up
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
