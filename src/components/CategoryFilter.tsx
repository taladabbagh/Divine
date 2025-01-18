import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/categoryApi";
import { Category } from "../types/types";

const CategoryFilter: React.FC<{
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ selectedCategory, handleCategoryChange }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const response: Category[] = await fetchCategories(); 
        const categoryNames = response.map((category) => category.name); 
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAndSetCategories();
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="mb-4 p-2 border border-gray-300 rounded mr-3"
    >
      <option value="All">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
