import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa'; 
import logo from '../../public/logo.png';
import { useAuth } from '../Context/useAuth';

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const totalWishlistItems = wishlistItems.length;
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (!token) {
      navigate('/register');
    } else {
      setShowLogout((prev) => !prev); // Toggle the logout button
    }
  };

  return (
    <header>
      <div className="bg-gray-800 h-[5rem] text-gray-100 p-5 shadow-lg flex justify-between items-center rounded-b-lg">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <span className="text-3xl font-bold tracking-widest">Divine</span>
        </Link>

        <div className="flex items-center space-x-5">
          <div className="relative">
            <FaUser
              className="text-2xl cursor-pointer hover:text-teal-300 transition duration-300"
              onClick={handleUserIconClick}
            />
            {token && showLogout && (
              <button
                onClick={() => {
                  logout();
                  setShowLogout(false); // Hide the button after logout
                }}
                className="absolute top-8 right-0 bg-gray-700 text-white text-sm px-4 py-2 rounded shadow-lg hover:bg-red-500 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
          <div className="relative flex items-center">
            <FaShoppingCart
              className="text-2xl cursor-pointer hover:text-teal-300 transition duration-300"
              onClick={() => navigate('/cart')}
            />
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-2">
                {totalItems}
              </span>
            )}
          </div>

          <div className="relative flex items-center">
            <FaHeart
              className="text-2xl cursor-pointer hover:text-teal-300 transition duration-300"
              onClick={() => navigate('/wishlist')}
            />
            {totalWishlistItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-2">
                {totalWishlistItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
