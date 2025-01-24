import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCart } from '../redux/cartReducer';
import { deleteFromCart, getCart, updateCart } from '../api/cartApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';
// import { CartItem } from '../types/types';

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
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    if (token) {
      getCart(token)
        .then((response) => {
          console.log('Cart response:', response);
          dispatch(setCart(response.cartItems || []));
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
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
            };
          } catch (error) {
            console.error(`Error fetching product details for product ID ${item.productId}:`, error);
            return item; // Return the original item if fetching details fails
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
    if (!token) {
      console.log("User is not logged in to delete.");
      return;
    }
  
    try {
      // Call the delete API
      await deleteFromCart(token, productId);
      console.log(`Deleted product with ID: ${productId}`);
  
      // Update the Redux state
      const updatedCartItems = cartItems.filter(item => item.productId !== productId);
      dispatch(setCart(updatedCartItems));
  
      // Update the local state for UI
      const updatedCartItemsWithDetails = cartItemsWithDetails.filter(item => item.productId !== productId);
      setCartItemsWithDetails(updatedCartItemsWithDetails);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-charcoal font-bold mb-4">Shopping Cart</h1>
      {cartItemsWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItemsWithDetails.map((item) => (
            <div className='flex justify-between'>
              <div className='border p-4 mb-2 flex w-screen justify-between'>
                <div key={item.id} className="flex">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.name || 'Product Image'}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-bold">{item.name || 'Unknown Product'}</h2>
                    <select
                    className="border rounded px-2 py-1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                    <p>Price: ${item.price}</p>
                  </div>
                  </div>
                  <div className = "">
                    <button onClick={() => handleDelete(item.productId)} className="bg-red-500 text-white px-2 py-1 mt-0 rounded-full hover:bg-red-600 text-xs">
                        X
                    </button>
                  </div>
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
