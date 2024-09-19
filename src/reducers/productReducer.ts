import { ProductState, ProductActions } from "../types/types"

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActions): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
