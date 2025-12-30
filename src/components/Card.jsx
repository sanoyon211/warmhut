import React from 'react';
import Button1 from './Button1';

const Card = ({ bgImg, title, subTitle }) => {
  return (
    <div className="w-auto h-auto p-2 md:p-5 rounded-lg shadow-2xl flex flex-col gap-y-2 md:gap-y-3 items-center justify-center border-[0.7px] border-olive">
      <img
        src={bgImg}
        alt={title}
        className=" w-35 md:w-60 lg:w-65 h-50 md:h-80 lg:h-85 rounded-lg object-center bg-no-repeat  "
      />
      <h3 className="text-base text-gray-700 font-semibold text-center">
        {title}
      </h3>
      <p className="text-sm text-gray-700 font-medium text-center">
        {subTitle}
      </p>
      <Button1 btnText={'Buy Now'} />
    </div>
  );
};

export default Card;
