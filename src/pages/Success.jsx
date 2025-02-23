import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("cart");
    toast.success("Payment successful!");

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000); // Redirect to home after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px" }}>
        <div className="text-success mb-3">
          <i className="bi bi-check-circle-fill display-4"></i>
        </div>
        <h3 className="mb-3">Payment Successful</h3>
        <p className="text-muted">
          Your payment has been processed successfully. Redirecting to the
          homepage...
        </p>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
