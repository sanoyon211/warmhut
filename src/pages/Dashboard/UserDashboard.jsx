import React, { useEffect, useState } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getUserOrders } from '../../lib/api';
import { useNavigate } from 'react-router';
import { FiUser, FiLogOut, FiPackage, FiShoppingBag, FiDownload, FiSettings, FiEdit2 } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useToast } from '../../context/ToastContext';
import { authClient } from '../../lib/auth-client';

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

    doc.autoTable({
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

    doc.save(`Invoice_WarmHut_${order.orderId.substring(0,8)}.pdf`);
  };

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8" />
            </div>
            <h2 className="font-black text-gray-900 text-lg">{session.user.name}</h2>
            <p className="text-gray-500 text-xs mb-4">{session.user.email}</p>
            <div className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
              {session.user.role || 'User'}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-x-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'orders' ? 'text-olive bg-olive/5 border-l-4 border-olive' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <FiPackage className="w-4 h-4" />
              My Orders
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-x-3 px-6 py-4 text-sm font-bold transition-colors border-t border-gray-50 ${activeTab === 'profile' ? 'text-olive bg-olive/5 border-l-4 border-olive' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <FiSettings className="w-4 h-4" />
              Profile Settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-x-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50"
            >
              <FiLogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center gap-x-2">
                <FiShoppingBag className="text-olive" />
                Order History
              </h3>

              {loading ? (
                <div className="flex justify-center py-10">
                  <span className="w-8 h-8 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                        <div>
                          <p className="text-xs text-gray-400 font-medium">Order ID</p>
                          <p className="font-bold text-gray-900">{order.orderId}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-x-3 items-center">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-400">Qty: {item.qty} {item.size ? `| Size: ${item.size}` : ''}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900">BDT {item.price * item.qty}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="bg-gray-50 rounded-xl px-4 py-2 flex items-center">
                          <span className="text-sm text-gray-600 mr-2">Total:</span>
                          <span className="font-black text-olive text-lg">BDT {order.financials.grandTotal}</span>
                        </div>
                        <button 
                          onClick={() => handleDownloadInvoice(order)}
                          className="flex items-center gap-x-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-olive transition-colors"
                        >
                          <FiDownload className="w-3.5 h-3.5" />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center gap-x-2">
                <FiSettings className="text-olive" />
                Profile Settings
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={session.user.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Email address cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="e.g., 017XXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Delivery Address</label>
                  <textarea
                    rows={3}
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    placeholder="House/Road/Block/Area..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive bg-gray-50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="px-6 py-3 bg-olive text-white font-bold rounded-xl text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center gap-x-2"
                >
                  {updatingProfile ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiEdit2 />}
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
