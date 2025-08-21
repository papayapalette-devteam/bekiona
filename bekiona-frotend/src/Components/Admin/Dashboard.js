import React, { useState , useEffect} from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button, Menu, MenuItem ,Select} from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import api from '../api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import 'bootstrap/dist/css/bootstrap.min.css';    // CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS (includes Popper.js)
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import { parseISO, format, getWeek, getMonth } from "date-fns";
function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      navigate('/login', { replace: true }); // Redirect to login
    }
  }, [navigate]);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [chartTimeRange, setChartTimeRange] = useState("Day");

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newOrderCount, setNewOrderCount] = useState(0);
    const [TotalSales, setTotalSales] = useState([]);
    const [netprofit, setnetprofit] = useState([]);
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await api.get("getAllOrders");
          const total = response.data.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
          setTotalSales(total);

          const netProfit = total * 0.3;
          setnetprofit(netProfit);

  
          const sorted = [...response.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  
          setOrders(sorted);
  
          const storedCount = parseInt(localStorage.getItem("lastOrderCount")) || 0;
          const currentCount = sorted.length;
  
          if (currentCount > storedCount) {
            setNewOrderCount(currentCount - storedCount);
          } else {
            setNewOrderCount(0);
          }
  
          // Update stored count
          localStorage.setItem("lastOrderCount", currentCount.toString());
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);

    const allColumns = [
      { id: 'sno', name: '#' },
      { id: 'id', name: 'Order_Id' },
      { id: 'personaldetails', name: 'Personal_Details' },
      { id: 'address', name: 'Address' },
      { id: 'productName', name: 'Product_Details' },
      { id: 'totalPrice', name: 'Total_Price' },
      { id: 'paymentMode', name: 'Payment_Mode' },
      { id: 'orderdate', name: 'Order_Details' },
      { id: 'paymentid', name: 'Payment_Id' },
      { id: 'trackingid', name: 'Tracking_Details' },
      { id: 'action', name: 'Action' },
    ]

    const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
    const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
    const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1,11));
    const [showColumnList, setShowColumnList] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        lineHeight:"0px"
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: "10px",
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // User-defined items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Add isNew flag to top N orders
  const markedOrders = orders.map((order, index) => ({
    ...order,
    isNew: index < newOrderCount,
  }));

    const currentItems = markedOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    
      // Handle items per page change
      const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page whenever items per page changes
      };
    
    // Function to handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Function to handle "Next" and "Previous" page changes
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    const renderPageNumbers = () => {
      // Define the range of page numbers to display
      const maxPageNumbersToShow = 5;
      const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
      
      return (
        <div
          style={{
            display: 'flex',
           
            whiteSpace: 'nowrap',
            padding: '10px-15px',
            width: '100%', 
            position: 'relative'
          }}
        >
          {/* Previous Button */}
          {currentPage > 1 && (
            <button onClick={goToPreviousPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
              Prev
            </button>
          )}
    
          {/* Page Numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                width: '30px',
                borderRadius: '5px',
                marginRight: '5px',
                flexShrink: 0, // Prevent buttons from shrinking
                backgroundColor: number === currentPage ? 'lightblue' : 'white',
              }}
            >
              {number}
            </button>
          ))}
    
          {/* Next Button */}
          {currentPage < totalPages && (
            <button onClick={goToNextPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
              Next
            </button>
          )}
        </div>
      );
    };


    const formatDate = (isoString) => {
      if (!isoString) return "-"; // Fallback for missing date
      const date = new Date(isoString);
      const localDate = date.toLocaleDateString();
      const localTime = date.toLocaleTimeString();
      return (
        <>
          <div>{localDate}</div>
          <div>{localTime}</div>
        </>
      );
    };

   // ✅ Function for Accepting an Order
   const acceptOrder = (orderId) => {
    alert(`✅ Order Accepted: ${orderId}`);

  };

  // ✅ Function for Rejecting an Order
  const rejectOrder = (orderId) => {
    console.log(`❌ Order Rejected: ${orderId}`);

  };

  const groupSalesData = (range) => {
    const now = new Date();
    let grouped = {};
    let labels = [];
    let data = [];

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const amount = order.totalPrice || 0;

      if (range === "Day") {
        const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
        if (diffInDays <= 6) {
          const day = `${6 - diffInDays + 1}th`;
          grouped[day] = (grouped[day] || 0) + amount;
        }
      } else if (range === "Week") {
        const orderWeek = getWeekNumber(createdAt);
        const currentWeek = getWeekNumber(now);
        const diff = currentWeek - orderWeek;
        if (diff >= 0 && diff < 4) {
          const week = `Week ${4 - diff}`;
          grouped[week] = (grouped[week] || 0) + amount;
        }
      } else if (range === "Month") {
        const orderMonth = createdAt.getMonth();
        const currentMonth = now.getMonth();
        const diff = currentMonth - orderMonth;
        if (diff >= 0 && diff < 6) {
          const month = createdAt.toLocaleString("default", { month: "short" });
          grouped[month] = (grouped[month] || 0) + amount;
        }
      }
    });

    if (range === "Day") {
      labels = ["1th", "2th", "3th", "4th", "5th", "6th"];
    } else if (range === "Week") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    } else {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }

    data = labels.map((label) => grouped[label] || 0);

    return {
      labels,
      datasets: [
        {
          label: `Product Sales (${range})`,
          data,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.1)",
          borderColor: "#0d6efd",
          tension: 0.4,
        },
      ],
    };
  };

  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
    return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const chartData = {
    Day: groupSalesData("Day"),
    Week: groupSalesData("Week"),
    Month: groupSalesData("Month"),
  };


 
    
  
    const toggleSidebar = () => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    };
  
    const handleTimeRangeClick = (range) => {
      setChartTimeRange(range);
    };

   
    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    
    const paginationModel = { page: 0, pageSize: 5 };



    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
      // Fetch total user count
      const fetchUserCount = async () => {
        try {
          const response = await api.get("totaluser");
          setTotalUsers(response.data.totalUsers);
        } catch (error) {
          console.error("Error fetching user count:", error);
        }
      };
  
      fetchUserCount();
    }, []);


    const [satisfaction, setSatisfaction] = useState(0);

  useEffect(() => {
    const fetchSatisfaction = async () => {
      try {
        const response = await axios.get("getcustomersetification");
        setSatisfaction(response.data.satisfaction);
      } catch (error) {
        console.error("Error fetching customer satisfaction:", error);
      }
    };

    fetchSatisfaction();
  }, []);


  const [totalOrders, setTotalOrders] = useState(0);
  const goal = 1000; // You can adjust this as needed
  const progress = Math.min((totalOrders / goal) * 100, 100); // capped at 100%

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await api.get('/totalorders'); // adjust your API
        setTotalOrders(response.data.totalOrders); // or response.data.length if array
      } catch (error) {
        console.error('Failed to fetch total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []);
  
 
  

  const deleteorder=async(id)=>
  {
    try {

      const resp=await api.delete(`deleteorder/${id}`)
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"order removed",
          text:"order deleted successfully",
          confirmButtonText: 'OK',
        })
      }
      setTimeout(() => {
          window.location.reload()
      }, 2000);
      
    } catch (error) {
      console.log(error);
      
    }
  
  }

  const [isLoading, setIsLoading] = useState(false);
  const[shipmentdetails,setshipmentdetails]=useState({package_weight:"",package_lenght:"",package_breadth:"",package_height:""})
  const createnimbusshipment=async()=>
  { 
    setIsLoading(true)
    try {
      const payload = {
        ...selectedItem,        // all item fields
        ...shipmentdetails      // plus the 4 package fields
      };
            const resp=await api.post('createnimbusshipment',payload)
            console.log(resp);
          
      if(resp.status===200)
      {

        const labelUrl = resp.data.data.data.label;
        console.log(labelUrl);
        
      // ✅ Auto-download the label
      const link = document.createElement('a');
      link.href = labelUrl;
      link.download = 'shipment_label.pdf'; // optional custom filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

        Swal.fire({
          icon:"success",
          title:"Shipment Created Successfull",
          text:`your shipment created successful... now you can track your order \nAWB No: ${resp.data.data.data.awb_number}\nTracking ID: ${resp.data.data.data.shipment_id}`,
          confirmButtonText: 'OK',
        })
      }
      handleClose()
    } catch (error) {
      console.log(error);
      
    }finally
    {
      setIsLoading(false)
    }
  }


  const [selectedItem, setSelectedItem] = useState(null); 
   const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (item) => 
      {
        setShow(true);
        setSelectedItem(item);
      }


