import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const navigate = useNavigate();

  // Store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  // not reloading the page on form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
        console.log("User registered:", response.data);
        alert("Registration successful!");
        setCurrentState("Login");
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Check the console for details.");
      }
    } else if (currentState === "Login") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        console.log("Login successful:", response.data);
        alert("Login successful!");
        navigate("/"); // Redirect to homepage or dashboard

        // You can optionally store the user data in localStorage
        // localStorage.setItem("user", JSON.stringify(response.data));
        // Navigate to dashboard or homepage if needed
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.status === 401) {
          alert("Invalid email or password.");
        } else {
          alert("Login failed. Check the console for details.");
        }
      }
    }
  };
  

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
