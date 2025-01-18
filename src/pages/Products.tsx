import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../api/productApi';
import Button from '../components/Button';
import { ProductDTO } from '../api/productApi';
import { Product } from '../types/types'; 
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';
import ProductGrid from '../components/ProductGrid';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchAllProducts();
        
        // Map ProductDTO to Product type
        const mappedProducts = response.map((productDTO: ProductDTO): Product => ({
          id: productDTO.id ?? 0,
          name: productDTO.name,
          description: productDTO.description,
          price: productDTO.price,
          quantity: productDTO.quantity,
          category: 'Unknown', // You can map or fetch categories as needed
          subcategory: 'Unknown', // You can map or fetch subcategories as needed
          imageUrl: productDTO.imageUrl,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);  // Empty dependency array to only fetch once on mount

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  // Sort products based on user input
  const sortedFilteredProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'priceAsc') {
      return a.price - b.price;
    } else if (sortOrder === 'priceDesc') {
      return b.price - a.price;
    } else if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button text="Back" variant="back" className="mr-4" />
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <div className="flex justify-between items-center">
        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        
        {/* Category Filter */}
        <CategoryFilter selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
        
        {/* Sorting Options */}
        <SortOptions sortOrder={sortOrder} handleSort={handleSort} />
      </div>

      {/* Product Grid */}
      <ProductGrid products={sortedFilteredProducts} />
    </div>
  );
};

export default Products;
