import { combineReducers } from 'redux';

// Example individual reducer imports
import cartReducer from './cartReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  // Add other reducers here
});

export default rootReducer;
