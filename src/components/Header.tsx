import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 
import logo from "../../public/logo.jpeg"

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 
  const navigate = useNavigate();

  return (
    <header className="bg-blue-900 text-white p-5 shadow-lg flex justify-between items-center rounded-b-lg">
    <Link to="/" className="flex items-center space-x-3">
      <img src={logo} alt="Logo" className="h-10 w-10 rounded-full shadow-md" />
      <span className="text-2xl font-bold tracking-wide">Our Store</span>
    </Link>
  
    <div className="flex items-center space-x-5">
      <FaUser
        className="text-3xl cursor-pointer hover:text-blue-300 transition duration-300"
        onClick={() => navigate('/register')}
      />
      <div className="relative flex items-center">
        <FaShoppingCart
          className="text-3xl cursor-pointer hover:text-blue-300 transition duration-300"
          onClick={() => navigate('/cart')}
        />
        {totalItems > 0 && (
          <span className="bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-2">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  </header>
  );
};

export default Header;
