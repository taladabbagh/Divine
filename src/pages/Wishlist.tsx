import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setWishlist } from '../redux/wishlistReducer';
import { deleteFromWishlist, getWishlist } from '../api/wishlistApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import { Skeleton } from '@mui/material';

interface WishlistItemWithDetails {
  id: number;
  productId: number;
  price?: number;
  name?: string;
  imageUrl?: string;
}

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
    console.log("API Response:", response);
    console.log("wishItems:", response.wishItems);

    dispatch(setWishlist(response.wishItems || []));
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching wishlist items:", error);
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
      const updatedWishlistItems = wishItems.filter(item => item.productId !== productId);
      dispatch(setWishlist(updatedWishlistItems));
      const updatedWishlistItemsWithDetails = wishItemsWithDetails.filter(item => item.productId !== productId);
      setWishlistItemsWithDetails(updatedWishlistItemsWithDetails);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-charcoal font-bold mb-4">Shopping Wishlist</h1>
      {loading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <Skeleton variant="rectangular" width={64} height={64} />
              <div className="flex flex-col flex-1 ml-4">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
          ))}
        </div>
      ) : wishItemsWithDetails.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishItemsWithDetails.map((item) => (
            <div className="border p-4 mb-2 flex items-center justify-between relative" key={item.id}>
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.name || 'Product Image'}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="font-bold">{item.name || 'Unknown Product'}</h2>
                </div>
              </div>
              <div className="absolute top-2 right-4 flex flex-col items-end">
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 text-xs"
                >
                  X
                </button>
                <p className="mt-4 text-sm font-medium">Price: ${item.price}</p>
              </div>  
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
