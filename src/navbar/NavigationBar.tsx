/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../hooks/useAppContext';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowlogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
  } = useAppContext();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-primary' : 'text-grey hover:text-[#d4af37]';

  const handleLogout = async () => {
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('products');
    }
  }, [searchQuery]);
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img className="h-9" src={assets.logo} alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to={'/'} className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to={'/products'} className={navLinkClass}>
          All Products
        </NavLink>
        <NavLink to={'/contact'} className={navLinkClass}>
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          onClick={() => navigate('/cart')}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="card"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowlogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul
              className="hidden group-hover:block absolute top-10 bg-white shadow border border-gray-200 py-2.5
            rounded-md text-sm z-40"
            >
              <li
                onClick={() => navigate('/my-orders')}
                className="p-1 pl-3 hover:bg-green-100 cursor-pointer"
              >
                MyOrders
              </li>
              <li
                onClick={handleLogout}
                className="p-1 pl-3 hover:bg-green-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}

      <div className='flex items-center gap-6 sm:hidden'>
        <div
          onClick={() => navigate('/cart')}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="card"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden"
        >
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${open ? 'flex sm:hidden' : 'hidden'} absolute top-full left-0 w-full bg-white shadow-md py-6 flex-col items-start gap-4 px-6 text-sm z-50`}
      >
        <NavLink to={'/'} className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to={'/products'} className={navLinkClass}>
          All Products
        </NavLink>
        {user && (
          <NavLink to={'/my-orders'} className={navLinkClass}>
            My Orders
          </NavLink>
        )}
        <NavLink to={'/contact'} className={navLinkClass}>
          Contact
        </NavLink>
        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowlogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
