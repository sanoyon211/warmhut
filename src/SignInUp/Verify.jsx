// Verify.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiMail } from 'react-icons/fi';

export const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // BUG FIX: was redirecting to '/', now correctly goes to /create-new
    navigate('/create-new');
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 text-center">
          <div className="w-16 h-16 bg-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail className="w-8 h-8 text-olive" />
          </div>
          <h1 className="font-black text-2xl text-gray-900 mb-2">Check Your Email</h1>
          <p className="text-gray-400 text-sm mb-8">We've sent a verification code to your email. Enter it below.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-center text-lg font-bold tracking-widest text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 bg-gray-50"
              required
            />
            <button type="submit" className="w-full py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg shadow-olive/20 text-sm">
              Verify Code →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
