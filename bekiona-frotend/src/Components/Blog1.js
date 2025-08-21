import React, { useState, useEffect } from "react";
import api from './api'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from "./footer";
import Cuheader from "./Customerdashboard/Cuheader";


function Blog1() {
  const [blogPosts, setBlogPosts] = useState([]);

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
  

  // Fetch blog posts from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("getblog"); // Replace with your API endpoint
        setBlogPosts(response.data); // Assuming the API returns an array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error.message || error);
      }
    };

    fetchBlogs();
  }, []);

   const navigate=useNavigate()
  
      const handleProductClick = (id) => {
        navigate(`/product/${id}`); // Navigate to specific product details page
      };

  return (
    <div>
     
     {/* If token exists, show Cuheader, else show Header */}
     {token ? <Cuheader /> : <Header />}
      {/* <Header /> */}

      <div
  style={{
    backgroundColor:"rgba(223, 255, 191, 0.18)",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    marginTop: "8rem",
  }}
>
  <div style={{ textAlign: "center", marginBottom: "40px" }}>
    <h1>Kiona Tales</h1>
  </div>
  <div className="row g-4">
    {blogPosts.map((post, index) => (
      <div className="col-md-4" key={index}>
        <div
          className="card h-100 shadow-sm"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <img
            src={post.image}
            className="card-img-top"
            alt={`Blog ${index + 1} Image`}
          />
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "1.25rem", fontWeight: "bold" }}
            >
              {post.title}
            </h5>
            <p className="card-text text-muted">{post.date}</p>
            <p
              className="card-text"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {post.description}
            </p>
            <a
              // href={`/blog/${post.id}`}
              className="btn btn-link p-0"
              style={{ color: "#007bff", textDecoration: "none" }}
              onClick={() => navigate('/blog2',{state:post._id})}
            >
              Read more...
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
  {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
    <button
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
      onClick={() => navigate('/blog1')} // Redirect to all blogs
    >
      View All
    </button>
  </div> */}
</div>
<Footer/>
    </div>
  );
}

export default Blog1;
