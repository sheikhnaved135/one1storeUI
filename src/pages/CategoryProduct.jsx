import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HomeCard from "../components/layouts/HomeCard";
import { useCart } from "../authContext/Cart";
import { toast } from "react-toastify";
import { ShimmerPostList } from "react-shimmer-effects";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Fetch products by category
  const getCategoryProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/category/get-category/${slug}`
      );
      setProducts(data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    getCategoryProducts();
  }, [slug]);

  return (
    <Layout title={`Products in ${slug} Category`}>
      <div className="container mt-4">
        <h2 className="text-center my-4">{`Products in ${slug} Category`}</h2>

        {loading ? (
          <ShimmerPostList
            postStyle="STYLE_FOUR"
            col={screenWidth <= 767 ? 1 : screenWidth <= 991 ? 2 : 3}
            row={2}
            gap={30}
          />
        ) : (
          <div className="row">
            {products.length === 0 ? (
              <p className="text-center mt-5">No products found.</p>
            ) : (
              products.map((item) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 d-flex  justify-content-center mb-2"
                  key={item._id}
                >
                  <HomeCard
                    title={item.name.substr(0, 20)}
                    description={item.description.substr(0, 100)}
                    price={item.price}
                    id={item._id}
                    addTocart={() => {
                      setCart([...cart, item]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, item])
                      );
                      toast.success("Added to cart");
                    }}
                    moreInfo={() => navigate(`/product/${item.slug}`)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
