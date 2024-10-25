import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DialogModal from "../../components/DialogModal";
const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [progress, setProgress] = useState(0);
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setProgress(20);
      setShowModal(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/auth/register`,
        {
          username,
          email,
          password,
          phone,
          address,
          question,
        }
      );
      console.log(res);
      // setProgress(70);
      if (res.data.success) {
        // toast.success(res.data.message);
        setTimeout(() => {
          setShowModal(false);
          toast.success("Registered Successfully");
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
        setShowModal(false);
      }
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setProgress(100);
    } catch (error) {
      console.log("register error", error);
      toast.error("Something went wrong while registering");
      setProgress(100);
    }
  };

  return (
    <>
      <Layout title={"Register Page"} progress={progress}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4 text-primary">Register</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        className="form-label fw-semibold"
                      >
                        Username
                      </label>
                      <input
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter username"
                        className="form-control rounded-3"
                        id="username"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email"
                        className="form-control rounded-3"
                        id="email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter password"
                        className="form-control rounded-3"
                        id="password"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Phone
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="Enter phone number"
                        className="form-control rounded-3"
                        id="phone"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="question"
                        className="form-label fw-semibold"
                      >
                        Security Question
                      </label>
                      <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        type="text"
                        placeholder="Enter answer"
                        className="form-control rounded-3"
                        id="question"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="form-label fw-semibold"
                      >
                        Address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Enter address"
                        className="form-control rounded-3"
                        id="address"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-3"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-center mt-3">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="text-decoration-none ms-1 text-primary"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        {showModal && <DialogModal text={`Registering ${username}`} />}
      </Layout>
    </>
  );
};

export default Register;
