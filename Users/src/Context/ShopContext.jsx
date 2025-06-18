import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "http://localhost:8080/api/v1/products/list";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Add to cart function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  // Get cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === items); // Changed from _id to id
      if (itemInfo) {
        // Add safety check
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.error("Error calculating cart amount:", error);
          }
        }
      }
    }
    return totalAmount;
  };

  // Get cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return totalCount;
  };

  // Update quantity of an item in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }
  };

  // Fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl);
      console.log("API Response:", response.data); // Debug log

      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        // In case the API returns data wrapped in a data property
        setProducts(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Unexpected response format from server.");
        setProducts([]); // Set empty array as fallback
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
      setProducts([]); // Set empty array as fallback
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
