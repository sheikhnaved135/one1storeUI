import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useCart } from "../../authContext/Cart";
import { useAuth } from "../../authContext/Auth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { ShimmerContentBlock } from "shimmer-effects-react";
import { loadStripe } from "@stripe/stripe-js";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const deliveryCharge = 50;
  const taxRate = 0.1;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [cart]);
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id) => {
    setLoading(true);
    try {
      setTimeout(() => {
        let updatedCart = cart.filter((item) => item._id !== id);
        updateCart(updatedCart);
        toast.success("Item removed");
        window.scrollTo(0, 0);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const adjustQuantity = (id, increment = true) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const newCount = increment
          ? item.count + 1
          : Math.max(item.count - 1, 1);
        return { ...item, count: newCount };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    setTotalPrice(total);
  }, [cart]);

  const calculateTotalCost = () => {
    const tax = totalPrice * taxRate;
    return totalPrice + tax + deliveryCharge;
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Pms34P2G3iZClWQaHxXnyeMEm9lQyH4mMn6VppoIJlAb9Q9hjL2zIEzvUcyEA7lVkZAQxOgS0xeDCDO9EUAQvfv00n0r7sJiP"
    );

    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`http://localhost:8080/payment/checkout`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session._id,
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout title={"Cart Page"}>
      {loading ? (
        <>
          <ShimmerContentBlock
            mode="dark"
            rounded={1}
            items={1}
            itemsGap={20}
            thumbnailHeight={300}
            thumbnailWidth={300}
            thumbnailRounded={1}
            contentDetailsPosition="start"
            contentDetailTextLines={8}
          />
        </>
      ) : (
        <>
          <div className="container my-5">
            <div className="row">
              {/* Left Side - Cart Items Section */}
              <div className="col-lg-8 col-md-12">
                <h3 className="text-center mb-4">
                  {!auth.user ? (
                    <>
                      <span className="d-block mb-2">
                        Please login to checkout
                      </span>
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
                <div className="d-flex flex-wrap justify-content-center">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        className="card m-3 shadow-lg border-light rounded"
                        style={{ width: "18rem" }}
                        key={item._id}
                      >
                        <img
                          style={{ height: "200px", objectFit: "contain" }}
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
                          <div className="quantity-controls d-flex justify-content-center align-items-center mb-3">
                            <button
                              className="btn btn-secondary btn-sm mx-2"
                              onClick={() => adjustQuantity(item._id, false)}
                            >
                              -
                            </button>
                            <span>{item.count}</span>
                            <button
                              className="btn btn-secondary btn-sm mx-2"
                              onClick={() => adjustQuantity(item._id, true)}
                            >
                              +
                            </button>
                          </div>
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

              {/* Right Side - Billing Summary */}
              <div className="col-lg-4 col-md-12">
                {cart.length > 0 && (
                  <div
                    className="billing-card p-4 shadow-lg rounded mt-2"
                    style={{ position: "sticky", top: "100px" }}
                  >
                    <h4 className="mb-4 text-uppercase font-weight-bold">
                      Billing Summary
                    </h4>
                    <div className="billing-details">
                      <div className="billing-row">
                        <span>Subtotal:</span>
                        <span className="text-success">
                          ₹{totalPrice.toFixed(2)}
                        </span>
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
                      {auth?.user ? (
                        <button
                          className="btn btn-primary btn-lg"
                          onClick={() => navigate("/payment")}
                        >
                          Proceed to Checkout
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-lg mt-2"
                          onClick={() => navigate("/login")}
                        >
                          Login to continue
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
