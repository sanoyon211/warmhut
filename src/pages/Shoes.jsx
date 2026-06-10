import React, { useState, useEffect } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/api';

const Shoes = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts('Shoes');
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(c => c.color === activeFilter);

  // Dynamically generate filters based on products
  const filters = [
    { value: 'all', label: 'All Shoes', count: products.length },
    { value: 'black', label: 'Black', count: products.filter(c => c.color === 'black').length },
    { value: 'white', label: 'White', count: products.filter(c => c.color === 'white').length },
    { value: 'brown', label: 'Brown', count: products.filter(c => c.color === 'brown').length },
  ];

  return (
    <ProductPageLayout
      title="Premium Shoes"
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
    >
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="w-10 h-10 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </ProductPageLayout>
  );
};

export default Shoes;
