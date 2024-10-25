import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useCart } from "../../authContext/Cart";
import { useAuth } from "../../authContext/Auth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryCharge = 50; // You can change this value as needed
  const taxRate = 0.1; // 10% tax

  const removeFromCart = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item removed");
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    let total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    setTotalPrice(total);
  }, [cart]);

  // Calculate total cost including delivery and tax
  const calculateTotalCost = () => {
    const tax = totalPrice * taxRate;
    return totalPrice + tax + deliveryCharge;
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Layout title={"Cart Page"}>
      <div className="container my-5">
        <h3 className="text-center mb-4">
          {!auth.user ? (
            <>
              <span className="d-block mb-2">Please login to checkout</span>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  sessionStorage.setItem("redirectPath", pathname);
                  navigate("/login");
                }}
              >
                Login
              </button>
            </>
          ) : (
            "Welcome back! Ready to checkout?"
          )}
        </h3>

        {/* Billing Summary Section */}
        {cart.length > 0 && (
          <div className="billing-card p-4 shadow-lg rounded mt-2">
            <h4 className="mb-4 text-uppercase font-weight-bold">
              Billing Summary
            </h4>
            <div className="billing-details">
              <div className="billing-row">
                <span>Subtotal:</span>
                <span className="text-success">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="billing-row">
                <span>Delivery Charge:</span>
                <span className="text-warning">
                  ₹{deliveryCharge.toFixed(2)}
                </span>
              </div>
              <div className="billing-row">
                <span>Tax (10%):</span>
                <span className="text-warning">
                  ₹{(totalPrice * taxRate).toFixed(2)}
                </span>
              </div>
            </div>
            <hr className="my-3" />
            <div className="billing-total">
              <h5>Total:</h5>
              <h5 className="text-primary">
                ₹{calculateTotalCost().toFixed(2)}
              </h5>
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-primary btn-lg"
                disabled={auth?.user ? false : true}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Cart Items Section */}
        <div className="row mt-4">
          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  className="card m-3 shadow-lg border-light rounded"
                  style={{ width: "20rem" }}
                  key={item._id}
                >
                  <img
                    style={{ height: "250px", objectFit: "contain" }}
                    src={`${
                      import.meta.env.VITE_APP
                    }/api/v1/product/get-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <h5 className="text-success">₹{item.price}</h5>
                    <p className="card-text">
                      {item.description.length > 30
                        ? item.description.substr(0, 30) + "..."
                        : item.description}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h5>Your cart is empty.</h5>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
