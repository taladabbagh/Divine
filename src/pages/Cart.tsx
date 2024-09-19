import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';  // RootState type from your store
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? 
        <p>Your cart is empty.</p>
      : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="border p-4 mb-2">
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h3>
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
