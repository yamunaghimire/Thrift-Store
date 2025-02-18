import React, { useEffect, useState } from "react";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Orders List</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              {order.orderList.map((item, itemIndex) => (
                <tr key={itemIndex} className="text-center">
                  {itemIndex === 0 && (
                    <>
                      <td rowSpan={order.orderList.length} className="border border-gray-300 px-4 py-2">{order.user.name}</td>
                      <td rowSpan={order.orderList.length} className="border border-gray-300 px-4 py-2">{order.user.email}</td>
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                  {itemIndex === 0 && (
                    <td rowSpan={order.orderList.length} className="border border-gray-300 px-4 py-2">${order.totalPrice}</td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
