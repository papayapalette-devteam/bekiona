import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cartcontext'
import logo from '../Assets/Logo (2).png'
import payment from '../Assets/payment.jpg'
import upi from '../Assets/upi.avif'
import Visa from '../Assets/visa.png'
import rupay from '../Assets/rupay.avif'
import api from '../api';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Navbar, Nav, NavDropdown, Offcanvas, Container, } from "react-bootstrap";



function Cuheader() {

  const useremail = localStorage.getItem('email')

  const [validation, setValidation] = useState({});



  



    const {cart,setcart}=useCart()
    useEffect(()=>
    {
      console.log(cart);
    },[])
   
    
    const [formData, setFormData] = useState({
      apartmentNumber: "",
      selectstate: "",
      area: "",
      email: "",
      landmark: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      selectstate: "",
      selectcity: "",
      addressType: "Home",
      pincode: "",
      setDefault: false,
      cartItems: [],
      totalPrice:0,
      payment_status:"",
      product_image:[]
    });

   
    
    
  
    
    const[length,setlength]=useState(0)
    useEffect(()=>
    {
      const clength=cart.length
      setlength(clength)
      setFormData({...formData,cartItems:cart})
    })
  
    
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  const navigate=useNavigate()
  
  
  // const [quantity, setQuantity] = useState(1);    
  
  
  
  
  const incrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, product_quantity1: parseFloat(item.product_quantity1) + 1 }
          : item
      )
    );
  };
  
  
  
  // Decrement quantity and remove if quantity <= 1
  const decrementQuantity = (index) => {
    setcart((prevCart) =>
      prevCart
        .map((item, i) =>
          i === index && item.product_quantity1 > 1
            ? { ...item, product_quantity1: item.product_quantity1 - 1 }
            : item
        )
        .filter((item, i) => !(i === index && item.product_quantity1 <= 1))
    );
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    // Calculate Subtotal (total without GST)
    const subtotal = cart.reduce(
      (total, item) => total + parseFloat(item.product_price) * item.product_quantity1,
      0
    );
  
    const gstPercentage = 18; // Example: 18% GST (you can change this value)
    const gstAmount = (subtotal * gstPercentage) / 100; // Calculate GST
  
    const total = subtotal + gstAmount; // Final total price including GST
  
    return { subtotal, gstAmount, total };
  };
  
  useEffect(() => {
    const { subtotal, gstAmount, total } = calculateTotalPrice(); // Get values
  
    setFormData(prevData => ({
      ...prevData,
      totalPrice: total, // The final price after adding GST
      subtotal: subtotal, // Subtotal without GST
      gstAmount: gstAmount, // GST amount
    }));
  }, [formData.cartItems]); // Dependency array includes cartItems to recalculate on cart update
  
  
  
  const [show1, setShow1] = useState(false);
  
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  
  
  
  const [show4, setShow4] = useState(false);
  
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => {
    setShow4(true);
    handleClose1()
  }
  
  
  
  
  
  
  const handleChange = (e) => {
    const { name, value, type, checked, } = e.target;

    setFormData((prevData) => {
        const newData = { ...prevData, [name]: type === "checkbox" ? checked : value };
        validateField(name, newData[name]); // ✅ Validate field on change
        return newData;
    });
};


const validateField = (name, value) => {
  setValidation((prevValidation) => {
    let newValidation = { ...prevValidation };

    // Trim value for proper validation
    const trimmedValue = value?.toString().trim();

    // Required Fields
    if (["firstName", "lastName", "mobileNumber", "apartmentNumber", "selectstate", "landmark", "area", "pincode","apartmentName","selectstate","selectstate"].includes(name) && !trimmedValue) {
      newValidation[name] = `${name.replace(/([A-Z])/g, " $1")} is required!`;
    } else {
      delete newValidation[name];
    }

    // Mobile Number Validation
    if (name === "mobileNumber" && trimmedValue && !/^\d{10}$/.test(trimmedValue)) {
      newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
    }

    // Pincode Validation
    if (name === "pincode" && trimmedValue && !/^\d{6}$/.test(trimmedValue)) {
      newValidation.pincode = "Enter a valid 6-digit Pincode!";
    }

    return newValidation;
  });
};


