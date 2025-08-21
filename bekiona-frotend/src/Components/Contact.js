import React, {  useState, useEffect } from "react";
import './Contact.css';
import Header from './Header';
import Footer from './footer';
import api from './api';
import Cuheader from "./Customerdashboard/Cuheader";

function Contact() {

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
  

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseMessage("");

    // Validate Inputs
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setError("All fields are required!");
      return;
    }

    try {
      // Assuming `api` is an axios instance, use it directly
      const response = await api.post(
        "contact", // Replace with your actual API endpoint
        contactForm, // Send form data
        {
          headers: { "Content-Type": "application/json" }, // Send as JSON
        }
      );

      if (response.status === 200) {
        setResponseMessage("Message sent successfully!");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError("Failed to send message. Try again later.");
    }
  };





  return (
    <div>

        <div>
          {/* If token exists, show Cuheader, else show Header */}
{token ? <Cuheader /> : <Header />}
            {/* <Header/> */}
        </div>
 {/*star contaus page------------------------------------------------------------------------------  */}
 <div className='container' style={{textAlign:"center", marginTop:"10rem"}}>
    <div className='row'>
        <div className='col'>
          <span style={{fontSize:"40px", fontWeight:"bold"}}>Get In Touch</span>
          <p>We value your questions and feedback. Get in touch with us for business inquiries, collaborations, or support.</p>

        </div>
    </div>
</div>

<div className="container" style={{marginTop:"30px"}}>
  <div className="row" style={{display:"flex",gap:"10px", justifyContent:"center"}}>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6", height: "13rem",width:"20rem", borderRadius:"10px"}}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-location-dot" style={{ fontSize: "40px" }}></i><br />
        <span>Office No. 326, Kashi plaza,</span>
        <p>kamrej, Surat pincode - 394185</p>
      </div>
    </div>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6",height: "13rem",width:"20rem",borderRadius:"10px" }}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-phone-volume" style={{ fontSize: "40px" }}></i><br />
        <span>support@kiona.con</span>
        <p>Need assistance? Our support team is here 24/7 to help you!</p>

      </div>
    </div>
    <div className="col-md-4" style={{ textAlign: "center", backgroundColor: "#f3f3f6",height: "13rem",width:"20rem",borderRadius:"10px" }}>
      <div style={{marginTop:"40px"}}>
        <i className="fa-solid fa-envelope" style={{ fontSize: "40px" }}></i><br />
        <span>info@example.com</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
    </div>
  </div>
</div>

{/* contactus form start------------------------------------------------------------------------ */}

<div className="contact-container">
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <p>We would love to hear from you. Please fill out the form below.</p>
          <hr />

          {error && <p className="error-message">{error}</p>}
          {responseMessage && <p className="success-message">{responseMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  className="input-style"
                  placeholder="Enter your name"
                  value={contactForm.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  className="input-style"
                  placeholder="Enter your email"
                  value={contactForm.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                className="input-style"
                placeholder="Enter subject"
                value={contactForm.subject}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Message *</label>
              <textarea
                name="message"
                className="input-style"
                placeholder="Write your message here..."
                value={contactForm.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>



<Footer/>




    </div>
  )
}

export default Contact