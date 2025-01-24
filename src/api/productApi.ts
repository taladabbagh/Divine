import axios from 'axios';

export interface ProductDTO {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  subCategoryId: number;
  imageUrl?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all products
export const fetchAllProducts = async (): Promise<ProductDTO[]> => {
  try {
    const response = await api.get<ProductDTO[]>('');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch product by ID
export const fetchProductById = async (id: number): Promise<ProductDTO> => {
  try {
    const response = await api.get<ProductDTO>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Fetch products by subcategory
export const fetchProductsBySubCategory = async (subCategoryId: number): Promise<ProductDTO[]> => {
  try {
    const response = await api.get<ProductDTO[]>(`/subcategory/${subCategoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    throw error;
  }
};

