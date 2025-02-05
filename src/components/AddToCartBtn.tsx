import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { addItemToCart } from "../api/cartApi";
import { useAuth } from "../Context/useAuth";
import { CartItem, Product } from "../types/types";
import { ModalContext } from "../Context/ModalContext";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [notification, setNotification] = useState(false);
  const { openModal } = useContext(ModalContext);


  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      openModal("You need to log in first to add products to your cart.");
      return;
    }

    const showNotification = () => {
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    };
  

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      productId: product.id,
    };

    try {
      const response = await addItemToCart({ productId: product.id }, token);

      if (response && typeof response === "object" && "id" in response) {
        dispatch(addToCart({ ...cartItem, id: response.id as number }));
        showNotification();

      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };


  return (
    <>
      <button
        className="bg-gold-dark text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray transition duration-200"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {notification && (
        <div className="absolute bottom-4 left-4 bg-teal text-white px-3 py-1 rounded-md shadow-md animate-pulse ">
          Item added to cart!
        </div>
      )}

    </>
  );
};

export default AddToCartButton;