import React, { useState, useEffect } from 'react';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/api';

const Hoodie = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts('Hoodie');
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
    { value: 'all', label: 'All Hoodies', count: products.length },
    { value: 'black', label: 'Black', count: products.filter(c => c.color === 'black').length },
    { value: 'olive', label: 'Olive', count: products.filter(c => c.color === 'olive').length },
    { value: 'white', label: 'White', count: products.filter(c => c.color === 'white').length },
    { value: 'blue', label: 'Blue', count: products.filter(c => c.color === 'blue').length },
  ];

  return (
    <ProductPageLayout
      title="Premium Hoodies"
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

export default Hoodie;
