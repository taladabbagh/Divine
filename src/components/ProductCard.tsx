import React, { useState } from 'react';
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
  const [notification, setNotification] = useState(false); // state to manage the notification

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,  // copy product fields
      quantity: 1  // add default quantity
    };

    dispatch(addToCart(cartItem)); // dispatch the action with the cart item

    // show the notification
    setNotification(true);

    // hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }; 
  return (
  <div className="relative border rounded-lg shadow-lg p-6 bg-white hover:shadow-2xl transition-transform transform hover:scale-105">
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
        onClick={handleAddToCart}
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
