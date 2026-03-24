import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

import Jackjony from '../assets/Sweetshirt/Jack & Jonys -Sweet Shirt.webp';
import Black from '../assets/Sweetshirt/Sweet Shirt -Black.webp';
import Gray from '../assets/Sweetshirt/Sweet Shirt -Gray.webp';
import LightGray from '../assets/Sweetshirt/Sweet Shirt -Light Gray.webp';

const allSweatShirts = [
  { img: Jackjony, name: 'Jack & Jones Sweatshirt', price: 'BDT 750TK', color: 'white' },
  { img: Black, name: 'Sweatshirt (Black)', price: 'BDT 650TK', color: 'black' },
  { img: Gray, name: 'Sweatshirt (Gray)', price: 'BDT 650TK', color: 'gray' },
  { img: LightGray, name: 'Sweatshirt (Light Gray)', price: 'BDT 650TK', color: 'gray' },
];

const filters = [
  { value: 'all', label: 'All', count: 4 },
  { value: 'black', label: 'Black', count: 1 },
  { value: 'gray', label: 'Gray', count: 2 },
  { value: 'white', label: 'White / Others', count: 1 },
];

const SweatShirt = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? allSweatShirts : allSweatShirts.filter(s => s.color === activeFilter);

  return (
    <ProductPageLayout title="Premium Sweatshirts" filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default SweatShirt;
