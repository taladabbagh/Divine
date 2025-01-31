import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategoriesByCategoryId } from "../../api/categoryApi";
import { Category, Subcategory } from "../../types/types";

interface ProductFilterProps {
  selectedCategory: string | number;
  selectedSubcategory: string | number;
  selectedGender: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubcategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  selectedSubcategory,
  selectedGender,
  handleCategoryChange,
  handleSubcategoryChange,
  handleGenderChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

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

  useEffect(() => {
    const fetchAndSetSubcategories = async () => {
      if (selectedCategory && selectedCategory !== "All") {
        try {
          const response: Subcategory[] = await fetchSubcategoriesByCategoryId(Number(selectedCategory));
          setSubcategories(response);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      } else {
        setSubcategories([]);
      }
    };

    fetchAndSetSubcategories();
  }, [selectedCategory]);

  return (
    <div className="flex space-x-4">
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

      <select
        value={selectedGender}
        onChange={handleGenderChange}
        className="mb-4 px-4 py-2 w-48 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        <option value="All">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Unisex">Unisex</option>
      </select>
    </div>
  );
};

export default ProductFilter;