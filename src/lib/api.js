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
