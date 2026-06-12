import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { BsStarFill, BsCartCheck, BsHeartbreak } from 'react-icons/bs';

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
    showToast(<span className="flex items-center gap-2"><BsCartCheck /> {subTitle.trim()} added to cart!</span>);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist({ id: itemId, name: subTitle, price, image: bgImg });
    showToast(wishlisted ? <span className="flex items-center gap-2"><BsHeartbreak /> Removed from wishlist</span> : <span className="flex items-center gap-2"><AiFillHeart /> Added to wishlist</span>, wishlisted ? 'error' : 'success');
  };

  const rating = (((itemId.charCodeAt(0) % 10) / 10) + 4).toFixed(1);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-olive/20 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]" onClick={goToDetail}>
        <img src={bgImg} alt={subTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />

        {/* Wishlist */}
        <button onClick={handleWishlist} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10">
          {wishlisted ? <AiFillHeart className="w-4 h-4 text-red-500" /> : <FiHeart className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />}
        </button>

        {/* View Details hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
          <span className="bg-white/90 backdrop-blur-md text-gray-900 text-xs font-black px-6 py-2.5 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500">View Details</span>
        </div>

        {/* Add to Cart slide up */}
        <div className="absolute bottom-2 left-2 right-2 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <button onClick={handleAddToCart} className="w-full py-3.5 bg-white/90 backdrop-blur-xl text-gray-900 text-xs font-black rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center gap-x-2 hover:bg-olive hover:text-white transition-colors duration-300 border border-white/50">
            <FiShoppingCart className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5 flex flex-col gap-y-1.5 flex-1" onClick={goToDetail}>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider truncate">{subTitle}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-900 font-black text-sm md:text-lg tracking-tight">{title}</span>
          <div className="flex items-center gap-x-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <BsStarFill className="w-2.5 h-2.5 text-amber-400" />
            <span className="text-[10px] text-gray-600 font-bold">{rating}</span>
          </div>
        </div>
        {/* Mobile button */}
        <button onClick={handleAddToCart} className="mt-3 w-full py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold flex items-center justify-center gap-x-2 hover:bg-olive hover:text-white hover:border-olive transition-all md:hidden">
          <FiShoppingCart className="w-3.5 h-3.5" /> Quick Add
        </button>
      </div>
    </div>
  );
};

export default Card;
