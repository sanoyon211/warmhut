import React, { useEffect, useRef, useState } from 'react';
import AllCaps from '../capsComponent/AllCaps';
import BlackCaps from '../capsComponent/BlackCaps';
import BrownCaps from '../capsComponent/BrownCaps';
import WhiteCaps from '../capsComponent/WhiteCaps';
import GrayCaps from '../capsComponent/GrayCaps';
import { BsFilterLeft } from 'react-icons/bs';
import { Link, useLocation } from 'react-router';




const Caps = () => {
  const [openFilter, setopenFilter] = useState(false);
  const [color, setcolor] = useState('caps');
  const changetoWhite = () => {
    setcolor('white');
  };
  const changeBlack = () => {
    setcolor('black');
  };
  const changetoBrown = () => {
    setcolor('brown');
  };
  const changeGray = () => {
    setcolor('gray');
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
                onClick={changetoWhite}
                className={`${
                  color === 'white' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                White
              </button>
              <button
                onClick={changeGray}
                className={`${
                  color === 'gray' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                Gray
              </button>
              <button
                onClick={changetoBrown}
                className={`${
                  color === 'brown' ? 'text-olive' : 'text-gray-800'
                } font-bold text-base cursor-pointer`}
              >
                Brown
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
              onClick={changetoWhite}
              className={`${
                color === 'white' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              White
            </button>
            <button
              onClick={changeGray}
              className={`${
                color === 'gray' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              Gray
            </button>
            <button
              onClick={changetoBrown}
              className={`${
                color === 'brown' ? 'text-olive' : 'text-gray-800'
              } font-bold text-base cursor-pointer`}
            >
              Brown
            </button>
          </div>
        )}
      </div>
      {color === 'all' ? <AllCaps /> : null}
      {color === 'black' ? <BlackCaps /> : null}
      {color === 'white' ? <WhiteCaps /> : null}
      {color === 'brown' ? <BrownCaps /> : null}
      {color === 'gray' ? <GrayCaps /> : null}
      {color === 'caps' ? <AllCaps /> : null}
    </div>
  );
};

export default Caps;
