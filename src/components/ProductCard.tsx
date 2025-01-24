import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistReducer';
import { FaHeart } from 'react-icons/fa';
import { Product, CartItem } from '../types/types';
import { addItemToCart } from '../api/cartApi';
import { useAuth } from '../Context/useAuth';
import ErrorModal from './ErrorModal';  // Import the ErrorModal component

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { token } = useAuth();
  const [error, setError] = useState<string | null>(null);  // Error state
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);  // Modal open state

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      // Show error modal if no token (user not logged in)
      setError("You need to log in first to add products to your cart.");
      setOpenErrorModal(true);
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

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false); // Close the error modal
  };

  return (
    <>
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
          className="bg-gold-dark text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray transition duration-200"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <div
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 cursor-pointer text-3xl z-10 transition duration-300 ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}
        >
          <FaHeart />
        </div>
        {notification && (
          <div className="absolute bottom-4 right-4 bg-teal text-white px-3 py-1 rounded-md shadow-md animate-bounce">
            Item added to cart!
          </div>
        )}
      </div>

      {/* Render the ErrorModal if openErrorModal is true */}
      {error && (
        <>
          {/* Full-page background blur (only when modal is open) */}
          {openErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          )}
          <ErrorModal
            errorMessage={error}
            open={openErrorModal}
            onClose={handleCloseErrorModal}
          />
        </>
      )}
    </>
  );
};

export default ProductCard;
