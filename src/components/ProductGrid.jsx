import React from 'react';
import Card from './Card';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-gray-500 font-medium">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
      {products.map((product) => (
        <Card
          key={product._id || product.id || product.name}
          id={product._id || product.id || product.name.replace(/\s/g, '-')}
          bgImg={product.image || product.img}
          title={`BDT ${product.price}TK`}
          subTitle={product.name}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
