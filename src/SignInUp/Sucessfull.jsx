import React from 'react'
import { Link } from 'react-router';



const Sucessfull = () => {
  
  return (
    <section className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full  max-w-[90%] lg:max-w-[35%] bg-white p-6 rounded-[30px] shadow-lg flex flex-col gap-y-7 ">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[#333333] mb-3">
          Password Successfully Changed!
        </h2>
        <Link to='/'>
          <button
            className="w-full  bg-olive text-white py-2 rounded-4xl hover:bg-gray-200 transition duration-500 ease-in-out cursor-pointer hover:text-gray-800 mr-5"
          >
            Go
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Sucessfull