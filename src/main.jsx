import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext/Auth.jsx";
import { CartProvider } from "./authContext/Cart.jsx";
import { SearchProvider } from "./authContext/Search.jsx";
// https://ecommerce24.onrender.com
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
