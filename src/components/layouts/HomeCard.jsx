import React from "react";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa"; // Importing icons

const HomeCard = ({ title, price, id, description, addTocart, moreInfo }) => {
  return (
    <div
      className="card m-2 d-flex flex-column shadow"
      style={{ width: "30rem", borderRadius: "10px", cursor: "pointer" }}
    >
      <img
        style={{
          height: "250px",
          width: "100%",
          objectFit: "contain",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          cursor: "pointer",
        }}
        src={`${import.meta.env.VITE_APP}/api/v1/product/get-photo/${id}`}
        className="card-img-top"
        alt="product"
        onClick={moreInfo}
      />
      <div className="card-body d-flex flex-column justify-content-between text-center">
        <div>
          <h5 className="card-title fw-bold">{title}</h5>
          <h6 className="text-success">₹{price}</h6>
          <p className="card-text text-muted">
            {`${description.substring(0, 50)}...`}
            <span
              onClick={moreInfo}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              {" "}
              read more
            </span>
          </p>
        </div>
        <div className="d-flex flex-column mt-3">
          {" "}
          {/* Change from horizontal to vertical layout */}
          <button
            className="btn btn-warning mb-2"
            onClick={addTocart}
            style={{ width: "100%" }}
          >
            {" "}
            {/* Full width button */}
            <FaShoppingCart className="me-1" /> Add to Cart
          </button>
          <button
            className="btn btn-info"
            onClick={moreInfo}
            style={{ width: "100%" }}
          >
            {" "}
            {/* Full width button */}
            <FaInfoCircle className="me-1" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
