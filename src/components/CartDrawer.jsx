import React from 'react';
import { useCart } from '../context/CartContext';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MdShoppingBag } from 'react-icons/md';
import { Link } from 'react-router';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQty, totalPrice, clearCart, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[101] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-x-3">
            <MdShoppingBag className="w-6 h-6 text-olive" />
            <h2 className="text-lg font-bold text-gray-800">
              Your Cart <span className="text-sm text-olive font-normal">({totalItems} items)</span>
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-y-5 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <MdShoppingBag className="w-12 h-12 text-gray-200" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-1">Add items to get started</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-olive text-white rounded-xl font-semibold text-sm hover:bg-gray-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-x-4 p-3 rounded-2xl border border-gray-100 hover:border-olive/20 transition-colors bg-gray-50/50">
                <div className="w-18 h-22 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{item.name}</p>
                  <p className="text-olive font-bold mt-1">BDT {item.price}TK</p>
                  <div className="flex items-center gap-x-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-olive hover:text-olive transition-colors shadow-sm">
                      <HiMinus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center text-gray-800">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-olive hover:text-olive transition-colors shadow-sm">
                      <HiPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-gray-800">BDT {item.price * item.qty}TK</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-3 bg-gray-50/50">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span><span>BDT {totalPrice}TK</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span><span className="text-green-500 font-medium">{totalPrice >= 1000 ? 'FREE' : 'BDT 60TK'}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-olive">BDT {totalPrice >= 1000 ? totalPrice : totalPrice + 60}TK</span>
            </div>
            {totalPrice < 1000 && (
              <p className="text-xs text-center text-amber-600 bg-amber-50 py-2 rounded-lg">
                Add BDT {1000 - totalPrice}TK more for FREE delivery! 🚚
              </p>
            )}
            <button className="w-full py-4 bg-olive text-white rounded-2xl font-bold text-sm hover:bg-gray-900 transition-colors duration-200 shadow-lg shadow-olive/20">
              Proceed to Checkout →
            </button>
            <button onClick={clearCart} className="w-full py-2 text-xs text-gray-400 hover:text-red-400 transition-colors">
              Clear all items
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
