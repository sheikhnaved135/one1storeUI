import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { FaArrowUp } from "react-icons/fa"; // Scroll to top icon

const Layout = ({
  children,
  title,
  description,
  author,
  keywords,
  progress,
}) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="container-fluid">
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="author" content={author} />
          <meta name="keywords" content={keywords} />
          <title>{title}</title>
        </Helmet>
        <LoadingBar progress={progress} color="red" />
        <Header />
        <main style={{ minHeight: "74vh", paddingTop: "60px" }}>
          {children}
        </main>
        <ToastContainer position="top-center" autoClose={1000} />
        <Footer />

        {showScroll && (
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: "1000",
              backgroundColor: "#f28b82",
              border: "none",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <FaArrowUp style={{ color: "#fff", fontSize: "20px" }} />
          </button>
        )}
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce 24",
  description: "",
  author: "",
  keywords: "",
};

export default Layout;
