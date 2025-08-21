import React, { useState, useEffect } from "react";
import Sidebarcu from "./Sidebarcu";
import Cuheader from "./Cuheader";
import axios from "axios";
import api from "../api"

function Manageadds() {
  const useremail = localStorage.getItem('email');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Initially, you can set addressData state, which will be used for form submission
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    pincode: '',
    area: '',
    apartment: '',
    streetDetail: '',
    state: '',
    email: useremail,
    addressType: 'Home',
  });

  useEffect(() => {
    // Fetch existing addresses on page load (example GET request)
    api.get(`viewordersbyemail/${useremail}`)
      .then(response => {
        setAddressData(response.data.order[0]) // You can display existing addresses if needed
      })
      .catch(error => {
        console.error("There was an error fetching the addresses!", error);
      });
  }, []);

  // console.log(addressData);
  
  // console.log(addressData.email);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating a new FormData instance
    const formData = new FormData();

    // Appending the form fields to the FormData instance
    Object.keys(addressData).forEach(key => {
      formData.append(key, addressData[key]);
    });

    // Sending the FormData to the backend using PUT or POST request
    axios.put("http://localhost:5000/addresses", formData)
      .then(response => {
        console.log("Address updated:", response.data);
        setIsFormVisible(false);
      })
      .catch(error => {
        console.error("There was an error updating the address!", error);
      });
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
    "Lakshadweep", "Puducherry"
  ];

  return (
    <div>
      <div><Sidebarcu /></div>
      <div style={{ marginLeft: "260px", marginTop: "-100px", position: "relative" }}><Cuheader /></div>
      <div
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          flexGrow: 1,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
          marginTop: "100px"
        }}
      >
        <div style={{ margin: "auto", marginTop: "100px" }}>
          <h2>Manage Addresses</h2>
          {!isFormVisible && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#fff",
                width: "300px",
              }}
            >
              <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleFormVisibility}>
                + ADD A NEW ADDRESS
              </span>
            </div>
          )}

          {isFormVisible && (
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  name="firstName"
                  value={addressData.firstName}
                  placeholder="First name"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="lastName"
                  value={addressData.lastName}
                  placeholder="Last name"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={addressData.mobileNumber}
                  placeholder="10-digit mobile number"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  name="pincode"
                  value={addressData.pincode}
                  placeholder="Pincode"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="area"
                  value={addressData.area}
                  placeholder="Area"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="apartment"
                  value={addressData.apartment}
                  placeholder="Apartment name/house no."
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  name="streetDetail"
                  value={addressData.streetDetail}
                  placeholder="Street Detail/Landmark"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <select
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">--Select State--</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  name="email"
                  value={addressData.email}
                  placeholder="User email"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>
                  <input type="radio" name="addressType" value="Home" onChange={handleChange} checked={addressData.addressType === 'Home'} />
                  Home
                </label>
                <label>
                  <input type="radio" name="addressType" value="Work" onChange={handleChange} checked={addressData.addressType === 'Work'} />
                  Work
                </label>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{
                    width: "100px",
                    padding: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  SAVE
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    width: "100px",
                    padding: "10px",
                    backgroundColor: "#ccc",
                    color: "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manageadds;
