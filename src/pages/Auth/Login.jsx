import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../authContext/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DialogModal from "../../components/DialogModal";
// import { setTheme } from "colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowModal(true);
      // setProgress(20);
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      // setProgress(70);
      if (res?.data.success) {
        // toast.success(res.data.message);
        const redirectPath = sessionStorage.getItem("redirectPath");
        // console.log(redirectPath);
        sessionStorage.removeItem("redirectPath");
        if (redirectPath) {
          setTimeout(() => {
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });

            localStorage.setItem("auth", JSON.stringify(res.data));
            // setProgress(100);
            setEmail("");
            setPassword("");
            navigate(redirectPath);
          }, 1000);
        } else {
          setTimeout(() => {
            setShowModal(false);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            navigate(-1);
            localStorage.setItem("auth", JSON.stringify(res.data));
            // setProgress(100);
            setEmail("");
            setPassword("");
          }, 1000);
        }
      } else {
        if (res.data.message === "Password is incorrect") {
          toast.error(res.data.message);
          setPassword("");
          setShowModal(false);
        } else {
          toast.error(res.data.message);
          setEmail("");
          setShowModal(false);
        }
        setProgress(100);
      }
    } catch (error) {
      console.log("error in login jsx", error);
      toast.error("Login error");
      setEmail("");
      setPassword("");
      setProgress(100);
      setShowModal(false);
    }
  };
  return (
    <Layout title={"Login Page"} progress={progress}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4 text-primary">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-semibold"
                    >
                      Email
                    </label>
                    <input
                      autoFocus
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (timer) {
                          clearTimeout(timer);
                        }
                        setTyping(true);
                        setEmail(e.target.value);
                        const newTimer = setTimeout(() => {
                          setTyping(false);
                        }, 500);
                        setTimer(newTimer);
                      }}
                      className="form-control rounded-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        if (timer) {
                          clearTimeout(timer);
                        }
                        setTyping(true);
                        setPassword(e.target.value);
                        const newTimer = setTimeout(() => {
                          setTyping(false);
                        }, 500);
                        setTimer(newTimer);
                      }}
                      type="password"
                      className="form-control rounded-3"
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                  <p
                    className="text-center forgot mb-4"
                    onClick={() => navigate("/forgot-password")}
                    style={{ cursor: "pointer", color: "#007bff" }}
                  >
                    Forgot Password?
                  </p>
                  <button
                    disabled={typing}
                    type="submit"
                    className="btn btn-primary w-100 rounded-3"
                  >
                    {typing ? "typing..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
            <p className="text-center mt-3">
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="text-decoration-none ms-1 text-primary"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showModal && <DialogModal text="Logging you in" />}
    </Layout>
  );
};

export default Login;
