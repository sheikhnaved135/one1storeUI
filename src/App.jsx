import "./App.css";
// import Layout from "./components/layouts/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";
// import Layout from "./components/layouts/Layout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import Private from "./routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminPrivate from "./routes/AdminPrivate";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import User from "./admin/User";
import Profile from "./user/Profile";
import Orders from "./user/Orders";
import Products from "./admin/Products";
import UpdateProduct from "./admin/UpdateProduct";
import CartPage from "./components/layouts/CartPage";
import SingleProduct from "./components/SingleProduct";
import Search from "./components/layouts/Search";
import CategoryPage from "./components/CategoryPage";
import CategoryProduct from "./pages/CategoryProduct";
import ScrollToTop from "./components/ScrollToTop";
import UnderProgress from "./components/UnderProgress";
import PageNotFound from "./components/PageNotFound";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/payment" element={<UnderProgress />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>{" "}
        <Route path="/dashboard" element={<AdminPrivate />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
