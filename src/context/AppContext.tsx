// context/AppContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { AppContextType, CartItems, Product, User } from '../types/type';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [user, setUser] = useState<User | null | boolean>(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showLogin, setShowlogin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add cart item
  const addToCart = (itemId: string) => {
    const cartdata = structuredClone(cartItems);

    if (cartdata[itemId]) {
      cartdata[itemId] += 1;
    } else {
      cartdata[itemId] = 1;
    }
    setCartItems(cartdata);
    toast.success('Added to cart');
  };

  // update cart item quantity

  const updateCartItem = (itemId: string, quantity: number) => {
    const cartdata = structuredClone(cartItems);
    cartdata[itemId] = quantity;
    if (quantity === 0) {
      delete cartdata[itemId];
    }
    setCartItems(cartdata);
    toast.success('Cart Updated');
  };

  //Remove cart item
  const removeCartItem = (itemid: string) => {
    const cartdata = structuredClone(cartItems);
    if (cartdata[itemid]) {
      cartdata[itemid] -= 1;
      if (cartdata[itemid] === 0) {
        delete cartdata[itemid];
      }
    }
    setCartItems(cartdata);
    toast.success('Removed from cart');
  };

  // get cart item count

  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }

    return totalCount;
  };

  // cart total amount

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += itemInfo?.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
   
  }, []);

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
    getCartAmount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
