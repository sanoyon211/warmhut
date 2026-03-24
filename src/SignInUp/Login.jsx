import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-black text-2xl text-gray-900 mb-1">Welcome Back 👋</h1>
            <p className="text-gray-400 text-sm">Sign in to your WarmHut account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 transition-all bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 transition-all bg-gray-50"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input type="checkbox" className="accent-olive" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/verify" className="text-olive font-semibold hover:underline">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors duration-200 shadow-lg shadow-olive/20 text-sm mt-2"
            >
              Sign In →
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-olive font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
