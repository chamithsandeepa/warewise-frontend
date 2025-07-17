import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";
import { currency } from "../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders (for admin panel)
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/orders");
      const sortedOrders = res.data.sort((a, b) => b.timestamp - a.timestamp);
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to load orders. Please try again later.");
    }
  };

  // ✅ Status update handler
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(
        `http://localhost:8080/api/v1/orders/${orderId}/status?status=${newStatus}`
      );
      fetchAllOrders(); // Refresh after update
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.product?.name} x {item.quantity}{" "}
                    <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ", "}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.deliveryInfo.firstName +
                  " " +
                  order.deliveryInfo.lastName}
              </p>
              <div>
                <p>{order.deliveryInfo.street + ","}</p>
                <p>
                  {order.deliveryInfo.city +
                    ", " +
                    order.deliveryInfo.state +
                    ", " +
                    order.deliveryInfo.country +
                    ", " +
                    order.deliveryInfo.zipcode}
                </p>
              </div>
              <p>{order.deliveryInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="m-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.timestamp).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.totalAmount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order.id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
