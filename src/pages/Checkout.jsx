import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import { useSession } from '../lib/auth-client';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { createOrder, validatePromo } from '../lib/api';
import { FiUser, FiPhone, FiMapPin, FiChevronDown, FiCheck, FiTag } from 'react-icons/fi';
import { BsTruck, BsCashCoin } from 'react-icons/bs';


const Checkout = () => {
  const location = useLocation();
  const { data: session } = useSession();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  const navigate = useNavigate();

  // Direct buy now থেকে আসলে single product, cart থেকে আসলে cartItems
  const directProduct = location.state?.product;
  const directQty = location.state?.qty || 1;
  const directSize = location.state?.selectedSize || 'M';

  const checkoutItems = directProduct
    ? [{ ...directProduct, qty: directQty, quantity: directQty, size: directSize }]
    : cartItems.map(i => ({ ...i, qty: i.qty || 1, quantity: i.qty || 1, size: 'M' }));

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal >= 1000 ? 0 : 60;

  // Promo states
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplying, setPromoApplying] = useState(false);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal + delivery - discountAmount;

  const [form, setForm] = useState(() => {
    // Local Address Book: Try to load from localStorage first
    const saved = localStorage.getItem('warmhut_saved_address');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { /* ignore */ }
    }
    return {
      name: session?.user?.name || '',
      phone: '',
      address: '',
      area: '',
      note: '',
      email: session?.user?.email || ''
    };
  });

  const [payMethod, setPayMethod] = useState('cod');
  const [bKashTrxId, setbKashTrxId] = useState('');
  const [placing, setPlacing] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: success
  const [orderId, setOrderId] = useState('');

  React.useEffect(() => {
    if (checkoutItems.length === 0 && step === 1) {
      showToast('Your cart is empty!', 'error');
      navigate('/shop');
    }
  }, [checkoutItems.length, navigate, showToast, step]);

  const update = field => e => setForm({ ...form, [field]: e.target.value });

  // Pre-fill user data when session loads
  React.useEffect(() => {
    if (session?.user) {
      setForm(prev => ({
        ...prev,
        name: prev.name || session.user.name || '',
        email: prev.email || session.user.email || '',
        phone: prev.phone || session.user.phone || '',
        address: prev.address || session.user.address || ''
      }));
    }
  }, [session]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoApplying(true);
    try {
      const data = await validatePromo(promoCode);
      setDiscountPercent(data.discountPercent);
      showToast(data.message, 'success');
    } catch (error) {
      setDiscountPercent(0);
      showToast(error.message || 'Invalid promo code', 'error');
    } finally {
      setPromoApplying(false);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.area) {
      showToast('⚠️ Please fill all required fields!', 'error');
      return;
    }
    if (payMethod === 'bkash' && !bKashTrxId.trim()) {
      showToast('⚠️ Please enter the bKash Transaction ID!', 'error');
      return;
    }
    setPlacing(true);
    
    try {
      const orderPayload = {
        userId: session?.user?.id || null,
        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          area: form.area,
          note: form.note
        },
        items: checkoutItems,
        payment: { method: payMethod, trxId: payMethod === 'bkash' ? bKashTrxId.trim() : undefined },
        financials: {
          subtotal,
          deliveryFee: delivery,
          discount: discountAmount,
          grandTotal: total
        }
      };

      const result = await createOrder(orderPayload);
      
      // Save address for future (Address Book feature)
      localStorage.setItem('warmhut_saved_address', JSON.stringify({
        name: form.name,
        phone: form.phone,
        address: form.address,
        area: form.area,
        email: form.email
      }));

      setOrderId(result.orderId);
      setStep(2);
      window.scrollTo(0, 0);
      showToast('Order placed successfully!', 'success');
      if (!directProduct) clearCart();
    } catch (error) {
      showToast('❌ Failed to place order. Please try again.', 'error');
    } finally {
      setPlacing(false);
    }
  };

  // ── Success Screen ──
  if (step === 2) {
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
              <span className="font-black text-olive">BDT {total}TK</span>
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

            {!session?.user && (
              <div className="bg-olive/5 border border-olive/20 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Already have an account?</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Log in for faster checkout & tracking.</p>
                </div>
                <Link to="/login?redirect=/checkout">
                  <button className="bg-olive hover:bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
                    Log In
                  </button>
                </Link>
              </div>
            )}

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

              {payMethod === 'bkash' && (
                <div className="mt-4 p-4 bg-pink-50 border border-pink-100 rounded-2xl">
                  <p className="text-sm font-bold text-gray-900 mb-2">Instructions:</p>
                  <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1 mb-4">
                    <li>Go to your bKash app.</li>
                    <li>Send Money or Make Payment to <strong>01715825331</strong></li>
                    <li>Enter amount: <strong>BDT {total}TK</strong></li>
                    <li>Copy the Transaction ID (TrxID) and paste it below.</li>
                  </ol>
                  <label className="block text-xs font-bold text-gray-700 mb-1">bKash Transaction ID *</label>
                  <input
                    type="text"
                    value={bKashTrxId}
                    onChange={e => setbKashTrxId(e.target.value)}
                    placeholder="e.g. 8N51ABCDEF"
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 bg-white"
                    required
                  />
                </div>
              )}
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
                {checkoutItems.map((item, i) => (
                  <div key={i} className="flex gap-x-3 items-center">
                    <img src={item.image} alt={item.name} className="w-14 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                      <p className="text-xs font-black text-olive mt-0.5">BDT {item.price * item.quantity}TK</p>
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
                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({discountPercent}%)</span>
                    <span>- BDT {discountAmount}TK</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? 'text-green-500' : 'text-gray-800'}`}>
                    {delivery === 0 ? 'FREE 🎉' : `BDT ${delivery}TK`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-black text-base border-t border-gray-100 pt-4 mb-5">
                <span className="text-gray-900">Total</span>
                <span className="text-olive text-xl">BDT {total}TK</span>
              </div>

              {/* Promo Code Section */}
              <div className="mb-5">
                <div className="flex gap-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-olive transition-colors uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplying || !promoCode.trim()}
                    className="px-4 py-3 bg-gray-900 text-white font-bold rounded-xl text-xs hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  >
                    {promoApplying ? '...' : 'Apply'}
                  </button>
                </div>
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
