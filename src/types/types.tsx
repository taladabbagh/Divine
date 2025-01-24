export interface CartItem {
  id: number;
  productId:number;
  quantity: number;
  price: number;
  
}
export interface CartResponse {
  id: number;
  userId:number;
  cartItems:CartItem[];
}
export interface FormValues {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
}

export interface ProductState {
  products: Product[];
}

export interface Category {
  id: number;
  name: string;
  gender?: string; // Optional field
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number; 
  subcategory?: string;
  category?: string;
  imageUrl?: string;
}

export type UserProfileToken = {
  email: string;
  token: string;
};

export type UserProfile = {
  email: string;
};
