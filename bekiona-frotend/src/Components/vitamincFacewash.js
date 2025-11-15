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



const [isZoomed, setIsZoomed] = useState(false);
const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
const handleMouseMove = (e) => {
  const { left, top, width, height } = e.target.getBoundingClientRect();
  setImageSize({ width, height });

  const x = e.clientX - left;
  const y = e.clientY - top;

  setLensPosition({ x, y });
};

const handleMouseEnter = () => {
  setIsZoomed(true);
};

const handleMouseLeave = () => {
  setIsZoomed(false);
};



 

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

 {Products.map((product) => (
  <div
    key={product._id}
    className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-2xl p-10"
  >
    {/* LEFT SIDE : IMAGE WITH ZOOM ONLY */}
    <div className="flex-1 flex flex-col items-center gap-5">

   <div className="relative group overflow-hidden rounded-3xl shadow-xl w-full max-w-md">
  
  {/* MAIN IMAGE */}
  <img
    src={product.product_image}
    alt={product.product_name}
    className="rounded-3xl w-full object-contain"
    onMouseMove={handleMouseMove}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  />

  {/* MAGNIFIER LENS */}
  {isZoomed && (
    <div
      className="absolute pointer-events-none rounded-full border-2 border-gray-300"
      style={{
        width: "150px",
        height: "150px",
        top: lensPosition.y - 75,
        left: lensPosition.x - 75,
        backgroundImage: `url(${product.product_image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${imageSize.width * 2}px ${imageSize.height * 2}px`,
        backgroundPosition: `-${lensPosition.x * 2 - 75}px -${lensPosition.y * 2 - 75}px`,
      }}
    ></div>
  )}
</div>

      

    </div>

    {/* RIGHT SIDE PRODUCT INFO */}
    <div className="flex-1 space-y-5">
      <h2 className="text-4xl font-extrabold text-gray-900">{product.product_name}</h2>

      <p className="text-3xl font-bold text-gray-700">₹{product.product_price}</p>

      <div className="flex items-center gap-2">
        <span className="text-yellow-400 text-2xl">★★★★☆</span>
        <span className="text-gray-600">(4.5)</span>
      </div>

      <p
        className="text-gray-600 line-clamp-4"
        dangerouslySetInnerHTML={{ __html: product.product_description }}
      />

      <button
        onClick={() => handleprouctadd(product)}
        className={`px-8 py-4 rounded-xl text-white font-semibold shadow-md transition-all ${
          cart.some((i) => i._id === product._id)
            ? "bg-green-600 hover:bg-green-700"
            : "bg-[#c8b89a] hover:bg-[#b5a88e]"
        }`}
      >
        ADD TO CART
      </button>

      {cartMessage[product._id] && (
        <p className="px-4 py-2 bg-green-600 text-white rounded-lg inline-block">
          {cartMessage[product._id]}
        </p>
      )}

      <p>Weight: {product.product_sku}</p>
      <p>Category: {product.product_category}</p>
    </div>
  </div>
))}



      {/* ---------- TABS ---------- */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex border-b">
          {["description", "info", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-lg font-bold ${
                activeTab === tab
                  ? "bg-yellow-500 text-white border-b-4 border-yellow-600"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white p-10 rounded-b-xl shadow-xl">

          {/* Description */}
          {activeTab === "description" && (
            <div className="text-lg">
              {Products.map((item) => (
                <div
                  dangerouslySetInnerHTML={{ __html: item.product_description }}
                />
              ))}
            </div>
          )}

          {/* Info */}
          {activeTab === "info" && (
            <ul className="list-disc ml-6 space-y-3 text-gray-700">
              {Products[0].product_benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-semibold mb-5">Customer Reviews</h3>

              {newReviews.map((r, i) => (
                <div key={i} className="border p-4 rounded-xl mb-4">
                  <strong>{r.name}</strong>
                  <p>{r.comment}</p>
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(r.rating)}
                  </span>
                </div>
              ))}

              {/* Add review */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">Add Review</h3>

                <div className="text-3xl mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`cursor-pointer ${
                        star <= review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  placeholder="Write review..."
                  className="w-full p-3 border rounded-xl mb-3"
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-xl mb-3"
                  onChange={(e) =>
                    setReview({ ...review, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-xl mb-3"
                  onChange={(e) =>
                    setReview({ ...review, email: e.target.value })
                  }
                />

                <button
                  onClick={addreview}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>





      <Footer />
    </div>
  );
}

export default VitamincFacewash;
