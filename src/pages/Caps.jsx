import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

// Import all cap images
import CapBlack from '../assets/Caps/BASEBALL UNISEX - Cap - jet black.webp';
import Capdeep from '../assets/Caps/BASEBALL UNISEX - Cap - deep depths.webp';
import Capespresso from '../assets/Caps/BASEBALL UNISEX - Cap - espresso.webp';
import Capgray from '../assets/Caps/BASEBALL UNISEX - Cap - grey taupe.webp';
import White from '../assets/Caps/white.webp';
import GrayStone from '../assets/Caps/grayStone.webp';
import HufStone from '../assets/Caps/Huf stone.webp';
import HufBlack from '../assets/Caps/Huf black.webp';
import NikeWhite from '../assets/Caps/Nike Sportswear(white).webp';
import PumaBlack from '../assets/Caps/Puma Black.webp';
import UniversalGray from '../assets/Caps/Tommy Hilfiger(Universal Gray).webp';

const allCaps = [
  { img: CapBlack, name: 'Lyle & Scott Cap (Jet Black)', price: 'BDT 350TK', color: 'black' },
  { img: Capdeep, name: 'Lyle & Scott Cap (Deep Depths)', price: 'BDT 350TK', color: 'gray' },
  { img: Capespresso, name: 'Lyle & Scott Cap (Espresso)', price: 'BDT 350TK', color: 'brown' },
  { img: Capgray, name: 'Lyle & Scott Cap (Grey Taupe)', price: 'BDT 350TK', color: 'gray' },
  { img: White, name: 'Lyle & Scott Cap (White)', price: 'BDT 350TK', color: 'white' },
  { img: GrayStone, name: 'Lyle & Scott Cap (Gray Stone)', price: 'BDT 350TK', color: 'gray' },
  { img: HufStone, name: 'HUF Cap (Stone)', price: 'BDT 350TK', color: 'gray' },
  { img: HufBlack, name: 'HUF Cap (Black)', price: 'BDT 350TK', color: 'black' },
  { img: NikeWhite, name: 'Nike Sportswear Cap (White)', price: 'BDT 350TK', color: 'white' },
  { img: PumaBlack, name: 'Puma Cap (Black)', price: 'BDT 350TK', color: 'black' },
  { img: UniversalGray, name: 'Tommy Hilfiger Cap (Universal Gray)', price: 'BDT 350TK', color: 'gray' },
];

const filters = [
  { value: 'all', label: 'All Caps', count: allCaps.length },
  { value: 'black', label: 'Black', count: allCaps.filter(c => c.color === 'black').length },
  { value: 'white', label: 'White', count: allCaps.filter(c => c.color === 'white').length },
  { value: 'gray', label: 'Gray', count: allCaps.filter(c => c.color === 'gray').length },
  { value: 'brown', label: 'Brown', count: allCaps.filter(c => c.color === 'brown').length },
];

const Caps = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? allCaps
    : allCaps.filter(c => c.color === activeFilter);

  return (
    <ProductPageLayout
      title="Premium Caps"
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
    >
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default Caps;
