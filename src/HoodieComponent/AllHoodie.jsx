import React from 'react';
import Card from '../components/Card';
import Olive from '../assets/Hoodie/SUPER - Hoodie - olive.webp';
import CreameWhite from '../assets/Hoodie/SUPER - Hoodie - creamwhite.webp';
import BabyBlue from '../assets/Hoodie/SUPER - Hoodie - babyblue.webp';
import Black from '../assets/Hoodie/SUPER - Hoodie - black.webp';




const AllHoodie = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Hoodie Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Olive}
          title={'BDT 1400TK'}
          subTitle={'SUPER - Hoodie - olive '}
        />
        <Card
          bgImg={CreameWhite}
          title={'BDT 1400TK'}
          subTitle={'SUPER - Hoodie - creamewhite '}
        />
        <Card
          bgImg={Black}
          title={'BDT 1400TK'}
          subTitle={'SUPER - Hoodie - black '}
        />
        <Card
          bgImg={BabyBlue}
          title={'BDT 1400TK'}
          subTitle={'SUPER - Hoodie - babyblue '}
        />
      </div>
    </div>
  );
};

export default AllHoodie;
