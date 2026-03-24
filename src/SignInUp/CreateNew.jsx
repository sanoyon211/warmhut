import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const CreateNew = () => {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (pass !== confirm) { setError("Passwords don't match!"); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters.'); return; }
    navigate('/successfull');
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiLock className="w-8 h-8 text-olive" />
            </div>
            <h1 className="font-black text-2xl text-gray-900 mb-1">New Password</h1>
            <p className="text-gray-400 text-sm">Create a strong new password for your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'New Password', val: pass, set: setPass, show: show1, toggle: () => setShow1(!show1) },
              { label: 'Confirm Password', val: confirm, set: setConfirm, show: show2, toggle: () => setShow2(!show2) },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={f.show ? 'text' : 'password'}
                    value={f.val}
                    onChange={e => { f.set(e.target.value); setError(''); }}
                    placeholder={f.label}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 bg-gray-50"
                    required
                  />
                  <button type="button" onClick={f.toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {f.show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
            {error && <p className="text-red-500 text-xs text-center bg-red-50 py-2 rounded-xl">{error}</p>}
            <button type="submit" className="w-full py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg shadow-olive/20 text-sm">
              Change Password →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateNew;
