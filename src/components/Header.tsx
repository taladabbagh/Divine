import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaListAlt } from 'react-icons/fa';
import logo from '../../public/cropped.png';
import { useAuth } from '../Context/useAuth';

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const wishItems = useSelector((state: RootState) => state.wishlist.wishItems);
  const totalWishlistItems = wishItems.length;

  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (!token) {
      navigate('/register');
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowLogoutMessage(true);

    // Hide the logout message after 3 seconds
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  useEffect(() => {
    if (showDropdown) {
      const timer = setTimeout(() => {
        setShowDropdown(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDropdown]);

  return (
    <header>
      {showLogoutMessage && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-teal text-white py-2 px-4 rounded-full shadow-lg z-50"
          style={{ zIndex: 1000 }}
        >
          You have successfully logged out!
        </div>
      )}

      {/* Header Section */}
      <div className="bg-charcoal h-[5rem] p-5 shadow-lg flex justify-between items-center rounded-b-lg">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <span className="text-3xl text-gold font-bold tracking-widest font-serif">
            Divine
          </span>
        </Link>

        <div className="flex items-center space-x-5">
          {/* User Icon */}
          <div className="relative">
            <FaUser
              className="text-2xl text-gold cursor-pointer hover:text-gray transition duration-300"
              onClick={handleUserIconClick}
            />
            {token && showDropdown && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg w-48 overflow-hidden z-50">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  <FaListAlt className="text-gray-600" />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  <FaSignOutAlt className="text-gray-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative flex items-center">
            <FaShoppingCart
              className="text-2xl text-gold cursor-pointer hover:text-gray transition duration-300"
              onClick={() => navigate('/cart')}
            />
            {totalItems > 0 && (
              <span className="bg-gray text-charcoal text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-2">
                {totalItems}
              </span>
            )}
          </div>

          {/* Wishlist Icon */}
          <div className="relative flex items-center">
            <FaHeart
              className="text-2xl text-gold cursor-pointer hover:text-gray transition duration-300"
              onClick={() => navigate('/wishlist')}
            />
            {totalWishlistItems > 0 && (
              <span className="bg-gray text-charcoal text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-2">
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