import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
  }, []);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px" }}>
        <div className="text-danger mb-3">
          <i className="bi bi-x-circle-fill display-4"></i>
        </div>
        <h3 className="mb-3">Payment Canceled</h3>
        <p className="text-muted">
          Your payment process was canceled. If this was a mistake, you can try
          again.
        </p>
        <button className="btn btn-primary w-100" onClick={() => navigate("/")}>
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Cancel;
