import React from 'react';
import Card from '../components/Card';
import CapBlack from '../assets/Caps/BASEBALL UNISEX - Cap - jet black.webp';
import Capdeep from '../assets/Caps/BASEBALL UNISEX - Cap - deep depths.webp';
import Capespresso from '../assets/Caps/BASEBALL UNISEX - Cap - espresso.webp';
import Capgray from '../assets/Caps/BASEBALL UNISEX - Cap - grey taupe.webp';
import White from '../assets/Caps/white.webp';
import GrayStone from '../assets/Caps/grayStone.webp';
import HufStone from '../assets/Caps/Huf stone.webp';
import HufBlack from '../assets/Caps/Huf black.webp';
import NikeWhite from '../assets/Caps/Nike Sportswear(white).webp';
import PumaBlack from '../assets/Caps/Puma Black.webp';
import UniversalGray from '../assets/Caps/Tommy Hilfiger(Universal Gray).webp';

const GrayCaps = () => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-6 items-center justify-center py-pb-10 lg:py-10 ">
      <div className="flex flex-col gap-y-2 items-center w-full">
        <h1 className="text-xl md:text-3xl text-olive font-semibold text-center">
          Gray Caps Collections
        </h1>
        <div className="bg-gray-800 w-[80%] md:w-[70%] lg:w-[50%] h-0.5"></div>
      </div>
      <div className="w-full h-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4  md:gap-x-10 md:gap-y-8 items-center px-2 md:px-5">
        <Card
          bgImg={Capgray}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott cap(gray taupe) '}
        />

        <Card
          bgImg={GrayStone}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott Cap(GrayStone) '}
        />
        <Card
          bgImg={HufStone}
          title={'BDT 350TK'}
          subTitle={'HUF Cap(Stone) '}
        />
        <Card
          bgImg={UniversalGray}
          title={'BDT 350TK'}
          subTitle={'Tommy Hilfiger Cap(Universal Gray) '}
        />
        <Card
          bgImg={Capdeep}
          title={'BDT 350TK'}
          subTitle={'Lyle & Scott cap(deep depths) '}
        />
      </div>
    </div>
  );
};

export default GrayCaps;
