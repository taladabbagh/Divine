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
  const [notification, setNotification] = useState(false); // State to manage the notification

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,  // Copy product fields
      quantity: 1  // Add default quantity
    };

    dispatch(addToCart(cartItem)); // Dispatch the action with the cart item

    // Show the notification
    setNotification(true);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  return (
    <div className="border rounded shadow-lg p-4 relative">
      <img
        className="w-full h-48 object-cover mb-4 rounded"
        src={product.image}
        alt={product.title}
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-green-500 font-bold">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {/* Notification for item added to cart */}
      {notification && (
        <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
          Item added to cart
        </div>
      )}
    </div>
  );
};

export default ProductCard;
