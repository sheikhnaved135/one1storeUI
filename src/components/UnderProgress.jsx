import React from "react";
import { FaTools } from "react-icons/fa"; // Importing a maintenance icon
import Layout from "./layouts/Layout";
import { Link } from "react-router-dom";

const UnderProgress = () => {
  return (
    <Layout>
      <div className="under-progress-container">
        <FaTools className="under-progress-icon" />
        <h1>Payment Under Development</h1>
        <p>
          We're working hard to bring you a seamless payment experience. Please
          check back soon!
        </p>
        <p>
          For any inquiries or updates, feel free to{" "}
          <Link to="/contact">contact us</Link>.
        </p>
      </div>
    </Layout>
  );
};

export default UnderProgress;
