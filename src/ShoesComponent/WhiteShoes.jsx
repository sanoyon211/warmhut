import React from 'react';
import Card from '../components/Card';
import Shoe2 from '../assets/Shoes/AIR MONARCH IV - Training shoe.webp';
import Shoe4 from '../assets/Shoes/SUPERSTAR II  - Trainers.webp';




const WhiteShoes = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          White Shoes Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Shoe2}
          title={'BDT 2300TK'}
          subTitle={'AIR MONARCH IV -shoe '}
        />
        <Card
          bgImg={Shoe4}
          title={'BDT 2500TK'}
          subTitle={'SUPERSTAR II -Trainers '}
        />
      </div>
    </div>
  );
};

export default WhiteShoes;
