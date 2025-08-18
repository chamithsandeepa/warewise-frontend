import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Sort products by date (newest first) and take first 10
      const sortedProducts = [...products].sort((a, b) => {
        // If date field exists, sort by it; otherwise use array order
        if (a.date && b.date) {
          return b.date - a.date; // Newest first
        }
        return 0;
      });
      setLatestProducts(sortedProducts.slice(0, 10));
    }
  }, [products]); // Added products as dependency

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals, carefully curated to bring you the
          latest trends and timeless classics. Each piece in our collection
          represents quality craftsmanship, contemporary style, and exceptional
          value. From everyday essentials to statement pieces, find your perfect
          match in our handpicked selection of premium products.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id} // Changed from item._id to item.id
            image={item.imageUrls} // Changed from item.image to item.imageUrls
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
