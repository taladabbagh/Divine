export interface CartItem extends Product {
  quantity: number;
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

export interface CartState {
  items: CartItem[];
}

export interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: CartItem;
}

export interface RemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  payload: { id: number };
}

export interface SetProductsAction {
  type: 'SET_PRODUCTS';
  payload: Product[];
}

export type CartActions = AddToCartAction | RemoveFromCartAction;
export type ProductActions = SetProductsAction;

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
  category: string;
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  subcategory: string;
  imageUrl?: string;
}
