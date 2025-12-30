import React from 'react';
import { Link, useNavigate } from 'react-router';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleSubmit = e => {
      e.preventDefault(); // prevent page reload
      navigate('/'); // route redirect
    };

  return (
    <section className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full max-w-[90%] lg:max-w-[35%] bg-white p-6 rounded-[30px] shadow-lg">
        <h2 className="text-xl md:text-2xl  font-bold text-center text-gray-800 mb-6">
          Sign up
        </h2>

        <p className="mt-4 text-center text-gray-800 text-sm md:text-base">
          You have an account?
          <Link to='/login' className="text-olive hover:underline ml-1">
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Your Name */}
          <div className="mb-4">
            <label
              className="block text-gray-600  font-normal  text-sm md:text-base   leading-normal"
              htmlFor="name"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="email"
            >
              Email Address or Username
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border  border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label
              className="block text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="number"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="number"
              className="w-full px-3 py-2 border  border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your number"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="address"
            >
              Home Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-2 border  border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border  border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm md:text-base">
                Remember me
              </span>
            </label>
            <a
              href="./create-new.html"
              className="text-sm md:text-base text-olive hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-olive text-white py-2 rounded-4xl hover:bg-gray-200 transition duration-500 ease-in-out cursor-pointer hover:text-gray-800"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
