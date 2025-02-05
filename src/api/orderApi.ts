import axios from 'axios';
import { OrderResponse } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:8080/orders',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOrders = async (
  token: string
) => {
  try {
    const response = await api.get<OrderResponse>(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
};

export const createOrder = async (token: string) => {
  try {
    const response = await api.post(
      ``,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("order made");
    return response.data;
  } catch (error) {
    console.error('Error making order:', error);
    throw error;
  }
};

export const deleteOrder = async(
  token:string,
  orderId: number
) =>{
  try{
      const response = await api.delete(`/${orderId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        },
      });
      console.log(orderId);
      console.log("order deleted");
      // console.log()
      return response.data;
  }catch(error){
console.log("error deleting order with id: ", orderId)
    throw error;
  }
}
export const getOrderbyId = async (
    token: string,
    orderId: number
  ) => {
    try {
      const response = await api.get<OrderResponse>(`/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching order id:', error);
      throw error;
    }
  };