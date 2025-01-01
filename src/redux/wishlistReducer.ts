import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image:string
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) =>
      produce(state, draft => {
        const existingItem = draft.items.find(item => item.id === action.payload.id);
        if (!existingItem) {
          draft.items.push(action.payload);
        }
      }),
    removeFromWishlist: (state, action: PayloadAction<number>) =>
      produce(state, draft => {
        draft.items = draft.items.filter(item => item.id !== action.payload);
      }),
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
