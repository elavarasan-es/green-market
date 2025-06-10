
// types.ts (optional)
export interface User {
  id?: string;
  name: string;
  email: string;
  // Add more fields if needed
}

export interface Product {
weight?: string;
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: string[]; // assuming imported image URLs are strings
  description: string[];
  createdAt: string; // or `Date` if you're parsing it
  updatedAt: string;
  inStock: boolean;
  quantity?:number
}

export type CartItems = {
  [productId: string]: number; // or `id: number` if numeric IDs
};
export interface AppContextType {
  user: User | null | boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null |boolean>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowlogin: React.Dispatch<React.SetStateAction<boolean>>;
  products:Product[];
  currency:string;
  addToCart:(itemId:string)=>void;
  updateCartItem: (itemId:string, quantity:number)=>void;
  removeCartItem:(itemId:string)=>void
  cartItems:CartItems;
  searchQuery: string;
setSearchQuery: React.Dispatch<React.SetStateAction<string>>
getCartCount:()=>number;
getCartAmount:()=> number;
}

export interface Address {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
  phone: string;
}
export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  status: string;
  paymentType: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}