const validateForm = () => {
  let newValidation = {};

  if (!formData.firstName?.trim()) newValidation.firstName = "First Name is required!";
  if (!formData.lastName?.trim()) newValidation.lastName = "Last Name is required!";
  if (!formData.mobileNumber?.trim() || !/^\d{10}$/.test(formData.mobileNumber)) 
      newValidation.mobileNumber = "Enter a valid 10-digit Mobile Number!";
  if (!formData.apartmentNumber?.trim()) newValidation.apartmentNumber = "Apartment Number is required!";
  if (!formData.apartmentName?.trim()) newValidation.apartmentName = "Apartment Number is required!";
  if (!formData.selectstate.trim()) newValidation.selectstate = "State is required!";
  if (!formData.selectcity.trim()) newValidation.selectcity = "city is required!";
  if (!formData.landmark?.trim()) newValidation.landmark = "Landmark is required!";
  if (!formData.area?.trim()) newValidation.area = "Area is required!";
  if (!formData.pincode?.trim() || !/^\d{6}$/.test(formData.pincode))  
      newValidation.pincode = "Enter a valid 6-digit Pincode!";

  setValidation(newValidation);
  
  return Object.keys(newValidation).length === 0; // ✅ Return true if no errors
};



  
  
  const handleAddressType = (type) => {
    setFormData({ ...formData, addressType: type });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  
  
 useEffect(()=>
{      
  setFormData({...setFormData,email:useremail})
  
  

},[useremail])

useEffect(()=>
  {
    setFormData({...setFormData,product_image:cart.product_image})
   
    
  
  },[cart])

useEffect(()=>
  {
   
    console.log(cart.product_image);
    
  
  },[cart])
  
  
  // const handleSubmit1 = async (e) => {
  
  //   try {
  //     const response = await api.post('createOrder', orderdata);
  //     console.log(response);
  //     console.log(orderdata.email);
      
      
  //     console.log('Response:', orderdata);
  
  //     // Success Alert with "OK" button
  //     Swal.fire({
  //       title: 'Success!',
  //       text: 'Order created successfully!',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     }).then(() => {
  //       // Clear form fields and reload the window
  //       setorderdata({
  //         firstName: '',
  //         lastName: '',
  //         email: '',
  //         mobileNumber: '',
  //         apartmentNumber: '',
  //         selectstate: '',
  //         area: '',
  //         landmark: '',
  //         addressType: 'Home',
  //         setDefault: false,
  //         cartItems: [],
  //         totalPrice: 0,
  //         payment_status:""
  //       });
  
  //       // Reload the window (optional)
  //       window.location.reload();
  //     });
  //   } catch (error) {
  //     console.error('Error creating order:', error);
  
  //     // Error Alert
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Failed to create order. Please try again.',
  //       icon: 'error',
  //       confirmButtonText: 'Retry',
  //     });
  //   }
  // };

  
 const handlePayment = async () => {
     if (!validateForm()) {
       Swal.fire({
         title: 'Validation Error!',
         text: 'Please fill all required fields correctly.',
         icon: 'error',
         confirmButtonText: 'OK',
       });
       return;
     }
   
     try {
       // Step 1: Create Order on Backend
       const { data: order } = await api.post('payment', { formData });
       console.log('Order Created:', order);
   
       // Step 2: Razorpay Checkout Options
       const options = {
         key: 'rzp_live_YBXf8NJT3Al7Qc',
         amount: order.amount,
         currency: order.currency,
         name: 'Your Company Name',
         description: 'Test Transaction',
         order_id: order.id,
         handler: function (response) {
           console.log('Payment Success Response:', response);
   
           if (response && response.razorpay_payment_id) {
             Swal.fire({
               title: 'Payment Successful!',
               text: 'Thank You for Shopping with Kiona! Keep shopping like this 🛍️😊',
             //   text: `Payment ID: ${response.razorpay_payment_id}`,
               icon: 'success',
               confirmButtonText: 'OK',
             }).then(() => {
                 handleClose4(); // 👈 Close the modal here
                 setcart([]);
                 setFormData({ ...formData, payment_status: 'success' });
                 generateInvoice(response, formData, companyDetails);
                 navigate("/");
             });
   
             console.log(formData, cart);
           } else {
             Swal.fire({
               title: 'Payment Error!',
               text: 'Payment Response Invalid',
               icon: 'error',
               confirmButtonText: 'Try Again',
             });
           }
         },
         prefill: {
           name: formData.firstName,
           email: 'narayanniket2@gmail.com',
           contact: formData.mobileNumber,
         },
         theme: {
           color: '#3399cc',
         },
       };
   
       // Step 3: Initialize Razorpay Checkout
       const rzp = new window.Razorpay(options);
       rzp.open();
   
     } catch (error) {
       console.error('Error during payment:', error);
   
       Swal.fire({
         title: 'Payment Failed',
         text: 'Something went wrong. Please try again!',
         icon: 'error',
         confirmButtonText: 'OK',
       });
   
       setFormData({ ...formData, payment_status: 'failed' });
     }
   };
  
  
  const companyDetails = [
    {
      name: 'KIONA',
      logo: 'E:\niket2\Ecommerce\eco\src\Components\Assets\Logo (2).png', // Relative URL to the public folder
      address: 'office no 326, Kashi plaza, kamrej, Surat pincode - 394185',
      contact: 'support@kiona.com',
    },
  ];
    
  

  
  
  const generateInvoice = (paymentResponse, orderdata, companyDetails) => {
    console.log("Order Data:", orderdata); // Debugging: Log the order data

    const doc = new jsPDF();
    const company = companyDetails[0]; // Extract company details
    const marginLeft = 20;
    const marginRight = 140;
    let cursorY = 20; // Track Y position

    // Function to add page header (Logo + Company & Customer Details + Invoice Details)
    const addPageHeader = (pageNumber) => {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("INVOICE", 105, 20, { align: "center" });

        // --- Add Company Logo ---
        if (company.logo) {
            doc.addImage(company.logo, "JPEG", marginLeft, 25, 50, 20);
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Company Details", marginLeft, 50);
        doc.text("Customer Details", marginRight, 50);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        
        const lineSpacing = 5; // Adjust this value for more spacing

        doc.text(company.name, marginLeft, 60);
        doc.text(company.address, marginLeft, 60 + lineSpacing);
        doc.text(`Contact: ${company.contact}`, marginLeft, 60 + 2 * lineSpacing);
        

        

        doc.text(`Name: ${orderdata.firstName} ${orderdata.lastName}`, marginRight, 60);
        doc.text(`Email: ${orderdata.email}`, marginRight, 60 + lineSpacing);
        doc.text(`Phone: ${orderdata.mobileNumber}`, marginRight, 60 + 2 * lineSpacing);
        
        const address = `Address: ${orderdata.apartmentNumber} ${orderdata.area} ${orderdata.landmark} ${orderdata.selectstate} ${orderdata.pincode} India`;
        const maxWidth = 60; // Adjust width based on the layout
        const wrappedAddress = doc.splitTextToSize(address, maxWidth);
        doc.text(wrappedAddress, marginRight, 90);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`Invoice Number: ${paymentResponse.razorpay_payment_id}`, marginLeft, 100);
        doc.text(`Order ID: ${paymentResponse.razorpay_order_id}`, marginLeft, 100 + lineSpacing);
        doc.text(`Transaction Date: ${new Date().toLocaleDateString()}`, marginLeft, 100 + 2 * lineSpacing);

        // Show Page Number at the bottom of every page
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber}`, 105, 285, { align: "center" });
    };

    // --- First Page Header ---
    addPageHeader(1);
    cursorY = 130; // Move cursor after header

    // --- Product Table ---
    doc.setFont("helvetica", "bold");
    doc.text("Product Details", marginLeft, cursorY);
    cursorY += 10;

    doc.autoTable({
        startY: cursorY,
        head: [["S.No", "Product Name", "Quantity", "Unit Price", "Total"]],
        body: orderdata.cartItems.map((product, index) => [
            index + 1,
            product.product_name,
            product.product_quantity1,
            product.product_price,
            (product.product_quantity1 * product.product_price),
        ]),
        theme: "grid",
        headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 60 }, 2: { cellWidth: 25 }, 3: { cellWidth: 35 }, 4: { cellWidth: 35 } },
        margin: { top: 10 },

        // Ensure that company details and logo are re-added on new pages
        didDrawPage: function (data) {
            if (data.pageNumber > 1) {
                doc.setPage(data.pageNumber);
                addPageHeader(data.pageNumber);
            }
        },
    });

    // Move to the last page before adding the summary
    const totalPages = doc.internal.getNumberOfPages();
    doc.setPage(totalPages);

    let finalY = doc.lastAutoTable.finalY + 10;

    // --- Summary Section (With Border) ---
    const summaryX = marginRight - 20;
    const summaryWidth = 70;
    const summaryHeight = 40;

    doc.setLineWidth(0.5);
    doc.rect(summaryX, finalY, summaryWidth, summaryHeight);

    doc.setFont("helvetica", "bold");
    doc.text("Summary", summaryX + 5, finalY + 7);
    doc.setFont("helvetica", "normal");

    doc.text(`Subtotal:  ${orderdata.subtotal}`, summaryX + 5, finalY + 17);
    doc.text(`GST (${18}%):  ${(orderdata.subtotal * (orderdata.gstAmount / 100))}`, summaryX + 5, finalY + 27);
    doc.text(`Grand Total:  ${orderdata.totalPrice}`, summaryX + 5, finalY + 37);

    finalY += summaryHeight + 10;

    // --- Footer ---
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", marginLeft, finalY);
    doc.text(`For queries, contact us at: ${company.contact}`, marginLeft, finalY + 10);

    // --- Save the PDF ---
    doc.save(`Invoice_${paymentResponse.razorpay_payment_id}.pdf`);
};

  
  
  const [show6, setShow6] = useState(false);
  
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () =>{setShow6(true);
      handleClose()
    } 
  
  
  
    const [show7, setShow7] = useState(false);
  
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () =>{setShow7(true);
      handleClose()
    } 
  
  
    
  const navigatecategory=(data)=>
  {
    navigate('/categoryproduct',{state:data})
  }
  
  
  
  
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit6 = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to backend for user registration
      const response = await api.post("register", user);
  
      // Handle successful response
      setSuccessMessage(response.data.message);
      setError(null); // Clear any previous errors
  
      // Optionally, reset the form fields
      setuser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "Server error");
      setSuccessMessage(null); // Clear any previous success messages
    }
  };
  
  
  
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  
  // Handle input changes
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };



 
  
  // Handle form submission
  const handleSubmit2 = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post("logins", loginDetails);
  
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${response.data.user.name}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.setItem('email',loginDetails.email)
        // navigate('/cudasboard',{ state: loginDetails })
  
        // Clear the form and close the modal
        setLoginDetails({ email: "", password: "" });
        handleClose();
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "Invalid email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Server error. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };



  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
    "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
    "Ludhiana", "Agra", "Nashik", "Ranchi", "Meerut", "Faridabad", "Allahabad", 
    "Amritsar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Noida", "Howrah", 
    "Gwalior", "Jabalpur", "Vijayawada", "Jodhpur", "Raipur", "Kota", "Guwahati", 
    "Chandigarh", "Solapur", "Hubballi-Dharwad", "Tiruchirappalli", "Bareilly", 
    "Mysore", "Tiruppur", "Gurgaon", "Aligarh", "Jalandhar", "Bhubaneswar", "Salem", 
    "Warangal", "Moradabad", "Bhiwandi", "Kolhapur", "Bikaner", "Jhansi", "Thiruvananthapuram", 
    "Guntur", "Dehradun", "Asansol", "Nanded", "Ujjain", "Gaya", "Tirunelveli", "Malegaon", 
    "Udaipur", "Hosur", "Kurnool", "Belgaum", "Ambattur", "Tirupati", "Nagaur", "Mangalore", 
    "Erode", "Jamnagar", "Bokaro", "Aizawl", "Mathura", "Kollam", "Panaji", "Shillong", 
    "Imphal", "Itanagar", "Gangtok", "Port Blair", "Diu", "Silvassa"
  ];



const removeFromCart = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setcart(updatedCart); 

  // Show success message using SweetAlert
  Swal.fire({
    title: "Removed!",
    text: "Your product has been removed from the cart.",
    icon: "success",
    confirmButtonText: "OK",
  });
};



const [selectedPayment, setSelectedPayment] = useState("cod");

const logout = () => {
  localStorage.removeItem("usertoken"); 
  window.dispatchEvent(new Event("storage")); // Notify other components
  navigate("/"); // Redirect to home page

  // Prevent navigating back to the dashboard after logout
  setTimeout(() => {
    window.history.pushState(null, null, window.location.href);
  }, 0);

  window.onpopstate = () => {
    navigate("/"); // If back button is pressed, redirect to home/login page
  };
};


  // =========================================track your order start=============================================================

const [show2, setShow2] = useState(false);
  
    const handleClose2 = () => 
      {
        setShow2(false);
        settrackingdata(null)
      }
    const handleShow2 = (item) => 
      {
        setShow2(true);
      }

      const[trackingid,settrackingid]=useState("")
      const[trackingdata,settrackingdata]=useState(null)
      const trackOrder = async () => {
        try {

          const res = await api.post(`track-order/${trackingid}`);
          settrackingdata(res.data.data)
        } catch (error) {
          console.log(error);
          
        }
      };
      
   
// =================================================track your order end=============================================================




  return (
    <div>
 <div style={{position:"fixed",left:"0",right:"0",zIndex:"1000",top:"0"}}>


   {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" style={{ backgroundColor: "#f8f9f3", height: "112px" }}>
          <Container fluid style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"75px" }}>
            {/* Mobile Toggle Button */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} style={{ marginLeft: "-307px", width:"50px",backgroundColor:"black",marginBottom:"10px" }} />

            {/* Brand Name Centered */}
            <Navbar.Brand
              className="position-absolute"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "40px",
                fontWeight: "400",
                fontFamily: '"ITC Modern No 216", serif',
                top: "10px",
                color:"black",
                cursor:"pointer "
              }}
              onClick={() => navigate("/cudasboard")}
            >
              KIONA
            </Navbar.Brand>

            {/* Cart & User Icons */}
            <div
              className="d-flex justify-content-end align-items-center"
              style={{
                position: "absolute",
                top: "40px",
                right: "20px",
                gap: "20px",
              }}
            >
              {/* Cart Icon */}
              <div style={{ position: "relative", cursor: "pointer" }} onClick={handleShow1}>
                <i className="fas fa-cart-shopping" style={{ fontSize: "25px", color: "#333" }}></i>
                {length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "3px 6px",
                      borderRadius: "50%",
                      minWidth: "20px",
                      textAlign: "center",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {length}
                  </span>
                )}
              </div>
            </div>

            {/* Offcanvas Menu */}
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>KIONA</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3" style={{gap:"20px"}}>
                  <Nav.Link as={Link} to="/cudasboard">Home</Nav.Link>
                  <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>

                  {/* Product Dropdown */}
                  <NavDropdown title="Products" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item onClick={() => navigatecategory("shampoo")}>Shampoo</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigatecategory("face wash")}>Face Wash</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigatecategory("hair oil")}>Hair Oil</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="/blog1">Blogs</Nav.Link>
                  <Nav.Link as={Link} onClick={handleShow2}>Track Your Order</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                  <Nav.Link as={Link} to="/combo">Combo</Nav.Link>

                  {/* Terms & Policies Dropdown */}
                  <NavDropdown title="Terms & Policies" id="termsDropdown">
                    <NavDropdown.Item as={Link} to="/privacypolicy">Privacy Policy</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ewaste">E-Waste Policy</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/cancelpolicy">Cancellation & Return</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/deliverycancel">Shipping & Delivery</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/term&condition">Terms & Conditions</NavDropdown.Item>
                  </NavDropdown>

                         {/* customer account details */}
                         <NavDropdown  title={useremail} id="termsDropdown">
                    <NavDropdown.Item as={Link} to="/myorders">My Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/personalinfo">Personal Info</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/manageadds">Manage Address</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}



{/* modal code for login----------- */}

<Modal
  show={show}
  onHide={handleClose}
  centered
  dialogClassName="custom-modal"
>
  <Modal.Header
    style={{
      backgroundColor: "linear-gradient(to right, #fc2779, #ff79b0)",
    }}
    closeButton
  >
    <Modal.Title
      style={{
        fontSize: "24px",
        fontWeight: "600",
        color: "#fff",
        background: "linear-gradient(to right, #fc2779, #ff79b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      Welcome to Kiona
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #0078D7, #56CCF2)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Welcome!
        </h2>
        <p
          style={{
            fontSize: "16px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Sign in with your email and password to explore our features.
        </p>
        <img
          src="https://c8.alamy.com/comp/2BHAEDT/login-icon-isolated-on-special-blue-round-button-abstract-illustration-2BHAEDT.jpg"
          alt="Sign In Illustration"
          style={{
            width: "150px",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F9F9F9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit2} style={{ maxWidth: "300px", width: "100%" }}>
          <label
            htmlFor="email"
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#555",
            }}
          >
            Enter Email ID
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email ID"
            // value={loginDetails.email}
            onChange={handleInputChange1}
            
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px",
              outline: "none",
            }}
            required
          />
          <label
            htmlFor="password"
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#555",
            }}
          >
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            // value={loginDetails.password}
            onChange={handleInputChange1}

            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px",
              outline: "none",
            }}
            required
          />
          <p style={{ fontSize: "12px", color: "#777", marginBottom: "15px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#0078D7",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "12px",
                padding: "0",
                margin: "0",
              }}
              onClick={handleShow7}
            >
              Forgot Password?
            </button>
          </p>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#FF5722",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "10px",
              boxShadow: "0 4px 8px rgba(255, 87, 34, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            CONTINUE
          </button>
          <button
            type="button"
            onClick={handleShow6}
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "#0078D7",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            New User? Signup
          </button>
        </form>
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


{/* modal----------------------------------------------------------------- */}

<Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
      <Modal.Title>
<div className="modal-title">
<div>
  <img 
    className="img-fluid" 
  src={logo}
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
             <img src={item.product_image} alt={item.product} />
      <div className="cart-item-info">
        <div className="cart-item-title">{item.product_name}</div>
       
        <div className="cart-item-price">
      ₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)} 
      <span style={{marginLeft:"12rem"}}>Quantity {item.product_quantity1}</span>
    </div>
    <span onClick={() => removeFromCart(index)} style={{ cursor: "pointer", color: "red" }}>
            <i className="fa-solid fa-trash"></i>
          </span>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => decrementQuantity(index)}>-</button>
        <span className="quantity">{item.product_quantity1}</span>
        <button onClick={() => incrementQuantity(index)}>+</button>
      </div>
          </div>
          
        ))}
               <div className="cart-total">
               <h3>
Total Price:  <span  >
₹{formData.subtotal ? formData.subtotal.toFixed(2) : '0.00'}
</span>
</h3>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          Close
        </Button>
        <Button  variant="primary" onClick={handleShow4}>
          CheckOut
        </Button>
      </Modal.Footer>
    </Modal>

{/* modal---------------------------------------------------------------------- */}


{/* billing form modal------------------------------------------------------------------------- */}


<Modal show={show4} onHide={handleClose4} size="xl">
<Modal.Header closeButton>
<Modal.Title> <div>
<h3>Add New Address</h3>
</div></Modal.Title>
</Modal.Header>
<Modal.Body>
<div
className="container"
style={{
display: "flex",
gap: "2rem",
flexWrap: "wrap",
padding: "20px",
backgroundColor: "#f9f9f9",
borderRadius: "8px",
boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}}
>
{/* Form Section */}
<div
style={{
flex: "1",
backgroundColor: "#ffffff",
borderRadius: "8px",
padding: "20px",
boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
maxWidth: "600px",
}}
>
<form>
<h5 style={{ marginBottom: "20px", fontWeight: "600" }}>
*Area Details
</h5>
<div className="mb-3 row">
<div className="col-md-6">
<label htmlFor="apartmentNumber" className="form-label">
*Apartment / House No.
</label>
<input
type="text"
className="form-control"
id="apartmentNumber"
name="apartmentNumber"
value={formData.apartmentNumber}
onChange={handleChange}
placeholder="e.g. 12/228"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.apartmentNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation.apartmentNumber}</span>}
</div>
{/* <div className="col-md-6">
<label htmlFor="apartmentNumber" className="form-label">
*user email
</label>
<input
type="text"
className="form-control"
id="apartmentNumber"
name="apartmentNumber"
value={useremail}
// onChange={handleChange}
// placeholder="e.g. 12/228"
// required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div> */}
<div className="col-md-6">
<label htmlFor="apartmentName" className="form-label">
*Apartment Name
</label>
<input
type="text"
className="form-control"
id="apartmentName"
name="apartmentName"
value={formData.apartmentName} 
onChange={handleChange}
placeholder="e.g. Park Avenue"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.apartmentName && <span style={{ color: "red", fontSize: "12px" }}>{validation.apartmentName}</span>}
</div>
</div>
<div className="mb-3 row">
<div className="col-md-6">
<label htmlFor="area" className="form-label">
*Area
</label>
<input
type="text"
className="form-control"
id="area"
name="area"
onChange={handleChange}
placeholder="e.g. 12/228"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.area && <span style={{ color: "red", fontSize: "12px" }}>{validation.area}</span>}
</div>
<div className="col-md-6">
<label htmlFor="StreetDetails" className="form-label">
*Street Details/Landmark
</label>
<input
type="text"
className="form-control"
id="landmark"
name="landmark"

onChange={handleChange}
placeholder="e.g. Park Avenue"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.landmark && <span style={{ color: "red", fontSize: "12px" }}>{validation.landmark}</span>}
</div>
</div>
<div className="d-flex justify-content-between" style={{ gap: "20px" }}>
  {/* State Dropdown */}
  <div className="col-md-6">
    <label htmlFor="state" className="form-label">
      *Select State
    </label>
    <select
      className="form-control"
      id="state"
      name="selectstate"
      value={formData.selectstate}
      onChange={handleChange}
      style={{
        borderRadius: "5px",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      <option value="" disabled>
        Select a state
      </option>
      {indianStates.map((state, index) => (
        <option key={index} value={state}>
          {state}
        </option>
      ))}
    </select>
    {validation.selectstate && <span style={{ color: "red", fontSize: "12px" }}>{validation.selectstate}</span>}
  </div>

  {/* City Dropdown */}
  <div className="col-md-6">
    <label htmlFor="city" className="form-label">
      *Select City
    </label>
    <select
      className="form-control"
      id="city"
      name="selectcity"
      value={formData.selectcity}
      onChange={handleChange}
      style={{
        borderRadius: "5px",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      <option value="" disabled>
        Select a city
      </option>
      {indianCities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
    {validation.selectcity && <span style={{ color: "red", fontSize: "12px" }}>{validation.selectcity}</span>}
  </div>
</div>

<div className="col-md-6 mb-3">
<label htmlFor="landmark" className="form-label">
*Pincode
</label>
<input
type="text"
className="form-control"
id="pincode"
name="pincode"
required
onChange={handleChange}
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.pincode && <span style={{ color: "red", fontSize: "12px" }}>{validation.pincode}</span>}
</div>
<h5 style={{ marginTop: "20px", fontWeight: "600" }}>
Personal Details
</h5>
<div className="mb-3 row">
<div className="col-md-6">
<label htmlFor="firstName" className="form-label">
First Name
</label>
<input
type="text"
className="form-control"
id="firstName"
name="firstName"
value={formData.firstName}
onChange={handleChange}
placeholder="e.g. John"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.firstName && <span style={{ color: "red", fontSize: "12px" }}>{validation.firstName}</span>}
</div>
<div className="col-md-6">
<label htmlFor="lastName" className="form-label">
Last Name
</label>
<input
type="text"
className="form-control"
id="lastName"
name="lastName"
value={formData.lastName}
onChange={handleChange}
placeholder="e.g. Doe"
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.lastName && <span style={{ color: "red", fontSize: "12px" }}>{validation.lastName}</span>}
</div>
</div>
<div className="col-md-6 mb-3">
<label htmlFor="mobileNumber" className="form-label">
Mobile Number
</label>
<input
type="tel"
className="form-control"
id="mobileNumber"
name="mobileNumber"
value={formData.mobileNumber}
onChange={handleChange}
placeholder="e.g. 9876543210"
required
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
{validation.mobileNumber && <span style={{ color: "red", fontSize: "12px" }}>{validation.mobileNumber}</span>}
</div>

<div className="col-md-6">
<label htmlFor="email" className="form-label">
Email Id
</label>
<input
type="text"
className="form-control"
id="email"
name="email"
value={formData.email    }
onChange={handleChange}
placeholder="e.g. Doe"
style={{
borderRadius: "5px",
padding: "10px",
fontSize: "14px",
}}
/>
</div>

<div className="mb-3">
<div className="form-check">
<input
type="checkbox"
className="form-check-input"
id="setDefault"
name="setDefault"
checked={formData.setDefault}
onChange={handleChange} 
/>
<label htmlFor="setDefault" className="form-check-label">
Set as Default Address
</label>
</div>
</div>
<h5 style={{ marginTop: "20px", fontWeight: "600" }}>Address Type</h5>
<div className="mb-3 address-type" style={{ marginBottom: "20px" }}>
<button
type="button"
className={`btn ${
formData.addressType === "Home"
? "btn-primary"
: "btn-outline-primary"
}`}
onClick={() => handleAddressType("Home")}
style={{
marginRight: "10px",
fontSize: "14px",
padding: "8px 15px",
borderRadius: "5px",
}}
>
<i
className="fa-solid fa-house"
style={{ marginRight: "5px" }}
></i>
Home
</button>
<button
type="button"
className={`btn ${
formData.addressType === "Office" 
? "btn-primary"
: "btn-outline-primary"
}`}
onClick={() => handleAddressType("Office")}
style={{
marginRight: "10px",
fontSize: "14px",
padding: "8px 15px",
borderRadius: "5px",
}}
>
<i
className="fa-solid fa-building"
style={{ marginRight: "5px" }}
></i>
Office
</button>
<button
type="button"
className={`btn ${
formData.addressType === "Other"
? "btn-primary"
: "btn-outline-primary"
}`}
onClick={() => handleAddressType("Other")}
style={{
marginRight: "10px",
fontSize: "14px",
padding: "8px 15px",
borderRadius: "5px",
}}
>
<i
className="fa-solid fa-ellipsis"
style={{ marginRight: "5px" }}
></i>
Other
</button>
</div>
</form>
</div>

{/* Cart Section */}
<div
style={{
flex: "1",
backgroundColor: "#ffffff",
borderRadius: "8px",
padding: "20px",
boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
maxWidth: "400px",
}}
>
<h5 style={{ marginBottom: "20px", fontWeight: "600" }}>Cart Items</h5>
{cart.map((item, index) => (
<div
key={index}
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "15px",
padding: "10px",
border: "1px solid #ddd",
borderRadius: "5px",
}}
>

<div>
<div style={{ fontWeight: "600", marginBottom: "5px" }}>
{item.product_name}
</div>
<div style={{ fontSize: "14px", color: "#555" }}>
₹{((parseFloat(item.product_price) || 0) * 1).toFixed(2)} <span style={{marginLeft:"13rem"}}>Quantity {item.product_quantity1}</span>
</div>
</div>
</div>
))}
<div style={{
  fontWeight: "600", 
  fontSize: "20px", 
  marginTop: "20px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  borderBottom: "2px solid #ddd",
  paddingBottom: "10px"
}}>
  <strong>Subtotal:</strong> 
  <span style={{ color: "#333", fontSize: "18px", fontWeight: "400" }}>
    ₹{formData.subtotal ? formData.subtotal.toFixed(2) : '0.00'}
  </span>
</div>

<div style={{
  fontWeight: "600", 
  fontSize: "20px", 
  marginTop: "10px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  borderBottom: "2px solid #ddd",
  paddingBottom: "10px"         
}}>
  <strong>GST (18%):</strong> 
  <span style={{ color: "#e74c3c", fontSize: "18px", fontWeight: "400" }}>
    ₹{formData.gstAmount ? formData.gstAmount.toFixed(2) : '0.00'}
  </span>
</div>

<div style={{
  fontWeight: "700", 
  fontSize: "22px", 
  marginTop: "10px", 
  color: "#333", 
  textAlign: "left",
  letterSpacing: "0.5px",
  paddingTop: "10px",
  borderTop: "2px solid #ddd"
}}>
  <strong>Total Price:</strong> 
  <span style={{
    color: "#27ae60", 
    fontSize: "20px", 
    fontWeight: "500"
  }}>
    ₹{formData.totalPrice ? formData.totalPrice.toFixed(2) : '0.00'}
  </span>
</div>
</div>
</div>

</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose4}>
Close
</Button>
<Button variant="primary" onClick={handlePayment}>
Go to Payment
</Button>
</Modal.Footer>
</Modal>



{/* billing form modal end------------------------------------------------------------------------- */}

{/* sinup for user--------------------------------------------------------------------- */}

<Modal show={show6} onHide={handleClose6}>
  <Modal.Header closeButton>
    <Modal.Title>Customer Signup</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit6}>
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          // value={setFormData1.name}
          onChange={handleInputChange}
         
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          // value={setFormData1.email}
          onChange={handleInputChange}
        
        />
      </Form.Group>

      <Form.Group controlId="formPhone" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
          // value={setFormData1.phone}
          onChange={handleInputChange}
        
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          name="password"
          // value={setFormData1.password}
          onChange={handleInputChange}
         
        />
      </Form.Group>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose6}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


  {/* forgot password user code----------------------------------------------------------------- */}

  <Modal show={show7} onHide={handleClose7} centered>
<Modal.Header
closeButton
style={{
  backgroundColor: "#f8f9fa",
  borderBottom: "1px solid #dee2e6",
}}
>
<Modal.Title
  style={{
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  }}
>
  Forgot Password
</Modal.Title>
</Modal.Header>
<Modal.Body
style={{
  padding: "20px",
  fontFamily: "'Arial', sans-serif",
}}
>
<p
  style={{
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
    textAlign: "center",
  }}
>
  Enter your email address below to receive password reset instructions.
</p>
<input
  type="email"
  placeholder="Enter your email address"
  style={{
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "20px",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }}
/>
<p
  style={{
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
    textAlign: "center",
  }}
>
  After submitting, check your email for a reset link. Follow the instructions to create a new password.
</p>
</Modal.Body>
<Modal.Footer
style={{
  borderTop: "1px solid #dee2e6",
  display: "flex",
  justifyContent: "space-between",
}}
>
<Button
  variant="secondary"
  onClick={handleClose7}
  style={{
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
    color: "#fff",
    fontWeight: "500",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
>
  Close
</Button>
<Button
  variant="primary"
  style={{
    padding: "10px 20px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "#fff",
    fontWeight: "500",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
>
  Send Reset Link
</Button>
</Modal.Footer>
</Modal>


<Modal  show={show2} onHide={handleClose2} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Start Tracking<br></br>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
       
       <div className="row">

       <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Enter Your AWB No.</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>settrackingid(e.target.value)}/>
                 </div>
                

                 {trackingdata && (
      <div style={{ marginTop: '20px', fontSize: '13px', lineHeight: '1.8' }}>
        <h6 style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Shipment Details</h6>

        <div className="row">

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>AWB Number</div>
  <div>{trackingdata.awb_number}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Courier ID</div>
  <div>{trackingdata.courier_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Courier Name</div>
  <div>{trackingdata.courier_name}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order ID</div>
  <div>{trackingdata.order_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order Number</div>
  <div>{trackingdata.order_number}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Order Type</div>
  <div>{trackingdata.order_type}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Payment Type</div>
  <div>{trackingdata.payment_type}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Status</div>
  <div style={{ color: "red", fontWeight: "500" }}>{trackingdata.status}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Created</div>
  <div>{trackingdata.created}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Event Time</div>
  <div>{trackingdata.event_time}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Expected Delivery</div>
  <div>{trackingdata.edd || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Delivered Date</div>
  <div>{trackingdata.delivered_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Pickup Date</div>
  <div>{trackingdata.pickup_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Shipped Date</div>
  <div>{trackingdata.shipped_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO AWB</div>
  <div>{trackingdata.rto_awb || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Initiate Date</div>
  <div>{trackingdata.rto_initiate_date || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Status</div>
  <div>{trackingdata.rto_status || 'N/A'}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>RTO Warehouse ID</div>
  <div>{trackingdata.rto_warehouse_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Warehouse ID</div>
  <div>{trackingdata.warehouse_id}</div>
</div>

<div className="col-md-4 mb-3">
  <div style={{ fontWeight: "bold" }}>Shipment Info</div>
  <div>{trackingdata.shipment_info || 'N/A'}</div>
</div>

</div>
       

        <h6 className="mt-4" style={{ fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Tracking History</h6>
        {trackingdata.history && trackingdata.history.length > 0 ? (
          <div>
            {trackingdata.history.map((item, index) => (
              <div key={index} style={{
                backgroundColor: "#f1f3f5",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px"
              }}>
                <div><strong>Status Code:</strong> {item.status_code}</div>
                <div><strong>Message:</strong> {item.message || 'No message'}</div>
                <div><strong>Event Time:</strong> {item.event_time}</div>
                <div><strong>Location:</strong> {item.location || 'N/A'}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No history available.</p>
        )}
      </div>
    )}
             
      </div>
      
        

  

            </Modal.Body>
            <Modal.Footer>
         
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="secondary" onClick={trackOrder}>
                Show Details
              </Button>
            </Modal.Footer>
          </Modal>




</div>

        
    </div>
  )
}

export default Cuheader