import React from 'react';
import { Link } from 'react-router';

const SectionHeader = ({ title, subtitle, viewAllLink }) => (
  <div className="flex items-end justify-between mb-6 px-1">
    <div>
      <p className="text-xs text-olive font-semibold uppercase tracking-widest mb-1">{subtitle || 'Collection'}</p>
      <h2 className="text-xl md:text-2xl font-black text-gray-900">{title}</h2>
    </div>
    {viewAllLink && (
      <Link to={viewAllLink}>
        <button className="text-sm font-semibold text-olive hover:text-gray-900 transition-colors flex items-center gap-x-1">
          View All <span>→</span>
        </button>
      </Link>
    )}
  </div>
);

export default SectionHeader;
