import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-10 text-center bg-blue-900 text-white rounded-lg shadow-xl">
      <h1 className="text-5xl font-extrabold mb-8">Welcome to Our Store</h1>
      <p className="text-lg mb-8">Browse our wide selection of products and add them to your cart!</p>
      <Link to="/products">
      <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition">
        Shop Now
      </button>
      </Link>
    </div>
  );
};

export default Home;
