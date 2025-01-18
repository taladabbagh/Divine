import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Category } from "../types/types";
import { fetchSubcategoriesByCategoryId } from "../api/categoryApi";
import { createProduct } from "../api/productApi";

interface AddProductFormProps {
  categories: Category[];
}

const AddProductForm: React.FC<AddProductFormProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<{ id: number; name: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      subcategory: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .positive("Price must be positive")
        .required("Price is required"),
      quantity: Yup.number()
        .integer("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Subcategory is required"),
      description: Yup.string().required("Description is required"),
      imageUrl: Yup.string().url("Invalid URL"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const newProduct = {
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        subCategoryId: parseInt(values.subcategory, 10),
        imageUrl: values.imageUrl || "",
      };
      console.log(newProduct);
      try {
        const createdProduct = await createProduct(newProduct);
        console.log("Product created:", createdProduct);
        resetForm();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
  });

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const subcategoriesData = await fetchSubcategoriesByCategoryId(parseInt(selectedCategory, 10));
          setSubcategories(subcategoriesData);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubcategories([]);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    formik.setFieldValue("category", selectedCategoryId);
    setSelectedCategory(selectedCategoryId);
    formik.setFieldValue("subcategory", "");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.price && formik.errors.price ? "border-red-500" : ""
            }`}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.quantity && formik.errors.quantity ? "border-red-500" : ""
            }`}
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <p className="text-red-500 text-sm">{formik.errors.quantity}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={handleCategoryChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.category && formik.errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Subcategory</label>
          <select
            name="subcategory"
            value={formik.values.subcategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.subcategory && formik.errors.subcategory ? "border-red-500" : ""
            }`}
            disabled={!selectedCategory}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          {formik.touched.subcategory && formik.errors.subcategory && (
            <p className="text-red-500 text-sm">{formik.errors.subcategory}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.description && formik.errors.description ? "border-red-500" : ""
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.imageUrl && formik.errors.imageUrl ? "border-red-500" : ""
            }`}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <p className="text-red-500 text-sm">{formik.errors.imageUrl}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
