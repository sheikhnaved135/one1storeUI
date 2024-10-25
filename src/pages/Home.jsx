import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import HomeCard from "../components/layouts/HomeCard";
import { Button, Checkbox, Drawer, Radio } from "antd";
import { Prices } from "./Auth/Prices";
import { useCart } from "../authContext/Cart";
import { useNavigate } from "react-router-dom";
import { Layout as AntLayout, Spin } from "antd";
import { ShimmerPostList } from "react-shimmer-effects";
const { Content, Sider } = AntLayout;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();

  // Fetch products
  const getProducts = async () => {
    setProgress(20);
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/product-list/${page}`
      );
      setProducts(res?.data.product);
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
      setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  const filterProducts = async () => {
    setProgress(20);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(res?.data.product);
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in filtering");
      setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  const totalProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/total-count`
      );
      setTotal(res.data.totalCount);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getProducts();
    }
    getCategory();
  }, []);

  useEffect(() => {
    totalProduct();
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMore = async () => {
    setProgress(30);
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/product-list/${page}`
      );
      setProducts((prev) => [...prev, ...res?.data.product]);
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in loading more products");
      setProgress(100);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"Best Offers"} progress={progress}>
      <Content className="p-3">
        <h1 className="text-center mb-4">Home Page</h1>
        <AntLayout>
          {/* Filter Button */}
          <Button
            onClick={() => setShowFilter(true)}
            className="mb-3"
            type="primary"
          >
            Show Filters
          </Button>

          <Drawer
            title="Filters"
            placement="left"
            closable={true}
            onClose={() => setShowFilter(false)}
            visible={showFilter}
            width={250}
          >
            <h4 className="border-bottom pb-2">FILTER BY CATEGORY</h4>
            <div className="d-flex flex-column mb-3">
              {categories.map((item) => (
                <Checkbox
                  key={item._id}
                  value={item._id}
                  onChange={(e) => handleFilter(e.target.checked, item._id)}
                >
                  {item.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="border-bottom pb-2 mt-3">FILTER BY PRICE</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <div className="d-flex flex-column">
                {Prices.map((item) => (
                  <Radio key={item.id} value={item.array}>
                    {item.name}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
            <button
              className="mt-3 btn btn-secondary w-100"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </Drawer>

          <Content className="p-3">
            <div className="row">
              {loading ? (
                <ShimmerPostList
                  postStyle="STYLE_FOUR"
                  col={screenWidth <= 767 ? 1 : screenWidth <= 991 ? 2 : 3}
                  row={2}
                  gap={30}
                />
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

              <div className="text-center mb-3">
                {loadingMore ? (
                  <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={screenWidth <= 767 ? 1 : screenWidth <= 991 ? 2 : 3}
                    row={1}
                    gap={30}
                  />
                ) : products && products.length < total ? (
                  <button
                    className="btn btn-warning w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    Load more
                  </button>
                ) : null}
              </div>
            </div>
          </Content>
        </AntLayout>
      </Content>
    </Layout>
  );
};

export default Home;
