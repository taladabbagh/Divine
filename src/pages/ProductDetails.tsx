import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchProductById,
  fetchSubcategoryIdByProductId,
  fetchProductsBySubCategory,
  ProductDTO,
} from '../api/productApi';
import AddToCartButton from '../components/AddToCartBtn';
import AddToWishlistButton from '../components/AddToWishlistBtn';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const wishItems = useSelector((state: RootState) => state.wishlist.wishItems);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductById(Number(id));
        setProduct(fetchedProduct);

        // Fetch the subcategory ID
        const subCategoryId = await fetchSubcategoryIdByProductId(fetchedProduct.id);
        
        // Fetch recommended products from the same subcategory
        const recommended = await fetchProductsBySubCategory(subCategoryId);
        
        // Filter out the current product
        setRecommendedProducts(recommended.filter(item => item.id !== fetchedProduct.id));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsInWishlist(wishItems.some(item => item.productId === product.id));
    }
  }, [product, wishItems]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center text-gray-600">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-6rem)] flex flex-col md:flex-row justify-start items-start py-12 px-6">
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-8 relative">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          {/* Product Image */}
          <div className="flex-1 mb-6 md:mb-0 md:w-1/2">
            <img
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 md:w-1/2 relative h-full flex flex-col">
            {/* Wishlist Button */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <AddToWishlistButton
                product={product}
                isInWishlist={isInWishlist}
                setIsInWishlist={setIsInWishlist}
              />
            </div>

            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            <p className="text-xl text-teal-600 font-semibold mb-8">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-auto">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">
                  Free shipping on orders over $50
                </p>
                <p className="text-sm text-gray-500">Return policy: 30-day returns</p>
              </div>

              <div className="flex justify-center">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
{recommendedProducts.length > 0 && (
  <div className="ml-8 w-full md:w-1/3">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Items</h2>
    <div className="space-y-4">
      {recommendedProducts.map((recommended) => (
        <div
          key={recommended.id}
          className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 flex items-center"
          onClick={() => navigate(`/products/${recommended.id}`)}
        >
          <img
            src={recommended.imageUrl}
            alt={recommended.name}
            className="w-24 h-24 object-contain rounded-md mr-4"
          />
          <div>
            <h3 className="text-lg font-medium">{recommended.name}</h3>
            <p className="text-teal-600 font-semibold">${recommended.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default ProductDetails;
