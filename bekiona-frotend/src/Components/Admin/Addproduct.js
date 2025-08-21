import React, { useState } from "react";
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-quill/dist/quill.snow.css"; // ReactQuill styles
import ReactQuill from "react-quill";
import Swal from 'sweetalert2';
import api from '../api'

function Addproduct() {

 


    const [product, setproduct] = useState({
        product_code: "",
        product_category:"",
        product_type:"",
        product_name: "",
        product_sku:"",
        product_price: "",
        product_quantity: "",
        product_image: [],
        product_description: "",
        product_hsn_code:"",
        product_lbh_unit:"cm",
        product_weight_unit:"gm",
        product_length:"",
        product_breadth:"",
        product_height:"",
        product_weight:"",
        product_benefits: [],
        product_quantity1: 1,

      });
      
      console.log(product.product_category);
      
      const [benefitInput, setBenefitInput] = useState("");

      const handleAddBenefit = () => {
        if (benefitInput.trim() !== "") {
            setproduct((prevData) => ({
            ...prevData,
            product_benefits: [...prevData.product_benefits, benefitInput],
          }));
          setBenefitInput(""); // Clear input field
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setproduct((prevProduct) => ({
          ...prevProduct,
          [name]: value,
        }));
      };





       // Delete a benefit by index
  const handleDeleteBenefit = (indexToDelete) => {
    setproduct((prevData) => ({
      ...prevData,
      product_benefits: prevData.product_benefits.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };


 
   
    
    const handleImageChange = (event) =>
    {
     
      const files = Array.from(event.target.files)
      setproduct({...product,product_image:files})

    }
      const handleDescriptionChange = (value) => {
        setproduct({ ...product, product_description: value });
      };
    
    
   
    
      const handleSubmit = async () => {
        try {
          // Retrieve token from localStorage (or sessionStorage)
          const token = localStorage.getItem('token');
          console.log(token);
          
      
          // Check if the token exists
          if (!token) {
            Swal.fire({
              title: 'Error!',
              text: 'You must be logged in to add a product.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
      
          // Send the POST request with token in Authorization header
          const resp = await api.post("addproduct", product, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
      
          if (resp.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Product saved successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          console.error("Error while saving product:", error.response || error.message);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to save product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };
      
      


    console.log(product);
    


    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      };
    
  return (
    <div>
      <Sidebar/>

      <div
        // style={{
        //   marginLeft: isSidebarCollapsed ? "80px" : "250px",
        //   transition: "margin-left 0.3s ease",
        //   padding: "20px",
        //   flexGrow: 1,
        //   backgroundColor: "#f8f9fa",
        //   minHeight: "100vh",
        // }}
      >
   <div className="container mt-4">
      <h2 className="mb-4" style={{textAlign:"center",alignItems:"center"}}>Add New Product</h2>
      <div className="row" style={{display:"flex", justifyContent:"cemtre",alignItems:"center",marginTop:"50px"}}>
        <div className="col-md-8" style={{width:"700px"}}>
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
           

            <div className="mb-3">
                <label className="form-label">Product Code</label>
                <input
                  type="number"
                  name="Productcode"
                  className="form-control"
                  // style={{width:"1000px"}}
                  
                  onChange={(e)=>setproduct({...product,product_code:e.target.value})}
                  placeholder="Enter Productcode"
                  required
                />
              </div>

              <div className="mb-3">
  {/* Category Dropdown */}
  <label className="form-label">Category</label>
  <select
    name="productCategory"
    className="form-select"
    onChange={(e)=>setproduct({...product,product_category:e.target.value})}
    required
  >
    <option value="" disabled selected>
      Select Category
    </option>
    <option value="shampoo">Shampoo</option>
    <option value="soap">Soap</option>
    <option value="face wash">Face Wash</option>
    <option value="hair serum">Hair Serum</option>
    <option value="hair oil">Hair Oil</option>
  </select>
</div>

<div className="mb-3">
  {/* Type Dropdown */}
  <label className="form-label"> Product Type</label>
  <select
    name="productType"
    className="form-select"
    onChange={(e)=>setproduct({...product,product_type:e.target.value})}
    required
  >
    <option value="" disabled selected>
      Select Type
    </option>
    <option value="single"> Product Single</option>
    <option value="combo"> Product Combo</option>
  </select>
</div>
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_name:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input
                  type="text"
                  name="productsku"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_sku:e.target.value})}
                  placeholder="Enter product sku"
                  required
                />
              </div>



              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_price:e.target.value})}
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_quantity:e.target.value})}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">HSN Code</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_hsn_code:e.target.value})}
                  placeholder="Enter hsn code"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Length</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_length:e.target.value})}
                  placeholder="Enter length in cm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Breadth</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_breadth:e.target.value})}
                  placeholder="Enter breadth in cm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Height</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_height:e.target.value})}
                  placeholder="Enter height in cm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Weight</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_weight:e.target.value})}
                  placeholder="Enter weight in gm"
                  required
                />
              </div>

              {/* Product Image */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                multiple
                  type="file"
                  name="image"
                  className="form-control"
                  
                  onChange={(event)=>handleImageChange(event)}
                  required
                />
              </div>

              {/* Product Description */}
              <div className="mb-3">
               <label className="form-label">Product Description</label>
               <ReactQuill
                 value={product.product_description || ""} // Bind to product.product_description
                 onChange={(value) =>
                   setproduct((prevProduct) => ({
                     ...prevProduct,
                     product_description: value, // Update product_description in state
                   }))
                 }
                 placeholder="Enter product description"
                 theme="snow"
               />
             </div>
             
           

               {/* Product Benefits */}
        <div className="mb-3">
          <label className="form-label">Product Benefits</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter benefit"
             
              onChange={(e) => setBenefitInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddBenefit}
            >
              Add
            </button>
          </div>
          {/* Show Product Benefits */}
          <ul className="mt-3 list-group">
            {product.product_benefits.map((benefit, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {benefit}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteBenefit(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

              {/* Submit Button */}
              <div className="text-end">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
           
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>




        
        </div>



    </div>
  )
}

export default Addproduct