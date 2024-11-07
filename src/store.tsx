import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/productReducer';
import cartReducer from './redux/cartReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});

export type RootState = ReturnType<typeof store.getState>; //infers the type of the state returned by store.getState()
export type AppDispatch = typeof store.dispatch;

export default store;
