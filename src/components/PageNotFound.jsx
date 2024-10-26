import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found-container">
      <FaExclamationTriangle className="page-not-found-icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page you're looking for doesn't exist. It may have been
        moved, or the URL might be incorrect.
      </p>
      <button className="go-home-button" onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
