import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

import Olive from '../assets/Hoodie/SUPER - Hoodie - olive.webp';
import CreameWhite from '../assets/Hoodie/SUPER - Hoodie - creamwhite.webp';
import BabyBlue from '../assets/Hoodie/SUPER - Hoodie - babyblue.webp';
import Black from '../assets/Hoodie/SUPER - Hoodie - black.webp';

const allHoodies = [
  { img: Olive, name: 'SUPER Hoodie (Olive)', price: 'BDT 1400TK', color: 'olive' },
  { img: CreameWhite, name: 'SUPER Hoodie (Cream White)', price: 'BDT 1400TK', color: 'white' },
  { img: Black, name: 'SUPER Hoodie (Black)', price: 'BDT 1400TK', color: 'black' },
  { img: BabyBlue, name: 'SUPER Hoodie (Baby Blue)', price: 'BDT 1400TK', color: 'blue' },
];

const filters = [
  { value: 'all', label: 'All Hoodies', count: allHoodies.length },
  { value: 'black', label: 'Black', count: 1 },
  { value: 'olive', label: 'Olive', count: 1 },
  { value: 'white', label: 'White', count: 1 },
  { value: 'blue', label: 'Blue', count: 1 },
];

const Hoodie = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? allHoodies : allHoodies.filter(h => h.color === activeFilter);

  return (
    <ProductPageLayout title="Premium Hoodies" filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default Hoodie;
