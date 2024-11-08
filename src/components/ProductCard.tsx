import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };

    dispatch(addToCart(cartItem));
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border rounded-lg shadow-lg p-6 bg-white hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img
        className="w-full h-48 object-contain rounded-md mb-4 border-b pb-4"
        src={product.image}
        alt={product.title}
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.category}</p>
      <p className="text-xl font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        onClick={e => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        Add to Cart
      </button>
      {notification && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md shadow-md animate-bounce">
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
