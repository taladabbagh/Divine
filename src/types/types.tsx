export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  image: string;
}

export interface CartItem extends Product {
  id: number;
  title: string;
  price: number;
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
