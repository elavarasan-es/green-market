// context/AppContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { AppContextType, CartItems, Product, User } from '../types/type';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import { auth } from '../components/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [user, setUser] = useState<User | null>(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showLogin, setShowlogin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial product data
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Auth state persistence
  useEffect(() => {
    fetchProducts();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser({
          name: user.displayName || '',
          email: user.email || '',
          token,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Cart actions
  const addToCart = (itemId: string) => {
    const cartdata = structuredClone(cartItems);
    cartdata[itemId] = (cartdata[itemId] || 0) + 1;
    setCartItems(cartdata);
    toast.success('Added to cart');
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    const cartdata = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartdata[itemId];
    } else {
      cartdata[itemId] = quantity;
    }
    setCartItems(cartdata);
    toast.success('Cart Updated');
  };

  const removeCartItem = (itemId: string) => {
    const cartdata = structuredClone(cartItems);
    if (cartdata[itemId]) {
      cartdata[itemId] -= 1;
      if (cartdata[itemId] <= 0) delete cartdata[itemId];
    }
    setCartItems(cartdata);
    toast.success('Removed from cart');
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);
      if (product) {
        totalAmount += product.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success('Logged out');
  };

  const value: AppContextType = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showLogin,
    setShowlogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeCartItem,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
