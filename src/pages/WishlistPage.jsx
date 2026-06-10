import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRemove = item => {
    toggleWishlist(item);
    showToast('💔 Removed from wishlist', 'error');
  };

  const handleAddToCart = item => {
    addToCart(item);
    showToast(`🛒 ${item.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => addToCart(item));
    showToast(`🛒 All ${wishlist.length} items added to cart!`);
  };

  // Empty state
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <AiFillHeart className="w-12 h-12 text-red-200" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">
          Save your favourite items here. Browse our collections and tap the
          heart icon to save products.
        </p>
        <Link to="/">
          <button className="px-8 py-3.5 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors text-sm shadow-lg shadow-olive/20">
            Start Shopping →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-black text-xl text-gray-900 flex items-center gap-x-2">
                <AiFillHeart className="w-5 h-5 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="flex items-center gap-x-2 px-4 py-2.5 bg-olive text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-md shadow-olive/20"
            >
              <FiShoppingCart className="w-4 h-4" />
              Add All to Cart
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {wishlist.map(item => {
            const rating = (
              ((item.id?.charCodeAt(0) || 65) % 10) / 10 +
              4
            ).toFixed(1);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden bg-gray-50 aspect-[3/4] cursor-pointer"
                  onClick={() =>
                    navigate('/product', { state: { product: item } })
                  }
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Remove button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleRemove(item);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <AiFillHeart className="w-4 h-4 text-red-500" />
                  </button>

                  {/* Add to cart overlay */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-full py-3 bg-olive text-white text-xs font-bold flex items-center justify-center gap-x-1.5 hover:bg-gray-900 transition-colors"
                    >
                      <FiShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p
                    className="text-xs text-gray-500 font-medium truncate cursor-pointer hover:text-olive transition-colors"
                    onClick={() =>
                      navigate('/product', { state: { product: item } })
                    }
                  >
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-olive font-black text-sm">
                      BDT {item.price}TK
                    </span>
                    <div className="flex items-center gap-x-0.5">
                      <BsStarFill className="w-2.5 h-2.5 text-yellow-400" />
                      <span className="text-[10px] text-gray-400">
                        {rating}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-x-2 mt-2.5">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 py-2 bg-olive/10 text-olive text-xs font-bold rounded-xl flex items-center justify-center gap-x-1 hover:bg-olive hover:text-white transition-all"
                    >
                      <FiShoppingCart className="w-3 h-3" /> Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item)}
                      className="w-8 h-8 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Want to explore more products?
          </p>
          <Link to="/">
            <button className="px-8 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:border-olive hover:text-olive transition-colors text-sm">
              Continue Shopping →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
