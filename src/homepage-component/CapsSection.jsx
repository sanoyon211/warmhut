import React from 'react';
import Card from '../components/Card';
import CapBlack from '../assets/Caps/BASEBALL UNISEX - Cap - jet black.webp';
import Capdeep from '../assets/Caps/BASEBALL UNISEX - Cap - deep depths.webp';
import Capespresso from '../assets/Caps/BASEBALL UNISEX - Cap - espresso.webp';
import Capgray from '../assets/Caps/BASEBALL UNISEX - Cap - grey taupe.webp';
import Button2 from '../components/Button2';
import { Link } from 'react-router';

const CapsSection = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pt-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Caps Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={CapBlack}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott -cap-jet black '}
        />
        <Card
          bgImg={Capdeep}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott -cap-deep depths '}
        />
        <Card
          bgImg={Capgray}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott -cap-gray taupe '}
        />
        <Card
          bgImg={Capespresso}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott -cap-expresso '}
        />
      </div>
      <Link
        to={{
          pathname: '/caps',
          search: '?category=shoes',
          hash: '#top',
          state: { referrer: 'homepage' },
        }}
      >
        <Button2 btnText={'View All'} />
      </Link>
    </div>
  );
};

export default CapsSection;
