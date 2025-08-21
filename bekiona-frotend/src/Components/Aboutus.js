import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from './footer'
import Cuheader from "./Customerdashboard/Cuheader";

function Aboutus() {

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
  <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>
    About Us
  </h1>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>Our Story</h4>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      Kiona was founded with one simple goal in mind: to bring the purest and most natural skincare products to the world. In a world where harsh chemicals dominate, we believe in harnessing the power of organic and plant-based ingredients to nurture and protect your skin. 
    </p>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      Our journey began in 2020 when a team of skincare professionals and holistic health experts came together to create a brand that celebrates nature’s healing power. From face washes to serums, every Kiona product is crafted with care and precision to offer the best of both nature and science.
    </p>
  </section>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>Our Mission</h4>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      At Kiona, our mission is simple: to offer skincare that nurtures the skin without harming the environment. We are committed to creating products that are not only effective but also safe for the planet. 
    </p>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      We believe that beauty should never come at the cost of our planet’s health, and our aim is to deliver skincare solutions that help you look and feel your best while staying true to nature.
    </p>
  </section>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif" }}>Our Values</h4>
    <ul style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
      <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}><strong>Purity:</strong> We believe in the power of natural ingredients to nourish and rejuvenate your skin.</li>
      <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}><strong>Transparency:</strong> We are open and honest about the ingredients we use and the processes we follow.</li>
      <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}><strong>Sustainability:</strong> Our commitment to the planet drives us to create eco-friendly products and packaging.</li>
      <li style={{fontFamily:"'Harmonia Sans', sans-serif"}}><strong>Customer-Centric:</strong> We put our customers at the heart of everything we do, ensuring quality and care in every product.</li>
    </ul>
  </section>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>Why Choose Kiona?</h4>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      At Kiona, we are more than just a skincare brand—we are your partner in achieving healthy, glowing skin. With our dedication to high-quality, plant-based ingredients, you can trust that our products are safe, effective, and gentle on your skin. 
    </p>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      Every product is thoughtfully formulated to address the unique needs of different skin types, from hydration to anti-aging. We promise that each Kiona product delivers on its promises—pure skincare that works.
    </p>
  </section>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>Our Promise to You</h4>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" ,fontFamily:"'Harmonia Sans', sans-serif"}}>
      We are committed to your satisfaction and well-being. Our products are created with the highest standards of quality, ensuring that your skin receives only the best. If you have any questions or concerns, our dedicated customer support team is always ready to assist.
    </p>
  </section>

  <section>
    <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>Connect with Us</h4>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
      We love hearing from our customers! Whether you have a question about our products or would like to share your Kiona experience, feel free to reach out. Connect with us on social media or send us an email.
    </p>
    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" ,fontFamily:"'Harmonia Sans', sans-serif"}}>
      <strong>Email:</strong> support@kiona.com
    </p>
  </section>
</div>

    <Footer/>
    </div>
  )
}

export default Aboutus