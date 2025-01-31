// Cart.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCart } from '../redux/cartReducer';
import { deleteFromCart, getCart, updateCart } from '../api/cartApi';
import { fetchProductById } from '../api/productApi';
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginBtn';
import CartItems from '../components/Cart/CartItem';
import CartSkeleton from '../components/Cart/CartSkeleton';
import CartTotal from '../components/Cart/CartTotal';
import { CartItemWithDetails, CartItem } from '../types/types'

const Cart: React.FC = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const navigate = useNavigate();

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
        cartItems.map(async (item: CartItem) => {
          try {
            const product = await fetchProductById(item.productId);
            return {
              ...item,
              name: product.name,
              imageUrl: product.imageUrl,
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
    if (!token) return <LoginButton />;

    try {
      const updatedItem = { ...item, quantity: newQuantity };
      await updateCart(token, updatedItem);
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      dispatch(setCart(updatedCartItems));
    } catch (error) {
      console.error(`Error updating quantity for cart item ID ${item.id}:`, error);
    }
  };

  const handleDelete = async (cartItemId: number) => {
    if (!token) return <LoginButton />;

    try {
      await deleteFromCart(token, cartItemId);
      const updatedCartItems = cartItems.filter(item => item.id !== cartItemId);
      dispatch(setCart(updatedCartItems));
      const updatedCartItemsWithDetails = cartItemsWithDetails.filter(item => item.id !== cartItemId);
      setCartItemsWithDetails(updatedCartItemsWithDetails);
    } catch (error) {
      console.error(`Error deleting cart item with ID ${cartItemId}:`, error);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container min-h-[calc(100vh-5rem)] bg-gray-100 mx-auto p-4">
      <h1 className="text-4xl text-charcoal font-bold mb-6">Shopping Cart</h1>
      {loading ? (
        <CartSkeleton />
      ) : !token ? (
        <LoginButton />
      ) : cartItemsWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItemsWithDetails.map((item) => (
            <CartItems
              key={item.id}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleDelete={handleDelete}
              handleProductClick={handleProductClick}
            />
          ))}
          <CartTotal total={total} />
        </div>
      )}
    </div>
  );
};

export default Cart;