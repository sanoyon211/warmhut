// Frontend API utility

const API_BASE = '/api';

export const fetchProducts = async (category = '', color = '') => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (color && color !== 'all') params.append('color', color);

    const response = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
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
