import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartBtn";
import AddToWishlistButton from "./AddToWishlistBtn";
import { Product } from "../types/types";
import { RootState } from "../store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const wishItems = useSelector((state: RootState) => state.wishlist.wishItems);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishItems.some((item) => item.productId === product.id));
  }, [wishItems, product.id]);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border rounded-lg shadow-lg p-6 bg-white hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img
        className="w-full h-48 object-contain rounded-md mb-4 border-b pb-4"
        src={product.imageUrl}
        alt={product.name}
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.category}</p>
      <p className="text-xl font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
      <div className="flex justify-between">

      <AddToCartButton product={product} />
      <AddToWishlistButton
        product={product}
        isInWishlist={isInWishlist}
        setIsInWishlist={setIsInWishlist}
      />
      </div>
    </div>
  );
};

export default ProductCard;
