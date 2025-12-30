import React, { useEffect, useRef, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { Link, useLocation } from 'react-router';
import AllSweetShirt from '../SweatShirtComponent/AllSweatShirt';
import BlackSweatShirt from '../SweatShirtComponent/BlackSweatShirt';
import GraySweatShirt from '../SweatShirtComponent/GraySweatShirt';
import WhiteSweatShirt from '../SweatShirtComponent/WhiteSweatShirt';


const SweatShirt = () => {
  const [openFilter, setopenFilter] = useState(false);
  const [color, setcolor] = useState('sweatshirt');
  const changeBlack = () => {
    setcolor('black');
  };
  const changetoGray = () => {
    setcolor('gray');
  };
  const changewhite = () => {
    setcolor('white');
  };
  const changeAll = () => {
    setcolor('all');
  };

  const menuRef = useRef(null);
  const location = useLocation();

  // ⭐ 1. Outside Click Hide Menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setopenFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⭐ 2. Route change হলে menu auto-close
  useEffect(() => {
    setopenFilter(false);
  }, [location.pathname]);

  console.log(setopenFilter);

  return (
    <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-x-6 gap-y-4">
      <div className="lg:max-w-[300px] w-full h-auto  mt-25 hidden lg:block">
        <div className="bg-white rounded-xl lg:sticky top-15 shadow-2xl border border-gray-300 mb-5">
          <div className="flex flex-row gap-x-4  z-100 pl-5 py-5">
            <h1 className="h-auto  bg-gray-100 p-3 rounded-lg border border-olive inline-block mb-auto text-xl font-semibold text-olive">
              Catagory :
            </h1>
            <div className="flex flex-col gap-y-4 bg-gray-100 p-7 rounded-lg border border-olive">
              <button
                onClick={changeAll}
                className={`${
                  color === 'all' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                All
              </button>
              <button
                onClick={changeBlack}
                className={`${
                  color === 'black' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                Black
              </button>
              <button
                onClick={changetoGray}
                className={`${
                  color === 'gray' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                Gray
              </button>
              <button
                onClick={changewhite}
                className={`${
                  color === 'white' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                White
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative pl-3 pt-3">
        <div
          onClick={() => setopenFilter(!openFilter)}
          className="inline-block"
        >
          <span className="flex flex-row gap-x-1  items-center lg:hidden text-2xl text-gray-800 ">
            <h3>Filter</h3> <BsFilterLeft className="w-6 h-6 text-gray-800" />
          </span>
        </div>
        {openFilter && (
          <div
            ref={menuRef}
            className="lg:hidden bg-gray-100 py-4 px-10 space-y-4 animate-slideDown absolute top-0 right-0 flex flex-col gap-y-5"
          >
            <button
              onClick={changeAll}
              className={`${
                color === 'all' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              All
            </button>
            <button
              onClick={changeBlack}
              className={`${
                color === 'black' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              Black
            </button>
            <button
              onClick={changetoGray}
              className={`${
                color === 'gray' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              Gray
            </button>
            <button
              onClick={changewhite}
              className={`${
                color === 'white' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              White
            </button>
          </div>
        )}
      </div>
      {color === 'all' ? <AllSweetShirt /> : null}
      {color === 'black' ? <BlackSweatShirt /> : null}
      {color === 'gray' ? <GraySweatShirt /> : null}
      {color === 'white' ? <WhiteSweatShirt /> : null}
      {color === 'sweatshirt' ? <AllSweetShirt /> : null}
    </div>
  );
};

export default SweatShirt;
