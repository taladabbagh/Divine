import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa'; 
import logo from "../../public/logo.png";

const Header: React.FC = () => {
  //items gives error
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  console.log('cartItems:', cartItems); // Debug log

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const totalWishlistItems = wishlistItems.length;
  const navigate = useNavigate();

  return (
    <header>
      <div className="bg-gray-800 h-[5rem] text-gray-100 p-5 shadow-lg flex justify-between items-center rounded-b-lg">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <span className="text-3xl font-bold tracking-widest">Divine</span>
        </Link>

        <div className="flex items-center space-x-5">
          <FaUser
            className="text-2xl cursor-pointer hover:text-teal-300 transition duration-300"
            onClick={() => navigate('/register')}
          />
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
