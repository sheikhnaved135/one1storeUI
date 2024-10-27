import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext/Auth.jsx";
import { CartProvider } from "./authContext/Cart.jsx";
import { SearchProvider } from "./authContext/Search.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
// https://ecommerce24.onrender.com
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CartProvider>
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
