import axios from 'axios';
import { Category, Subcategory } from '../types/types';
import { ProductDTO } from './productApi';

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
export const fetchProductsByCategory = async (categoryId: number): Promise<ProductDTO[]> => {
  try {
    const response = await api.get<ProductDTO[]>(`/categories/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};