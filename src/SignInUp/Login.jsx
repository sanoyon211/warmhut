import React from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // এখানে আপনি validation বা API call করতে পারেন
    navigate('/verify'); // submit হলে verify page এ redirect
  };

  return (
    <section className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full  max-w-[90%] lg:max-w-[35%] bg-white p-6 rounded-[30px] shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
          Log in
        </h2>

        {/* Signup Link */}
        <p className="mt-4 text-center text-[#666666] text-sm md:text-base">
          Don't have an account?{' '}
          <Link to='/signup' className="text-olive hover:underline">
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block  text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="email"
            >
              Email Address or username
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block  text-gray-600  font-normal  text-sm md:text-base leading-normal"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700 text-sm md:text-base">Remember me</span>
            </label>
            <Link
              to="/create-new"
              className="text-sm md:text-base text-olive hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full  bg-olive text-white py-2 rounded-4xl hover:bg-gray-200 transition duration-500 ease-in-out cursor-pointer hover:text-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
