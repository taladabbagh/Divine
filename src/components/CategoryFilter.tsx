import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/categoryApi";
import { Category } from "../types/types";

interface CategoryFilterProps {
  selectedCategory: string | number; // Allow for both string and numeric values
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]); // Use Category type directly

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const response: Category[] = await fetchCategories();
        setCategories(response); // Set the entire category object for more flexibility
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAndSetCategories();
  }, []);

  return (
    <select
      value={String(selectedCategory)} // Ensure the value is a string
      onChange={handleCategoryChange}
      className="mb-4 p-2 border border-gray-300 rounded mr-3"
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
