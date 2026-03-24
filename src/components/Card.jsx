import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';

const Card = ({ bgImg, title, subTitle, id, category }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const price = parseInt(title.replace(/[^0-9]/g, '')) || 0;
  const itemId = id || `${subTitle}-${price}`.replace(/\s/g, '-');
  const wishlisted = isWishlisted(itemId);

  const goToDetail = () => {
    navigate('/product', {
      state: {
        product: { id: itemId, name: subTitle, price, image: bgImg, category: category || 'general' }
      }
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id: itemId, name: subTitle, price, image: bgImg });
    showToast(`🛒 ${subTitle.trim()} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist({ id: itemId, name: subTitle, price, image: bgImg });
    showToast(wishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist', wishlisted ? 'error' : 'success');
  };

  const rating = (((itemId.charCodeAt(0) % 10) / 10) + 4).toFixed(1);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-olive/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]" onClick={goToDetail}>
        <img src={bgImg} alt={subTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Wishlist */}
        <button onClick={handleWishlist} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10">
          {wishlisted ? <AiFillHeart className="w-4 h-4 text-red-500" /> : <FiHeart className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />}
        </button>

        {/* View Details hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">👁 View Details</span>
        </div>

        {/* Add to Cart slide up */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={handleAddToCart} className="w-full py-3 bg-olive text-white text-xs font-bold flex items-center justify-center gap-x-2 hover:bg-gray-900 transition-colors">
            <FiShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col gap-y-1 flex-1" onClick={goToDetail}>
        <p className="text-xs text-gray-400 font-medium truncate">{subTitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-olive font-black text-sm md:text-base">{title}</span>
          <div className="flex items-center gap-x-0.5">
            <BsStarFill className="w-2.5 h-2.5 text-yellow-400" />
            <span className="text-[10px] text-gray-400 font-medium">{rating}</span>
          </div>
        </div>
        {/* Mobile button */}
        <button onClick={handleAddToCart} className="mt-2 w-full py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center gap-x-1 hover:bg-olive hover:text-white hover:border-olive transition-all md:hidden">
          <FiShoppingCart className="w-3 h-3" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
