import React, { useState } from 'react';
import logo from '../Assets/Logo (2).png';
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Link } from 'react-router-dom';
import { applyInitialState } from '@mui/x-data-grid/internals';
import api from '../api'

function Sinup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      // Send POST request to the backend API
      const response = await api.post("signup",userData)
console.log(response);


      if (response.status===200) {
        // Success: Show SweetAlert
        Swal.fire({
          title: 'Success!',
          text: `User ${response.data.user.username} successfully registered!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Clear the input fields
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        // Error: Show SweetAlert
        Swal.fire({
          title: 'Error!',
          text: response.message || "An error occurred.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      // Handle unexpected errors
      Swal.fire({
        title: 'Error!',
        text: "Error: " + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
              Create Account
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
          <Form onSubmit={handleSubmit}>
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

            {/* Email Address Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* Register Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#007bff", border: "none" }}
            >
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
      <small>
        Already have an account? <Link to="/login">Login</Link>
      </small>
    </div>
        </div>
      </Container>
    </div>
  );
}

export default Sinup;
