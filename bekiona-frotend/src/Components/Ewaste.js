import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './footer';
import Cuheader from "./Customerdashboard/Cuheader";

function Ewaste() {
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

      <div style={{ 
        padding: "40px", 
        backgroundColor: "#fcf7ee", 
        marginTop: "9rem", 
        maxWidth: "90%", 
        margin: "9rem auto", 
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
        borderRadius: "10px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>
          E-Waste Policy for Kiona
        </h1>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>1. Introduction</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            At Kiona, we are committed to promoting environmental sustainability and reducing the impact of electronic waste (e-waste) on our planet. 
            This E-Waste Policy outlines how we manage the disposal and recycling of electronic products, ensuring that they are processed in an 
            environmentally responsible manner.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>2. Commitment to Sustainability</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            As part of our ongoing efforts to contribute to a cleaner environment, Kiona ensures that all electronic waste (including packaging, 
            devices, and any associated electronics used in our business operations) is handled in accordance with applicable environmental 
            regulations and industry best practices.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>3. E-Waste Collection and Disposal</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            Kiona has partnered with certified e-waste recycling companies to ensure that any electronic products used or sold by us are 
            disposed of responsibly. We ensure that:
          </p>
          <ul>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>All e-waste is segregated and disposed of safely.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>Electronics are sent to licensed recycling facilities that comply with environmental standards.</li>
            <li style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>We encourage customers to dispose of electronic waste through proper recycling channels and avoid sending electronic products to landfills.</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>4. Recycling and Reusing Electronics</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            Kiona supports the reuse and recycling of electronic items, including the following:
          </p>
          <ul>
            <li>Old skincare product packaging such as pumps, bottles, and cases (if they contain electronics or batteries).</li>
            <li>Old electronic devices used in our office or production environments.</li>
            <li>Packaging materials that are recyclable or can be reused for other purposes.</li>
          </ul>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            By recycling and reusing electronic products, we reduce the demand for raw materials, reduce e-waste, and contribute to a circular economy.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>5. Customer Participation</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            Kiona encourages our customers to actively participate in responsible e-waste disposal. We recommend that:
          </p>
          <ul>
            <li>Customers return old electronic devices and accessories to certified recycling centers or local collection points.</li>
            <li>Customers participate in trade-in programs or take part in manufacturer take-back schemes where available.</li>
            <li>Packaging materials should be properly disposed of, and where possible, reused or recycled.</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>6. How We Handle Customer E-Waste</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            If you wish to dispose of any electronic products purchased from Kiona, please follow the instructions provided in our return or 
            recycling programs. We will ensure that:
          </p>
          <ul>
            <li>Products are securely wiped of any personal information or data.</li>
            <li>Items are sent to certified e-waste recyclers for proper disposal and recycling.</li>
            <li>All disposed electronic products are processed with minimal environmental impact.</li>
          </ul>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>7. Compliance with E-Waste Regulations</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            Kiona adheres to all applicable local, national, and international laws and regulations related to the management, disposal, and recycling of e-waste. 
            We are committed to continuous improvement of our e-waste management practices in line with the latest industry standards.
          </p>
        </section>

        <section>
          <h4 style={{ color: "#333", fontFamily: "'ITC Modern No 216', serif" }}>8. How to Reach Us</h4>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>
            If you have any questions or concerns about our E-Waste Policy or wish to inquire about proper disposal methods, please contact us using the following:
          </p>
          <p style={{ fontFamily: "'Harmonia Sans', sans-serif" }}>Email: support@kiona.com</p>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Ewaste;
