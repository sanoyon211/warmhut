// All homepage product sections

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchProducts } from '../lib/api';

// ─── New Arrivals (Dynamic) ────────────────────────────────────────────────
export const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 4 }).then(res => {
      setProducts(res.products || []);
      setLoading(false);
    });
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="px-4 pt-10">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader title="New Arrivals" subtitle="Just Added" viewAllLink="/shop" />
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="w-8 h-8 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products.map((p, i) => (
              <Card key={p._id || i} product={p} id={p._id} bgImg={p.image} title={`BDT ${p.price}TK`} subTitle={p.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Generic Dynamic Category Section ────────────────────────────────────────
export const DynamicCategorySection = ({ title, subtitle, viewAllLink, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 4, category }).then(res => {
      setProducts(res.products || []);
      setLoading(false);
    });
  }, [category]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="px-4 pt-10">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader title={title} subtitle={subtitle} viewAllLink={viewAllLink} />
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="w-8 h-8 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products.map((p, i) => (
              <Card key={p._id || i} product={p} id={p._id} bgImg={p.image} title={`BDT ${p.price}TK`} subTitle={p.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
