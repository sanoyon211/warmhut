import React, { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from '../../lib/auth-client';
import { getAllOrders, getAllContacts, markContactRead, deleteContact, fetchProducts, createProduct, updateProduct, deleteProduct, updateOrderStatus, getPromos, createPromo, deletePromo, uploadImage, getChatsAdmin, sendChatMessage, deleteChatAdmin, getOffers, createOffer, updateOffer, deleteOffer } from '../../lib/api';
import { useNavigate, Link } from 'react-router';
import { FiShield, FiLogOut, FiUsers, FiBox, FiDollarSign, FiMessageSquare, FiCheck, FiPlus, FiEdit2, FiTrash2, FiX, FiTag, FiHome, FiMenu, FiStar } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { socket } from '../../lib/socket';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'messages', 'products', 'promos'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [offers, setOffers] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const chatMessagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({ emoji: '', title: '', discount: '', originalPrice: '', salePrice: '', desc: '', to: '', gradient: '', badge: '', badgeColor: '', items: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', category: '', color: '', image: '', stock: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [ordersData, messagesData, productsData, promosData, chatsData, offersData] = await Promise.all([
        getAllOrders(),
        getAllContacts(),
        fetchProducts({ limit: 1000 }),
        getPromos(),
        getChatsAdmin().catch(() => []),
        getOffers().catch(() => [])
      ]);
      setOrders(ordersData);
      setMessages(messagesData);
      setProducts(productsData.products || []);
      setPromos(promosData);
      setChats(chatsData);
      setOffers(offersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.emit('joinAdminRoom');

    socket.on('newOrder', (newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
      showToast('🔔 New order received!', 'info');
    });

    socket.on('orderStatusUpdated', (updatedOrder) => {
      setOrders((prev) => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
    });

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [msg, ...prev]);
      showToast('✉️ New customer message received!', 'info');
    });

    socket.on('productCreated', (product) => {
      setProducts((prev) => [product, ...prev]);
    });

    socket.on('productUpdated', (updatedProduct) => {
      setProducts((prev) => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
    });

    socket.on('productDeleted', (productId) => {
      setProducts((prev) => prev.filter(p => p._id !== productId));
    });

    socket.on('promoCreated', (promo) => {
      setPromos((prev) => [promo, ...prev]);
    });

    socket.on('promoDeleted', (promoId) => {
      setPromos((prev) => prev.filter(p => p._id !== promoId));
    });

    socket.on('newChatMessage', ({ userId, message, userName }) => {
      setChats(prev => {
        let existing = prev.find(c => c.userId === userId);
        if (existing) {
          const updated = {
            ...existing,
            messages: [...existing.messages, message],
            unreadByAdmin: existing.unreadByAdmin + 1,
            userName: userName || existing.userName
          };
          return [updated, ...prev.filter(c => c.userId !== userId)];
        } else {
          const newChat = { userId, userName: userName || 'Guest', messages: [message], unreadByAdmin: 1 };
          return [newChat, ...prev];
        }
      });
      showToast('💬 New live support message!', 'info');
    });

    return () => {
      socket.off('newOrder');
      socket.off('orderStatusUpdated');
      socket.off('newMessage');
      socket.off('productCreated');
      socket.off('productUpdated');
      socket.off('productDeleted');
      socket.off('promoCreated');
      socket.off('promoDeleted');
      socket.off('newChatMessage');
    };
  }, [showToast]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: updated.status } : o));
      showToast('Order status updated!', 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatId) return;

    try {
      await sendChatMessage({
        userId: activeChatId,
        userName: 'Admin',
        text: chatInput,
        sender: 'admin'
      });
      setChatInput('');
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeChatId]);

  // Vercel Serverless Fallback: Poll every 3 seconds while on Live Support tab
  useEffect(() => {
    let interval;
    if (activeTab === 'live_chat') {
      interval = setInterval(async () => {
        try {
          const chatsData = await getChatsAdmin();
          setChats(chatsData);
        } catch (e) {}
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

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

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteContact(id);
      setMessages(messages.filter(m => m._id !== id));
      showToast('Message deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete message', 'error');
    }
  };

  const handleDeleteChat = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this entire chat history?')) return;
    try {
      await deleteChatAdmin(userId);
      setChats(chats.filter(c => c.userId !== userId));
      if (activeChatId === userId) setActiveChatId(null);
      showToast('Chat history deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete chat', 'error');
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
      setProductForm({ name: '', price: '', category: '', color: '', image: '', stock: '', description: '' });
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
      color: product.color, image: product.image, stock: product.stock, description: product.description || ''
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

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...offerForm,
        items: offerForm.items.split(',').map(i => i.trim()),
        originalPrice: Number(offerForm.originalPrice),
        salePrice: Number(offerForm.salePrice)
      };

      if (editingOffer) {
        const updated = await updateOffer(editingOffer._id, formattedData);
        setOffers(offers.map(o => o._id === updated._id ? updated : o));
        showToast('Offer updated!', 'success');
      } else {
        const created = await createOffer(formattedData);
        setOffers([created, ...offers]);
        showToast('Offer created!', 'success');
      }
      setShowOfferModal(false);
      setOfferForm({ emoji: '', title: '', discount: '', originalPrice: '', salePrice: '', desc: '', to: '', gradient: '', badge: '', badgeColor: '', items: '' });
      setEditingOffer(null);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await deleteOffer(id);
      setOffers(offers.filter(o => o._id !== id));
      showToast('Offer deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete offer', 'error');
    }
  };

  const openOfferEditModal = (offer) => {
    setEditingOffer(offer);
    setOfferForm({
      ...offer,
      items: offer.items.join(', ')
    });
    setShowOfferModal(true);
  };

  const openOfferAddModal = () => {
    setEditingOffer(null);
    setOfferForm({ emoji: '', title: '', discount: '', originalPrice: '', salePrice: '', desc: '', to: '', gradient: 'from-blue-500 to-indigo-700', badge: 'HOT', badgeColor: 'bg-red-500', items: '' });
    setShowOfferModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.financials.grandTotal, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Left Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 text-white min-h-screen flex flex-col shadow-2xl z-50`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-x-3">
            <div className="w-10 h-10 bg-olive rounded-xl flex items-center justify-center shadow-lg shadow-olive/20">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight">Admin Portal</h1>
              <p className="text-gray-400 text-xs font-medium">WarmHut Store</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-4 pb-2 pt-2">Menu</p>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'orders' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FiBox className={`w-5 h-5 ${activeTab === 'orders' ? 'text-white' : 'text-gray-500'}`} />
            Orders Management
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'products' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FiBox className={`w-5 h-5 ${activeTab === 'products' ? 'text-white' : 'text-gray-500'}`} />
            Products & Inventory
          </button>

            <button
            onClick={() => setActiveTab('promos')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'promos' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FiTag className={`w-5 h-5 ${activeTab === 'promos' ? 'text-white' : 'text-gray-500'}`} />
            Promo Codes
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'offers' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FiStar className={`w-5 h-5 ${activeTab === 'offers' ? 'text-white' : 'text-gray-500'}`} />
            Website Offers
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex justify-between ${
              activeTab === 'messages' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-x-3">
              <FiMessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'text-white' : 'text-gray-500'}`} />
              Messages
            </div>
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('live_chat')}
            className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex justify-between ${
              activeTab === 'live_chat' ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-x-3">
              <FiMessageSquare className={`w-5 h-5 ${activeTab === 'live_chat' ? 'text-white' : 'text-gray-500'}`} />
              Live Support
            </div>
            {chats.reduce((acc, c) => acc + c.unreadByAdmin, 0) > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {chats.reduce((acc, c) => acc + c.unreadByAdmin, 0)}
              </span>
            )}
          </button>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link to="/">
            <button className="w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <FiHome className="w-5 h-5 text-gray-500" />
              Back to Store
            </button>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-x-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 w-full min-w-0">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-6 md:mb-8 bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-x-3">
            <button 
              className="md:hidden p-2.5 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 capitalize">{activeTab}</h2>
              <p className="hidden md:block text-sm text-gray-500 mt-1">Manage your store {activeTab} and operations.</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 border-l border-gray-100 pl-4 md:pl-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900">{session?.user?.name}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold text-olive">{session?.user?.role}</p>
            </div>
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Admin" 
                className="w-12 h-12 rounded-2xl object-cover shadow-sm" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'A')}&background=random`;
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Stats (Show globally or only on orders) */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                <FiBox className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Orders</p>
                <p className="text-3xl font-black text-gray-900">{orders.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                <FiUsers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Pending Orders</p>
                <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-x-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
                <FiDollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                <p className="text-3xl font-black text-gray-900">৳{totalRevenue}</p>
              </div>
            </div>
          </div>
        )}

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
                      <th className="px-6 py-4">Payment</th>
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
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${order.payment.method === 'bkash' ? 'bg-pink-100 text-pink-700' : 'bg-green-100 text-green-700'}`}>
                            {order.payment.method}
                          </span>
                          {order.payment.method === 'bkash' && order.payment.trxId && (
                            <p className="text-[10px] text-gray-500 mt-1 font-mono">{order.payment.trxId}</p>
                          )}
                        </td>
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
                          className="flex items-center gap-x-1.5 text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors mr-3"
                        >
                          <FiCheck className="w-3 h-3" /> Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="flex items-center gap-x-1.5 text-xs font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors inline-flex"
                      >
                        <FiTrash2 className="w-3 h-3" /> Delete
                      </button>
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

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-black text-lg text-gray-900">Manage Website Offers</h2>
              <button 
                onClick={openOfferAddModal}
                className="bg-olive text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-x-2 hover:bg-gray-900 transition-colors"
              >
                <FiPlus /> Add Offer
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
                      <th className="px-6 py-4">Offer</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Discount</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {offers.map(offer => (
                      <tr key={offer._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-3xl">{offer.emoji}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">{offer.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-[10px] font-black rounded-full uppercase text-white ${offer.badgeColor}`}>{offer.badge}</span>
                          <span className="ml-2 font-bold text-olive">{offer.discount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-400 line-through text-xs">৳{offer.originalPrice}</p>
                          <p className="font-black text-gray-900">৳{offer.salePrice}</p>
                        </td>
                        <td className="px-6 py-4 flex justify-end gap-x-2">
                          <button onClick={() => openOfferEditModal(offer)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDeleteOffer(offer._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {offers.length === 0 && (
                  <div className="text-center py-10 text-gray-400">No active offers. Create one to display on the website.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Live Chat Tab */}
        {activeTab === 'live_chat' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50">
              <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-black text-gray-900">Active Chats</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-10">No active chats</p>
                ) : (
                  chats.map(chat => (
                    <button 
                      key={chat.userId}
                      onClick={async () => {
                        setActiveChatId(chat.userId);
                        if (chat.unreadByAdmin > 0) {
                          setChats(prev => prev.map(c => c.userId === chat.userId ? { ...c, unreadByAdmin: 0 } : c));
                          // Call backend API to mark as read
                          try {
                            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
                            await fetch(`${BACKEND_URL}/api/chat/${chat.userId}/read`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ reader: 'admin' }),
                              credentials: 'include'
                            });
                          } catch (e) {
                            console.error(e);
                          }
                        }
                      }}
                      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-100 transition-colors ${activeChatId === chat.userId ? 'bg-white border-l-4 border-l-olive' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-900 text-sm truncate">{chat.userName}</p>
                        {chat.unreadByAdmin > 0 && (
                          <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {chat.unreadByAdmin}
                          </span>
                        )}
                      </div>
                      {chat.messages.length > 0 && (
                        <p className="text-xs text-gray-500 truncate mt-1">{chat.messages[chat.messages.length - 1].text}</p>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white relative">
              {activeChatId ? (
                <>
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <h3 className="font-bold text-gray-900">
                        {chats.find(c => c.userId === activeChatId)?.userName || 'User'}
                      </h3>
                    </div>
                    <button 
                      onClick={() => handleDeleteChat(activeChatId)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-x-2 text-sm font-bold"
                    >
                      <FiTrash2 className="w-4 h-4" /> Delete Chat
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chats.find(c => c.userId === activeChatId)?.messages.map((msg, idx) => (
                      <div key={idx} className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.sender === 'admin' ? 'bg-olive text-white self-end ml-auto rounded-tr-none' : 'bg-gray-100 text-gray-800 self-start mr-auto rounded-tl-none'}`}>
                        <p>{msg.text}</p>
                        <span className={`text-[10px] block mt-1 ${msg.sender === 'admin' ? 'text-olive-100' : 'text-gray-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                    <div ref={chatMessagesEndRef} />
                  </div>
                  <form onSubmit={handleSendReply} className="p-4 border-t border-gray-100 flex gap-x-2 bg-gray-50">
                    <input 
                      type="text" 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)}
                      placeholder="Type your reply..." 
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-olive"
                    />
                    <button type="submit" disabled={!chatInput.trim()} className="bg-olive text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50 hover:bg-gray-900 transition-colors">
                      Send
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <p>Select a chat to start messaging</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

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
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
                  <textarea rows="3" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full border rounded-xl px-4 py-2 focus:border-olive outline-none resize-none" placeholder="Enter product description..." />
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

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h2 className="font-black text-xl text-gray-900">{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
              <button onClick={() => setShowOfferModal(false)} className="text-gray-400 hover:text-gray-900 bg-white p-2 rounded-full shadow-sm">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleOfferSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Emoji Icon</label>
                  <input type="text" value={offerForm.emoji} onChange={e => setOfferForm({ ...offerForm, emoji: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="e.g. 🧢" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Title</label>
                  <input type="text" value={offerForm.title} onChange={e => setOfferForm({ ...offerForm, title: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="Caps Sale" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Discount Text</label>
                  <input type="text" value={offerForm.discount} onChange={e => setOfferForm({ ...offerForm, discount: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="20% OFF" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Original Price</label>
                  <input type="number" value={offerForm.originalPrice} onChange={e => setOfferForm({ ...offerForm, originalPrice: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="350" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Sale Price</label>
                  <input type="number" value={offerForm.salePrice} onChange={e => setOfferForm({ ...offerForm, salePrice: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="280" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Description</label>
                <textarea value={offerForm.desc} onChange={e => setOfferForm({ ...offerForm, desc: e.target.value })} required rows="2" className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="Offer description..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Link Path</label>
                  <input type="text" value={offerForm.to} onChange={e => setOfferForm({ ...offerForm, to: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="/caps" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Gradient Class (Tailwind)</label>
                  <input type="text" value={offerForm.gradient} onChange={e => setOfferForm({ ...offerForm, gradient: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="from-sky-500 to-blue-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Badge Text</label>
                  <input type="text" value={offerForm.badge} onChange={e => setOfferForm({ ...offerForm, badge: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="HOT" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Badge Color Class</label>
                  <input type="text" value={offerForm.badgeColor} onChange={e => setOfferForm({ ...offerForm, badgeColor: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="bg-red-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Items (Comma separated)</label>
                <input type="text" value={offerForm.items} onChange={e => setOfferForm({ ...offerForm, items: e.target.value })} required className="w-full border rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:border-olive outline-none" placeholder="Lyle & Scott, HUF, Nike" />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-x-3">
                <button type="button" onClick={() => setShowOfferModal(false)} className="px-6 py-2.5 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-olive transition-colors flex items-center gap-x-2">
                  <FiCheck /> {editingOffer ? 'Update Offer' : 'Save Offer'}
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
