import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer'; // to write immutable updates in a mutable style.
// Immer ensures that the original state remains unchanged by creating a copy of it.
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => 
      produce(state, draft => {
        draft.products = action.payload;
      }),
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
