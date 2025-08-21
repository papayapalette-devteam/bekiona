import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar, Box, Typography, Divider, Paper } from "@mui/material";
import axios from "axios";
import Sidebar from './Sidebar'
import api from '../api'

function Accountsetting() {
      const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
        const toggleSidebar = () => {
          setIsSidebarCollapsed(!isSidebarCollapsed);
        };


    const [userDetails, setUserDetails] = useState({
        username: "",
        name:"",
        email: "",
        profilePicture: null,
      });
    
      const [passwordDetails, setPasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    
      const [previewImage, setPreviewImage] = useState(null);
      const [success, setSuccess] = useState(null);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
          try {
            const response = await api.get("user");
            setUserDetails(response.data);
            setPreviewImage(response.data.profilePicture);
          } catch (err) {
            console.error("Error fetching user data", err);
          }
        };
        fetchUserData();
      }, []);
    
      // Handle General Settings input changes
      const handleGeneralInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      // Handle Password input changes
      const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordDetails((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      // Handle Profile Picture change
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserDetails((prevState) => ({
          ...prevState,
          profilePicture: file,
        }));
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      };
    
      // Handle General Settings submission
      const handleGeneralSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", userDetails.username);
        formData.append("email", userDetails.email);
        if (userDetails.profilePicture) {
          formData.append("profilePicture", userDetails.profilePicture);
        }
    
        try {
          await api.put("update", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setSuccess("General settings updated successfully!");
          setError(null);
        } catch (err) {
          setError("Error updating general settings!");
          setSuccess(null);
        }
      };
    
      // Handle Password Change
      const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwordDetails;
    
        if (newPassword !== confirmPassword) {
          setError("New password and confirm password do not match!");
          return;
        }
    
        try {
          await api.post("change-password", {
            oldPassword,
            newPassword,
          });
          setSuccess("Password changed successfully!");
          setError(null);
          setPasswordDetails({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
          setError("Error changing password!");
          setSuccess(null);
        }
      };



  return (
    <div>

<Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

<div
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          flexGrow: 1,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >

<Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Account Settings
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" mb={2}>
          General Settings
        </Typography>
        <form onSubmit={handleGeneralSubmit} encType="multipart/form-data">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            value={userDetails.username}
            onChange={handleGeneralInputChange}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={userDetails.email}
            onChange={handleGeneralInputChange}
          />
          <Box display="flex" alignItems="center" gap={2} marginY={2}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && <Avatar src={previewImage} sx={{ width: 60, height: 60 }} />}
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Paper>

      <Divider />

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>
        <form onSubmit={handlePasswordSubmit}>
          <TextField
            label="Old Password"
            fullWidth
            margin="normal"
            type="password"
            name="oldPassword"
            value={passwordDetails.oldPassword}
            onChange={handlePasswordInputChange}
          />
          <TextField
            label="New Password"
            fullWidth
            margin="normal"
            type="password"
            name="newPassword"
            value={passwordDetails.newPassword}
            onChange={handlePasswordInputChange}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            name="confirmPassword"
            value={passwordDetails.confirmPassword}
            onChange={handlePasswordInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </form>
      </Paper>
    </Box>



      </div>
    </div>
  )
}

export default Accountsetting