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
    <div className="container min-h-[calc(100vh-5rem)] bg-gray-100 mx-auto p-4">
      <h1 className="text-4xl text-charcoal font-bold mb-6">Shopping Cart</h1>
      {loading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <Skeleton variant="rectangular" width={80} height={80} />
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
            <div className="border bg-white p-6 mb-4 rounded-lg shadow-lg flex items-center justify-between relative hover:shadow-xl transition-shadow" key={item.id}>
              <div className="flex items-center space-x-6">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.name || 'Product Image'}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name || 'Unknown Product'}</h2>
                  <select
                    className="border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  X
                </button>
                <p className="mt-4 text-lg font-medium text-gray-700">Price: ${item.price}</p>
              </div>  
            </div>
          ))}
          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Total: ${total.toFixed(2)}
          </h3>
          <Link to={'/checkout'}>
            <button className="bg-teal-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
