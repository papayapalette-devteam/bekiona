import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import {
  FaList,
  FaHome,
  FaProductHunt,
  FaImages,
  FaFileInvoice,
  FaUserCog,
  FaUsers,
  FaShoppingCart,
  FaPlus,
  FaThList,
  FaChevronDown,
  FaInvoiceHunt,
  FaRegEdit, 
  FaDollarSign 
} from "react-icons/fa";
import { useAuth } from '../authguard';
import Modal from 'react-bootstrap/Modal';
import { Paper, Button, Menu, MenuItem ,Select} from '@mui/material';
import Swal from "sweetalert2";

function Sidebar() {

  const { logout } = useAuth();


  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isInvoiceMenuOpen, setIsInvoiceMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  const toggleInvoiceMenu = () => {
    setIsInvoiceMenuOpen(!isInvoiceMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const  navigate = useNavigate()

const Logout = () =>{
  logout();
  window.location.href = '/login';
  
}


 const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => 
      {
        setShow(true)
      }

      const[paymenttype,setpaymenttype]=useState({payment_type:""})
      const setpayment = async() => {
        if (!paymenttype || paymenttype === "---select---") {
          Swal.fire({
            icon: "warning",
            title: "Please select a valid payment option",
            confirmButtonText: 'OK',
          });
          return;
        }
    
        try {
          const resp=await api.post('addpaymenttype',paymenttype)
          if(resp.status===200)
          {
              Swal.fire({
          icon: "success",
          title: "Payment Methods Set",
          text: "Payment options set successfully",
          confirmButtonText: 'OK',
        });
          }
          
        } catch (error) {
          console.log(error);
          
        }
      
      };



  return (


 <div>

<nav
  className="navbar navbar-expand-lg navbar-light shadow-sm"
  style={{ background:"white",marginLeft:"19%",marginTop:"10px" }}
>
  <div className="container-fluid">
    {/* Logo */}
    
    {/* Right-side section */}
    <ul
      className="navbar-nav ms-auto align-items-center"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {/* Notification Bell */}
      {/* <li
        className="nav-item me-3"
        style={{ position: "relative", display: "inline-block" }}
      >
        <a className="nav-link" href="#">
          <i className="fa fa-bell fa-lg" style={{ color: "black" }} />
          <span
            style={{
              position: "absolute",
              top: 0,
              right: "-5px",
              fontSize: "0.75rem",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px"
            }}
          >
            5
          </span>
        </a>
      </li> */}
      {/* Profile Dropdown */}
      <li className="nav-item dropdown" style={{ display: "inline-block" }}>
        <a
          className="nav-link dropdown-toggle d-flex align-items-center"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png"
            alt="Profile"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: 8
            }}
          />
          <span style={{ fontWeight: 500 }}>skycosmetic</span>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
          style={{ minWidth: 150 }}
        >
          <li>
            <a
              className="dropdown-item"
              href="#"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <i className="fa fa-user-edit" />
              Edit Profile
            </a>
          </li>
          <li>
            <button onClick={Logout}
              className="dropdown-item"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <i className="fa fa-sign-out-alt" />
              Logout
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
      {/* Sidebar */}
      <div
className={`bg-dark text-white p-3`}
style={{
minHeight: "100vh",
width: isSidebarCollapsed ? "80px" : "250px", // Adjust width on collapse
transition: "width 0.3s",
position: "fixed",
top: "0",
overflowX: "hidden",
whiteSpace: "nowrap",
}}
>
        {/* Sidebar Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 style={{ display: isSidebarCollapsed ? "none" : "block" }}>KIONA</h4>
          <FaList
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            onClick={toggleSidebar}
          />
        </div>

        {/* Sidebar Menu */}
        <ul className="list-unstyled">
        <li className="mb-3">
  <Link
    to="/dashboard" // Update the href with the desired route
    className="text-white text-decoration-none d-flex align-items-center"
  >
    <FaHome className="me-2" />
    <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
      Dashboard
    </span>
  </Link>
</li>
     {/* Product Menu */}
     <li className="mb-3">
            <div
              className="text-white text-decoration-none d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={toggleProductMenu}
            >
              <FaProductHunt className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                Product
              </span>
              <FaChevronDown
                style={{
                  marginLeft: "auto",
                  transform: isProductMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {/* Nested Product List */}
            {isProductMenuOpen && !isSidebarCollapsed && (
              <ul className="list-unstyled ms-4">
                 <li className="mb-2">
        <Link
          to="/addproduct" // Route to Add Product Page
          className="text-white text-decoration-none d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          <span>Add Product</span>
        </Link>
      </li>
      <li className="mb-2">
  <Link
    to="/allproductlist"
    className="text-white text-decoration-none d-flex align-items-center"
  >
    <FaThList className="me-2" />
    <span>All Products</span>
  </Link>
</li>
<li className="mb-2">
  <Link
    className="text-white text-decoration-none d-flex align-items-center"
    onClick={handleShow}
  >
    <FaDollarSign  className="me-2" />
    <span>Product Payment Setting</span>
  </Link>
</li>
              </ul>
            )}
          </li>

          <li className="mb-3">
        <Link
          to="/banner"
          className="text-white text-decoration-none d-flex align-items-center"
        >
          <FaImages className="me-2" />
          <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>
            Banner
          </span>
        </Link>
      </li>

      <li className="mb-3">
        <Link
          to="/blog"
          className="text-white text-decoration-none d-flex align-items-center"
        >
          <FaImages className="me-2" />
          <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>
            Blog
          </span>
        </Link>
      </li>
          {/* Invoice Menu with Dropdown Arrow */}
          <li className="mb-3">
            <div
              className="text-white text-decoration-none d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={toggleInvoiceMenu}
            >
              <FaFileInvoice className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                Invoice
              </span>
              <FaChevronDown
                style={{
                  marginLeft: "auto",
                  transform: isInvoiceMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {/* Nested Invoice List */}
            {isInvoiceMenuOpen && !isSidebarCollapsed && (
              <ul className="list-unstyled ms-4">
             <li className="mb-2">
            <Link
              to="/invoice-template"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaPlus className="me-2" />
              <span>Invoice Template</span>
            </Link>
          </li>
              </ul>
            )}
          </li>
       
          <li className="mb-3">
            <Link
              to="/accountsetting"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaUserCog className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                Account Setting
              </span>
            </Link>
          </li>
          <li className="mb-3">
            <div
              className="text-white text-decoration-none d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={toggleUserMenu}
            >
              <FaUserCog className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                User
              </span>
              <FaChevronDown
                style={{
                  marginLeft: "auto",
                  transform: isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {/* Nested Invoice List */}
            {isUserMenuOpen && !isSidebarCollapsed && (
              <ul className="list-unstyled ms-4">
                <li className="mb-2">
            <Link
              to="/alluser"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaThList className="me-2" />
              <span>User List</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/user-edit"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaRegEdit className="me-2" />
              <span>User Edit</span>
            </Link>
          </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/checkout"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaShoppingCart className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                Checkout
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/usermessage"
              className="text-white text-decoration-none d-flex align-items-center"
            >
              <FaUserCog className="me-2" />
              <span style={{ display: isSidebarCollapsed ? "none" : "inline" }}>
                User message
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}

         <Modal  show={show} onHide={handleClose} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Set Payment Options<br></br>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
             
             <div className="row">
      
                       <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Payment Options</label>
                       <select type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}}  onChange={(e) => setpaymenttype({...paymenttype,payment_type:e.target.value})}>
                        <option>---select---</option>
                        <option>Only COD</option>
                        <option>Only ONLINE</option>
                        <option>Both</option>
                        </select>
                       </div>
                     
            </div>
            
                  </Modal.Body>
                  <Modal.Footer>
               
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={setpayment}>
                      Set
                    </Button>
                  </Modal.Footer>
                </Modal>
      
    
      </div>
    
  );
}

export default Sidebar;
