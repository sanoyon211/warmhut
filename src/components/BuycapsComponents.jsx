import React from 'react'
import Cap1 from '../assets/Caps/BASEBALL UNISEX - Cap - jet black.webp'

const BuycapsComponents = ({img, text}) => {
  return (
    <div className="bg-white border border-olive rounded-lg flex flex-col gap-x-1 items-center ">
      <img src={img} alt="Not Found" className='w-[80%] md:w-[60%] lg:w-[50%] rounded-lg p-2' />
      <h2 className='text-gray-800 font-semibold text-xl '>{text}</h2>
    </div>
  );
}

export default BuycapsComponents