import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategoriesByCategoryId } from "../../api/categoryApi";
import { Category, Subcategory } from "../../types/types";

interface ProductFilterProps {
  selectedCategory: string | number;
  selectedSubcategory: string | number;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubcategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  selectedSubcategory,
  handleCategoryChange,
  handleSubcategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAndSetCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchAndSetSubcategories = async () => {
      if (selectedCategory && selectedCategory !== "All") {
        try {
          const response = await fetchSubcategoriesByCategoryId(Number(selectedCategory));
          setSubcategories(response);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubcategories([]);
        }
      } else {
        setSubcategories([]);
      }
    };

    fetchAndSetSubcategories();
  }, [selectedCategory]);

  return (
    <div className="flex space-x-4">
      {/* Category Dropdown */}
      <select
        value={String(selectedCategory)}
        onChange={handleCategoryChange}
        className="mb-4 px-4 py-2 w-48 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} {category.gender && `(${category.gender})`}
          </option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      <select
        value={String(selectedSubcategory)}
        onChange={handleSubcategoryChange}
        className="mb-4 px-4 py-2 w-48 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        disabled={!selectedCategory || selectedCategory === "All"}
      >
        <option value="All">All Subcategories</option>
        {subcategories.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;