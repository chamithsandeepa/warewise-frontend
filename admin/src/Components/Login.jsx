// src/Components/Login.jsx
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        { email, password }
      );

      const user = response.data;

      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
        toast.success("Login successful!");
        onLogin(); // Notify parent about successful login
        navigate("/add"); // Navigate to dashboard
      } else {
        toast.error("Access denied. Not an admin.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div className="mb-3 min-w-72">
            <label
              className="text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <label
              className="text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
