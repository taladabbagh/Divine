import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { WishlistItem, WishlistResponse } from "../types/types";

const initialState: WishlistResponse = {
  id: 0,
  userId: 0,
  wishItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishItems = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) =>
      produce(state, (draft) => {
        const existingItem = draft.wishItems.find(
          (item) => item.id === action.payload.id
        );
        if (!existingItem) {
          draft.wishItems.push(action.payload);
        }
      }),
    removeFromWishlist: (state, action: PayloadAction<number>) =>
      produce(state, (draft) => {
        draft.wishItems = draft.wishItems.filter(
          (item) => item.id !== action.payload
        );
      }),
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
