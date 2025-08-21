import React, { useState, useEffect } from "react";
import Sidebarcu from "./Sidebarcu";
import Cuheader from "./Cuheader";
import api from "../api"; // Ensure your API setup is correct
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Personalinfo() {

  const [showMoreInfo, setShowMoreInfo] = useState(false);

const user=localStorage.getItem('email')



  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    apartmentNumber: "",
    selectstate: "",
    area: "",
    landmark: "",
    addressType: "",
    pincode: ""
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastNameName: false,
    gender: false,
    email: false,
    mobile: false,
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`alluser/${user}`); // Replace with dynamic email
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  // Handle input change
  // const handleChange = (e) => {
  //   const { name, value, } = e.target;
  //   setUserInfo({ ...userInfo, [name]: value });
    
  // };

  // Enable editing
  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // Save updated data
  const handleSave = async (field) => {
    try {
      await api.put(`getmail/${user}`, userInfo);
      
      // Success message using SweetAlert
      Swal.fire({
        title: "Success!",
        text: `${field} updated successfully!`,
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setIsEditing({ ...isEditing, [field]: false });
    } catch (error) {
      console.error("Error updating user data:", error);
  
      // Error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: "Failed to update user data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];


  const handleChange = (e) => {
    const { name, value, type, checked, select } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleAddressType = (type) => {
    setUserInfo({ ...userInfo, addressType: type });
  };







  return (
    <div>
      <Sidebarcu />
      <div style={{ marginLeft: "260px", marginTop: "-100px", position: "relative" }}>
        <Cuheader />
      </div>

      <div
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          fontFamily: "'Roboto', sans-serif",
          color: "#333",
          marginTop:"100px"
        }}
      >
        <div
          style={{
            maxWidth: "800px", // Increased width
            margin: "auto",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
            marginTop:"100px"
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "600",
              textAlign: "center",
              color: "#4a4a4a",
            }}
          >
            Personal Information
          </h2>

          {/* First Name and Last Name */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>               
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: isEditing.firstName ? "white" : "#f9f9f9",
                outline: isEditing.firstName ? "2px solid #007bff" : "none",
              }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              value={userInfo.lastName}
              onChange={handleChange}
              // disabled={!isEditing.lastName}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: isEditing.name ? "white" : "#f9f9f9",
                outline: isEditing.name ? "2px solid #007bff" : "none",
              }}
            />
            {(!isEditing.firstName &&  !isEditing.lastName) && (
              <button
                onClick={() => {
                  // handleEdit("firstName");
                  handleEdit("name");
                }}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                EDIT
              </button>
            )}
            {(isEditing.firstName || isEditing.name) && (
              <button
                onClick={() => handleSave("Personal Information")}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                SAVE
              </button>
            )}
          </div>

          {/* Gender */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Gender
            </label>
            <div>
              <label style={{ marginRight: "20px", fontSize: "16px" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userInfo.gender === "Male"}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                Male
              </label>
              <label style={{ fontSize: "16px" }}>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userInfo.gender === "Female"}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                Female
              </label>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Email Address
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userInfo.email}
                onChange={handleChange}
                disabled={!isEditing.email}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                  backgroundColor: isEditing.email ? "white" : "#f9f9f9",
                  outline: isEditing.email ? "2px solid #007bff" : "none",
                }}
              />
              {!isEditing.email && (
                <button
                  onClick={() => handleEdit("email")}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  EDIT
                </button>
              )}
              {isEditing.email && (
                <button
                  onClick={() => handleSave("Email Address")}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  SAVE
                </button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Mobile Number
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={userInfo.phone}
                onChange={handleChange}
                disabled={!isEditing.mobile}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                  backgroundColor: isEditing.mobile ? "white" : "#f9f9f9",
                  outline: isEditing.mobile ? "2px solid #007bff" : "none",
                }}
              />
              {!isEditing.mobile && (
                <button
                  onClick={() => handleEdit("mobile")}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  EDIT
                </button>
              )}
              {isEditing.mobile && (
                <button
                  onClick={() => handleSave("Mobile Number")}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  SAVE
                </button>
              )}
            </div>

            <button
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShowMoreInfo(!showMoreInfo)}
            >
              {showMoreInfo ? "Hide More Information" : "Show More Information"}
            </button>
            {showMoreInfo && (
            <div className="more-info-section">
              <h3>More Information</h3>

              <div className="mb-3 row">
        <div className="col-md-6">
          <label htmlFor="apartmentNumber" className="form-label">
            *Apartment Name / House No.
          </label>
          <input
            type="text"
            className="form-control"
            id="apartmentNumber"
            name="apartmentNumber"
            value={userInfo.apartmentNumber}
            onChange={handleChange}
            placeholder="e.g. 12/228"
            required
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
        </div>
        <div className="col-md-6">
  <label htmlFor="state" className="form-label">
    *Select State
  </label>
  <select
    className="form-control"
    id="state"
    name="selectstate"
    value={userInfo.selectstate}
    onChange={handleChange}
    style={{
      borderRadius: "5px",
      padding: "10px",
      fontSize: "14px",
    }}
  >
    <option value="" disabled>
      Select a state
    </option>
    {indianStates.map((state, index) => (
      <option key={index} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>
      </div>

      <div className="mb-3 row">
        <div className="col-md-6">
          <label htmlFor="area" className="form-label">
          *Area
          </label>
          <input
            type="text"
            className="form-control"
            id="area"
            name="area"
            value={userInfo.area}
            onChange={handleChange}
            placeholder="e.g. 12/228"
            required
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="StreetDetails" className="form-label">
          *Street Details/Landmark
          </label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            name="landmark"
            value={userInfo.landmark}
            onChange={handleChange}
            placeholder="e.g. Park Avenue"
            style={{
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="col-md-6 mb-3">
        <label htmlFor="landmark" className="form-label">
          *Pincode
        </label>
        <input
          type="text"
          className="form-control"
          id="pincode"
          name="pincode"
          value={userInfo.pincode}
          onChange={handleChange}
          style={{
            borderRadius: "5px",
            padding: "10px",
            fontSize: "14px",
          }}
        />
      </div>


      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="setDefault"
            name="setDefault"
            checked={userInfo.setDefault}
            onChange={handleChange}
          />
          <label htmlFor="setDefault" className="form-check-label">
            Set as Default Address
          </label>
        </div>
      </div>

      <h5 style={{ marginTop: "20px", fontWeight: "600" }}>Address Type</h5>
      <div className="mb-3 address-type" style={{ marginBottom: "20px" }}>
        <button
          type="button"
          className={`btn ${
            userInfo.addressType === "Home"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Home")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-house"
            style={{ marginRight: "5px" }}
          ></i>
          Home
        </button>
        <button
          type="button"
          className={`btn ${
            userInfo.addressType === "Office"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Office")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-building"
            style={{ marginRight: "5px" }}
          ></i>
          Office
        </button>
        <button
          type="button"
          className={`btn ${
            userInfo.addressType === "Other"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => handleAddressType("Other")}
          style={{
            marginRight: "10px",
            fontSize: "14px",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa-solid fa-ellipsis"
            style={{ marginRight: "5px" }}
          ></i>
          Other
        </button>
      </div>


      <button 
  style={{
    backgroundColor: "#007bff", // Primary blue color
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease"
  }} 
  onClick={ handleSave}
>
  Save Address
</button>

            </div>
          )}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Personalinfo;
