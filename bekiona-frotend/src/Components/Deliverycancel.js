import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from './footer'
import Cuheader from "./Customerdashboard/Cuheader";

function Deliverycancel() {

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
        {/* <Header/> */}
        <div style={{ 
          padding: "5%", 
          backgroundColor: "#fcf7ee", 
          marginTop: "9rem", 
          marginLeft: "auto", 
          marginRight: "auto", 
          maxWidth: "90%", 
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
          borderRadius: "10px" 
        }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>
            Shipping and Delivery Policy for Kiona
          </h1>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>1. Introduction</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              At Kiona, we strive to deliver your skincare products in a timely and safe manner. This policy outlines the terms and conditions of our shipping and delivery process. Please review the following information carefully.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>2. Shipping Locations</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              We currently offer shipping to the following locations:
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ fontFamily:"'Harmonia Sans', sans-serif" }}>Domestic (India): We ship to all major cities and towns across India.</li>
              <li style={{ fontFamily:"'Harmonia Sans', sans-serif" }}>International: We are working towards providing global shipping. Please check the availability of your country during checkout.</li>
            </ul>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>3. Shipping Costs</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              The shipping cost will be calculated based on the delivery location, size, and weight of your order. The final shipping cost will be displayed at the time of checkout before you confirm the purchase.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>4. Processing Time</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              Once your order is placed, it will be processed and shipped within 1-3 business days (excluding weekends and public holidays). In case of any delays, we will inform you via email or phone.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>5. Delivery Time</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              The estimated delivery time for orders will depend on your location and the shipping method selected:
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ fontFamily:"'Harmonia Sans', sans-serif" }}>Domestic Orders (India): 8-14 business days.</li>
              <li style={{ fontFamily:"'Harmonia Sans', sans-serif" }}>International Orders: 14-20 business days (subject to customs processing).</li>
            </ul>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>6. Order Tracking</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              After your order has been dispatched, you will receive a tracking number via email or SMS.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>7. Failed Delivery Attempts</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              If a delivery fails due to an incorrect address or unavailability, the courier will attempt re-delivery. If multiple attempts fail, the package may be returned to us.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>8. Customs and Import Duties</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              International orders may be subject to customs fees, taxes, or duties. These charges are the recipient’s responsibility.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>9. Undeliverable Packages</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              If a package is undeliverable due to an incorrect address or failure to claim it, it will be returned to us. Additional shipping charges may apply.
            </p>
          </section>

          <section>
            <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>10. Contact Us</h4>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              If you have any questions about our shipping policy, please contact us at:
            </p>
            <p style={{ fontFamily:"'Harmonia Sans', sans-serif", textAlign: "justify" }}>
              <strong>Email:</strong> support@kiona.com
            </p>
          </section>
        </div>
        <Footer/>
    </div>
  )
}

export default Deliverycancel
