import React from 'react'
import Header from './Header'
import Footer from './footer'
import { useCart } from './cartcontext';

function Rosemaryhairoil() {

  const product = [
    { id: 1, name: "Rosemary hair oil(Stimulates Hair Growth,Prevents Hair Fall) 100ml ", price: "599/-", image: "https://m.media-amazon.com/images/I/31UXwtknKHL.jpg",  quantity: 1, },

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
          <h4 className="fw-bold mb-3">Rosemary hair oil </h4>
          <p>
          Unlock the full potential of your hair with our Rosemary Hair Oil, a natural elixir designed to promote hair growth, prevent hair thinning, and enhance the overall health of your hair. This nourishing oil is packed with the rich benefits of rosemary, a herb renowned for its ability to stimulate circulation in the scalp and improve hair vitality. Whether you're looking to prevent hair loss, soothe a dry scalp, or add shine and luster to your hair, our Rosemary Hair Oil is the perfect solution for all your hair care needs.
          </p>
          <h5 className="mt-4">Key Benefits:</h5>
          <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
<strong>Stimulates Hair Growth: </strong> Rosemary oil is known to stimulate blood circulation in the scalp, helping to nourish hair follicles and encourage healthy hair growth.
</li>
<li className="list-group-item">
<strong>Prevents Hair Fall: </strong> Strengthens hair roots and reduces the chances of breakage and thinning, making it ideal for those experiencing hair loss.
</li>
<li className="list-group-item">
<strong>Adds Shine & Luster: </strong> Enhances the natural shine of your hair, leaving it smooth, silky, and vibrant.
</li>
<li className="list-group-item">
<strong>Improves Scalp Health: </strong> Helps balance oil production, soothe itching, and reduce dandruff, promoting a healthy scalp environment.
</li>
<li className="list-group-item">
<strong> Deeply Nourishing: </strong> Packed with essential nutrients that deeply condition hair, leaving it soft and manageable without weighing it down.
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

export default Rosemaryhairoil