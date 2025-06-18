import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Add safety checks for image array
  const imageUrl =
    image && Array.isArray(image) && image.length > 0 ? image[0] : "";

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="overflow-hidden">
        {imageUrl ? (
          <img
            className="hover:scale-110 transition ease-in-out"
            src={imageUrl}
            alt={name || "Product"}
          />
        ) : (
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
