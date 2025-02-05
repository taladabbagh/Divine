export interface CartItem {
  id: number;
  productId:number;
  quantity: number;
  price: number;
  
}
export interface CartItemWithDetails extends CartItem {
  name?: string;
  imageUrl?: string;
  stockQuantity?: number;
}
export interface CartResponse {
  id: number;
  userId:number;
  cartItems:CartItem[];
}
export interface OrderItem {
  id: number;
  orderId: number
  productId:number;
  quantity: number;
  price: number;
  
}
export interface OrderResponse {
  id: number;
  status:string;
  orderDate: string;
  userId:number;
  orderItems:OrderItem[];
}
export interface WishlistItem {
  id: number;
  productId:number;  
}
export interface WishlistResponse {
  id: number;
  userId:number;
  wishItems:WishlistItem[];
}
export interface WishlistItemWithDetails extends WishlistItem {
  name?: string;
  imageUrl?: string;
  price?:number
}export interface FormValues {
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
  gender?: string; 
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
  quantity?: number; 
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
