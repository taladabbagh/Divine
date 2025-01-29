import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCart } from '../redux/cartReducer';
import { deleteFromCart, getCart, updateCart } from '../api/cartApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

interface CartItemWithDetails {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name?: string;
  imageUrl?: string;
}

const Cart: React.FC = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    if (token) {
      getCart(token)
        .then((response) => {
    console.log("cartItems:", response.cartItems);

          dispatch(setCart(response.cartItems || []));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  useEffect(() => {
    const fetchDetails = async () => {
      const itemsWithDetails = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const product = await fetchProductById(item.productId);
            return {
              ...item,
              name: product.name,
              imageUrl: product.imageUrl,
              quantity: product.quantity, // Fetch product quantity from the API
            };
          } catch (error) {
            console.error(`Error fetching product details for product ID ${item.productId}:`, error);
            return item;
          }
        })
      );
      setCartItemsWithDetails(itemsWithDetails);
    };

    if (cartItems.length > 0) {
      fetchDetails();
    }
  }, [cartItems]);

  const total = cartItemsWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = async (item: CartItemWithDetails, newQuantity: number) => {
    if (!token) return;

    try {
      const updatedItem = { ...item, quantity: newQuantity };
      await updateCart(token, updatedItem);
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      dispatch(setCart(updatedCartItems));
    } catch (error) {
      console.error(`Error updating quantity for product ID ${item.productId}:`, error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!token) return;

    try {
      await deleteFromCart(token, productId);
      const updatedCartItems = cartItems.filter(item => item.productId !== productId);
      dispatch(setCart(updatedCartItems));
      const updatedCartItemsWithDetails = cartItemsWithDetails.filter(item => item.productId !== productId);
      setCartItemsWithDetails(updatedCartItemsWithDetails);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-charcoal font-bold mb-4">Shopping Cart</h1>
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
      ) : cartItemsWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItemsWithDetails.map((item) => (
            <div className="border p-4 mb-2 flex items-center justify-between relative" key={item.id}>
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.name || 'Product Image'}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="font-bold">{item.name || 'Unknown Product'}</h2>
                  <select
                    className="border rounded px-2 py-1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  >
                    {[...Array(item.quantity < 10 ? item.quantity : 10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
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
          <h3 className="text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </h3>
          <Link to={'/checkout'}>
            <button className="bg-teal text-white px-4 py-2 mt-4 rounded hover:bg-green-600">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
  
    
};

export default Cart;
