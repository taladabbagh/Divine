import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCart } from '../redux/cartReducer';
import { getCart } from '../api/cartApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItemsWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItemsWithDetails.map((item) => (
            <div key={item.id} className="border p-4 mb-2 flex">
              <img
                src={item.imageUrl || 'https://via.placeholder.com/150'}
                alt={item.name || 'Product Image'}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h2 className="font-bold">{item.name || 'Unknown Product'}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </h3>
          <Link to={'/checkout'}>
            <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
