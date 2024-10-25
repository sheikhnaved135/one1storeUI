import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import { FaListUl } from "react-icons/fa"; // Importing an icon from react-icons
import axios from "axios";
import { ShimmerTable } from "react-shimmer-effects";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Layout title={"Category Page"}>
      <h1 className="text-center mb-4">All Categories</h1>
      {loading ? (
        <ShimmerTable
          mode="light"
          row={2}
          col={screenWidth <= 767 ? 1 : 3}
          border={1}
          borderColor={"#cbd5e1"}
          rounded={0.25}
          rowGap={16}
          colPadding={[10, 5, 10, 5]}
        />
      ) : (
        <>
          <div className="container mt-5">
            <div className="row text-center">
              {categories.map((item) => (
                <div className="col-md-4 mb-4" key={item.slug}>
                  <button
                    className="btn btn-outline-warning btn-block p-4 shadow"
                    onClick={() => navigate(`/category/${item.slug}`)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaListUl className="me-2" /> {/* Adding an icon */}
                    <span className="fw-bold">{item.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CategoryPage;
