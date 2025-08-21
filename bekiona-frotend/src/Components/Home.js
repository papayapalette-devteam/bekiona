import React, { useState } from "react";
import "./Home.css";
import Header from '../Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useCart } from "./cartcontext";

function Home() {

  const {cart, setcart}=useCart()
  
  // const [cart, setcart] = useState([]);

  const products = [
    { id: 1, name: "Vitamin C Face Wash (Brightens & Evens Skin Tone),100gm", price: "599/-", image: "https://www.richfeelnaturals.com/cdn/shop/files/vitamin-c-face-wash1_a2da8366-3d65-4193-b1f9-94a5b965206a.jpg?v=1718106105",  quantity: 1, },
    { id: 2, name: "Anti-Acne Face Wash – Clear, Blemish-Free Skin 100ml ", price: "299/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/toner/1/j/0/100-vitamin-c-face-toner-brightening-even-toned-glowing-skin-20-original-imagykjh7vhazh5y.jpeg?q=90&crop=false",  quantity: 1, },
    { id: 3, name: "Gold Scrub Face Wash – Radiance and Renewal in Every Wash 100ml ", price: "349/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42UXP9vdgdvl5INwaQzAnjlX6MNQZQBSj-w&s",  quantity: 1, },
    { id: 4, name: "Anti Hair fall Shampoo (Strengthens and Fortifies) 200ml ", price: "499/-", image: "https://www.ayouthveda.com/cdn/shop/files/Antihairfallshampooecommerce-03_1800x1800.jpg?v=1686936228" ,  quantity: 1,},
    
  ];

  const products1 = [
    { id: 1, name: "Rosemary hair oil(Stimulates Hair Growth,Prevents Hair Fall) 100ml ", price: "599/-", image: "https://m.media-amazon.com/images/I/31UXwtknKHL.jpg",  quantity: 1, },
    { id: 2, name: "Hair Serum For(Nourishes & Conditions,Frizz Control) 100ml  ", price: "299/-", image: "https://www.mcaffeine.com/cdn/shop/files/card_1_9dabaa46-daa8-4ff4-b2ba-9aae5c561d52.jpg?v=1717154284",  quantity: 1, },
    { id: 3, name: "Gluta Soap (	Anti-inflammatory & Healing)  85gm  ", price: "349/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42UXP9vdgdvl5INwaQzAnjlX6MNQZQBSj-w&s",  quantity: 1, },
    { id: 4, name: "Anti Hair fall Shampoo (Strengthens and Fortifies) 200ml ", price: "499/-", image: "https://www.ayouthveda.com/cdn/shop/files/Antihairfallshampooecommerce-03_1800x1800.jpg?v=1686936228",  quantity: 1, },
    
  ];

  const products2 = [
    { id: 1, name: "Combo(Soap + Anti Acne Face wash + Vitamin C face wash)  ", price: "2000/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/face-wash/n/e/f/600-charcoal-vitamin-c-and-anti-acne-face-wash-combo-pack-original-imagvsrsyznf2cxf.jpeg?q=90&crop=false",  quantity: 1, },
    { id: 2, name: "Commbo For(Soap + Anti Acne face wash + Gold Scrub face wash) ", price: "2100/-", image: "https://www.ayouthveda.com/cdn/shop/files/Artboard2-100-min_3a4b56ed-9203-4dac-bc77-2297c96e01dd_1800x1800.jpg?v=1714455460",  quantity: 1, },
    { id: 3, name: "Combo (	Gold Scrub face wash + Vitamin C Face wash + Anti Acne face wash)  ", price: "1700/-", image: "https://m.media-amazon.com/images/I/815ayrekxUL._AC_UF1000,1000_QL80_.jpg",  quantity: 1, },
    { id: 4, name: "Combo(Hair Serum + Hair oil + Anti hair fall Shampoo) ", price: "2200/-", image: "https://products.drbatras.com/cdn/shop/products/pro-hair-fall-control-regime-shampoo-conditioner-hair-oil-hair-fall-serum-619381.jpg?v=1701180812",  quantity: 1, },
    
  ];

  const products3 = [
    { id: 1, name: "Combo(Shampoo + hair oil + Soap)  ", price: "2000/-", image: "https://m.media-amazon.com/images/I/51K0Vy3VbjL.jpg",  quantity: 1, },
    { id: 2, name: "Commbo For(Shampoo + Hair oil + Vitamin C Face wash) ", price: "2100/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/combo-kit/w/z/l/lati-hair-care-and-face-care-kit-hair-oil-shampoo-hair-original-imagretefgfhuzyf.jpeg?q=90&crop=false",  quantity: 1, },
    { id: 3, name: "Combo (	Shampoo + Hair oil + Gold Scrub)  ", price: "1700/-", image: "https://mridulmadhok.in/cdn/shop/products/WhatsAppImage2021-12-31at4.07.04AM.jpg?v=1640996010",  quantity: 1, },
    { id: 4, name: "Combo(Hair Serum + Hair oil + Anti hair fall Shampoo) ", price: "2200/-", image: "https://products.drbatras.com/cdn/shop/products/pro-hair-fall-control-regime-shampoo-conditioner-hair-oil-hair-fall-serum-619381.jpg?v=1701180812",  quantity: 1, },
    
  ];


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  // Function to increment quantity
  const incrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 } // Increment quantity for the specific item
          : item // Leave other items unchanged
      )
    );
  };

  const decrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart
        .map((item, i) =>
          i === index && item.quantity >= 1
            ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
            : item
        )
        .filter((item, i) => !(i === index && item.quantity === 0)) // Remove item if quantity reaches 0
    );
  };
  
  

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };
 
  

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  
  const [cartlength, setcartlength] = useState(0);
  // const handleprouctadd = (product) => {
  //   setcart([...cart, product]);
  //   const quantity = cart.length + 1;
  //   setcartlength(quantity);
  // };
  const handleprouctadd = (product) => {
    console.log('Adding product to cart:', product);
    setcart([...cart, product]);
  };
