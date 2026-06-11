import React, { useEffect, useState } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getUserOrders } from '../../lib/api';
import { useNavigate } from 'react-router';
import { FiUser, FiLogOut, FiPackage, FiShoppingBag, FiDownload, FiSettings, FiEdit2 } from 'react-icons/fi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '../../context/ToastContext';
import { authClient } from '../../lib/auth-client';
import { socket } from '../../lib/socket';

const UserDashboard = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'profile'
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfileForm({
        name: session.user.name || '',
        phone: session.user.phone || '',
        address: session.user.address || ''
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchOrders = async () => {
        const data = await getUserOrders(session.user.id);
        setOrders(data);
        setLoading(false);
      };
      fetchOrders();
    }
  }, [session]);

  useEffect(() => {
    socket.on('orderStatusUpdated', (updatedOrder) => {
      setOrders((prev) => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    });

    return () => {
      socket.off('orderStatusUpdated');
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const { error } = await authClient.updateUser({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address
      });
      if (error) throw new Error(error.message || 'Failed to update profile');
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('WarmHut', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Winter Wear', 14, 26);

    // Invoice Info
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: #${order.orderId.substring(0, 8)}`, 150, 26);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 150, 32);

    // Customer Info
    doc.setFont('helvetica', 'bold');
    doc.text('Billed To:', 14, 45);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customer.name, 14, 51);
    doc.text(order.customer.phone, 14, 57);
    doc.text(`${order.customer.address}, ${order.customer.area}`, 14, 63);

    // Items Table
    const tableColumn = ["Item", "Size", "Qty", "Unit Price", "Total"];
    const tableRows = [];

    order.items.forEach(item => {
      const itemData = [
        item.name,
        item.size || '-',
        item.qty,
        `BDT ${item.price}TK`,
        `BDT ${item.price * item.qty}TK`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [75, 83, 32] } // Olive green
    });

    const finalY = doc.lastAutoTable.finalY || 75;

    // Financials
    doc.text(`Subtotal: BDT ${order.financials.subtotal}TK`, 140, finalY + 10);
    doc.text(`Delivery Fee: BDT ${order.financials.deliveryFee}TK`, 140, finalY + 16);
    if (order.financials.discount > 0) {
      doc.text(`Discount: - BDT ${order.financials.discount}TK`, 140, finalY + 22);
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`Grand Total: BDT ${order.financials.grandTotal}TK`, 140, finalY + (order.financials.discount > 0 ? 28 : 22));

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for shopping with WarmHut!', 14, 280);

    doc.save(`Invoice_WarmHut_${order.orderId.substring(0, 8)}.pdf`);
  };

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-[#081621] to-gray-900 pt-16 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-olive/20 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="max-w-[1100px] mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Hello, {session.user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Manage your orders, update your profile settings, and keep track of your shopping journey.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-20 relative z-20">

        {/* Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 text-center relative overflow-hidden group">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4 relative z-10 bg-gray-50 flex items-center justify-center overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <FiUser className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <h2 className="font-black text-gray-900 text-lg relative z-10">{session.user.name}</h2>
            <p className="text-gray-500 text-xs mb-4 relative z-10">{session.user.email}</p>
            <div className="inline-block bg-olive/10 text-olive text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest relative z-10">
              {session.user.role || 'Member'}
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-white group-hover:from-olive/5 transition-colors duration-500"></div>
          </div>

          {/* Navigation */}
          <div className="bg-white p-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-x-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'orders' ? 'text-olive bg-olive/10 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <FiPackage className={`w-5 h-5 ${activeTab === 'orders' ? 'text-olive' : 'text-gray-400'}`} />
              My Orders
            </button>
            <div className="h-px w-full bg-gray-50 my-1"></div>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-x-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'profile' ? 'text-olive bg-olive/10 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <FiSettings className={`w-5 h-5 ${activeTab === 'profile' ? 'text-olive' : 'text-gray-400'}`} />
              Profile Settings
            </button>
            <div className="h-px w-full bg-gray-50 my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-x-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
            >
              <FiLogOut className="w-5 h-5 text-red-400" />
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 xl:col-span-9">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden" data-aos="fade-up">
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-black text-xl text-gray-900 flex items-center gap-x-3">
                  <span className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center">
                    <FiShoppingBag className="w-5 h-5" />
                  </span>
                  Order History
                </h3>
                <p className="text-sm text-gray-500 mt-2 ml-13">View and manage your recent purchases.</p>
              </div>

              <div className="p-8">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <span className="w-10 h-10 border-4 border-olive/20 border-t-olive rounded-full animate-spin"></span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20 px-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-gray-100">
                      <FiPackage className="w-8 h-8 text-gray-300" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h4>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Looks like you haven't made your first purchase yet. Explore our latest collections!</p>
                    <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-olive transition-colors">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 bg-white group">
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-gray-50/50 border-b border-gray-100 gap-4">
                          <div className="flex flex-wrap gap-x-8 gap-y-2">
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Order Placed</p>
                              <p className="text-sm font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total Amount</p>
                              <p className="text-sm font-semibold text-gray-900">BDT {order.financials.grandTotal} TK</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Order Number</p>
                              <p className="text-sm font-semibold text-gray-900">#{order.orderId.substring(0, 8).toUpperCase()}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-x-3">
                            <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm
                              ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                  'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                          <div className="space-y-4">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex gap-x-4 items-center">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                  <div className="flex items-center gap-x-3 mt-1">
                                    <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Qty: {item.qty}</p>
                                    {item.size && <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Size: {item.size}</p>}
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-sm font-black text-gray-900">BDT {item.price * item.qty}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer / Actions */}
                          <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-50">
                            <button
                              onClick={() => handleDownloadInvoice(order)}
                              className="flex items-center gap-x-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:border-olive hover:text-olive transition-colors shadow-sm group-hover:shadow"
                            >
                              <FiDownload className="w-4 h-4" />
                              Invoice PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden" data-aos="fade-up">
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-black text-xl text-gray-900 flex items-center gap-x-3">
                  <span className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center">
                    <FiSettings className="w-5 h-5" />
                  </span>
                  Personal Information
                </h3>
                <p className="text-sm text-gray-500 mt-2 ml-13">Update your details for faster checkout and better recommendations.</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleUpdateProfile} className="max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-olive focus:ring-4 focus:ring-olive/10 bg-gray-50/50 hover:bg-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={session.user.email}
                        disabled
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="e.g., 017XXXXXXXX"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-olive focus:ring-4 focus:ring-olive/10 bg-gray-50/50 hover:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Delivery Address</label>
                      <textarea
                        rows={3}
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="House/Road/Block/Area..."
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-olive focus:ring-4 focus:ring-olive/10 bg-gray-50/50 hover:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-2xl text-sm hover:bg-olive transition-all duration-300 disabled:opacity-50 flex items-center gap-x-2 shadow-lg shadow-gray-900/20 hover:shadow-olive/20 hover:-translate-y-0.5"
                    >
                      {updatingProfile ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <FiEdit2 className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
