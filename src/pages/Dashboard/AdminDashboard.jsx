import React, { useEffect, useState } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getAllOrders, getAllContacts, markContactRead, fetchProducts, createProduct, updateProduct, deleteProduct, updateOrderStatus, getPromos, createPromo, deletePromo, uploadImage } from '../../lib/api';
import { useNavigate } from 'react-router';
import { FiShield, FiLogOut, FiUsers, FiBox, FiDollarSign, FiMessageSquare, FiCheck, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'messages', 'products', 'promos'
  
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', category: '', color: '', image: '', stock: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [ordersData, messagesData, productsData, promosData] = await Promise.all([
        getAllOrders(),
        getAllContacts(),
        fetchProducts({ limit: 1000 }),
        getPromos()
      ]);
      setOrders(ordersData);
      setMessages(messagesData);
      setProducts(productsData.products || []);
      setPromos(promosData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: updated.status } : o));
      showToast('Order status updated!', 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleCreatePromo = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const code = fd.get('code');
    const discountPercent = Number(fd.get('discountPercent'));
    const expiryDate = fd.get('expiryDate');

    try {
      const created = await createPromo({ code, discountPercent, expiryDate });
      setPromos([created, ...promos]);
      e.target.reset();
      showToast('Promo created!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeletePromo = async (id) => {
    if(!window.confirm('Delete this promo code?')) return;
    try {
      await deletePromo(id);
      setPromos(promos.filter(p => p._id !== id));
      showToast('Promo deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete promo', 'error');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markContactRead(id);
      setMessages(messages.map(m => m._id === id ? { ...m, status: 'read' } : m));
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = productForm.image;
      
      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadImage(imageFile);
        setUploadingImage(false);
      }

      let finalCategory = isNewCategory ? newCategoryName : productForm.category;

      const submissionData = { ...productForm, image: finalImageUrl, category: finalCategory };

      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, submissionData);
        setProducts(products.map(p => p._id === updated._id ? updated : p));
        showToast('Product updated!', 'success');
      } else {
        const created = await createProduct(submissionData);
        setProducts([created, ...products]);
        showToast('Product created!', 'success');
      }
      setShowProductModal(false);
      setProductForm({ name: '', price: '', category: '', color: '', image: '', stock: '' });
      setImageFile(null);
      setEditingProduct(null);
      setIsNewCategory(false);
      setNewCategoryName('');
    } catch (error) {
      setUploadingImage(false);
      showToast(error.message, 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      showToast('Product deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete product', 'error');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name, price: product.price, category: product.category,
      color: product.color, image: product.image, stock: product.stock
    });
    setImageFile(null);
    setIsNewCategory(false);
    setNewCategoryName('');
    setShowProductModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: '', category: '', color: '', image: '', stock: '' });
    setImageFile(null);
    setIsNewCategory(false);
    setNewCategoryName('');
    setShowProductModal(true);
  };

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

        {/* Tabs */}
        <div className="flex gap-x-2 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-colors ${activeTab === 'orders' ? 'bg-olive text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-colors ${activeTab === 'products' ? 'bg-olive text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-colors ${activeTab === 'promos' ? 'bg-olive text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Promo Codes
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-colors flex items-center gap-x-2 ${activeTab === 'messages' ? 'bg-olive text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Messages
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
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
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider outline-none cursor-pointer border
                              ${order.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                                order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
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
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-black text-lg text-gray-900">Customer Messages</h2>
            </div>
            {loading ? (
               <div className="flex justify-center py-20">
                 <span className="w-8 h-8 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
               </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {messages.map(msg => (
                  <div key={msg._id} className={`p-6 flex gap-x-4 transition-colors ${msg.status === 'unread' ? 'bg-blue-50/50' : ''}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${msg.status === 'unread' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                      <FiMessageSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-bold text-gray-900">{msg.name}</h4>
                          <p className="text-xs text-gray-500">{msg.email}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mt-3 mb-1">Subject: {msg.subject}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{msg.message}</p>
                      
                      {msg.status === 'unread' && (
                        <button 
                          onClick={() => handleMarkRead(msg._id)}
                          className="flex items-center gap-x-1.5 text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <FiCheck className="w-3 h-3" /> Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-10 text-gray-400">No messages yet.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-black text-lg text-gray-900">Manage Products</h2>
              <button 
                onClick={openAddModal}
                className="bg-olive text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-x-2 hover:bg-gray-900 transition-colors"
              >
                <FiPlus /> Add Product
              </button>
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
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-black text-olive">৳{product.price}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4 flex justify-end gap-x-2">
                          <button onClick={() => openEditModal(product)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDeleteProduct(product._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Promos Tab */}
        {activeTab === 'promos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-black text-lg text-gray-900 mb-4">Create Promo Code</h3>
                <form onSubmit={handleCreatePromo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Promo Code</label>
                    <input type="text" name="code" required className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none uppercase" placeholder="e.g. WINTER50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Discount (%)</label>
                    <input type="number" name="discountPercent" required min="1" max="100" className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" placeholder="20" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date</label>
                    <input type="date" name="expiryDate" required className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-olive transition-colors">
                    Create Code
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-black text-lg text-gray-900">Active Promos</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Code</th>
                        <th className="px-6 py-4">Discount</th>
                        <th className="px-6 py-4">Expires</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {promos.map(promo => (
                        <tr key={promo._id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-black text-gray-900">{promo.code}</td>
                          <td className="px-6 py-4 font-bold text-olive">{promo.discountPercent}%</td>
                          <td className="px-6 py-4">{new Date(promo.expiryDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 flex justify-end">
                            <button onClick={() => handleDeletePromo(promo._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {promos.length === 0 && (
                    <div className="text-center py-10 text-gray-400">No active promo codes.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-black text-xl text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-900 bg-white p-2 rounded-full shadow-sm">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                  <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price (৳)</label>
                  <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                  <input type="number" required value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  {!isNewCategory ? (
                    <select 
                      required 
                      value={productForm.category} 
                      onChange={e => {
                        if (e.target.value === 'NEW_CATEGORY') {
                          setIsNewCategory(true);
                          setProductForm({...productForm, category: ''});
                        } else {
                          setProductForm({...productForm, category: e.target.value});
                        }
                      }} 
                      className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none"
                    >
                      <option value="">Select...</option>
                      {/* Dynamic unique categories */}
                      {[...new Set(products.map(p => p.category))].filter(Boolean).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="NEW_CATEGORY" className="font-bold text-olive">+ Add New Category</option>
                    </select>
                  ) : (
                    <div className="flex gap-x-2">
                      <input 
                        type="text" 
                        required 
                        value={newCategoryName} 
                        onChange={e => setNewCategoryName(e.target.value)} 
                        className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" 
                        placeholder="e.g. T-Shirt" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsNewCategory(false);
                          setNewCategoryName('');
                        }}
                        className="bg-gray-100 text-gray-500 px-3 rounded-xl hover:bg-gray-200"
                        title="Cancel new category"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Color</label>
                  <input type="text" required value={productForm.color} onChange={e => setProductForm({...productForm, color: e.target.value})} className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none" placeholder="e.g. black, olive" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Upload Product Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    required={!editingProduct} // Required only when adding new
                    onChange={e => setImageFile(e.target.files[0])} 
                    className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-olive/10 file:text-olive hover:file:bg-olive/20" 
                  />
                  {editingProduct && productForm.image && !imageFile && (
                    <div className="mt-2 text-sm text-gray-500">
                      Current: <img src={productForm.image} alt="Current" className="w-10 h-10 inline-block object-cover rounded-md ml-2" />
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-x-3">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="px-6 py-3 rounded-xl font-bold text-white bg-olive hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center gap-x-2">
                  {uploadingImage ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
