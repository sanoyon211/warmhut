import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { signUp, signIn } from '../lib/auth-client';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = field => e => setForm({ ...form, [field]: e.target.value });

  const fields = [
    { id: 'name', label: 'Full Name', type: 'text', icon: <FiUser />, placeholder: 'Your full name', field: 'name' },
    { id: 'email', label: 'Email Address', type: 'email', icon: <FiMail />, placeholder: 'you@example.com', field: 'email' },
    { id: 'phone', label: 'Mobile Number', type: 'tel', icon: <FiPhone />, placeholder: '01XXXXXXXXX', field: 'phone' },
    { id: 'address', label: 'Delivery Address', type: 'text', icon: <FiMapPin />, placeholder: 'Your home address', field: 'address' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
    });

    setLoading(false);

    if (error) {
      setError(error.message || 'Failed to create account');
    } else {
      navigate('/successfull');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: window.location.origin + '/',
    });
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-black text-2xl text-gray-900 mb-1">Create Account 🚀</h1>
            <p className="text-gray-400 text-sm">Join WarmHut for exclusive deals</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(f => (
              <div key={f.id}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4">{f.icon}</span>
                  <input
                    type={f.type}
                    value={form[f.field]}
                    onChange={update(f.field)}
                    placeholder={f.placeholder}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 transition-all bg-gray-50"
                    required={f.id !== 'address'} // Example: address optional
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 transition-all bg-gray-50"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 disabled:bg-gray-400 transition-colors duration-200 shadow-lg shadow-olive/20 text-sm mt-2 flex justify-center items-center gap-2"
            >
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400 font-medium">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors duration-200 shadow-sm text-sm flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle className="w-5 h-5" />
            Sign Up with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-olive font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
