'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';
import { initialListings, initialCategories, initialOrders, initialSiteSettings } from './initialData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Language state
  const [lang, setLang] = useState('bn');

  // 2. Auth state
  const [user, setUser] = useState({
    id: 'user-admin',
    name: 'Admin User',
    email: 'admin@websitebazerbd.com',
    role: 'admin', // 'guest', 'customer', 'seller', 'admin'
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  });

  // 3. Marketplace Listings State
  const [listings, setListings] = useState(initialListings);

  // 4. Favorites State
  const [favorites, setFavorites] = useState(['listing-101']);

  // 5. Orders & Payments State
  const [orders, setOrders] = useState(initialOrders);

  // 6. Site Settings
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);

  // Load state from localStorage on mount if available
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('wbb_lang');
      if (savedLang) setLang(savedLang);

      const savedUser = localStorage.getItem('wbb_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedListings = localStorage.getItem('wbb_listings');
      if (savedListings) setListings(JSON.parse(savedListings));

      const savedFavs = localStorage.getItem('wbb_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedOrders = localStorage.getItem('wbb_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSettings = localStorage.getItem('wbb_settings');
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
    } catch (err) {
      console.error('Failed loading local state:', err);
    }
  }, []);

  // Save changes to localStorage
  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('wbb_lang', newLang);
  };

  const loginUser = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('wbb_user', JSON.stringify(userInfo));
  };

  const logoutUser = () => {
    const guestUser = { id: null, name: 'Guest', email: '', role: 'guest' };
    setUser(guestUser);
    localStorage.setItem('wbb_user', JSON.stringify(guestUser));
  };

  const switchRoleDemo = (role) => {
    let demoUser;
    if (role === 'admin') {
      demoUser = { id: 'user-admin', name: 'Admin Master', email: 'admin@websitebazerbd.com', role: 'admin' };
    } else if (role === 'seller') {
      demoUser = { id: 'seller-1', name: 'ThemeLooks BD (Seller)', email: 'seller@themelooks.com', role: 'seller' };
    } else if (role === 'customer') {
      demoUser = { id: 'user-customer', name: 'Rafiq Islam', email: 'rafiq@gmail.com', role: 'customer' };
    } else {
      demoUser = { id: null, name: 'Guest User', email: '', role: 'guest' };
    }
    setUser(demoUser);
    localStorage.setItem('wbb_user', JSON.stringify(demoUser));
  };

  const toggleFavorite = (listingId) => {
    setFavorites((prev) => {
      const updated = prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId];
      localStorage.setItem('wbb_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const addListing = (newListing) => {
    const updated = [newListing, ...listings];
    setListings(updated);
    localStorage.setItem('wbb_listings', JSON.stringify(updated));
  };

  const updateListingStatus = (id, newStatus) => {
    const updated = listings.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    setListings(updated);
    localStorage.setItem('wbb_listings', JSON.stringify(updated));
  };

  const addOrder = (newOrder) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('wbb_orders', JSON.stringify(updated));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
    setOrders(updated);
    localStorage.setItem('wbb_orders', JSON.stringify(updated));
  };

  const updateSettings = (newSettings) => {
    const updated = { ...siteSettings, ...newSettings };
    setSiteSettings(updated);
    localStorage.setItem('wbb_settings', JSON.stringify(updated));
  };

  // Helper dictionary lookup function
  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        changeLang,
        t,
        user,
        loginUser,
        logoutUser,
        switchRoleDemo,
        categories: initialCategories,
        listings,
        addListing,
        updateListingStatus,
        favorites,
        toggleFavorite,
        orders,
        addOrder,
        updateOrderStatus,
        siteSettings,
        updateSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
