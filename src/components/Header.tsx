import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from "../../public/logo.jpg";
import '../../styles/Header.css';

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  
  const [currentMessage, setCurrentMessage] = useState<string>('Free shipping over $100!');
  const messages = [
    { text: 'Free shipping over $100!' },
    { text: 'Explore our Black Friday sales!', link: '/black-friday' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = messages.findIndex(message => message.text === prev);
        return currentIndex === messages.length - 1 ? messages[0].text : messages[currentIndex + 1].text;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div className="rotating-message">
        <a href={messages.find(message => message.text === currentMessage)?.link || '#'}>
          {currentMessage}
        </a>
      </div>
      <div className="bg-gray-800 text-gray-100 p-5 shadow-lg flex justify-between items-center rounded-b-lg">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <span className="text-3xl font-bold tracking-wider">Divine</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
