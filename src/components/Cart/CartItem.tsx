// components/CartItem.tsx
import React from 'react';
import { CartItemWithDetails } from '../../types/types';

interface CartItemProps {
  item: CartItemWithDetails;
  handleQuantityChange: (item: CartItemWithDetails, newQuantity: number) => void;
  handleDelete: (cartItemId: number) => void;
  handleProductClick: (productId: number) => void;
}

const CartItems: React.FC<CartItemProps> = ({ item, handleQuantityChange, handleDelete, handleProductClick }) => {
  return (
    <div className="border bg-white mb-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center justify-between relative hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center space-x-6">
          <div
            onClick={() => handleProductClick(item.productId)}
            className="flex items-center space-x-6 cursor-pointer"
          >
            <img
              src={item.imageUrl || 'https://via.placeholder.com/150'}
              alt={item.name || 'Product Image'}
              className="w-24 h-24 object-contain rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold text-charcoal hover:text-teal transition-colors">
                {item.name || 'Unknown Product'}
              </h2>
              <div onClick={(e) => e.stopPropagation()}>
                <select
                  className="border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-teal"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleDelete(item.id)}
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        X
      </button>
      <div className="mt-1 mr-4 sm:mt-0 sm:text-right">
        <p className="absolute bottom-2 right-4 mt-6 text-lg font-medium text-charcoal">
          Price: ${item.price}
        </p>
      </div>
    </div>
  );
};

export default CartItems;