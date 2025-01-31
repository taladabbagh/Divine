import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistItemWithDetails, Product } from '../../types/types'; // Import Product type
import AddToCartBtn from '../AddToCartBtn';

interface WishlistItemProps {
  item: WishlistItemWithDetails;
  handleDelete: (productId: number) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, handleDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${item.productId}`);
  };

  const product: Product = {
    id: item.productId,
    name: item.name || 'Unknown Product', // Provide a default value for name
    price: item.price || 0, // Provide a default value for price
    imageUrl: item.imageUrl || 'https://via.placeholder.com/150', // Provide a default image URL
  };

  return (
    <div
      className="border bg-white mb-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center justify-between relative hover:shadow-xl transition-shadow"
      onClick={handleCardClick}
    >
      <div className="p-6">
          <div className='flex items-center space-x-6 cursor-pointer'>
            <img
              src={item.imageUrl || 'https://via.placeholder.com/150'}
              alt={item.name || 'Product Image'}
              className="w-24 h-24  object-contain rounded-lg shadow-md"
            />
            <div>
              <h2 className="font-bold text-xl text-charcoal">{item.name || 'Unknown Product'}</h2>
              <p className="text-lg text-gray-600">${item.price?.toFixed(2)}</p>
            </div>
          </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.productId);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          X
        </button>
        <div className='absolute bottom-4 right-4 mt-6 '>
          <AddToCartBtn product={product}  />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;