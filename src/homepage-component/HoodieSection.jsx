import React from 'react'
import Card from '../components/Card'
import Olive from '../assets/Hoodie/SUPER - Hoodie - olive.webp'
import CreameWhite from '../assets/Hoodie/SUPER - Hoodie - creamwhite.webp';
import BabyBlue from '../assets/Hoodie/SUPER - Hoodie - babyblue.webp';
import Black from '../assets/Hoodie/SUPER - Hoodie - black.webp';
import Button2 from '../components/Button2'
import { Link } from 'react-router'



const HoodieSection = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pt-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Hoodie Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
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
      <Link to="/hoodie">
        <Button2 btnText={'View All'} />
      </Link>
    </div>
  );
}

export default HoodieSection