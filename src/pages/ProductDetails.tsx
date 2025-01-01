import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.product.products.find(p => p.id === Number(id))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-md">
      <img className="w-full h-64 object-contain mb-4" src={product.image} alt={product.title} />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl text-green-700 font-semibold mb-4">${product.price.toFixed(2)}</p>
      <button className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
