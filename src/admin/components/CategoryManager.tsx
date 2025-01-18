import React, { useState } from "react";
import AddCategory from "./Category";
import AddSubcategory from "./SubCategory";
import { createCategory, createSubcategory } from "../api/categoryApi";
interface Category {
  id: number;
  name: string;
  gender?: string;
}

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

 const handleAddCategory = async (category: Category) => {
  try {
    const createdCategory = await createCategory({
      name: category.name,
      gender: category.gender,
    });
    setCategories((prev) => [...prev, createdCategory]);
  } catch (error) {
    console.error('Error adding category:', error);
  }
};

  const handleAddSubcategory = async (subcategory: Subcategory) => {
    try {
      const createdSubCategory = await createSubcategory({
        name: subcategory.name,
        categoryId: subcategory.categoryId,
      });
      setSubcategories((prev) => [...prev, createdSubCategory]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      {/* Add Category */}
      <AddCategory onAddCategory={handleAddCategory} />

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <ul className="mt-2">
          {categories.map((category) => (
            <li key={category.id}>
              {category.name} {category.gender && `(${category.gender})`}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Subcategory */}
      <AddSubcategory onAddSubcategory={handleAddSubcategory} />

      <div>
        <h3 className="text-lg font-semibold">Subcategories</h3>
        <ul className="mt-2">
          {subcategories.map((subcategory) => {
            const category = categories.find(
              (cat) => cat.id === subcategory.categoryId
            );
            return (
              <li key={subcategory.id}>
                {subcategory.name}{" "}
                {category ? ` (Category: ${category.name})` : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;