console.log(cart);



  return (
    <div>
{/* <div>
<Header/>
</div> */}

{/* header code---------------------------------------------------------------------------------------------- */}

<div style={{position:"fixed",left:"0",right:"0",zIndex:"1000",top:"0"}}>

<nav className="navbar navbar-expand-lg" >
  <div className="container">
    {/* Brand Logo */}
    <a className="navbar-brand text-white d-flex align-items-center" href="#">
      <span className="logo-icon me-2">ⓒ</span>LNBird{cart}
    </a>
    {/* Toggler for mobile view */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {/* Navbar links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
  <Link className="nav-link text-white" to="/">
    Home
  </Link>
</li>
<li className="nav-item">
      <Link className="nav-link text-white" to="/about">
        Product
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/about">
        Combo
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/about">
        Blog
      </Link>
    </li>
        <li className="nav-item">
  <Link className="nav-link text-white" to="/contact">
    Contact Us
  </Link>
</li>
      </ul>
      <div className="button-header">
      <button onClick={handleShow1} className="buttons-header">
      <i className="fa-solid fa-cart-shopping"></i> Cart {cartlength}
      </button>
      <button className="buttons-header" onClick={handleShow }>
      <i className="fa-solid fa-arrow-right-to-bracket"></i>Login
      </button>
      </div>
    </div>
  </div>
  </nav>
  <div className="category">
  <div
    className="bg-light p-2"
    style={{
      position: "fixed",
      zIndex: "1000",
      right: "0",
      left: "0",
      
    }}
  >
    <div
      className="container-lg d-flex justify-content-between align-items-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Categories Dropdown */}
    

      {/* Search Bar */}
      <div
  className="input-group"
  style={{
    maxWidth: "400px",
    flexGrow: 1,
    display: "flex", // Enables flexbox for child alignment
    justifyContent: "center", // Centers children horizontally
    alignItems: "center", // Centers children vertically
    margin: "auto", // Centers the div itself within the parent
  }}
>
        <input
          className="form-control"
          type="search"
          placeholder="Search your products here"
          aria-label="Search"
        />
        <button className="btn" style={{width:"3rem"}}>
          <i className="fa-solid fa-magnifying-glass"  ></i>
        </button>
      </div>


    </div>
  </div>
</div>


{/* modal code for login----------- */}

<Modal
  show={show}
  onHide={handleClose}
  centered
  dialogClassName="custom-modal"
>
  <Modal.Header style={{backgroundColor:"linear-gradient(to right, #fc2779, #ff79b0)"}} closeButton >
  <Modal.Title
  style={{
    fontSize: '24px',
    fontWeight: '600',
    color: '#fff', // Ensure text is visible on the gradient
    background: 'linear-gradient(to right, #fc2779, #ff79b0)',
    WebkitBackgroundClip: 'text', // Optional: Makes the text itself take the gradient color
    WebkitTextFillColor: 'transparent', // Optional: Fills the text with the gradient
    padding: '10px', // Add padding for better appearance
    borderRadius: '8px', // Round the corners
  }}
>
  Welcome to LNBird
</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div
      style={{
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        gap: '20px',
        flexWrap: 'wrap', // Makes it responsive
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #0078D7, #56CCF2)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Welcome!</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>
          Sign up with your mobile number to explore our features.
        </p>
        <img
          src="https://c8.alamy.com/comp/2BHAEDT/login-icon-isolated-on-special-blue-round-button-abstract-illustration-2BHAEDT.jpg"
          alt="Sign Up Illustration"
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#F9F9F9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ maxWidth: '300px', width: '100%' }}>
          <label
            htmlFor="mobileNumber"
            style={{
              fontSize: '14px',
              marginBottom: '8px',
              display: 'block',
              color: '#555',
            }}
          >
            Enter Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter Your Mobile No."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '15px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: '12px', marginBottom: '20px', color: '#777' }}>
            By continuing, you agree to LNBird's{' '}
            <a href="#" style={{ color: '#0078D7', textDecoration: 'none' }}>
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: '#0078D7', textDecoration: 'none' }}>
              Privacy Policy
            </a>.
          </p>
          <button
            style={{
              width: '100%',
              backgroundColor: '#FF5722',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '10px',
              boxShadow: '0 4px 8px rgba(255, 87, 34, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 12px rgba(255, 87, 34, 0.4)')}
            onMouseLeave={(e) => (e.target.style.boxShadow = '0 4px 8px rgba(255, 87, 34, 0.2)')}
          >
            CONTINUE
          </button>
          <button
            style={{
              width: '100%',
              backgroundColor: 'white',
              color: '#0078D7',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.border = '1px solid #0078D7')}
            onMouseLeave={(e) => (e.target.style.border = '1px solid #ddd')}
          >
            Existing User? Log in
          </button>
        </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>



{/* modal login end----------------------- */}





    </div>


{/* header code end---------------------------------------------------------------------------------------------- */}

{/* banner main------------------------------------------------------------------------------------------------- */}

 {/* Main Content */}
 <div className="container d-flex" style={{ marginTop: "10rem" }}>
        {/* Sidebar */}
        <div
  style={{
    width: "250px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRight: "1px solid #ddd",
    height: "60vh", // Correctly sets the height to the full viewport
    display: "flex",
    flexDirection: "column", // Ensures the list items stack vertically
  }}
>
  <h5 style={{ fontWeight: "bold", color: "#006400",textAlign:"center" }}>PRODUCTS</h5>
  <ul style={{listStyleType:"none",lineHeight:"40px",cursor:"pointer",textDecoration:"none"}}>
    <li ><Link to={'/vitamincfacewash'} style={{textDecoration:"none",color:"black"}}>Vitamin C Face Wash</Link></li>
    <li> <Link to={'/antiacnefacewash'} style={{textDecoration:"none",color:"black"}}>Anti-Acne Face Wash </Link></li>
    <li> <Link to={'/goldscrubfacewash'}style={{textDecoration:"none",color:"black"}}>Gold Scrub Face Wash </Link></li>
    <li> <Link to={'/antihairfallshampoo'} style={{textDecoration:"none",color:"black"}} >Anti Hair fall Shampoo</Link></li>
    <li><Link to={'/Rosemaryhairoil'} style={{textDecoration:"none",color:"black"}}>Rosemary hair oil </Link></li>
    <li><Link to={'/hairserum'} style={{textDecoration:"none",color:"black"}}>Hair Serum  </Link></li>
    <li><Link to={'/glutasoap'} style={{textDecoration:"none",color:"black"}}>Gluta Soap </Link></li>
    
  </ul>
     
      
      
   
</div>



        {/* Main Carousel Section */}
        <div style={{ flex: 1, padding: "20px" }}>
          {/* Carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-psd/aloe-vera-natural-cosmetics-banner-template-design_23-2148951958.jpg?t=st=1732791814~exp=1732795414~hmac=8ae9d831e9a2e4f306b59f7d22839838137cf57efb5d27c6567d64bdd798a707&w=826"
                    alt="Product 1"
                    style={{
                      Height: "100px",
                      maxWidth: "100%",
                     
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                
                </div>
              </div>
              {/* Slide 2 */}
              <div className="carousel-item">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-psd/aloe-vera-natural-cosmetics-banner-template-design_23-2148951958.jpg?t=st=1732791814~exp=1732795414~hmac=8ae9d831e9a2e4f306b59f7d22839838137cf57efb5d27c6567d64bdd798a707&w=826"
                    alt="Product 2"
                    style={{
                      Height: "100px",
                      maxWidth: "100%",
                      
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
            
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden"style={{color:"black"}} >Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
{/* banner main end--------------------------------------------------------------------------------------------- */}

{/* product cart section------------------------------------------------------------------------------------- */}

<div className="grocery-container">
      <h2 className="grocery-heading">Our Products</h2>
      <div className="grocery-row">
        {products.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>





{/* product cart section end---------------------------------------------------------------------------------- */}

{/* banner image------------------------------------------------------------------------------------------------ */}

<div className="container">
  <div className="row">
    <div className="col">
      <img src="https://www.reneecosmetics.in/cdn/shop/files/1000693230.jpg?v=1732552425&width=1500" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div>
{/* banner image end---------------------------------------------------------------------------------------------- */}

{/* 2product cart------------------------------------------------------------------------------------------------ */}

<div className="grocery-container">
      <div className="grocery-row">
        {products1.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={() => handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>


{/* 2 product cart end-------------------------------------------------------------------------------------------- */}

{/* product banner2 start----------------------------------------------------------------------------------------- */}

<div className="container">
  <div className="row">
    <div className="col">
      <img src="https://images-static.nykaa.com/uploads/fb6935ac-7488-42d2-9d82-ce95f5332dec.jpg?tr=cm-pad_resize,w-1200" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div>

{/* product banner2 end------------------------------------------------------------------------------------------ */}

{/* product 3 cart----------------------------------------------------------------------------------------------- */}

<div className="grocery-container">
      <h2 className="grocery-heading">Combo Products</h2>
      <div className="grocery-row">
        {products2.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
{/* product 3 cart end--------------------------------------------------------------------------------------------- */}

{/* product banner 3-------------------------------------------------------------------------------------------- */}
<div className="container">
  <div className="row">
    <div className="col">
      <img src="https://images-static.nykaa.com/uploads/1d08680f-7dc3-4c4b-a3a6-c129cd89a952.jpg?tr=cm-pad_resize,w-1200" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div>

{/* product banner 3 end---------------------------------------------------------------------------------------- */}

{/* product cart 4 start---------------------------------------------------------------------------------------- */}

<div className="grocery-container">
      <div className="grocery-row">
        {products3.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>

{/* product cart 4 end------------------------------------------------------------------------------------------- */}


{/* modal----------------------------------------------------------------- */}

<Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
          <Modal.Title>
  <div className="modal-title">
    <div>
      <img 
        className="img-fluid" 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVvPOK3a2x7ceTbTGkjYPJKWjwcWjVB0xqgg&s"
        alt="Product" 
      />
    </div>
    <span>Product Details</span>
  </div>
</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                 <img src={item.image} alt={item.title} />
          <div className="cart-item-info">
            <div className="cart-item-title">{item.name}</div>
           
            <div className="cart-item-price">
          ₹{((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}
        </div>
          </div>
          <div className="cart-item-actions">
            <button onClick={() => decrementQuantity(index)}>-</button>
            <span className="quantity">{item.quantity}</span>
            <button onClick={() => incrementQuantity(index)}>+</button>
          </div>
              </div>
              
            ))}
                   <div className="cart-total">
  <h3>
    Total Price: <span>₹{calculateTotalPrice().toFixed(2)}</span>
  </h3>
</div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            {/* <Button  variant="primary" onClick={handleShow3}>
              CheckOut
            </Button> */}
          </Modal.Footer>
        </Modal>

{/* modal---------------------------------------------------------------------- */}

{/* footer section------------------------------------------------------------------------------------------- */}
<div>
<Footer/>
</div>

{/* footer section end------------------------------------------------------------------------------------------- */}

    </div>
  )
}

export default Home