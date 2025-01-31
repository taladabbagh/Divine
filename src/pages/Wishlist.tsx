// Wishlist.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setWishlist } from '../redux/wishlistReducer';
import { deleteFromWishlist, getWishlist } from '../api/wishlistApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import LoginButton from '../components/LoginBtn';
import WishlistItem from '../components/Wishlist/WishlistItem';
import WishlistSkeleton from '../components/Wishlist/WishlistSkeleton';
import { WishlistItemWithDetails } from '../types/types';

const Wishlist: React.FC = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const [wishItemsWithDetails, setWishlistItemsWithDetails] = useState<WishlistItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const wishItems = useSelector((state: RootState) => state.wishlist.wishItems);

  useEffect(() => {
    if (token) {
      getWishlist(token)
        .then((response) => {
          console.log('API Response:', response);
          console.log('wishItems:', response.wishItems);
          dispatch(setWishlist(response.wishItems || []));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (wishItems.length > 0) {
      const fetchDetails = async () => {
        const itemsWithDetails = await Promise.all(
          wishItems.map(async (item) => {
            try {
              const product = await fetchProductById(item.productId);
              return {
                ...item,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
              };
            } catch (error) {
              console.error(`Error fetching product details for product ID ${item.productId}:`, error);
              return item;
            }
          })
        );
        setWishlistItemsWithDetails(itemsWithDetails);
      };

      fetchDetails();
    }
  }, [wishItems]);

  const handleDelete = async (productId: number) => {
    if (!token) return;

    try {
      await deleteFromWishlist(token, productId);
      const updatedWishlistItems = wishItems.filter((item) => item.productId !== productId);
      dispatch(setWishlist(updatedWishlistItems));
      const updatedWishlistItemsWithDetails = wishItemsWithDetails.filter(
        (item) => item.productId !== productId
      );
      setWishlistItemsWithDetails(updatedWishlistItemsWithDetails);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  return (
    <div className="container min-h-[calc(100vh-5rem)] bg-gray-100 mx-auto p-4">
      <h1 className="text-3xl text-charcoal font-bold mb-6">Your Wishlist</h1>
      {loading ? (
        <WishlistSkeleton />
      ) : !token ? (
        <LoginButton />
      ) : wishItemsWithDetails.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div>
          {wishItemsWithDetails.map((item) => (
            <WishlistItem key={item.id} item={item} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;