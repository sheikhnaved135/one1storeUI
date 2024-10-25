import React, { useEffect } from "react";
import Layout from "./Layout";
import { useSearch } from "../../authContext/Search";
import HomeCard from "./HomeCard";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../authContext/Cart";
import { toast } from "react-toastify";

const Search = () => {
  const [value, setValue] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Searched products"}>
      <div className="container">
        <h1 className="text-center">Searched Results</h1>
        <div className="row">
          {value?.results.length < 1 ? (
            <h3 className="text-center">No products found</h3>
          ) : (
            <>
              {value.results.map((item) => (
                <div
                  className="col-lg-3 col-md-4 d-flex justify-content-center align-items-center"
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
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
