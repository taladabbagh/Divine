export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
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
  