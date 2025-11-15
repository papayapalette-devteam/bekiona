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

<div className="w-full bg-[#fcf7ee] pt-28 pb-16 px-4 md:px-20">

  {/* ---------- PRODUCT SECTION ---------- */}
  {Products.map((product) => (
    <div
      key={product._id}
      className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl shadow-xl p-6 md:p-10"
    >
      {/* Product Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={product?.product_image}
          alt={product?.product_name}
          className="rounded-xl shadow-2xl w-full max-w-md object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {product.product_name}
        </h2>

        {/* Price */}
        <p className="text-2xl font-semibold text-gray-700">
          ₹{product.product_price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">★★★★☆</span>
          <span className="text-gray-600">(4.5)</span>
        </div>

        {/* Description (clamped) */}
        <p
          className="text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.product_description }}
        />

        {/* Add to Cart */}
        <button
          onClick={() => handleprouctadd(product)}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-all
            ${cart.some((i) => i._id === product._id)
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#c8b89a] hover:bg-[#b5a88e]"
            }`}
        >
          ADD TO CART
        </button>

        {/* Cart Message */}
        {cartMessage[product._id] && (
          <p className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md inline-block">
            ✅ {cartMessage[product._id]}
          </p>
        )}

        {/* SKU + Category */}
        <div className="pt-4 text-gray-600 space-y-1">
          <p>SKU: {product.product_sku}</p>
          <p>Category: {product.product_category || "N/A"}</p>

          {/* Social Share */}
          <div className="flex items-center gap-3 mt-2">
            <span className="font-semibold">Share:</span>
            <a href={linkedinShare} className="text-blue-700 font-medium">LinkedIn</a>
            <a href={twitterShare} className="text-sky-500 font-medium">Twitter</a>
            <a href={facebookShare} className="text-blue-600 font-medium">Facebook</a>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Divider */}
  <div className="border-t border-gray-300 my-12"></div>

  {/* ---------- TABS SECTION ---------- */}
  <div className="max-w-4xl mx-auto">

    {/* Tabs */}
    <div className="flex border-b border-gray-300">
      {["description", "info", "reviews"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 text-lg font-semibold uppercase transition-all
            ${activeTab === tab
              ? "bg-yellow-500 text-white border-b-4 border-yellow-600"
              : "bg-white text-gray-700 hover:bg-yellow-100"
            }`}
        >
          {tab === "description"
            ? "Description"
            : tab === "info"
            ? "Additional Info"
            : "Reviews"}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    <div className="bg-white shadow-md p-6 md:p-10 rounded-b-xl text-gray-700">

      {/* Description */}
      {activeTab === "description" && (
        <div className="text-lg leading-relaxed">
          {Products.map((item) => (
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: item.product_description }}
            />
          ))}
        </div>
      )}

      {/* Additional Info */}
      {activeTab === "info" && (
        <div className="text-lg">
          {Products.map((item) => (
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              {item.product_benefits.map((b, index) => (
                <li key={index}>{b}</li>
              ))}
            </ul>
          ))}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>

          {loading ? (
            <p>Loading reviews...</p>
          ) : newReviews.length > 0 ? (
            newReviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 mb-4 rounded-lg"
              >
                <strong className="text-gray-900 text-lg">{review.name}</strong>
                <p className="text-gray-700">{review.comment}</p>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          {/* Add Review */}
          <div className="mt-10">

            <h3 className="text-2xl font-semibold mb-4">Add a Review</h3>

            {/* Rating Stars */}
            <div className="text-3xl mb-3 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`cursor-pointer transition ${
                    star <= review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Inputs */}
            <textarea
              placeholder="Your review"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-1/2 border border-gray-300 rounded-lg p-3"
                onChange={(e) =>
                  setReview({ ...review, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-1/2 border border-gray-300 rounded-lg p-3"
                onChange={(e) =>
                  setReview({ ...review, email: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <button
              onClick={addreview}
              className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
</div>



{/* Related product----------------------------------------------------------------------------------------- */}


{/* <div style={{ margin: "0 auto", padding: "20px 50px" }}>
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
      overflow: "hidden", 
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
  {truncateText(product.product_name, 30)} 
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
              ? "green"  
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

           
           {cartMessage[product._id] && (
  <p
    style={{
      color: "#fff", 
      fontSize: "0.9rem",
      fontWeight: "600",
      background: "linear-gradient(45deg, #4CAF50, #45A049)", 
      padding: "10px 15px",
      borderRadius: "8px",
      marginTop: "10px",
      display: "inline-block",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", 
      borderLeft: "4px solid #2E7D32", 
      textAlign: "center",
      letterSpacing: "0.5px",
      transition: "transform 0.3s ease-in-out", 
    }}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} 
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    ✅ {cartMessage[product._id]}
  </p>
)}

        </div>
      </div>
    ))}
  </div>
</div> */}

      <Footer />
    </div>
  );
}

export default VitamincFacewash;
