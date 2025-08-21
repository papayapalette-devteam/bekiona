import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaImages, FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import "./Sidebarcu.css";

function Sidebarcu() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Logout = () => {
    window.location.href = "/";
  };

  return (
    <>
      {/* Toggle Button */}
      <button
  onClick={toggleSidebar}
  style={{
    position: "fixed",
    top: "10px",
    left: "10px",
    background: "#222",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  }}
>
  <FaBars size={20} />
</button>


      {/* Sidebar */}
      <div
        className={`bg-dark text-white sidebar ${isOpen ? "open" : "closed"}`}
        style={{
          height: "100%",
          width: "250px",
          position: "fixed",
          top: "0",
          left: isOpen ? "0" : "-260px",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          padding: "20px 10px",
          transition: "all 0.3s ease-in-out",
          zIndex: 1090,
        }}
      >
        {/* Sidebar Header */}
        <div
          className="d-flex justify-content-center align-items-center mb-4"
          style={{
            paddingBottom: "20px",
            borderBottom: "1px solid #444",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          KIONA
        </div>

        {/* User Info Section */}
        <div
          className="d-flex align-items-center mb-4"
          style={{
            padding: "10px 15px",
            backgroundColor: "#333",
            borderRadius: "8px",
            gap: "10px",
          }}
        >
          <FaUserCircle style={{ fontSize: "2rem", color: "white" }} />
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hello, User</span>
        </div>

        {/* Sidebar Menu */}
        <ul className="list-unstyled" style={{ padding: "0", margin: "0" }}>
          <li className="mb-3">
            <Link
              to="/personalinfo"
              className="text-white text-decoration-none d-flex align-items-center"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
            >
              <FaHome className="me-2" style={{ fontSize: "1.2rem" }} />
              <span>Profile Information</span>
            </Link>
          </li>

          <li className="mb-3">
            <Link
              to="/manageadds"
              className="text-white text-decoration-none d-flex align-items-center"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
            >
              <FaImages className="me-2" style={{ fontSize: "1.2rem" }} />
              <span>Manage Address</span>
            </Link>
          </li>

          <li className="mb-3">
            <Link
              to="/myorders"
              className="text-white text-decoration-none d-flex align-items-center"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
            >
              <FaImages className="me-2" style={{ fontSize: "1.2rem" }} />
              <span>My Order</span>
            </Link>
          </li>
        </ul>

        {/* Logout Section */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "10px",
            width: "90%",
            textAlign: "center",
          }}
        >
          <button
            className="text-white text-decoration-none d-flex align-items-center justify-content-center"
            style={{
              padding: "10px 10px",
              marginTop: "10px",
              backgroundColor: "#dc3545",
              borderRadius: "8px",
              transition: "background 0.3s",
              textAlign: "center",
              cursor: "pointer",
              width: "100%",
              border: "none",
            }}
            onClick={Logout}
          >
            <FaSignOutAlt className="me-2" style={{ fontSize: "1.2rem" }} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay (for mobile view) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1080,
          }}
        />
      )}
    </>
  );
}

export default Sidebarcu;
