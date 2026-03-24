import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-olive transition-colors duration-200 hover:scale-110 transform"
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  );
};

export const FilterSidebar = ({ filters, activeFilter, onChange, title = 'Filter' }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4">{title}</h3>
    <div className="space-y-1">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
            ${activeFilter === f.value
              ? 'bg-olive text-white shadow-sm shadow-olive/20'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
          {f.label}
          {f.count && <span className={`float-right text-xs ${activeFilter === f.value ? 'text-white/70' : 'text-gray-400'}`}>{f.count}</span>}
        </button>
      ))}
    </div>
  </div>
);

export default BackToTop;
