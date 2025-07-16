import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";

const Orders = () => {
  const { user, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!user || !user.id) {
        throw new Error("User not logged in");
      }

      const res = await axios.get(
        `http://localhost:8080/api/v1/orders/user/${user.id}`
      );

      // Sort by timestamp (newest first)
      const sortedOrders = res.data.sort((a, b) => b.timestamp - a.timestamp);
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error loading order data:", error);
      alert("Failed to load your orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      ) : (
        <div className="space-y-10 mt-8">
          {orders.map((order, orderIndex) => (
            <div key={order._id || orderIndex}>
              <p className="text-gray-600 mb-2 text-sm">
                <strong>Order Date:</strong>{" "}
                {new Date(order.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-start gap-6 text-sm">
                      <img
                        className="w-16 sm:w-20 object-cover"
                        src={
                          item.product?.imageUrls?.[0] ||
                          "https://via.placeholder.com/80?text=No+Image"
                        }
                        alt={item.product?.name || "Product"}
                      />
                      <div>
                        <p className="sm:text-base font-medium">
                          {item.product?.name || "Unnamed Product"}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {item.product?.price?.toFixed(2) || "0.00"}
                          </p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          Payment: {order.paymentMethod?.toUpperCase() || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-between">
                      <div className="flex items-center gap-2">
                        <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                        <p className="text-sm md:text-base">Ready to ship</p>
                      </div>
                      <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
