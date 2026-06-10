import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router';
import { searchProducts } from '../lib/api';
import ProductGrid from '../components/ProductGrid';
import { FaSearch } from 'react-icons/fa';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const results = await searchProducts(query);
        setProducts(results);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };
    
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-x-3">
            <FaSearch className="text-olive" />
            Search Results
          </h1>
          {query && (
            <p className="text-gray-500 font-medium">
              Showing results for <span className="text-gray-900 font-bold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-12 h-12 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} title={`Found ${products.length} products`} />
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">No results found</h2>
            <p className="text-gray-500 mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or use more general terms.
            </p>
            <Link to="/">
              <button className="px-8 py-4 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg shadow-olive/20">
                Back to Home
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchResults;
