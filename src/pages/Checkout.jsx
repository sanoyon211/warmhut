import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { FiUser, FiPhone, FiMapPin, FiChevronDown, FiCheck } from 'react-icons/fi';
import { BsTruck, BsCashCoin } from 'react-icons/bs';


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  // Direct buy now থেকে আসলে single product, cart থেকে আসলে cartItems
  const directProduct = location.state?.product;
  const directQty = location.state?.qty || 1;
  const directSize = location.state?.selectedSize || 'M';

  const orderItems = directProduct
    ? [{ ...directProduct, qty: directQty, size: directSize }]
    : cartItems.map(i => ({ ...i, size: 'M' }));

  const subtotal = directProduct
    ? directProduct.price * directQty
    : totalPrice;

  const deliveryFee = subtotal >= 1000 ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  const [form, setForm] = useState({
    name: '', phone: '', address: '', area: '', note: '',
  });
  const [payMethod, setPayMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: success

  const update = field => e => setForm({ ...form, [field]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      showToast('⚠️ Please fill all required fields!', 'error');
      return;
    }
    setPlacing(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));
    setPlacing(false);
    setStep(2);
    if (!directProduct) clearCart();
  };

  // ── Success Screen ──
  if (step === 2) {
    const orderId = `WH-${Date.now().toString().slice(-6)}`;
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-black text-2xl text-gray-900 mb-2">Order Placed! 🎉</h1>
          <p className="text-gray-400 text-sm mb-1">Your order has been confirmed.</p>
          <p className="text-olive font-black text-lg mb-6">Order ID: {orderId}</p>

          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Name</span>
              <span className="font-semibold text-gray-800">{form.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Phone</span>
              <span className="font-semibold text-gray-800">{form.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Paid</span>
              <span className="font-black text-olive">BDT {grandTotal}TK</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payment</span>
              <span className="font-semibold text-gray-800">{payMethod === 'cod' ? 'Cash on Delivery' : 'bKash'}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Our team will call you at <span className="font-bold text-gray-700">{form.phone}</span> to confirm your order. Expected delivery: 2-5 business days.
          </p>

          <div className="flex flex-col gap-y-2">
            <Link to="/">
              <button className="w-full py-3.5 bg-olive text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors text-sm">
                Continue Shopping →
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout Form ──
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-[1100px] mx-auto flex items-center gap-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-olive">Home</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-8">
          <span className="text-olive">Checkout</span> — Almost There!
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Form ── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Delivery Info */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-gray-900 mb-5 flex items-center gap-x-2">
                <span className="w-7 h-7 bg-olive text-white text-xs font-black rounded-lg flex items-center justify-center">1</span>
                Delivery Information
              </h2>
              <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 bg-gray-50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="01XXXXXXXXX"
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 bg-gray-50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Delivery Address *</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                    <textarea
                      value={form.address}
                      onChange={update('address')}
                      placeholder="House/Road/Block/Area..."
                      rows={3}
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10 bg-gray-50 transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">City / District</label>
                  <div className="relative">
                    <select
                      value={form.area}
                      onChange={update('area')}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive bg-gray-50 appearance-none transition-all"
                    >
                      <option value="">Select your district</option>
                      {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Order Note (optional)</label>
                  <input
                    type="text"
                    value={form.note}
                    onChange={update('note')}
                    placeholder="Any special instructions..."
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-olive bg-gray-50 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-gray-900 mb-5 flex items-center gap-x-2">
                <span className="w-7 h-7 bg-olive text-white text-xs font-black rounded-lg flex items-center justify-center">2</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'cod', icon: <BsCashCoin className="w-5 h-5" />, label: 'Cash on Delivery', sub: 'Pay when you receive the product', color: 'text-green-600 bg-green-50' },
                  { value: 'bkash', icon: <span className="font-black text-pink-600 text-sm">bKash</span>, label: 'bKash Payment', sub: 'Pay securely via bKash', color: 'text-pink-600 bg-pink-50' },
                ].map(pm => (
                  <button
                    key={pm.value}
                    type="button"
                    onClick={() => setPayMethod(pm.value)}
                    className={`w-full flex items-center gap-x-4 p-4 rounded-2xl border-2 transition-all text-left
                      ${payMethod === pm.value ? 'border-olive bg-olive/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pm.color}`}>
                      {pm.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{pm.label}</p>
                      <p className="text-xs text-gray-400">{pm.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${payMethod === pm.value ? 'border-olive bg-olive' : 'border-gray-300'}`}>
                      {payMethod === pm.value && <FiCheck className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-black text-gray-900 mb-5 flex items-center gap-x-2">
                <span className="w-7 h-7 bg-olive text-white text-xs font-black rounded-lg flex items-center justify-center">3</span>
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex gap-x-3 items-center">
                    <img src={item.image} alt={item.name} className="w-14 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                      <p className="text-xs font-black text-olive mt-0.5">BDT {item.price * item.qty}TK</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-800">BDT {subtotal}TK</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-500' : 'text-gray-800'}`}>
                    {deliveryFee === 0 ? 'FREE 🎉' : `BDT ${deliveryFee}TK`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-xl">
                    Add BDT {1000 - subtotal}TK more for free delivery!
                  </p>
                )}
              </div>

              <div className="flex justify-between font-black text-base border-t border-gray-100 pt-4 mb-5">
                <span className="text-gray-900">Total</span>
                <span className="text-olive text-xl">BDT {grandTotal}TK</span>
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={placing}
                className={`w-full py-4 font-black rounded-2xl text-sm transition-all shadow-lg
                  ${placing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-olive text-white hover:bg-gray-900 shadow-olive/20'
                  }`}
              >
                {placing ? (
                  <span className="flex items-center justify-center gap-x-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  '✅ Place Order'
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 Your information is 100% secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
