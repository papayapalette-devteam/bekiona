import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from './footer'
import Cuheader from "./Customerdashboard/Cuheader";

function Termcondition() {

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
        padding: "40px", 
        backgroundColor: "#fcf7ee", 
        marginTop: "9rem", 
        maxWidth: "90%", 
        margin: "9rem auto", 
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
        borderRadius: "10px"
      }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>
        TERMS AND CONDITIONS FOR USE OF KIONA
      </h1>
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555",fontFamily:"'Harmonia Sans', sans-serif" }}>
        Welcome to Kiona!
      </p>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>1. USE OF THE PLATFORM</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          Kiona is an e-commerce platform offering skincare products, including but not limited to face washes, serums, moisturizers, oils, masks, and related accessories. You can browse, purchase, and review our products on the Platform.
        </p>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          You agree to use the Platform for lawful purposes only and acknowledge that Kiona facilitates the sale of products, but is not a party to the transactions between buyers and sellers.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>2. ELIGIBILITY</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          To use Kiona, you must be at least 18 years old or have the involvement of a parent or guardian if you are a minor. You must also provide accurate and up-to-date information when registering or making purchases.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>3. ACCOUNT REGISTRATION</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          To make purchases on Kiona, you will need to register by providing personal information like your name, email address, shipping details, and password. You are responsible for maintaining the security of your account.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>4. PRODUCT INFORMATION AND PRICING</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          We strive to provide accurate descriptions of all products listed on Kiona, though we cannot guarantee 100% accuracy. Prices may change without notice, and promotions may be subject to additional terms and conditions.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>5. ORDERS AND PAYMENTS</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          Payments for orders can be made via credit card, debit card, UPI, or other supported methods. Cancellations and refunds are subject to our refund policy.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>6. SHIPPING AND DELIVERY</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          We will make every effort to deliver your products within the specified timeframe. Shipping charges will be calculated during checkout.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>7. RETURN AND REFUND POLICY</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          If you receive a damaged or defective product, you must contact our customer support team within 7 days for a return or refund.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>8. USER CONDUCT AND REVIEWS</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          You may submit reviews and content related to products. However, you agree not to post any content that is defamatory, offensive, or violates intellectual property rights. We reserve the right to remove or modify content at our discretion.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>9. INTELLECTUAL PROPERTY RIGHTS</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          All content on Kiona, including images, logos, and text, is the intellectual property of Kiona Skin Care or its licensors and may not be used without permission.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>10. DISCLAIMER OF WARRANTIES</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          We provide the Platform "as is" and make no representations regarding the availability, accuracy, or performance of the Platform or products.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>11. LIMITATION OF LIABILITY</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          Kiona Skin Care will not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Platform. Our liability is limited to the amount paid for the product.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>12. INDEMNIFICATION</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          You agree to indemnify and hold harmless Kiona and its affiliates from any claims or losses arising out of your use of the Platform or breach of these Terms.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>13. MODIFICATIONS</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          Kiona reserves the right to modify these Terms at any time. Any changes will be effective upon posting on the Platform.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>14. GOVERNING LAW AND JURISDICTION</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>
          These Terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts in Noida, UttarPradesh.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>15. CONTACT US</h4>
        <p style={{fontFamily:"'Harmonia Sans', sans-serif"}}>If you have any questions or concerns about these Terms, please contact us at:</p>
        <ul>
          <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}>Email: support@kiona.com</li>
          {/* <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}>Phone: +91-1234567890</li>
          <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}>Address: Kiona Skin Care, 123 Green Avenue, Mumbai, India</li> */}
        </ul>
      </section>

      <p style={{ textAlign: "center", fontSize: "18px", color: "#555", fontFamily:"'Harmonia Sans', sans-serif" }}>
        By accessing or using Kiona, you agree to these Terms and Conditions. Thank you for choosing Kiona!
      </p>
    </div>
  <Footer/>
    </div>
  )
}

export default Termcondition