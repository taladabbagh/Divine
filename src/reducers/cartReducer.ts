import { CartState, CartActions } from '../types/types';

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default cartReducer;
