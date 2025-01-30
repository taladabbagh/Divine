import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../api/productApi';
import { fetchProductsByCategory } from '../api/categoryApi';
import { ProductDTO } from '../api/productApi';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '@mui/material';
import PaginationComponent from '../components/Pagination';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        let response: ProductDTO[];
        if (selectedCategory === 'All') {
          response = await fetchAllProducts();
        } else {
          response = await fetchProductsByCategory(selectedCategory);
        }
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value === 'All' ? 'All' : parseInt(value, 10));
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'priceAsc') return a.price - b.price;
    if (sortOrder === 'priceDesc') return b.price - a.price;
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination logic
  const paginatedProducts = sortedFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedFilteredProducts.length / itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-semibold text-gray-800">Products</h1>
      </div>

      <div className="flex justify-between items-center mb-3 space-x-4">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="flex  gap-2 justify-end">
        <CategoryFilter selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
        <SortOptions sortOrder={sortOrder} handleSort={handleSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={300}
                animation="wave"
                className="rounded-lg shadow-md"
              />
            ))
          : paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
