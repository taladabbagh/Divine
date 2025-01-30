import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/categoryApi";
import { Category } from "../types/types";

interface CategoryFilterProps {
  selectedCategory: string | number;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const response: Category[] = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAndSetCategories();
  }, []);

  return (
    <select
      value={String(selectedCategory)}
      onChange={handleCategoryChange}
      className="mb-4 px-4 py-2 w-48 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    >
      <option value="All">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
