import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import Sidebar from "../Admin/Sidebar";
import Swal from "sweetalert2";
import api from "../api"; // Ensure you have a proper API instance

function Banner() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [banners, setBanners] = useState([]); // Initialize as an array
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [currentBanner, setCurrentBanner] = useState(null); // Track current banner for edit

  const [bannerData, setBannerData] = useState({
    bannerTitle: "",
    bannerLink: "",
    sliderBannerImage: null,
  });

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleShow = () => {
    setEditMode(false); // Ensure we're in add mode
    setBannerData({ bannerTitle: "", bannerLink: "", sliderBannerImage: null });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBannerData((prev) => ({
      ...prev,
      sliderBannerImage: e.target.files[0],
    }));
  };

  const fetchBanners = async () => {
    try {
      const response = await api.get("getAllBanners");
      if (response.status === 200) {
        setBanners(response.data.banner); // Adjust based on API response
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const addBanner = async () => {
    try {
      const formData = new FormData();
      formData.append("bannerTitle", bannerData.bannerTitle);
      formData.append("bannerLink", bannerData.bannerLink);
      if (bannerData.sliderBannerImage)
        formData.append("sliderBannerImage", bannerData.sliderBannerImage);

      const response = await api.post("/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Swal.fire("Success", "Banner added successfully!", "success");
        fetchBanners();
        setShow(false);
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      Swal.fire("Error", "Failed to add banner. Please try again.", "error");
    }
  };

  const updateBanner = async () => {
    try {
      const formData = new FormData();
      formData.append("bannerTitle", bannerData.bannerTitle);
      formData.append("bannerLink", bannerData.bannerLink);
  
      // Only append the image if a new one is selected
      if (bannerData.sliderBannerImage) {
        formData.append("sliderBannerImage", bannerData.sliderBannerImage);
      } else {
        // If no new image is selected, keep the existing one
        formData.append("sliderBannerImage", currentBanner.sliderBannerImage);
      }
  
      const response = await api.put(`/editBanner/${currentBanner._id}`, bannerData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        Swal.fire("Success", "Banner updated successfully!", "success");
        fetchBanners(); // Refresh the banners list
        setShow(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      Swal.fire("Error", "Failed to update banner. Please try again.", "error");
    }
  };
  

  const handleSave = () => {
    if (editMode) {
      updateBanner();
    } else {
      addBanner();
    }
  };

  const handleEdit = (banner) => {
    setEditMode(true);
    setCurrentBanner(banner); // Set the current banner object
    setBannerData({
      bannerTitle: banner.bannerTitle,
      bannerLink: banner.bannerLink,
      sliderBannerImage: null, // Do not prefill the file input for the new image
    });
    setShow(true); // Open the modal
  }

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`deleteBanner/${id}`);
      if (response.status === 200) {
        Swal.fire("Deleted", "Banner deleted successfully!", "success");
        fetchBanners();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      Swal.fire("Error", "Failed to delete banner. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div>
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
            Banner Management
          </span>
        </div>

        <Button variant="primary" onClick={handleShow}>
          Add Banner
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Banner" : "Add New Banner"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="bannerTitle">
                <Form.Label>Banner Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter banner title"
                  name="bannerTitle"
                  value={bannerData.bannerTitle}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="bannerLink">
                <Form.Label>Banner Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter banner link"
                  name="bannerLink"
                  value={bannerData.bannerLink}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="sliderBannerImage">
                <Form.Label>Upload Banner</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Banner Title</th>
              <th>Banner Link</th>
              <th>Banner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(banners) && banners.length > 0 ? (
              banners.map((banner, index) => (
                <tr key={banner._id}>
                  <td>{index + 1}</td>
                  <td>{banner.bannerTitle}</td>
                  <td>{banner.bannerLink}</td>
                  <td>
                    <img
                      src={banner.sliderBannerImage} // Ensure API provides image URL
                      alt={banner.bannerTitle}
                      style={{ width: "100px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(banner._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No banners found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Banner;
