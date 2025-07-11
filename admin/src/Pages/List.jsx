import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currency } from "../App";

const List = () => {
  const [list, setList] = useState([]);

  // ✅ Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/list"
      );
      if (Array.isArray(response.data)) {
        setList(response.data);
        console.log("Product List:", response.data);
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch products");
    }
  };

  // ✅ Remove product by ID
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/products/remove/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.imageUrls?.[0]} alt="product" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item.id)} 
              className="text-right md:text-center cursor-pointer text-lg text-red-600"
              title="Delete Product"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
