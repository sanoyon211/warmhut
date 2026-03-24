import React, { useEffect, useRef, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { FilterSidebar } from './Utils';

const ProductPageLayout = ({ title, filters, activeFilter, onFilterChange, children }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setOpenFilter(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLabel = filters.find(f => f.value === activeFilter)?.label || 'All';

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-xs text-olive font-semibold uppercase tracking-widest mb-1">WarmHut Collection</p>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h1>
      </div>

      <div className="flex gap-x-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar
              filters={filters}
              activeFilter={activeFilter}
              onChange={onFilterChange}
              title="Category"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Filter Bar */}
          <div className="lg:hidden flex items-center justify-between mb-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-sm text-gray-500">
              Showing: <span className="font-semibold text-gray-900">{activeLabel}</span>
            </span>
            <button
              onClick={() => setOpenFilter(true)}
              className="flex items-center gap-x-1.5 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl"
            >
              <BsFilterLeft className="w-4 h-4" /> Filter
            </button>
          </div>

          {children}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <>
        <div
          onClick={() => setOpenFilter(false)}
          className={`fixed inset-0 bg-black/40 z-[98] transition-opacity ${openFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />
        <div
          ref={drawerRef}
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[99] p-6 transition-transform duration-300 ${openFilter ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900">Filter by Color</h3>
            <button onClick={() => setOpenFilter(false)}>
              <MdClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => { onFilterChange(f.value); setOpenFilter(false); }}
                className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all
                  ${activeFilter === f.value ? 'bg-olive text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductPageLayout;
