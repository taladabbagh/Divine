import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our E-Commerce Store</h1>
      <p className="text-lg mb-6">Browse our wide selection of products and add them to your cart!</p>
      <Link to="/products">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
