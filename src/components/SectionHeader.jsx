import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

const SectionHeader = ({ title, subtitle, viewAllLink }) => (
  <div className="flex items-end justify-between mb-8 px-1">
    <div className="flex gap-x-4 items-center">
      <div className="w-1.5 h-10 bg-olive rounded-full hidden md:block"></div>
      <div>
        <p className="text-[10px] md:text-xs text-olive font-black uppercase tracking-[0.2em] mb-1">{subtitle || 'Collection'}</p>
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">{title}</h2>
      </div>
    </div>
    {viewAllLink && (
      <Link to={viewAllLink}>
        <button className="text-xs font-bold text-gray-900 hover:text-white bg-gray-100 hover:bg-olive transition-all duration-300 px-5 py-2.5 rounded-full flex items-center gap-x-2 group">
          View All <span className="group-hover:translate-x-1 transition-transform flex items-center"><FaArrowRight /></span>
        </button>
      </Link>
    )}
  </div>
);

export default SectionHeader;