// ==============================================download label code start==========================================================



const handleDownloadLabel = async (awb_no) => {
  try {
   
     const res = await api.post(`downloadlabel/${awb_no}`);
     console.log(res);
     
    const labelUrl = res.data?.data?.label;

    if (labelUrl) {
      // Step 3: Trigger PDF download
      const link = document.createElement("a");
      link.href = labelUrl;
      link.download = "shipping_label.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Label not found.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while processing the label download.");
  }
};



// ==========================================download label code end===============================================================

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
        {/* Sales Chart */}
        <div className="container my-5">
          <div className="row g-4">
            {/* Card 1: Products Sold */}
            <div className="col-md-3">
  <div
    style={{
      border: "none",
      borderRadius: 15,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: 20,
      transition: "transform 0.3s ease-in-out",
      background: "linear-gradient(135deg, #e7f1ff, #ffffff)", // Light blue to white
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h2 style={{ color: "#0d6efd", margin: 0 }}>{totalOrders}</h2>
        <p style={{ margin: 0, color: "#6c757d", fontWeight: "bold" }}>Order Product</p>
      </div>
      <i className="fa fa-shopping-cart" style={{ fontSize: 40, color: "#0d6efd" }} />
    </div>
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#d0e3ff", // light blue base
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: `${Math.min(progress, 100)}%`, // Ensures it stays within bounds
          height: "100%",
          backgroundColor: "#0d6efd", // Bootstrap primary blue
          borderRadius: 10,
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  </div>
</div>


            {/* Card 2: Net Profit */}
            <div className="col-md-3">
  <div
    style={{
      border: "none",
      borderRadius: 15,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: 20,
      transition: "transform 0.3s ease-in-out",
      background: "linear-gradient(145deg, #f6f7fb, #e9ecef)", // Subtle gradient background
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ color: "#28a745", margin: 0 }}>₹{netprofit.toLocaleString()}</h2> {/* Green for profit */}
        <p style={{ margin: 0, color: "#6c757d" }}>Net Profit</p> {/* Light grey text */}
      </div>
      <i className="fa fa-piggy-bank" style={{ fontSize: 40, color: "#ffb300" }} /> {/* Golden piggy-bank icon */}
    </div>
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#28a745", // Green for progress bar
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "#ffb300", // Golden color for fill
          borderRadius: 10,
        }}
      />
    </div>
  </div>
