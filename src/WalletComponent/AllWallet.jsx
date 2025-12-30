import React from 'react';
import Card from '../components/Card';
import Wallet1 from '../assets/Wallet/ETON AND COIN SET - Wallet - black.webp';
import Wallet2 from '../assets/Wallet/IGOR - Wallet - black.webp';
import Wallet3 from '../assets/Wallet/RE-LOCK LARGE ZIP AROUND - Wallet - black.webp';
import Wallet4 from '../assets/Wallet/TIMILUS - Wallet - black.webp';
import Wallet5 from '../assets/Wallet/Quiksilver -Brown.webp';
import Wallet6 from '../assets/Wallet/Anna Field -Brown.webp';

import Button2 from '../components/Button2';
import { Link } from 'react-router';

const AllWallet = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Wallet Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Wallet1}
          title={'BDT 450TK'}
          subTitle={'Eton & Coin Set -black '}
        />
        <Card bgImg={Wallet2} title={'BDT 500TK'} subTitle={'IGOR -black '} />
        <Card
          bgImg={Wallet3}
          title={'BDT 550TK'}
          subTitle={'RE-LOCK LARGE -black '}
        />
        <Card
          bgImg={Wallet4}
          title={'BDT 400TK'}
          subTitle={'TIMILUS - black '}
        />
        <Card
          bgImg={Wallet5}
          title={'BDT 400TK'}
          subTitle={'Quiksilver -Brown '}
        />
        <Card
          bgImg={Wallet6}
          title={'BDT 400TK'}
          subTitle={'Anna Field -Brown '}
        />
      </div>
    </div>
  );
};

export default AllWallet;
