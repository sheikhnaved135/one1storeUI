import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./layouts/Layout";
import { useCart } from "../authContext/Cart";
import HomeCard from "./layouts/HomeCard";
import { ShimmerContentBlock } from "shimmer-effects-react";
const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(res.data.product);
      similarProduct(res.data.product._id, res.data.product.category._id);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the product.");
    } finally {
      setLoading(false);
    }
  };

  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP
        }/api/v1/product/similar-product/${pid}/${cid}`
      );
      setRelated(data.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <Layout title={product.name || "Product Details"}>
      {loading ? (
        <ShimmerContentBlock
          mode="light"
          rounded={1}
          items={1}
          itemsGap={20}
          thumbnailHeight={300}
          thumbnailWidth={300}
          thumbnailRounded={1}
          contentDetailsPosition="start"
          contentDetailTextLines={8}
        />
      ) : (
        <>
          <div
            className="container mt-5 mb-5"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <div className="row justify-content-center">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img
                  src={`${import.meta.env.VITE_APP}/api/v1/product/get-photo/${
                    product._id
                  }`}
                  className="img-fluid rounded shadow mb-4"
                  alt={product.name}
                  style={{ height: "400px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-6">
                <h3 className="fw-bold mb-3">{product.name}</h3>
                <div
                  className="border p-3 mb-3"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#007bff",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  }}
                >
                  <p className="text-success h4 mb-1">
                    Price: ₹{product.price}
                  </p>
                  <p className="text-muted">{product.description}</p>
                  <p className="text-muted">
                    Category: <strong>{product?.category?.name}</strong>
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      const updatedCart = [...cart, product];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      toast.success("Product added to cart!");
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>

            {related.length > 0 ? (
              <h3 className="text-center mt-5">Similar Products</h3>
            ) : null}
            <hr />
            <div className="row">
              {related.map((item) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mb-4"
                  key={item._id}
                >
                  <HomeCard
                    title={
                      item.name.length > 20
                        ? item.name.substr(0, 20) + "..."
                        : item.name
                    }
                    description={
                      item.description.length > 100
                        ? item.description.substr(0, 100) + "..."
                        : item.description
                    }
                    price={item.price}
                    id={item._id}
                    addTocart={() => {
                      const updatedCart = [...cart, item];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      toast.success("Added to cart!");
                    }}
                    moreInfo={() => {
                      navigate(`/product/${item.slug}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleProduct;
