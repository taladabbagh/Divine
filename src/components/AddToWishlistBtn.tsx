import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../Context/useAuth";
import { addItemToWishlist, deleteFromWishlist } from "../api/wishlistApi";
import { WishlistItem, Product } from "../types/types";
import { ModalContext } from "../Context/ModalContext";

interface AddToWishlistButtonProps {
  product: Product;
  isInWishlist: boolean;
  setIsInWishlist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({
  product,
  isInWishlist,
  setIsInWishlist,
}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { openModal } = useContext(ModalContext);
  const [notification, setNotification] = useState(false);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      openModal("You need to log in to add items to the wishlist.");
      return;
    }

    const wishlistItem: WishlistItem = {
      ...product,
      productId: product.id,
    };

    if (isInWishlist) {
      try {
        await deleteFromWishlist(token, product.id);
        dispatch(removeFromWishlist(product.id));
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
      }
    } else {
      try {
        const response = await addItemToWishlist({ productId: product.id }, token);
        dispatch(addToWishlist({ ...wishlistItem, id: (response as { id: number }).id }));
        showNotification();
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
      }
    }

    setIsInWishlist(!isInWishlist);
  };

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 3000);
  };

  return (
    <>
      <div
        onClick={handleToggleWishlist}
        className={`cursor-pointer text-3xl z-10 transition duration-300 ${
          isInWishlist ? "text-red-500" : "text-gray-500"
        }`}
      >
        <FaHeart />
      </div>

      {notification
      }
    </>
  );
};

export default AddToWishlistButton;
