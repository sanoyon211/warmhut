import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProductPageLayout from '../components/ProductPageLayout';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, fetchCategories } from '../lib/api';
import { useSearchParams } from 'react-router';

const Shop = ({ category, title }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const activeCategory = category || queryCategory || 'all';

  // Filters
  const [sort, setSort] = useState('newest');
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts({
        category: activeCategory !== 'all' ? activeCategory : undefined,
        sort,
        minPrice,
        maxPrice,
        page,
        limit: 12
      });
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.totalProducts || 0);
      setLoading(false);
    };
    loadProducts();
  }, [activeCategory, sort, minPrice, maxPrice, page]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [activeCategory, sort, minPrice, maxPrice]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setDynamicCategories(cats);
    };
    loadCategories();
  }, []);

  const filters = [
    { value: 'all', label: 'All Products' },
    ...dynamicCategories.map(c => ({
      value: c,
      label: c
    }))
  ];

  const handleCategoryChange = (val) => {
    if (val === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${encodeURIComponent(val)}`);
    }
  };

  return (
    <ProductPageLayout
      title={title || (activeCategory === 'all' ? 'All Products' : `${activeCategory} Collection`)}
      filters={filters}
      activeFilter={activeCategory}
      onFilterChange={handleCategoryChange}
    >
      {/* Top Filter Bar (Sort & Price) */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 gap-4">
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-bold text-gray-700">Sort by:</span>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-olive"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center gap-x-2">
          <input 
            type="number" 
            placeholder="Min ৳" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-olive"
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="Max ৳" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-olive"
          />
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="w-10 h-10 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-bold mb-2">No products found</p>
          <p className="text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">Showing {products.length} of {totalProducts} products</p>
          <ProductGrid products={products} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-x-2 mt-12">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold disabled:opacity-50 hover:border-olive"
              >
                Previous
              </button>
              <div className="flex gap-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${page === i + 1 ? 'bg-olive text-white' : 'bg-white border border-gray-200 hover:border-olive'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold disabled:opacity-50 hover:border-olive"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </ProductPageLayout>
  );
};

export default Shop;
