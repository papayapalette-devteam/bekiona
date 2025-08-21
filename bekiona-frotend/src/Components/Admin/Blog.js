import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Modal, Button, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import api from '../api'


function Blog() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [Blog, setBlog] = useState({
    title: "",
    date: "",
    description: "",
    image: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...Blog, [name]: value });
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setBlog({ ...Blog, image: e.target.files[0] });
  };

  // Add Blog Post
  const handleSubmit = async () => {
    try {
      // Prepare FormData
    //   const formData = new FormData();
    //   formData.append("title", formData.title); // Replace `formData.title` with your state variable for title
    //   formData.append("date", formData.date);   // Replace `formData.date` with your state variable for date
    //   formData.append("description", formData.description); // Replace `formData.description` with your state variable for description
    //   formData.append("image", formData.image); // Replace `formData.image` with your state variable for the image file
  
      // Make API request
      const resp = await api.post("addblog", Blog, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle success
      if (resp.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Blog added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        // Reset form data or state
        setBlog({ title: "", date: "", description: "", image: null });
  
        // Optionally refresh the blog list
        // fetchBlogs();
      }
    } catch (error) {
      // Handle error
      console.error("Error while adding blog:", error.response || error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to add blog. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

    // Fetch blogs
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await api.get("getblog"); // Replace with your actual endpoint
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.response || error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch blogs. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };



    const confirmAndDeleteBlog = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this blog?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteBlog(id); // 👈 call actual delete if confirmed
        }
      });
    };


    const deleteBlog = async (id) => {
      try {
        const response = await api.delete(`deleteblog/${id}`); // Adjust endpoint as per your backend
        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Blog deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          
          // Refresh the blog list
          fetchBlogs();
        }
      } catch (error) {
        console.error("Error deleting blog:", error.response || error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete blog. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };


  
    useEffect(() => {
      fetchBlogs();
    }, []);
 
  
    const editBlog = async (id, updatedData) => {
      try {
        const formData = new FormData();
        formData.append("title", updatedData.title);
        formData.append("date", updatedData.date);
        formData.append("description", updatedData.description);
        console.log(formData);
        
    
        if (updatedData.image) {
          formData.append("image", updatedData.image);
        }
    
        const response = await api.put(`editblog/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        
    
        if (response.status === 200) {
          alert("Blog updated successfully!");
        }
      } catch (error) {
        console.error("Error editing blog:", error.response || error.message);
        alert("Failed to update blog!");
      }
    };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
      {/* Sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
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
           <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "25px", fontFamily: "Arial, sans-serif" }}>
            Blog Management
          </span>
        </div>

     <Button variant="primary" onClick={handleShow}>
        Add Blog
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group controlId="formTitle" style={{ marginBottom: "15px" }}>
            <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter blog title"
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </Form.Group>

          {/* Date */}
          <Form.Group controlId="formDate" style={{ marginBottom: "15px" }}>
            <Form.Label style={{ fontWeight: "bold" }}>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleChange}
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="formDescription" style={{ marginBottom: "15px" }}>
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              onChange={handleChange}
              placeholder="Enter blog description"
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </Form.Group>

          {/* Image */}
          <Form.Group controlId="formImage" style={{ marginBottom: "15px" }}>
            <Form.Label style={{ fontWeight: "bold" }}>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Blog
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>{new Date(blog.date).toDateString()}</td>
              <td>{blog.description}</td>
              <td>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "100px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => confirmAndDeleteBlog(blog._id)}
                  style={{ marginRight: "10px" }}
                >
                  Delete
                </Button>
                {/* <Button variant="info"
                  onClick={() => editBlog(blog._id)}
                >Edit</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>






      </div>
      </div>

     
    </>
  );
}

export default Blog;
