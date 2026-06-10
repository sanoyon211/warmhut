import React, { useEffect, useState } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getAllOrders } from '../../lib/api';
import { useNavigate } from 'react-router';
import { FiShield, FiLogOut, FiUsers, FiBox, FiDollarSign } from 'react-icons/fi';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchAllOrders();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.financials.grandTotal, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="bg-gray-900 rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row justify-between items-center shadow-xl">
          <div className="flex items-center gap-x-4 mb-4 md:mb-0">
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-2xl">Admin Portal</h1>
              <p className="text-gray-400 text-sm">Welcome back, {session?.user?.name}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-x-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <FiBox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Orders</p>
              <p className="text-3xl font-black text-gray-900">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
              <FiUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Pending Orders</p>
              <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5">
            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900">৳{totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-black text-lg text-gray-900">Recent Orders</h2>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-20">
               <span className="w-8 h-8 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{order.orderId}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-xs text-gray-400">{order.customer.phone}</p>
                      </td>
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-black text-olive">৳{order.financials.grandTotal}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider
                          ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-10 text-gray-400">No orders found.</div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
