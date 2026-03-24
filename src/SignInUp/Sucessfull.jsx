import React, { useEffect } from 'react';
import { Link } from 'react-router';

const Sucessfull = () => {
  useEffect(() => {
    // confetti-like effect with emojis (pure CSS)
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="text-6xl mb-5 animate-bounce">🎉</div>
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="font-black text-2xl text-gray-900 mb-2">Password Changed!</h1>
          <p className="text-gray-400 text-sm mb-8">Your password has been updated successfully. You can now log in with your new password.</p>
          <Link to="/login">
            <button className="w-full py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg shadow-olive/20 text-sm mb-3">
              Go to Login →
            </button>
          </Link>
          <Link to="/">
            <button className="w-full py-3 bg-gray-50 text-gray-600 font-semibold rounded-2xl hover:bg-gray-100 transition-colors text-sm">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sucessfull;
