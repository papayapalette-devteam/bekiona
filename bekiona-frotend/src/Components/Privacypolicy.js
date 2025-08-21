import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './footer';
import Cuheader from "./Customerdashboard/Cuheader";

function Privacypolicy() {

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
          Privacy Policy for Kiona
        </h1>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            1. Introduction
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            At Kiona, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website, use our services, or purchase our products.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            2. Information We Collect
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We collect personal information to provide and improve our services, including:
          </p>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>Name, email, phone number, and delivery address.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>Secure payment details (processed via third-party gateways).</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>Browsing data collected via cookies.</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            3. How We Use Your Information
          </h4>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>To process and deliver your orders.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>To improve our services and website experience.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>To send promotional offers (opt-out available).</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            4. Data Protection and Security
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We implement encryption technologies and secure payment gateways to protect your data.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            5. Sharing Your Information
          </h4>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>With service providers for order fulfillment.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem" }}>If required by law.</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            6. Cookies and Tracking
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We use cookies to enhance website functionality. You can manage cookies in your browser settings.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            7. Your Rights and Choices
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            You can update or delete your personal data or opt-out of marketing emails.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            8. Changes to This Policy
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            We may update this policy. Changes will be posted here.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif", fontSize: "1.5rem" }}>
            9. Contact Us
          </h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif", fontSize: "1rem", lineHeight: "1.6" }}>
            If you have questions, reach us at <strong>privacy@kiona.com</strong>.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Privacypolicy;
