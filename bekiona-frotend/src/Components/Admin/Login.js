import React, { useState } from 'react';
import logo from '../Assets/Logo (2).png';
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authguard';
import api from '../api'

function Login() {


  const { login } = useAuth();
      







  // State to store form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Use navigate hook for redirection after successful login
  const navigate = useNavigate();

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Prepare the data to send in the request body
    const data = {
      username,
      password,
    };
  
    try {
      // Log the request body to debug
      console.log('Sending login request with data:', data);
  
      // Send POST request to the backend API for login using the api instance
      const response = await api.post('login', data);
  
      console.log('Login response:', response);  // Log the full response
  
      if (response.status === 200) {
        // If login is successful, store the token or user info
        const token=response.data.token
        login(token); // Assuming `login` is a function to handle the token
        navigate('/dashboard', { replace: true });
      } else {
        // If login failed, show error message
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err); // Log the error
      setError('Something went wrong. Please try again.');
    }
  };
 
  
  

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="mb-3"
              style={{ width: "150px" }}
            />
            <p
              style={{
                position: "relative",
                fontSize: "16px",
                color: "#6c757d",
                margin: "20px 0",
                textAlign: "center",
              }}
            >
              Login Account
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  width: "30%",
                  height: "1px",
                  background: "#d1d1d1",
                  transform: "translateY(-50%)",
                }}
              ></span>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  width: "30%",
                  height: "1px",
                  background: "#d1d1d1",
                  transform: "translateY(-50%)",
                }}
              ></span>
            </p>
          </div>

          {/* Display Error Message */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <Form onSubmit={handleLogin}>
            {/* Username Field */}
            <Form.Group className="mb-3" controlId="formUsername">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-user"></i>
                </InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="User Name" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="Enter Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <div style={{ display: "flex", gap: "80px" }}>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember Me
                </label>
              </div>
              <div>
                <Link to="/forgot" style={{ textDecoration: "none" }}>
                  <span>Forgot Password?</span>
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#007bff", border: "none", marginTop: "3rem" }}
            >
              Login
            </Button>

            <div style={{ backgroundColor: "black", height: "1px", width: "100%", marginTop: "1rem" }}></div>
            <div style={{ display: "flex", gap: "30px", marginTop: "2rem" }}>
              <div>
                <Link to="/forgot" style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "15px" }}>Recover Password</span>
                </Link>
              </div>
              {/* <div>
                <span style={{ fontSize: "15px" }}>New to Kiona Admin?</span>
                <Link to="/singup" style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "15px" }}>Signup</span>
                </Link>
              </div> */}
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
