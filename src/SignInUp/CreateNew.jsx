import React from 'react';
import { useNavigate } from 'react-router';

const CreateNew = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // এখানে আপনি new password + confirm password match check করতে পারেন

    navigate('/successfull'); // সফল হলে Login/Homepage এ redirect
  };

  return (
    <section className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full max-w-[90%] md:max-w-[35%] bg-white p-6 rounded-[30px] shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#333333] mb-3">
          Create New Password
        </h2>

        <p className="text-center text-[#666666] text-sm">
          Please create a strong password for your account
        </p>

        <form className="pt-5" onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-4">
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="New password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-olive bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-[#7B7B7B]"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Change Button */}
          <button
            
            type="submit"
            className="w-full bg-olive text-white py-2 rounded-4xl hover:bg-gray-200 transition duration-500 ease-in-out cursor-pointer hover:text-gray-800"
          >
            Change
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNew;
