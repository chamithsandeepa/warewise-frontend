import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";

export const currency = "$"

const App = () => {
  // Use state for login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    setIsAdminLoggedIn(!!adminData);
  }, []);

  const location = useLocation();

  // If not logged in and not on login page, redirect to login
  if (!isAdminLoggedIn && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {!isAdminLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setIsAdminLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar onLogout={() => setIsAdminLoggedIn(false)} />
          <hr />
          <div className="flex w-full bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<Navigate to="/add" replace />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
