import React, { useState, useEffect } from "react";
import AddProductForm from "../components/AddProductForm";
import CategoryManager from "../components/CategoryManager";
import ProductList from "../components/ProductList";
import {  Category } from "../types/types";
import { Product } from "../../types/types";
import { fetchCategories } from "../api/categoryApi";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <AddProductForm
      categories={categories}/>
      <CategoryManager />
      <ProductList products={products} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default AdminPage;
