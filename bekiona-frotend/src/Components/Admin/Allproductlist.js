import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Sidebar from "../Admin/Sidebar";
import api from '../api'
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import "react-quill/dist/quill.snow.css"; // ReactQuill styles
import ReactQuill from "react-quill";




function Allproductlist() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const[productdata,setproductdata]=useState([])
  // Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("getproduct" );
       const Allproduct=response.data.product
        
        setproductdata(Allproduct)
        console.log(productdata);
        
  
        // Map to DataGrid format
        const formattedData = response.data.product.map((item, index) => ({
          _id:item._id,
          id: index + 1,
          Productcode: item.product_code,
          Productcategory:item.product_category,
          Producttype:item.product_type,
          ProductName: item.product_name,
          productsku:item.product_sku,
          ProductPrice: item.product_price,
          ProductQuantity: item.product_quantity,
          ProductDescription: item.product_description,
          ProductBenefits: item.product_benefits,
          ProductImage: item.product_image,
        }));
  
        console.log("Formatted Data:", formattedData);
        setRows(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Columns definition
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Productcode", headerName: "Product Code", width: 130 },
    { field: "Productcategory", headerName: "Product Category", width: 150 },
    { field: "Producttype", headerName: "Product Type", width: 130 },
    { field: "ProductName", headerName: "Product Name", width: 150 },
    { field: "productsku", headerName: "Product SKU", width: 150 },
    { field: "ProductPrice", headerName: "Product Price", width: 120 },
    {
      field: "ProductQuantity",
      headerName: "Product Quantity",
      type: "number",
      width: 130,
    },
    {
      field: "ProductDescription",
      headerName: "Product Description",
      width: 200,
    },
    {
      field: "ProductBenefits",
      headerName: "Product Benefits",
      width: 200,
    },
    {
      field: "ProductImage",
      headerName: "Product Image",
      width: 160,
      renderCell: (params) => (
        <img
          src={params.row.ProductImage}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: "10px" }}
            // onClick={() => handleEdit(params.row)}
            onClick={() => handleEditModalShow(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => confirmAndDeleteProduct(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
 

  const confirmAndDeleteProduct = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(row);
      }
    });
  };

  const handleDelete = async(row) => {
    try {
      const resp=await api.delete(`deleteproduct/${row._id}`)
      if(resp.status === 200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'Product deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
          
                    setTimeout(() => {
                     window.location.reload()
                    }, 2000);
      }
    
      
    } catch (error) {
      console.log(error);
      
    }
  };
 

  const paginationModel = { page: 0, pageSize: 5 };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [product, setproduct] = useState({
    product_code: "",
    product_name: "",
    product_sku:"",
    product_category:"",
    product_type:"",
    product_price: "",
    product_quantity: "",
    product_image: [],
    product_description: "",
    roduct_hsn_code:"",
    product_lbh_unit:"cm",
    product_weight_unit:"gm",
    product_length:"",
    product_breadth:"",
    product_height:"",
    product_weight:"",
    product_benefits: [],
    product_quantity1: 1,

  });
  
  
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
const [description, setDescription] = useState("");

const handleDescriptionChange = (value) => {
  setDescription(value); // Update the state with the editor's content
};








  const handleUpdate = async () => {
    if (!product?._id) {
      Swal.fire({
        title: "Error!",
        text: "Invalid product ID.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    try {
      // Create FormData object
      const formData = new FormData();
  
      // Append product fields
      formData.append("product_code", product.product_code);
      formData.append("product_name", product.product_name || "");
      formData.append("product_sku", product.product_sku || "");
      formData.append("product_category", product.product_category || "");
      formData.append("product_type", product.product_type || "");
      formData.append("product_price", product.product_price || "");
      formData.append("product_quantity", product.product_quantity || "");
  
      // Append benefits
      if (product.product_benefits?.length > 0) {
        product.product_benefits.forEach((benefit) => {
          formData.append("productbenefits", benefit);
        });
      }
  
      // Append images
      if (product.product_image?.length > 0) {
        product.product_image.forEach((file) => {
          formData.append("productimage", file);
        });
      }
  
      // Debugging: Log FormData
      console.log("FormData Contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
  
      // API request
      const response = await api.put(`edit_product/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Success Handling
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setShow(false);
          window.location.reload();
        });
      }
    } catch (error) {
      // Error Handling
      console.error("Error During Update:", error.response?.data || error.message);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

const handleEditModalShow = async (row) => {

                    

  const resp=await api.get(`getproductbyid/${row._id}`)
  console.log(resp);
  
  
const result=resp.data.product[0]
  
  setproduct(result)

  setShow(true); // Open the modal
  
}









  return (
    <div>
      {/* Sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          flexGrow: 1,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "25px", fontFamily: "Arial, sans-serif" }}>
            List of All Products
          </span>
        </div>

        {/* DataGrid Table */}
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Paper>

       {/* modal code------------------------------------------------------------------------------- */}

       <Modal show={show} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
  
        </Modal.Header>
        <Modal.Body>   <div className="container mt-4">
              <h2 className="mb-4" style={{textAlign:"center"}}>Edit Product</h2>
              <div className="row">
                <div className="col-md-8 mx-auto">
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
                          name="product_code"
                          className="form-control"
                          placeholder={product.product_code}
                          
                          onChange={(e)=>setproduct({...product,product_code:e.target.value})}
                         
                         
                        />
                      </div>
                      {/* Product Name */}
                      <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          name="product_name"
                          className="form-control"
                          value={product.product_name}
                          onChange={(e)=>setproduct({...product,product_name:e.target.value})}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                     {/* Product sku */}
                     <div className="mb-3">
                        <label className="form-label">Product SKU</label>
                        <input
                          type="text"
                          name="product_sku"
                          className="form-control"
                          value={product.product_sku}
                          onChange={(e)=>setproduct({...product,product_sku:e.target.value})}
                          placeholder="Enter product sku"
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
    <option value="massage oil">Massage Oil</option>
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
        
                      {/* Price */}
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          name="product_price"
                          className="form-control"
                          value={product.product_price}
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
                          name="product_quantity"
                          className="form-control"
                          value={product.product_quantity}
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
                          name="product_image"
                          className="form-control"
                          
                          onChange={(event)=>handleImageChange(event)}
                          required
                        />
                        <img src={`${product.product_image}`} style={{height:"100px"}}></img>
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

{/* Preview Section */}
<div className="mt-3">
  <h3>Description Preview:</h3>
  <div
    style={{ padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}
    dangerouslySetInnerHTML={{
      __html: product.product_description || "<p>No description provided.</p>",
    }}
  />
</div>




      
        
                       {/* Product Benefits */}
                <div className="mb-3">
                  <label className="form-label">Product Benefits</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      name="product_benefits"
                      className="form-control me-2"
                      placeholder="Enter benefit"
                     value={product.product_benefits}
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
                    {product.product_benefits ? product.product_benefits.map((benefit, index) => (
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
                    )):[]}
                  </ul>
                </div>
        
                      {/* Submit Button */}
                     
                   
                  </div>
                </div>
              </div>
            </div> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>





      </div>
    </div>
  );
}

export default Allproductlist;
