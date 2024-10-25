import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../authContext/Auth";
import UserMenu from "../components/layouts/UserMenu";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DialogModal from "../components/DialogModal";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setTimeout(() => {
      // Perform logout after 2 seconds
      setAuth({ ...auth, user: null, token: "" });
      localStorage.removeItem("auth");
      setShowLogoutModal(false); // Hide the modal after logout
      toast.success("Logged out successfully");
      navigate("/login");
    }, 5000);
  };

  return (
    <Layout title="Dashboard - Profile">
      <div className="container-fluid m-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Profile Details */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white text-center py-3">
                <h4 className="fw-bold mb-0">Your Profile</h4>
              </div>
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-4 d-flex justify-content-center">
                    <FaUser size={100} color="#6c757d" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="fw-bold mb-3">{user?.name}</h5>
                    <p className="mb-2">
                      <FaEnvelope className="me-2 text-muted" />
                      <span className="text-muted">Email:</span> {user?.email}
                    </p>
                    <p className="mb-2">
                      <FaPhone className="me-2 text-muted" />
                      <span className="text-muted">Phone:</span>{" "}
                      {user?.phone || "Not Provided"}
                    </p>
                    <p className="mb-2">
                      <FaMapMarkerAlt className="me-2 text-muted" />
                      <span className="text-muted">Address:</span>{" "}
                      {user?.address || "Not Provided"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn btn-primary me-2">Edit Profile</button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && <DialogModal text="Logging you out" />}
    </Layout>
  );
};

export default Profile;
