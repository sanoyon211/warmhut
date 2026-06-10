import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSession } from '../lib/auth-client';
import { getWishlist, toggleWishlistApi } from '../lib/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('guestWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Load wishlist from DB if user is logged in
  useEffect(() => {
    if (session?.user?.id) {
      const fetchDBWishlist = async () => {
        const data = await getWishlist(session.user.id);
        // data.products array contains full product objects from populate()
        // Map _id to id to match frontend conventions
        const mappedProducts = (data.products || []).map(p => ({ ...p, id: p._id }));
        setWishlist(mappedProducts);
      };
      fetchDBWishlist();
    }
  }, [session]);

  // Sync to localstorage for guests
  useEffect(() => {
    if (!session?.user) {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, session]);

  const toggleWishlist = useCallback(async (item) => {
    // Optimistic UI update
    const idToToggle = item._id || item.id;
    
    setWishlist(prev => {
      const exists = prev.find(i => (i._id || i.id) === idToToggle);
      if (exists) return prev.filter(i => (i._id || i.id) !== idToToggle);
      return [...prev, item];
    });

    // If logged in, sync with backend
    if (session?.user?.id) {
      try {
        await toggleWishlistApi(session.user.id, idToToggle);
      } catch (error) {
        console.error('Failed to sync wishlist with DB');
      }
    }
  }, [session]);

  const isWishlisted = useCallback((id) => wishlist.some(i => (i._id || i.id) === id), [wishlist]);
  const totalWishlist = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, totalWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
