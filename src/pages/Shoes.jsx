import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

import Shoe1 from '../assets/Shoes/AIR FORCE 1 07 - Trainers - black.webp';
import Shoe2 from '../assets/Shoes/AIR MONARCH IV - Training shoe.webp';
import Shoe3 from '../assets/Shoes/RUN FOUR - Trainers.webp';
import Shoe4 from '../assets/Shoes/SUPERSTAR II  - Trainers.webp';

const allShoes = [
  { img: Shoe1, name: 'Air Force 107 (Black)', price: 'BDT 2200TK', color: 'black' },
  { img: Shoe2, name: 'Air Monarch IV Training Shoe', price: 'BDT 2300TK', color: 'white' },
  { img: Shoe3, name: 'Run Four Trainers', price: 'BDT 2100TK', color: 'brown' },
  { img: Shoe4, name: 'Superstar II Trainers', price: 'BDT 2500TK', color: 'white' },
];

const filters = [
  { value: 'all', label: 'All Shoes', count: 4 },
  { value: 'black', label: 'Black', count: 1 },
  { value: 'white', label: 'White', count: 2 },
  { value: 'brown', label: 'Brown', count: 1 },
];

const Shoes = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? allShoes : allShoes.filter(s => s.color === activeFilter);

  return (
    <ProductPageLayout title="Premium Shoes" filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default Shoes;
