// src/Context/ShopContext.jsx
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const navigate = useNavigate();

  // ======================
  // Load cart from backend
  // ======================
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (user && user.id) {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/v1/users/${user.id}`
          );
          const updatedUser = res.data;
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setCartItems(updatedUser.cartData || {});
        } catch (error) {
          console.error("Error loading cart from backend:", error);
        } finally {
          setIsCartLoaded(true);
        }
      } else {
        setIsCartLoaded(true);
      }
    };
    loadCartFromBackend();
  }, [user?.id]);

  // ======================
  // Add to cart
  // ======================
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);
  };

  // ======================
  // Update quantity / remove
  // ======================
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (quantity === 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
      setCartItems(cartData);
    }
  };

  // ======================
  // Clear cart completely (frontend + backend)
  // ======================
  const clearCart = async () => {
    setCartItems({});
    if (user?.id) {
      try {
        await axios.post(
          `http://localhost:8080/api/v1/users/updateCart`,
          {},
          { params: { userId: user.id } }
        );
      } catch (err) {
        console.error("Failed to clear cart on backend:", err);
      }
    }
  };

  // ======================
  // Calculate total amount
  // ======================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      let product = products.find((p) => p.id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        totalAmount += product.price * cartItems[productId][size];
      }
    }
    return totalAmount;
  };

  // ======================
  // Calculate cart count
  // ======================
  const getCartCount = () => {
    let count = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    return count;
  };

  // ======================
  // Sync cart to backend
  // ======================
  useEffect(() => {
    const syncCart = async () => {
      if (!user || !user.id || !isCartLoaded) return;
      try {
        await axios.post(
          `http://localhost:8080/api/v1/users/updateCart`,
          cartItems,
          { params: { userId: user.id } }
        );
      } catch (err) {
        console.error("Error syncing cart to backend:", err);
      }
    };

    syncCart();
  }, [cartItems, user, isCartLoaded]);

  // ======================
  // Load products
  // ======================
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
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
    clearCart, // ✅ expose clearCart
    navigate,
    backendUrl,
    user,
    setUser,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
