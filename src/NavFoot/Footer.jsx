import React from 'react'
import { IoLogoYoutube } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-200 flex justify-center items-center">
        <section className="max-w-[1320px] w-full h-auto flex flex-col gap-y-10 ml-5 md:flex md:flex-row md:justify-between py-10 ">
          <div className="flex flex-col gap-y-5">
            <h1 className=" font-bold text-2xl text-gray-700">
              Warm<span className="text-olive">Hut</span>
            </h1>
            <p className="text-gray-600 max-w-[300px] text-justify text-sm  leading-[25px]">
              WarmHut offers stylish, comfortable, and affordable clothing made
              for everyday wear. Discover premium fabrics, modern designs, and
              perfect fits—crafted to keep you confident all day.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <h1 className="text-xl text-gray-700">Information</h1>
            <div className="flex flex-col gap-y-4 md:flex md:flex-row md:gap-x-20">
              <div className="flex flex-col gap-y-4">
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  About Us
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Delivery Policy
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Warranty & Return Policy
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Contact Us
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Terms & Conditions
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Return Policy
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  How to Order
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Privacy Policy
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Delivery Process
                </p>
                <p className="text-sm text-gray-600 hover:text-olive hover:underline cursor-pointer">
                  Return & refund policy
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 pr-10">
            <h1 className="text-xl text-gray-700">Contact Information</h1>

            <div className="flex flex-col gap-y-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Address:</span> Dhaka,Bangladesh
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Phone:</span> 01715825331
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Phone:</span>{' '}
                <span className="hover:text-olive hover:underline cursor-pointer">
                  warmhutbd@gmail.com
                </span>
              </p>
              <div className="flex flex-row gap-x-3">
                <IoLogoYoutube className="w-8 h-8 text-[#FF0000] cursor-pointer" />
                <FaFacebook className="w-8 h-8 text-[#1877F2] cursor-pointer" />
              </div>
            </div>
          </div>
        </section>
      </footer>
      <section className="bg-black flex justify-center items-center">
        <p className='text-[8px] md:text-sm py-5 text-white'>Copyright © 2025 WARMHUT. Developed by <span className='text-olive'>SA Noyon</span></p>
      </section>
    </>
  );
}

export default Footer