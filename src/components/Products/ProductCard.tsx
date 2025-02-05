import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "../AddToCartBtn";
import AddToWishlistButton from "../AddToWishlistBtn";
import { Product } from "../../types/types";
import { RootState } from "../../store";

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
      className="relative flex flex-col border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer w-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px]"
    >
      <div className="absolute top-4 right-4 z-20">
        <AddToWishlistButton
          product={product}
          isInWishlist={isInWishlist}
          setIsInWishlist={setIsInWishlist}
        />
      </div>

      {/* Product Image */}
      <div className="flex justify-center items-center w-full h-40 sm:h-48 md:h-56">
        <img
          className="w-full h-full object-contain rounded-md"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </p>
        <div className="mt-4 flex flex-row justify-between">
          <p className="text-xl font-bold text-green-700">${product.price?.toFixed(2)}</p>
          <div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
