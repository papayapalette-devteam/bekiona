import React from 'react'
import Header from './Header'
import Footer from './footer'
import { useCart } from './cartcontext';

function Glutasoap() {

  const product = [
    { id: 3, name: "Gluta Soap (	Anti-inflammatory & Healing)  85gm  ", price: "349/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42UXP9vdgdvl5INwaQzAnjlX6MNQZQBSj-w&s",  quantity: 1, },

  ];

  const {cart,setcart}=useCart()

  // Add to Cart function
  const handleprouctadd = (product) => {
    // Check if the product already exists in the cart
    const isProductInCart = cart.some((item) => item.name === product.name);
  
    if (!isProductInCart) {
      // Add the product to the cart if it's not already present
      setcart([...cart, product]);
    } else {
      alert(`${product.name} is already in the cart.`);
    }
  };



  return (
    <div>

        <div>
            <Header/>
        </div>

        <div className="container mt-5">
  <div className="row " style={{marginTop:"12rem"}}>
    {/* Product Image Section */}
    {product.map((product) => (
      <div key={product.id} className="col-lg-6 text-center">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid"
          style={{
            maxWidth: "100%",
            height:"380px",
            marginBottom:"10rem"
   
          }}
        />
      </div>
    ))}

    {/* Product Details Section */}
    {product.map((product) => (
      <div key={product.id} className="col-lg-6">
        <h3 className="fw-bold">{product.name.split(" (")[0]}</h3> {/* Extracted Name */}
        <p className="text-muted">
  {product.name.includes("(")
    ? product.name.split("(")[1].replace(")", "")
    : ""}
</p> {/* Extracted Details */}
        <div className="mb-3">
          <span className="text-danger fw-bold fs-4">{product.price}</span>
          <span className="text-muted text-decoration-line-through ms-2">
            ₹1599
          </span>
          <span className="badge bg-success ms-2">63% off</span>
        </div>

        {/* Offers Section */}
        <div className="mb-4">
          <h6>Available Offers:</h6>
          <ul className="list-unstyled">
            <li>5% Unlimited Cashback on Flipkart Axis Bank Card</li>
            <li>10% off on HDFC Bank Credit Card EMI</li>
            <li>10 days return policy</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button className="btn btn-warning" onClick={() => handleprouctadd(product)}>
            Add to Cart
          </button>
          <button className="btn btn-danger">Buy Now</button>
        </div>

        <div className="accordion mt-5" id="accordionExample">
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          Product Specification
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <h4 className="fw-bold mb-3">Gluta Soap</h4>
          <p>
          Indulge your skin with the gentle yet effective power of Gulta Soap, a handcrafted soap made with all-natural ingredients to cleanse, nourish, and hydrate your skin. Whether you have sensitive, dry, or oily skin, Gulta Soap is the perfect solution for everyday skincare. Packed with herbal extracts and soothing oils, this soap provides a rich lather that removes impurities, leaving your skin feeling refreshed, soft, and rejuvenated. Experience the purity and luxury of nature with every use.
          </p>
          <h5 className="mt-4">Key Benefits:</h5>
          <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
<strong>Deep Cleansing: </strong> Gently removes dirt, excess oil, and impurities without stripping the skin’s natural moisture balance.
</li>
<li className="list-group-item">
<strong>Soothes & Hydrates: </strong> : Ideal for dry or sensitive skin, Gulta Soap leaves your skin feeling moisturized and soft after every wash.
</li>
<li className="list-group-item">
<strong>Nourishes Skin: </strong> Infused with herbal extracts, it provides essential vitamins and nutrients that nourish the skin and maintain its natural glow.
</li>
<li className="list-group-item">
<strong>Gentle & Non-Irritating: </strong> Made with natural ingredients, this soap is gentle enough for daily use, even on sensitive skin.
</li>
<li className="list-group-item">
<strong>Anti-inflammatory & Healing: </strong> Helps calm irritated or inflamed skin, promoting a smoother and healthier complexion.
</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="accordion-item">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed text-bold"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        Product Feacture
      </button>
    </h2>
    <div
      id="collapseThree"
      className="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
<div
  id="collapseThree"
  className="accordion-collapse collapse"
  data-bs-parent="#accordionExample"
>
  <div className="accordion-body">
    <div className="features-container">
        <div style={{display:"flex", gap:"9rem"}}>
      <div className="feature-item">
        <i className="fa-solid fa-globe feature-icon"></i>
        <span>On Time Delivery</span>
      </div>
      <div className="feature-item">
        <i className="fa-brands fa-product-hunt feature-icon"></i>
        <span>Easily Return</span>
      </div>
      </div>
      <br/>
      <div style={{display:"flex", gap:"6rem"}}>
      <div className="feature-item">
        <i className="fa-solid fa-clock feature-icon"></i>
        <span>24/7 Customer Service</span>
      </div>
      <div className="feature-item">
        <i className="fa-solid fa-lock feature-icon"></i>
        <span>Secure Payments</span>
      </div>
      </div>
    </div>
  </div>
</div>




    </div>
  </div>
  </div>
      </div>
    ))}
  </div>

  {/* Accordion Section */}
 
</div>


<Footer/>

    </div>
  )
}

export default Glutasoap