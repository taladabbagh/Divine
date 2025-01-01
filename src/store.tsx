import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/productReducer';
import cartReducer from './redux/cartReducer';
import wishlistReducer from './redux/wishlistReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
