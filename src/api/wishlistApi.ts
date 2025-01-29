import axios from 'axios';
import { WishlistResponse } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:8080/wish',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWishlist = async (
  token: string
) => {
  try {
    const response = await api.get<WishlistResponse>(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success with wishlist");
    console.log("response.data is ", response.data);
    console.log("response is ", response);

    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
};

export const addItemToWishlist = async (
  wishlistItem: { productId: number },
  token: string
) => {
  try {
    const response = await api.post(`/items`, wishlistItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("item added");
    return response.data;
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw error;
  }
};

export const deleteFromWishlist = async(
  token:string,
  productId: number
) =>{
  try{
      const response = await api.delete(`/items/${productId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        },
      });
      console.log("item deleted")
      return response.data;
  }catch(error){
console.log("error deleting product with id: ", productId)
    throw error;
  }
}
