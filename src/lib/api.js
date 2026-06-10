// Frontend API utility

const API_BASE = '/api';

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.color && params.color !== 'all') query.append('color', params.color);
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.sort) query.append('sort', params.sort);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const response = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { products: [], totalPages: 1, currentPage: 1, totalProducts: 0 };
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order');
    }
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/orders/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${API_BASE}/orders`);
    if (!response.ok) throw new Error('Failed to fetch all orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
};

export const getWishlist = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/wishlist/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch wishlist');
    return await response.json();
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { products: [] };
  }
};

export const toggleWishlistApi = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE}/wishlist/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });
    if (!response.ok) throw new Error('Failed to toggle wishlist');
    return await response.json();
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    throw error;
  }
};

export const addReview = async (productId, reviewData) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add review');
    return data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const fetchRelatedProducts = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/related/${id}`);
    if (!response.ok) throw new Error('Failed to fetch related products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

export const validatePromo = async (code) => {
  try {
    const response = await fetch(`${API_BASE}/promo/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to validate promo');
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to submit message');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await fetch(`${API_BASE}/contact`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const markContactRead = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/contact/${id}/read`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to mark as read');
    return await response.json();
  } catch (error) {
    console.error('Error marking contact read:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    throw error;
  }
};
