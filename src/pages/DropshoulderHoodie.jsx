import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

import Blue from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-blue.jpg';
import Autumn from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-Autunm.jpg';
import Gray from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-gray.jpg';
import Black from '../assets/DropsholderHoodie/Washed-DropsholderHoodie-black.jpg';

const allDHoodies = [
  { img: Blue, name: 'Washed Dropshoulder Hoodie (Blue)', price: 'BDT 1500TK', color: 'blue' },
  { img: Autumn, name: 'Washed Dropshoulder Hoodie (Autumn)', price: 'BDT 1500TK', color: 'autumn' },
  { img: Gray, name: 'Washed Dropshoulder Hoodie (Gray)', price: 'BDT 1500TK', color: 'gray' },
  { img: Black, name: 'Washed Dropshoulder Hoodie (Black)', price: 'BDT 1500TK', color: 'black' },
];

const filters = [
  { value: 'all', label: 'All', count: 4 },
  { value: 'black', label: 'Black', count: 1 },
  { value: 'blue', label: 'Blue', count: 1 },
  { value: 'gray', label: 'Gray', count: 1 },
  { value: 'autumn', label: 'Autumn', count: 1 },
];

const DropshoulderHoodie = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? allDHoodies : allDHoodies.filter(h => h.color === activeFilter);

  return (
    <ProductPageLayout title="Dropshoulder Hoodies" filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default DropshoulderHoodie;
