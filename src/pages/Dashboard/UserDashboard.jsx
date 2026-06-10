import React, { useEffect, useState } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getUserOrders } from '../../lib/api';
import { useNavigate } from 'react-router';
import { FiUser, FiLogOut, FiPackage, FiShoppingBag } from 'react-icons/fi';

const UserDashboard = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
            <button className="w-full flex items-center gap-x-3 px-6 py-4 text-sm font-bold text-olive bg-olive/5 border-l-4 border-olive">
              <FiPackage className="w-4 h-4" />
              My Orders
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-x-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
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

                    <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Amount:</span>
                      <span className="font-black text-olive text-lg">BDT {order.financials.grandTotal}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
