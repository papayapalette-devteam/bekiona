import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './footer';
import Cuheader from "./Customerdashboard/Cuheader";

function Cancilationpolicy() {

   const [token, setToken] = useState(null);
  
    useEffect(() => {
      // Check for token when app loads
      const storedToken = localStorage.getItem("usertoken");
      setToken(storedToken); // Set token state
  
      // Function to handle token change
      const handleStorageChange = () => {
        const updatedToken = localStorage.getItem("usertoken");
        setToken(updatedToken); // Update token state dynamically
      };
  
      // Listen for storage changes (useful for multiple tabs)
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
  return (
    <div>

      {/* If token exists, show Cuheader, else show Header */}
{token ? <Cuheader /> : <Header />}
      {/* <Header /> */}
      <div
        style={{
          padding: "40px",
          backgroundColor: "#fcf7ee",
          margin: "9rem auto",
          maxWidth: "900px",
          width: "90%",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontFamily: "'ITC Modern No 216', serif",
            fontSize: "2rem",
          }}
        >
          Cancellation and Return Policy for Kiona
        </h1>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            1. Introduction
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            At Kiona, we are committed to ensuring your satisfaction with our products. If for any reason you are not completely satisfied with your purchase, our Cancellation and Return Policy allows you to request a return or cancellation within the stipulated time frame under certain conditions.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            2. Cancellation Policy
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We understand that sometimes plans change. If you wish to cancel an order, you can do so under the following conditions:
          </p>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Orders can be canceled before they have been shipped.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              If the order has already been shipped, it cannot be canceled, but you may initiate a return once you receive the product.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              To cancel an order, please contact our customer service team within 24 hours of placing the order.
            </li>
          </ul>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            To cancel an order, please reach out to us at <strong>support@kiona.com</strong>
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            3. Return Policy
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We want you to love your Kiona products, but if you are not satisfied with your purchase, we offer a return policy with the following conditions:
          </p>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Returns are accepted within 30 days from the date of delivery.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              The product must be unused, unopened, and in the same condition as when you received it.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              If the product was damaged or defective upon delivery, we will arrange for a free return and replacement.
            </li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            4. Refund Process
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            Once the return is processed and approved, a refund will be issued to your original method of payment.
          </p>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Refunds will be processed within 7-10 business days.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Shipping costs are non-refundable.
            </li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            5. Non-Returnable Items
          </h4>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Used or opened skincare products.
            </li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>
              Personalized or custom products.
            </li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            6. How to Contact Us
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            If you have any questions or concerns, please contact us at <strong>support@kiona.com</strong>
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Cancilationpolicy;
                              