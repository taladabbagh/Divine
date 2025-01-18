import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Subcategory } from "../types/types";
import { fetchCategories } from "../api/categoryApi";

interface AddSubcategoryProps {
  onAddSubcategory: (subcategory: Subcategory) => void;
}

interface Category {
  id: number;
  name: string;
  gender?: string;  // Optional gender field
}

const AddSubcategory: React.FC<AddSubcategoryProps> = ({ onAddSubcategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesFromDb = await fetchCategories();
        setCategories(categoriesFromDb);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  const formikSubcategory = useFormik({
    initialValues: {
      name: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Subcategory name is required"),
      categoryId: Yup.string().required("Category selection is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newSubcategory: Subcategory = {
        id: Date.now(),
        name: values.name,
        categoryId: parseInt(values.categoryId, 10), 
      };
      onAddSubcategory(newSubcategory);
      resetForm();
    },
  });

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Add Subcategory</h3>
      <form onSubmit={formikSubcategory.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Subcategory Name</label>
          <input
            type="text"
            name="name"
            value={formikSubcategory.values.name}
            onChange={formikSubcategory.handleChange}
            onBlur={formikSubcategory.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formikSubcategory.touched.name && formikSubcategory.errors.name
                ? "border-red-500"
                : ""
            }`}
          />
          {formikSubcategory.touched.name && formikSubcategory.errors.name && (
            <p className="text-red-500 text-sm">{formikSubcategory.errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Select Category</label>
          <select
            name="categoryId"
            value={formikSubcategory.values.categoryId}
            onChange={formikSubcategory.handleChange}
            onBlur={formikSubcategory.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formikSubcategory.touched.categoryId &&
              formikSubcategory.errors.categoryId
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} {category.gender && `(${category.gender})`}
              </option>
            ))}
          </select>
          {formikSubcategory.touched.categoryId && formikSubcategory.errors.categoryId && (
            <p className="text-red-500 text-sm">{formikSubcategory.errors.categoryId}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          Add Subcategory
        </button>
      </form>
    </div>
  );
};

export default AddSubcategory;
