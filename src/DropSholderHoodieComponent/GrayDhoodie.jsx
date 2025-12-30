import React from 'react';
import Card from '../components/Card';
import Gray from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-gray.jpg';
import Button2 from '../components/Button2';
import { Link } from 'react-router';

const GrayDhoodie = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Gray Dropsholder Hoodie Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Gray}
          title={'BDT 1500TK'}
          subTitle={'Washed-DropsholderHoodie-gray '}
        />
      </div>
    </div>
  );
};

export default GrayDhoodie;