</div>



<div className="col-md-3">
  <div
    style={{
      border: "none",
      borderRadius: 15,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: 20,
      transition: "transform 0.3s ease-in-out",
      background: "linear-gradient(135deg, #e0f7fa, #ffffff)", // Light cyan to white gradient
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ color: "#00796b", margin: 0 }}>₹{TotalSales.toLocaleString()}</h2>
        <p style={{ margin: 0, color: "#6c757d", fontWeight: "bold" }}>Total Sales</p>
      </div>
      <i className="fa fa-chart-line" style={{ fontSize: 40, color: "#00796b" }} />
    </div>
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#b2dfdb", // Soft teal base
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: "70%", // You can dynamically set this based on performance
          height: "100%",
          backgroundColor: "#00796b", // Stronger teal
          borderRadius: 10,
        }}
      />
    </div>
  </div>
</div>


            <div className="col-md-3">
  <div
    style={{
      border: "none",
      borderRadius: 15,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: 20,
      transition: "transform 0.3s ease-in-out",
      background: "linear-gradient(135deg, #e8f5e9, #ffffff)", // Light green to white
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h2 style={{ color: "#198754", margin: 0 }}>{totalUsers}</h2>
        <p style={{ margin: 0, color: "#6c757d", fontWeight: "bold" }}>Total Users</p>
      </div>
      <i className="fa fa-users" style={{ fontSize: 40, color: "#198754" }} />
    </div>
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#d1e7dd", // lighter green base
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: `${Math.min((totalUsers / 500) * 100, 100)}%`, // Max 100%
          height: "100%",
          backgroundColor: "#198754", // Bootstrap green
          borderRadius: 10,
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  </div>
</div>


            {/* Card 4: Customer Satisfaction */}
            <div className="col-md-3">
  <div
    style={{
      border: "none",
      borderRadius: 15,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: 20,
      transition: "transform 0.3s ease-in-out",
      background: "linear-gradient(135deg, #ffe5e9, #ffffff)", // soft red-pink gradient
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h2 style={{ color: "#dc3545", margin: 0 }}>{satisfaction}%</h2>
        <p style={{ margin: 0, color: "#6c757d", fontWeight: "bold" }}>Customer Satisfaction</p>
      </div>
      <i className="fa fa-heart" style={{ fontSize: 40, color: "#dc3545" }} />
    </div>
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#f8d7da", // soft red base
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: `${Math.min(satisfaction, 100)}%`,
          height: "100%",
          backgroundColor: "#dc3545", // Bootstrap danger red
          borderRadius: 10,
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  </div>
</div>


          {/* Time Range Buttons (Placed Above the Chart) */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className={`btn btn-outline-primary ${chartTimeRange === "Day" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Day")}
          >
            Day
          </button>
          <button
            className={`btn btn-outline-primary mx-3 ${chartTimeRange === "Week" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Week")}
          >
            Week
          </button>
          <button
            className={`btn btn-outline-primary ${chartTimeRange === "Month" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Month")}
          >
            Month
          </button>
        </div>

      <div className="row justify-content-center">
  <div className="col-md-8">
    <div
      style={{
        background: "linear-gradient(to bottom right, #f8f9fa, #ffffff)",
        border: "2px solid #0d6efd", // Bootstrap Primary Blue
        borderRadius: 15,
        boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)",
        padding: 20,
        marginTop: 20,
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          background: "linear-gradient(to right, #0d6efd, #6610f2)", // Blue to Indigo
          padding: "8px 16px",
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <h5 style={{ color: "#fff", margin: 0 }}>📊 Product Sales Overview</h5>
      </div>

      <Line
        data={chartData[chartTimeRange]}
        options={options}
        height={350}
        width={580}
      />
    </div>
  </div>
</div>

          </div>
        </div>


       {/* table------------------------------------------------------------------------------------------- */}

       <h3>All Orders</h3>
       {newOrderCount > 0 && (
  <>
    <style>
    {`
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .flash-animation {
        animation: flash 1s ease-in-out infinite;
        font-weight: bold;
      }
    `}
    </style>
    <p className="flash-animation" style={{ color: 'green' }}>
      You have {newOrderCount} new order(s)!
    </p>
  </>
)}


       <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",marginBottom:"20px"}}>
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>

       <div style={{marginLeft:"0px",marginTop:"10px",backgroundColor:"white",top:"100px",position:"sticky",zIndex:10}}>
      <TableContainer component={Paper} style={{ maxHeight: '700px',overflow: 'auto' }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow >
          <StyledTableCell style={{backgroundColor:"gray",fontSize:"12px"}}>
          
          </StyledTableCell>
          {visibleColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ cursor: 'pointer',backgroundColor:"gray" }}
              // onClick={() => handleSort(col.id)}
            >
              {col.name}
              {/* {sortConfig.key === col.id ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''} */}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
  {
    currentItems
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort newest first
    .map((item, index, sortedItems) => {
      const isNew = index < newOrderCount; // First N are "New"
      return (
        <StyledTableRow key={index} style={{backgroundColor:item.tracking_id?"pink":""}}>
          <StyledTableCell style={{ fontSize: "12px" }}>
            {index + 1}
          </StyledTableCell>
          <StyledTableCell style={{ fontSize: "12px" }}>
          {isNew ? <strong style={{color:"green"}}>New</strong> : ''}<br></br>
            {item.orderid}
          </StyledTableCell>
          <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontSize: "12px" }}>
            <span style={{ color: "#0086b3", fontWeight: "bold" }}>{item.firstName} {item.lastName}</span><br />
            <span>{item.mobileNumber}</span><br />
            <span>{item.email}</span>
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            <>
              {item.apartmentNumber} {item.area}<br />
              landmark: {item.landmark}<br />
              {item.selectcity} {item.selectstate}<br />
              {item.pincode}
            </>
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            <>
              {
                item.cartItems.map((product, i) => (
                  <div key={i}>
                    {product.product_name}<br />
                    Rs.{product.product_price}<br />
                    quantity: {product.product_quantity1}
                  </div>
                ))
              }
            </>
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            {item.totalPrice}
          </StyledTableCell>
       
          <StyledTableCell style={{ fontSize: "12px" }}>
          <>
          {item.payment_mode}
          </>
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            <>
              {formatDate(item.paymentDate?item.paymentDate:item.createdAt)}<br />
              <span style={{
                color: item.payment_status === "success" ? "green" :
                       item.payment_status === "pending" ? "blue" : "red",
                fontWeight: "bold"
              }}>
                {item.payment_mode==="cod"?"":item.payment_status}
              </span>
            </>
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            {item.paymentId}
          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
          <>
            {item.tracking_id && item.shipment_id ? (
              <>
                <span>Shipment_ID: {item.tracking_id}</span><br />
                <span>AWB_No.: {item.shipment_id}</span>
              </>
            ) : (
              <span>Tracking not started yet</span>
            )}
          </>

          </StyledTableCell>

          <StyledTableCell style={{ fontSize: "12px" }}>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdown-${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                Action
              </button>
              <ul className="dropdown-menu" aria-labelledby={`dropdown-${index}`}>
                <li><span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => handleShow(item)}>Start Tracking</span></li>
                <li><span className="dropdown-item" style={{ cursor: "pointer" }} onClick={()=>handleDownloadLabel(item.shipment_id)}>Download Label</span></li>
                <li><span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => deleteorder(item._id)}>Delete Order</span></li>
              </ul>
            </div>
          </StyledTableCell>

        </StyledTableRow>
      );
    })
  }
</tbody>

    </Table>
  </TableContainer>

  </div>

 
  



       {/* table end ----------------------------------------------------------------------------------------- */}



       <Modal  show={show} onHide={handleClose} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Start Tracking<br></br>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
       
       <div className="row">

                 <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Package Weight(in gm.)</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>setshipmentdetails({...shipmentdetails,package_weight:e.target.value})}/>
                 </div>
               
                 <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Package Length(in cm.)</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>setshipmentdetails({...shipmentdetails,package_lenght:e.target.value})}/>
                 </div>

                 <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Package Breadth(in cm.)</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>setshipmentdetails({...shipmentdetails,package_breadth:e.target.value})}/>
                 </div>

                 <div className="col-md-6" style={{fontSize:"12px",marginTop:"10px"}}><label className="labels" style={{fontSize:"14px"}}>Package Height(in cm.)</label>
                 <input type="text" required="true" className="form-control form-control-sm"  style={{fontSize:"12px"}} onChange={(e)=>setshipmentdetails({...shipmentdetails,package_height:e.target.value})}/>
                 </div>
             
      </div>
      
      <>
    {isLoading && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
        <div style={{
          background: "rgba(9, 101, 52, 0.8)",
          padding: "20px 40px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid white",
            borderTop: "5px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 10px",
          }}></div>
          <p>Sending...</p>
        </div>
      </div>
    )}
  </>
        

  

            </Modal.Body>
            <Modal.Footer>
         
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary"  onClick={createnimbusshipment}>
                Start Tracking
              </Button>
            </Modal.Footer>
          </Modal>

      </div>
    </div>
  );
}

export default Dashboard;
