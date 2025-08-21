import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Footer from "./footer";
import "./VitamincFacewash.css";
import { useCart } from "./cartcontext";
import { useLocation } from "react-router-dom";
import api from "../Components/api";
import { useNavigate  } from "react-router-dom";
import Swal from 'sweetalert2';
import Cuheader from "./Customerdashboard/Cuheader";


function VitamincFacewash() {

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




//   const token=localStorage.getItem('usertoken')
//   const email=localStorage.getItem("email")


// useEffect(()=>
// { console.log(email);
//  console.log(token)

// },[])

  

  const location = useLocation();
  const id = location.state || {};
   const { productid } = useParams();
 
  const [review, setReview] = useState({ productId:"",comment: "", name: "", email: "", rating: 0 });

  const [Products, setProducts] = useState([]);
  const [category, setcategory] = useState("");
  const [activeTab, setActiveTab] = useState("description"); // 🟢 State for Tab Switching
   const [cartMessage, setCartMessage] = useState({}); // Individual messages for each product
    const [buttonColors, setButtonColors] = useState({}); // Track button color per product

    
      // Fetch product data from the API
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get("getproduct" );
            const matchedProduct = response.data.product.find((item) => item._id === productid);
          setProducts([matchedProduct]);
          } catch (error) {
            console.error("Error fetching product data:", error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);

  

  const [pid,setpid]=useState("")
  const getproduct = async () => {
    try {
      const resp = await api.get(`getproductbyid/${productid}`);
      setcategory(resp.data.product[0].product_category);
      // setProducts(resp.data.product);
      setReview({...review,productId:resp.data.product[0].product_code})
      setpid(resp.data.product[0].product_code)
    } catch (error) {
      console.log(error);
    }
  };
 
  // console.log(Products);
  // console.log(Products.product_description);
  

  const [relatedproducts, setrelatedproducts] = useState([]);
  const getproductbycategory = async () => {
    try {
      const resp = await api.get(`getproductbycategory/${category}`);
      setrelatedproducts(resp.data.product.filter((item) => item._id !== Products[0]._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, [id]);

  useEffect(() => {
    getproductbycategory();
  }, [category]);

  const { cart, setcart } = useCart();

  // Add to Cart function
  
    const handleprouctadd = (product) => {
      const isProductInCart = cart.some((item) => item._id === product._id);
    
      if (!isProductInCart) {
        // Add product to the cart
        setcart([...cart, product]);
    
        // Change button color for the clicked product
        setButtonColors((prev) => ({
          ...prev,
          [product._id]: "#FF5F00",
        }));
    
        // Set cart message
        setCartMessage((prev) => ({
          ...prev,
          [product._id]: "Your product has been added to the cart!",
        }));
    
        // Hide the message after 2 seconds
        setTimeout(() => {
          setCartMessage((prev) => ({
            ...prev,
            [product._id]: "",
          }));
        }, 2000);
      } else {
        Swal.fire({
          title: "Warning!",
          text: "Product already in your cart",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    };
    
   


     const navigate=useNavigate()
  
      const handleProductClick = (id) => {
        navigate(`/product/${id}`); // Navigate to specific product details page
      };


      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + " ...";
        }
        return text;
      };

      
      

      

      const handleRating = (value) => {
        setReview(prev => ({ ...prev, rating: value }));
      };
      const addreview = async () => {
        try {
          const resp = await api.post('review', review);
          if (resp.status === 200) {
                      Swal.fire({
                        title: 'Success!',
                        text: 'review saved successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                      });
                    }
        } catch (error) {
          console.log(error);
          
          
        }
        
      }




      const [newReviews, newSetReviews] = useState([]); // Changed state names
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await api.get(`getreview/${pid}`);
            // console.log(response);
            
            newSetReviews(response.data); // Updated state setter
          } catch (error) {
            console.error("Error fetching reviews:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchReviews();
      }, [pid]);






      const productUrl = encodeURIComponent(`https://yourwebsite.com/product/${pid}`);
      const productImage = encodeURIComponent(Products[0]?.product_image || "default-image.jpg");
      const productName = encodeURIComponent(Products[0]?.product_name || "Product");
      
      // ✅ Facebook Share
      const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&picture=${productImage}&text=${productName}`;
      
      // ✅ Twitter Share
      const twitterShare = `https://twitter.com/intent/tweet?url=${productUrl}&text=${productName}&picture=${productImage}`;
      
      // ✅ LinkedIn Share
      const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=&text=${productName}${productUrl}&picture=${productImage}`;





 

  return (
    <div>

{/* If token exists, show Cuheader, else show Header */}
{token ? <Cuheader /> : <Header />}



      {/* {
        token &&(
          <Cuheader/>
        )
      }
      <Header /> */}

      <div style={{ display: "flex", gap: "10px", padding: "20px",marginTop:"100px",padding:"90px", backgroundColor:"#fcf7ee" }}>
  {Products.map((product) => (
    <div
      key={product.id}
      style={{
        display: "flex",
        gap: "20px",
        // borderBottom: "1px solid #ddd",
        // paddingBottom: "20px",
        marginBottom: "20px",
      }}
    >
      {/* Product Image */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
      <img
          src={product?.product_image}
          style={{ height: "100%", width:"100%", boxShadow:"10px 10px 20px rgba(0,0,0,0.2)" }}
          alt={product?.product_name || "Product Image"}
          // className="img-fluid"
        />
      </div>

      {/* Product Details */}
      <div style={{ flex: "2", paddingLeft: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          {product.product_name}
        </h2>
        <p style={{ fontSize: "18px", color: "#555" }}>₹{product.product_price}</p>
        <div style={{ display: "flex", margin: "10px 0" }}>
          <span style={{ color: "#f4c150", marginRight: "10px" }}>★★★★☆</span>
          <span>(4.5)</span>
        </div>
        <p
  style={{
    color: "#777",
    marginBottom: "20px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 3, // Show only 3 lines
  }}
  dangerouslySetInnerHTML={{
    __html: product.product_description, // Pass the actual HTML content
  }}
/>

        <div>
          <button
           onClick={() => handleprouctadd(product)}
            style={{
              padding: "10px 20px",
              backgroundColor: cart.some(item => item._id === product._id) 
              ? "green"  // Change this to your desired color when item is in cart
              : "#c8b89a",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ADD TO CART
          </button>

         
          {/* <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#ddd",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ADD TO WISHLIST
          </button> */}
        </div>


  {/* Display message if available */}
  {cartMessage[product._id] && (
  <p
    style={{
      color: "#fff", // White text for contrast
      fontSize: "0.9rem",
      fontWeight: "600",
      background: "linear-gradient(45deg, #4CAF50, #45A049)", // Smooth green gradient
      padding: "10px 15px",
      borderRadius: "8px",
      marginTop: "10px",
      display: "inline-block",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", // Soft shadow effect
      borderLeft: "4px solid #2E7D32", // Left border for a card-like feel
      textAlign: "center",
      letterSpacing: "0.5px",
      transition: "transform 0.3s ease-in-out", // Animation on hover
    }}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Slight zoom on hover
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    ✅ {cartMessage[product._id]}
  </p>
)}


        
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          <p>SKU: {product.product_sku}</p>
          <p>Categories: {product.product_category}</p>
          {/* <p>Tag: {product.tag}</p> */}
          <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  Share:{" "}
  <a href={linkedinShare} target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5", textDecoration: "none" }}>LinkedIn</a>
  <a href={twitterShare} target="_blank" rel="noopener noreferrer" style={{ color: "#1da1f2", textDecoration: "none" }}>Twitter</a>
  <a href={facebookShare} target="_blank" rel="noopener noreferrer" style={{ color: "#3b5998", textDecoration: "none" }}>Facebook</a>
</p>
        </div>
      </div>
    </div>
  ))}
</div>

<div style={{ 
  borderTop: "1px solid #ddd", 
  margin: "0 50px" // Adds 50px margin to left and right
}}></div>


     {/* ⭐⭐ Tab Section (Description, Additional Info, Reviews) ⭐⭐ */}
<div style={{  maxWidth: "900px", margin: "0 auto" }}>
  {/* Tabs */}
  <div style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid #ddd" }}>
    {["description", "info", "reviews"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
          background: activeTab === tab ? "#f4c150" : "#fff",
          color: activeTab === tab ? "#fff" : "#333",
          padding: "12px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid #f4c150",
          borderBottom: activeTab === tab ? "none" : "1px solid #ddd",
          cursor: "pointer",
          flex: 1,
          transition: "0.3s ease",
          textTransform: "uppercase",
        }}
      >
        {tab === "description" ? "Description" : tab === "info" ? "Additional Info" : "Reviews"}
      </button>
    ))}
  </div>

  {/* ⭐ Tab Content */}
  <div style={{ background:"transparent", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
  {activeTab === "description" && (
  <div style={{ fontSize: "18px", lineHeight: "1.6", color: "#444" }}>
    {Products.map((item, index) => (
      <p style={{ color: "#777", marginBottom: "20px" }}
      dangerouslySetInnerHTML={{
        __html: item.product_description, // Pass the actual HTML content
      }}
   />
    ))}
  </div>
)}

  {activeTab === "info" &&   <div style={{ fontSize: "18px", lineHeight: "1.6", color: "#444" }}>
  {Products.map((item, index) => (
    <p key={index} style={{ color: "#777", marginBottom: "20px" }}>
      {item.product_benefits }  {/* Render as plain text */}
    </p>
  ))}
</div>}
  {activeTab === "reviews" && (
    <div>
     <h3 style={{ fontSize: "22px", marginBottom: "15px", color: "#333" }}>Customer Reviews</h3>

{loading ? (
  <p>Loading reviews...</p>
) : newReviews.length > 0 ? ( // Updated state reference
  newReviews.map((review, index) => ( // Updated state reference
    <div
      key={index}
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "left",
      }}
    >
      <strong style={{ fontSize: "16px", color: "#333" }}>{review.name}:</strong>
      <p style={{ margin: "5px 0", fontSize: "16px", color: "#555" }}>{review.comment}</p>
      <span style={{ color: "#f4c150", fontSize: "16px" }}>
        {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
      </span>
    </div>
  ))
) : (
  <p style={{ fontSize: "16px", color: "#777" }}>No reviews yet.</p>
)}

      {/* ⭐ Add Review Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <h3 style={{ fontSize: "22px", marginTop: "20px", color: "#333" }}>Add a Review</h3>

      {/* ⭐ Star Rating Selection */}
      <div style={{ fontSize: "24px", marginBottom: "10px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              color: star <= review.rating ? "#f4c150" : "#ddd",
              marginRight: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Display selected rating */}
      <p style={{ fontSize: "16px", color: "#333" }}>Selected Rating: {review.rating} Stars</p>

      <textarea 
        placeholder="Your review" 
        style={{ width: "100%", height: "80px", padding: "10px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "10px" }} 
        onChange={(e) => setReview({...review, comment: e.target.value})}
      />
      
      <br />
      <input 
        type="text" 
        placeholder="Name" 
        style={{ padding: "12px", marginRight: "10px", width: "48%", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} 
        onChange={(e) => setReview({...review, name: e.target.value})}
      />
      
      <input 
        type="email" 
        placeholder="Email" 
        style={{ padding: "12px", width: "48%", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} 
        onChange={(e) => setReview({...review, email: e.target.value})}
      />
      
      <br />
      <button 
        style={{ marginTop: "15px", padding: "12px 20px", backgroundColor: "#f4c150", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold", borderRadius: "8px", transition: "0.3s ease" }} 
        onClick={addreview}
      >
        Submit Review
      </button>
    </div>
    </div>
  )}
</div>

</div>


{/* Related product----------------------------------------------------------------------------------------- */}


<div style={{ margin: "0 auto", padding: "20px 50px" }}>
<h2 className='relatedproduct' style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px", marginTop:"100px", fontSize:"35px" }}>
    Check out these related items
</h2>

  <div
    className="row"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      gap: "20px",
      overflow: "hidden", // Prevents unwanted scrolling
      paddingBottom: "20px",
    }}
  >
    {relatedproducts.map((product) => (
      <div
        key={product.id}
        className="col-12 col-sm-6 col-md-4 col-lg-3"
        style={{
          height: "550px",
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="grocery-card"
          style={{
            width: "95%",
            maxWidth: "300px",
            backgroundColor: "#fff",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={product.product_image}
              alt={product.product_name}
              className="grocery-card-image img-fluid"
              style={{
                width: "100%",
                height: "270px",
                objectFit: "cover",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                borderRadius: "10px",
              }}
              onClick={() =>
                navigate("/vitamincfaceash", { state: product._id })
                }
            />
          </div>
          <span
  className="grocery-card-name"
  style={{
    fontSize: "1rem",
    height: "3rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: "10px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    maxWidth: "90%",
    fontFamily: "'ITC Modern No 216', serif",
  }}
>
  {truncateText(product.product_name, 30)} {/* Adjust maxLength as needed */}
</span>

          <div
            className="grocery-card-rating"
            style={{
              fontSize: "1rem",
              color: "#ffc107",
              margin: "5px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {"★".repeat(product.rating)}
            <span style={{ color: "#ccc", marginLeft: "5px" }}>
              {"★".repeat(5 - product.rating)}
            </span>
          </div>
          <p
            className="grocery-card-price"
            style={{
              fontSize: "1rem",
              color: "#666",
              marginTop: "5px",
            }}
          >
            ₹{product.product_price}
          </p>
          <button
            onClick={() => handleprouctadd(product)}
            className="add-to-cart-btn"
            style={{
              backgroundColor: cart.some(item => item._id === product._id) 
              ? "green"  // Change this to your desired color when item is in cart
              : "rgb(51, 51, 51)",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "5px",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "10px",
              width: "80%",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>

           {/* Display message if available */}
           {cartMessage[product._id] && (
  <p
    style={{
      color: "#fff", // White text for contrast
      fontSize: "0.9rem",
      fontWeight: "600",
      background: "linear-gradient(45deg, #4CAF50, #45A049)", // Smooth green gradient
      padding: "10px 15px",
      borderRadius: "8px",
      marginTop: "10px",
      display: "inline-block",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", // Soft shadow effect
      borderLeft: "4px solid #2E7D32", // Left border for a card-like feel
      textAlign: "center",
      letterSpacing: "0.5px",
      transition: "transform 0.3s ease-in-out", // Animation on hover
    }}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Slight zoom on hover
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    ✅ {cartMessage[product._id]}
  </p>
)}

        </div>
      </div>
    ))}
  </div>
</div>









      <Footer />
    </div>
  );
}

export default VitamincFacewash;
