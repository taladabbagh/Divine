// components/CartTotal.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CartTotalProps {
  total: number;
}

const CartTotal: React.FC<CartTotalProps> = ({ total }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mt-6 text-charcoal">
        Total: ${total.toFixed(2)}
      </h3>
      <Link to={'/checkout'}>
        <button className="bg-teal text-white px-6 py-3 mt-4 rounded-lg hover:bg-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400">
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartTotal;