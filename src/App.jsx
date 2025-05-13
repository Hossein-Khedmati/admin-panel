import React from "react";
import RegisterPage from "./pages/RegisterPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./features/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" rtl autoClose={3000} />
    </div>
  );
}

export default App;
