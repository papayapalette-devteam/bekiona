import React, { useState } from 'react';
import logo from '../Assets/Logo (2).png';
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Forgatpassword() {
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
                fontSize: "11px",
                color: "#6c757d",
                margin: "20px 0",
                textAlign: "center",
              }}
            >
              We will send you a link to reset password
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  width: "25%",
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
                  width: "25%",
                  height: "1px",
                  background: "#d1d1d1",
                  transform: "translateY(-50%)",
                }}
              ></span>
            </p>
          </div>
          <Form>

      {/* Password Field */}
      <Form.Group className="mb-3" controlId="formPassword">
        <InputGroup>
          <InputGroup.Text>
            <i className="fa-solid fa-lock"></i>
          </InputGroup.Text>
          <Form.Control type="password" placeholder="Enter Your Email" />
        </InputGroup>
      </Form.Group>

      {/* Register Button */}
      <Button
        variant="primary"
        type="submit"
        className="w-100"
        style={{ backgroundColor: "#007bff", border: "none", marginTop:"1rem" }}
      >
        Recover Password
      </Button>

      <div style={{ backgroundColor: "black", height: "1px", width: "100%", marginTop:"1rem" }}></div>
        <div style={{display:"flex", gap:"110px",marginTop:"2rem"}}>
      <div>
  <Link to="/forgot" style={{ textDecoration: "none" }}>
    <span style={{fontSize:"15px"}}>Login</span>
  </Link>
</div>
<div>
    <span style={{fontSize:"15px"}}>New to Kiona</span>
  <Link to="/singup" style={{ textDecoration: "none" }}>
    <span style={{fontSize:"15px"}}>Create Account</span>
  </Link>
</div>
</div>
    </Form>
          </div>

        </Container>


    </div>
  )
}

export default Forgatpassword