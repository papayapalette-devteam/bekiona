import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from './footer'
import Cuheader from "./Customerdashboard/Cuheader";

function Faq() {

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
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" , fontFamily:"'ITC Modern No 216', serif" }}>
        Frequently Asked Questions
      </h1>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>1. What ingredients are used in Kiona products?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Kiona products are formulated using the finest natural and plant-based ingredients. We avoid harsh chemicals and use organic extracts, essential oils, and other skin-loving ingredients to ensure the best care for your skin.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>2. Are Kiona products suitable for all skin types?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Yes, Kiona products are designed to be gentle and effective for all skin types. Whether you have dry, oily, sensitive, or combination skin, we have products that can meet your needs. If you have specific skin concerns, our customer support team is available to assist you in finding the best products for you.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>3. Are Kiona products tested on animals?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          No, we do not test our products on animals. Kiona is a cruelty-free brand, and we are committed to ethical practices in the creation of our skincare products.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>4. How do I use Kiona skincare products?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Each Kiona product comes with detailed instructions on how to use it for maximum benefits. Our general advice is to apply products to clean, dry skin. We also recommend performing a patch test prior to using any new product to check for sensitivities.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>5. Are your products safe for sensitive skin?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" ,fontFamily:"'Harmonia Sans', sans-serif"}}>
          Yes, Kiona products are formulated with sensitive skin in mind. We carefully select ingredients that are gentle and non-irritating. However, we always recommend performing a patch test before using any new product to ensure it is suitable for your skin type.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>6. Do you offer international shipping?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Yes, we offer international shipping to several countries. You can check the available shipping options during checkout. Please note that shipping costs and delivery times may vary depending on your location.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>7. How can I contact Kiona customer support?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" ,fontFamily:"'Harmonia Sans', sans-serif"}}>
          You can reach our customer support team by emailing us at <strong>support@kiona.com</strong>. We are happy to assist you with any product inquiries or concerns you may have.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>8. What is your return policy?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          We want you to love your Kiona products. If you're not completely satisfied, you can return your items within 30 days of purchase for a full refund or exchange. Please check our Return & Cancellation Policy for more details.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>9. How do I track my order?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Once your order has been shipped, you will receive a tracking number via email. You can use this number to track the status of your order on the courier’s website.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333", fontFamily:"'ITC Modern No 216', serif"  }}>10. Are your products environmentally friendly?</h4>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6",fontFamily:"'Harmonia Sans', sans-serif" }}>
          Yes, Kiona is committed to sustainability. We use eco-friendly packaging and are constantly working to minimize our environmental impact. Our products are cruelty-free, and we strive to source ingredients responsibly.
        </p>
      </section>
    </div>

<Footer/>

    </div>
  )
}

export default Faq