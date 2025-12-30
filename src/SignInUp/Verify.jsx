import React from 'react';
import { useNavigate } from 'react-router';

const Verify = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // এখানে আপনি verify code check করতে পারেন
    navigate('/'); // সফল হলে homepage/login এ redirect
  };

  return (
    <section className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full  max-w-[90%] lg:max-w-[35%] bg-white p-6 rounded-[30px] shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[#333333] mb-3">
          Enter Your Code
        </h2>

        <p className="text-center text-gray-700 text-sm md:text-base">
          Plese check your email
        </p>

        <form className="pt-5" onSubmit={handleSubmit}>
          {/* Password Inputs */}

          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-olive text-white py-2 rounded-4xl hover:bg-gray-200 transition duration-500 ease-in-out cursor-pointer hover:text-gray-800"
          >
            Verify Code
          </button>
        </form>
      </div>
    </section>
  );
};

export default Verify;
