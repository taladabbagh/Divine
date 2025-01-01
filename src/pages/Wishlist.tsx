import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Wishlist: React.FC = () => {
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id} className="border p-4 mb-2">
              <h2>{item.title}</h2>
              <img className="w-32 h-32 object-contain mb-4" src={item.image} alt={item.title} />
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
