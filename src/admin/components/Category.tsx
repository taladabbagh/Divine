import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Category {
  id: number;
  name: string;
  gender?: string;
}

interface AddCategoryProps {
  onAddCategory: (category: Category) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAddCategory }) => {
  const formikCategory = useFormik({
    initialValues: {
      name: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      gender: Yup.string().optional(),
    }),
    onSubmit: (values, { resetForm }) => {
      const newCategory: Category = {
        id: Date.now(),
        name: values.name,
        gender: values.gender || undefined,
      };
      onAddCategory(newCategory);
      resetForm();
    },
  });

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Add Category</h3>
      <form onSubmit={formikCategory.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={formikCategory.values.name}
            onChange={formikCategory.handleChange}
            onBlur={formikCategory.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formikCategory.touched.name && formikCategory.errors.name
                ? "border-red-500"
                : ""
            }`}
          />
          {formikCategory.touched.name && formikCategory.errors.name && (
            <p className="text-red-500 text-sm">{formikCategory.errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Optional Gender</label>
          <input
            type="text"
            name="gender"
            value={formikCategory.values.gender}
            onChange={formikCategory.handleChange}
            onBlur={formikCategory.handleBlur}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
