import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistReducer';
import { FaHeart } from 'react-icons/fa';
import { Product, CartItem } from '../types/types';
import { addItemToCart } from '../api/cartApi';
import { useAuth } from '../Context/useAuth';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { token } = useAuth(); 

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      console.error("User not authenticated.");
      return;
    }

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      productId: product.id,
    };

    try {
      // Call the API to add the item to the cart
      const response = await addItemToCart({ productId: product.id }, token);

      if (typeof response === 'object' && response !== null && 'id' in response) {
        // Dispatch Redux action to update the cart state
        dispatch(addToCart({ ...cartItem, id: response.id as number })); // Ensure ID exists in the response
        showNotification();
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 3000);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageUrl ?? '',
        })
      );
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border rounded-lg shadow-lg p-6 bg-white hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img
        className="w-full h-48 object-contain rounded-md mb-4 border-b pb-4"
        src={product.imageUrl}
        alt={product.name}
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.category}</p>
      <p className="text-xl font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <div
        onClick={toggleWishlist}
        className={`absolute top-4 right-4 cursor-pointer text-3xl z-10 transition duration-300 ${
          isInWishlist ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        <FaHeart />
      </div>
      {notification && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md shadow-md animate-bounce">
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
