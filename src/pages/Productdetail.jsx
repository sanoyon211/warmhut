import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiShare2, FiCheck } from 'react-icons/fi';
import { BsStarFill, BsStarHalf, BsStar, BsShieldCheck, BsTruck, BsArrowRepeat } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Card থেকে pass করা state
  const product = location.state?.product;

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('details');
  const [zoomed, setZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Product না থাকলে homepage এ redirect
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-xl font-bold text-gray-800">Product not found!</h2>
        <p className="text-gray-400 text-sm">Please go back and select a product.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-olive text-white rounded-2xl font-bold text-sm hover:bg-gray-900 transition-colors">
          ← Go Back
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const sizes = product.category === 'wallet' || product.category === 'cap'
    ? ['One Size']
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setAddedToCart(true);
    showToast(`🛒 ${product.name} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    navigate('/checkout', { state: { product, qty, selectedSize } });
  };

  const handleWishlist = () => {
    toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image });
    showToast(wishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist', wishlisted ? 'error' : 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('🔗 Link copied to clipboard!', 'info');
  };

  // Fake reviews
  const reviews = [
    { name: 'Rakibul Islam', rating: 5, text: 'Excellent quality! Exactly as shown. Fast delivery.', date: '2 days ago', avatar: 'RI', color: 'bg-blue-500' },
    { name: 'Fatema Khanam', rating: 4, text: 'Very good product. Love the color and fit.', date: '1 week ago', avatar: 'FK', color: 'bg-pink-500' },
    { name: 'Sabbir Ahmed', rating: 5, text: 'Premium quality at a very reasonable price. Recommended!', date: '2 weeks ago', avatar: 'SA', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-olive transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-olive transition-colors cursor-pointer" onClick={() => navigate(-1)}>
            {product.category || 'Products'}
          </span>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left: Image ── */}
          <div className="space-y-3">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-x-1.5 text-sm text-gray-500 hover:text-olive transition-colors mb-2"
            >
              <FiArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Main Image */}
            <div
              className={`relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : ''}`}
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
                style={{ height: '460px', objectFit: 'cover' }}
              />
              {/* Zoom hint */}
              {!zoomed && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                  🔍 Click to zoom
                </div>
              )}
              {/* Wishlist on image */}
              <button
                onClick={(e) => { e.stopPropagation(); handleWishlist(); }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                {wishlisted
                  ? <AiFillHeart className="w-5 h-5 text-red-500" />
                  : <FiHeart className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <BsTruck className="w-4 h-4" />, text: 'Free Delivery', sub: 'above 1000TK' },
                { icon: <BsArrowRepeat className="w-4 h-4" />, text: 'Easy Return', sub: '7 days policy' },
                { icon: <BsShieldCheck className="w-4 h-4" />, text: '100% Original', sub: 'Authentic' },
              ].map(b => (
                <div key={b.text} className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm">
                  <div className="text-olive flex justify-center mb-1">{b.icon}</div>
                  <p className="text-xs font-bold text-gray-800">{b.text}</p>
                  <p className="text-[10px] text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="space-y-5">
            {/* Title & Price */}
            <div>
              <p className="text-xs text-olive font-bold uppercase tracking-widest mb-1">WarmHut Premium</p>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-x-2 mb-4">
                <div className="flex items-center gap-x-0.5">
                  {[1,2,3,4,5].map(i => (
                    <BsStarFill key={i} className={`w-3.5 h-3.5 ${i <= 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-x-4">
                <span className="text-3xl font-black text-olive">BDT {product.price}TK</span>
                <span className="text-lg text-gray-300 line-through">BDT {Math.round(product.price * 1.2)}TK</span>
                <span className="bg-red-50 text-red-500 text-xs font-black px-2.5 py-1 rounded-xl">-20%</span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Size Selector */}
            {sizes.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-gray-800">Size</p>
                  <button className="text-xs text-olive underline">Size Guide</button>
                </div>
                <div className="flex gap-x-2 flex-wrap">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 text-sm font-bold transition-all duration-150
                        ${selectedSize === size
                          ? 'border-olive bg-olive text-white shadow-md shadow-olive/20'
                          : 'border-gray-200 text-gray-600 hover:border-olive hover:text-olive'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">Quantity</p>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <HiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black text-gray-900">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <HiPlus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  Total: <span className="font-black text-gray-900">BDT {product.price * qty}TK</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-colors text-sm shadow-lg"
              >
                ⚡ Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-black rounded-2xl border-2 transition-all text-sm flex items-center justify-center gap-x-2
                  ${addedToCart
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-olive text-olive hover:bg-olive hover:text-white'
                  }`}
              >
                {addedToCart
                  ? <><FiCheck className="w-4 h-4" /> Added to Cart!</>
                  : <><FiShoppingCart className="w-4 h-4" /> Add to Cart</>
                }
              </button>
              <div className="flex gap-x-2">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 py-3 rounded-2xl border-2 text-sm font-bold flex items-center justify-center gap-x-2 transition-all
                    ${wishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-400'}`}
                >
                  {wishlisted ? <AiFillHeart className="w-4 h-4" /> : <FiHeart className="w-4 h-4" />}
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center gap-x-2 hover:border-gray-300 transition-colors"
                >
                  <FiShare2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
              <div className="flex items-center gap-x-3">
                <BsTruck className="w-4 h-4 text-olive flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-800">Fast Delivery</p>
                  <p className="text-xs text-gray-400">Dhaka: 1-2 days · Outside: 3-5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <BsArrowRepeat className="w-4 h-4 text-olive flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-800">Easy Return</p>
                  <p className="text-xs text-gray-400">7 days hassle-free return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Details / Reviews ── */}
        <div className="mt-12">
          <div className="flex gap-x-1 border-b border-gray-200 mb-6">
            {['details', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold capitalize transition-all border-b-2 -mb-px
                  ${activeTab === tab ? 'border-olive text-olive' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
              >
                {tab === 'details' ? 'Product Details' : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-black text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Product Name', value: product.name },
                    { label: 'Price', value: `BDT ${product.price}TK` },
                    { label: 'Material', value: '100% Premium Cotton' },
                    { label: 'Brand', value: 'WarmHut Collection' },
                    { label: 'Availability', value: 'In Stock ✅' },
                    { label: 'Delivery', value: 'Nationwide Bangladesh' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                      <span className="text-xs font-bold text-gray-800 text-right max-w-[200px]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-black text-gray-900 mb-4">Care Instructions</h3>
                <div className="space-y-3">
                  {[
                    { icon: '🌊', text: 'Machine wash cold (30°C)' },
                    { icon: '🚫', text: 'Do not bleach' },
                    { icon: '☀️', text: 'Dry in shade, not direct sunlight' },
                    { icon: '♨️', text: 'Iron on low heat' },
                    { icon: '✨', text: 'Wash inside out for best results' },
                    { icon: '📦', text: 'Store in a cool dry place' },
                  ].map(c => (
                    <div key={c.text} className="flex items-center gap-x-3">
                      <span className="text-lg">{c.icon}</span>
                      <span className="text-xs text-gray-600">{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Rating summary */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-x-8">
                <div className="text-center">
                  <p className="text-5xl font-black text-gray-900">4.8</p>
                  <div className="flex gap-x-0.5 justify-center mt-1">
                    {[1,2,3,4,5].map(i => <BsStarFill key={i} className="w-3 h-3 text-yellow-400" />)}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">24 reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-x-2">
                      <span className="text-xs text-gray-400 w-3">{star}</span>
                      <BsStarFill className="w-3 h-3 text-yellow-400" />
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full rounded-full"
                          style={{ width: star === 5 ? '75%' : star === 4 ? '15%' : star === 3 ? '7%' : '3%' }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-6">{star === 5 ? '18' : star === 4 ? '4' : star === 3 ? '2' : '0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual reviews */}
              {reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start gap-x-3">
                    <div className={`w-10 h-10 ${r.color} text-white font-black text-sm rounded-xl flex items-center justify-center flex-shrink-0`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>
                      <div className="flex gap-x-0.5 my-1">
                        {[1,2,3,4,5].map(i => (
                          <BsStarFill key={i} className={`w-3 h-3 ${i <= r.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
