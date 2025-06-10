import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import AllProducts from '../pages/AllProducts';
import Contact from '../pages/Contact';
import ProductCategory from '../components/ProductCategory';
import ProductInfo from '../components/ProductInfo';
import Cart from '../components/Cart';
import AddAddress from '../pages/AddAddress';
import MyOrders from '../pages/MyOrders';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'products',
        element: <AllProducts />,
      },
      { path: 'products/:category', element: <ProductCategory /> },
      { path: 'products/:category/:id', element: <ProductInfo /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'add-address', element: <AddAddress /> },
       { path: 'my-orders', element: <MyOrders  /> },
    ],
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];
const router = createBrowserRouter(routes);

export default router;
