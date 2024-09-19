import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 
  const navigate = useNavigate();

  return (
    <header className="bg-teal-800 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Talaa
      </Link>

      <div className="flex items-center space-x-4">
        <FaUser
          className="text-3xl cursor-pointer"
          onClick={() => navigate('/register')}
        />

        <div className="relative flex items-center">
          <FaShoppingCart
            className="text-3xl cursor-pointer"
            onClick={() => navigate('/cart')}
          />
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center absolute -top-2 -right-3">
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
