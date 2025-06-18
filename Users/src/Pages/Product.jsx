import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item.id === productId); // Changed from item._id to item.id
    if (foundProduct) {
      setProductData(foundProduct);
      // Set first image from imageUrls array with safety check
      if (foundProduct.imageUrls && foundProduct.imageUrls.length > 0) {
        setImage(foundProduct.imageUrls[0]);
      }
    } else {
      setProductData(null);
      setImage("");
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.imageUrls && productData.imageUrls.length > 0 ? (
              productData.imageUrls.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                    image === item ? "border-2 border-orange-500" : ""
                  }`}
                  src={item}
                  alt={`${productData.name} view ${index + 1}`}
                />
              ))
            ) : (
              <div className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 bg-gray-200 flex items-center justify-center h-20">
                <span className="text-gray-400 text-xs">No Images</span>
              </div>
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            {image ? (
              <img
                className="w-full h-auto"
                src={image}
                alt={productData.name}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData.id, size)} // Changed from productData._id to productData.id
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400"
            disabled={
              !size && productData.sizes && productData.sizes.length > 0
            }
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            {productData.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dicta maiores neque voluptatem modi tempora qui voluptatum ea praesentium, voluptatibus vero dignissimos, dolorem cumque magnam reprehenderit, ducimus enim aperiam totam!"}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
            ducimus facere ullam sed molestias laboriosam iure, itaque at non
            libero voluptate magnam a doloremque provident quae soluta quaerat?
            Voluptatem, sit.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <p className="text-gray-500 mb-4">
          {products && products.length === 0
            ? "Loading product..."
            : "Product not found"}
        </p>
        {products && products.length > 0 && (
          <button
            onClick={() => window.history.back()}
            className="bg-black text-white px-6 py-2 text-sm"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
