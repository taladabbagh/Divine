import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistReducer";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../Context/useAuth";
import { addItemToWishlist, deleteFromWishlist } from "../api/wishlistApi";
import { WishlistItem, Product } from "../types/types";
import ErrorModal from "./ErrorModal";

interface AddToWishlistButtonProps {
  product: Product;
  isInWishlist: boolean; // Add this prop
  setIsInWishlist: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({
  product,
  isInWishlist,
  setIsInWishlist,
}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!token) {
      setError("You need to log in to add items to the wishlist.");
      setOpenErrorModal(true);
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

        // Make sure response is treated as having id property of type number
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

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
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

      {notification && (
        <div className="absolute bottom-4 right-4 bg-teal text-white px-3 py-1 rounded-md shadow-md animate-bounce">
          Item added to wishlist!
        </div>
      )}

      {error && openErrorModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <ErrorModal errorMessage={error} open={openErrorModal} onClose={handleCloseErrorModal} />
        </>
      )}
    </>
  );
};

export default AddToWishlistButton;
