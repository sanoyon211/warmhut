import React, { useState } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';

import Wallet1 from '../assets/Wallet/ETON AND COIN SET - Wallet - black.webp';
import Wallet2 from '../assets/Wallet/IGOR - Wallet - black.webp';
import Wallet3 from '../assets/Wallet/RE-LOCK LARGE ZIP AROUND - Wallet - black.webp';
import Wallet4 from '../assets/Wallet/TIMILUS - Wallet - black.webp';
import Wallet5 from '../assets/Wallet/Quiksilver -Brown.webp';
import Wallet6 from '../assets/Wallet/Anna Field -Brown.webp';

const allWallets = [
  { img: Wallet1, name: 'Eton & Coin Set Wallet (Black)', price: 'BDT 450TK', color: 'black' },
  { img: Wallet2, name: 'IGOR Wallet (Black)', price: 'BDT 500TK', color: 'black' },
  { img: Wallet3, name: 'RE-LOCK Large Zip Around (Black)', price: 'BDT 550TK', color: 'black' },
  { img: Wallet4, name: 'TIMILUS Wallet (Black)', price: 'BDT 400TK', color: 'black' },
  { img: Wallet5, name: 'Quiksilver Wallet (Brown)', price: 'BDT 400TK', color: 'brown' },
  { img: Wallet6, name: 'Anna Field Wallet (Brown)', price: 'BDT 400TK', color: 'brown' },
];

const filters = [
  { value: 'all', label: 'All Wallets', count: 6 },
  { value: 'black', label: 'Black', count: 4 },
  { value: 'brown', label: 'Brown', count: 2 },
];

const Wallet = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? allWallets : allWallets.filter(w => w.color === activeFilter);

  return (
    <ProductPageLayout title="Premium Wallets" filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <ProductGrid products={filtered} />
    </ProductPageLayout>
  );
};

export default Wallet;
