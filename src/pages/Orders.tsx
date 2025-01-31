import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
import { OrderResponse, Product } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { fetchProductById } from "../api/productApi";

const Orders: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("You must be logged in to view orders.");
        setLoading(false);
        return;
      }

      try {
        const data = await getOrders(token);
        setOrders(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details: Product[] = [];
      for (const order of orders) {
        for (const item of order.orderItems) {
          try {
            const product = await fetchProductById(item.productId);
            details.push(product);
          } catch (error) {
            console.error(`Error fetching product details for product ID ${item.productId}:`, error);
          }
        }
      }
      setProductDetails(details);
    };

    if (orders.length > 0) {
      fetchProductDetails();
    }
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Your Orders</h1>
      {loading ? (
        <p className="text-center text-gray-700">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-700">No orders found.</p>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">
          {orders.map((order) => {
            const total = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-600 mb-4">Status: <span className="font-bold text-blue-600">{order.status}</span></p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Items:</h3>
                <ul className="space-y-4">
                  {order.orderItems.map((item) => {
                    const product = productDetails.find((prod) => prod.id === item.productId);
                    return (
                      <li key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={product?.imageUrl || 'https://via.placeholder.com/150'}
                          alt={product?.name || 'Product Image'}
                          className="w-16 h-16 object-contain rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{product?.name || 'Unknown Product'}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-right text-lg font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      )}
      <button
        className="block mx-auto mt-8 bg-teal text-white px-8 py-3 rounded-lg hover:bg-teal-dark transition duration-300"
        onClick={() => navigate("/products")}
      >
        Back to Products
      </button>
    </div>
  );
};

export default Orders;