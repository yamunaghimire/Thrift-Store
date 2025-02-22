import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders"); // Adjust the API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Management</h2>

      <table className="min-w-full m-auto bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">Order ID</th>
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">Items</th>
            <th className="py-2 px-4 border-b text-left">Total Amount</th>
            <th className="py-2 px-4 border-b text-left">Payment Status</th>
            <th className="py-2 px-4 border-b text-left">Order Status</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{order._id}</td>
              <td className="py-2 px-4">
                {order.user && order.user.name ? order.user.name : "Unknown User"}
              </td>
              <td className="py-2 px-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index}>
                      {item.product && item.product.name
                        ? item.product.name
                        : "Unknown Product"}{" "}
                      (Rs {item.price})
                    </div>
                  ))
                ) : (
                  "No items"
                )}
              </td>
              <td className="py-2 px-4">Rs {order.totalAmount}</td>
              <td className="py-2 px-4">{order.paymentStatus}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">
                {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown Date"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
