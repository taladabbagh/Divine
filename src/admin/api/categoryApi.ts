import axios from 'axios';
import { Category, Subcategory } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

export const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
  try {
    const response = await api.post<Category>('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, categoryData: Omit<Category, 'id'>): Promise<Category> => {
  try {
    const response = await api.put<Category>(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const fetchSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const response = await api.get<Subcategory[]>('/subcategories');
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

export const fetchSubcategoriesByCategoryId = async (categoryId: number): Promise<Subcategory[]> => {
  try {
    const response = await api.get<Subcategory[]>(`/subcategories/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories by category ID:', error);
    throw error;
  }
};

export const createSubcategory = async (subcategoryData: Omit<Subcategory, 'id'>): Promise<Subcategory> => {
  try {
    const response = await api.post<Subcategory>('/subcategories', subcategoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw error;
  }
};
