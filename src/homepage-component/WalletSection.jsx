import React from 'react';
import Card from '../components/Card';
import Wallet1 from '../assets/Wallet/ETON AND COIN SET - Wallet - black.webp'
import Wallet2 from '../assets/Wallet/IGOR - Wallet - black.webp';
import Wallet3 from '../assets/Wallet/RE-LOCK LARGE ZIP AROUND - Wallet - black.webp';
import Wallet4 from '../assets/Wallet/TIMILUS - Wallet - black.webp';

import Button2 from '../components/Button2';
import { Link } from 'react-router';

const WalletSection = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center pt-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Premium Wallet Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-5 items-center px-2 md:px-5">
        <Card
          bgImg={Wallet1}
          title={'BDT 450TK'}
          subTitle={'Eton & Coin Set -Wallet -black '}
        />
        <Card
          bgImg={Wallet2}
          title={'BDT 500TK'}
          subTitle={'IGOR -Wallet -black '}
        />
        <Card
          bgImg={Wallet3}
          title={'BDT 550TK'}
          subTitle={'RE-LOCK LARGE -Wallet -black '}
        />
        <Card
          bgImg={Wallet4}
          title={'BDT 400TK'}
          subTitle={'TIMILUS - Wallet - black '}
        />
      </div>
      <Link to="/sweatshirt">
        <Button2 btnText={'View All'} />
      </Link>
    </div>
  );
};

export default WalletSection;
