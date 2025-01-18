import axios from 'axios';

interface ProductDTO {
  id?: number;
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

// Create a new product
export const createProduct = async (productData: ProductDTO): Promise<ProductDTO> => {
  try {
    const response = await api.post<ProductDTO>('', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: number, productData: ProductDTO): Promise<ProductDTO> => {
  try {
    const response = await api.put<ProductDTO>(`/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
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

// Upload product image
export const uploadProductImage = async (id: number, imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post<string>(`/${id}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};

