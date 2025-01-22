import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { CartItem, CartResponse } from '../types/types';

const initialState: CartResponse = {
  id: 0, 
  userId: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) =>
      produce(state, (draft) => {
        const existingItem = draft.cartItems.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          draft.cartItems.push(action.payload);
        }
      }),
    updateCartItem: (state, action: PayloadAction<CartItem>) =>
      produce(state, (draft) => {
        const index = draft.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          draft.cartItems[index] = { ...draft.cartItems[index], ...action.payload };
        }
      }),
  },
});

export const { setCart, addToCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
