import axios from 'axios';
import { CartItem, CartResponse } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:8080/cart',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCart = async (
  token: string
) => {
  try {
    const response = await api.get<CartResponse>(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success with cart");
    console.log("response.data is ", response.data);
    console.log("response is ", response);

    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addItemToCart = async (
  cartItem: { productId: number },
  token: string
) => {
  try {
    const response = await api.post(`/items`, cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("item added");
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const deleteFromCart = async(
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
export const updateCart = async(
  token:string,
  cartItem:CartItem
) =>{
  try{
      const response = await api.put(`/items`, cartItem, {
        headers:{
          Authorization: `Bearer ${token}`
        },
      });
      console.log("item deleted")
      return response.data;
  }catch(error){
console.log("error updating product : ", cartItem)
    throw error;
  }
}