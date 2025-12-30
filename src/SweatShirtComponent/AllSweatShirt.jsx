import React from 'react';
import Card from '../components/Card';
import Jackjony from '../assets/Sweetshirt/Jack & Jonys -Sweet Shirt.webp';
import Black from '../assets/Sweetshirt/Sweet Shirt -Black.webp';
import Gray from '../assets/Sweetshirt/Sweet Shirt -Gray.webp';
import LightGray from '../assets/Sweetshirt/Sweet Shirt -Light Gray.webp';


const AllSweetShirt = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Sweet-Shirt Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Jackjony}
          title={'BDT 750TK'}
          subTitle={'Jack & Jonys -Sweet Shirt '}
        />
        <Card
          bgImg={Black}
          title={'BDT 650TK'}
          subTitle={'Sweet Shirt -Black '}
        />
        <Card
          bgImg={Gray}
          title={'BDT 650TK'}
          subTitle={'Sweet Shirt -Gray '}
        />
        <Card
          bgImg={LightGray}
          title={'BDT 650TK'}
          subTitle={'Sweet Shirt -Light Gray '}
        />
      </div>
    </div>
  );
};

export default AllSweetShirt;
