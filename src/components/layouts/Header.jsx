import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useAuth } from "../../authContext/Auth";
import { toast } from "react-toastify";
import { useCart } from "../../authContext/Cart";
import { useSearch } from "../../authContext/Search";
import axios from "axios";
import { Modal } from "antd";
import DialogModal from "../DialogModal";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const [value, setValue] = useSearch();
  const [open, setOpen] = useState(true);
  const [check, setCheck] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/search/${value.keywords}`
      );
      if (data?.success) {
        setValue({ ...value, results: data.results });
        navigate("/search");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("please type something");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    let time = 10000 * 6;
    setTimeout(() => {
      setCheck(!check);
    }, time);
  }, []);
  const handleLogout = () => {
    setShowLogoutModal(true);
    setTimeout(() => {
      // Perform logout after 2 seconds
      setAuth({ ...auth, user: null, token: "" });
      localStorage.removeItem("auth");
      setShowLogoutModal(false); // Hide the modal after logout
      toast.success("Logged out successfully");
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to={"/"}>
              <MdShoppingCart />
              One1Store
            </Link>

            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control ms-5 me-2"
                type="search"
                placeholder="search products"
                aria-label="Search"
                value={value.keywords}
                onChange={(e) =>
                  setValue({ ...value, keywords: e.target.value })
                }
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to={"/category"}>
                  Category
                </NavLink>
              </li>
              {auth.user ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ borderBottom: "none" }}
                    >
                      {auth.user.username}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li className="nav-item dropdown-item">
                        <NavLink
                          className="nav-link"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user/profile"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown-item">
                        <NavLink className="nav-link" onClick={handleLogout}>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  {check && window.location.pathname !== "/login" ? (
                    <Modal
                      open={open}
                      title="Please Login/Register"
                      onCancel={handleCancel}
                      onOk={() => navigate("/login")}
                    />
                  ) : null}
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to={"/cart"}>
                  <div className="d-flex align-items-center">
                    <MdShoppingCart style={{ fontSize: "1.5em" }} />
                    <span className="badge bg-primary ms-1">
                      {cart?.length || 0}
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {showLogoutModal && <DialogModal text="Logging you out" />}
      </nav>
    </>
  );
};

export default Header;
