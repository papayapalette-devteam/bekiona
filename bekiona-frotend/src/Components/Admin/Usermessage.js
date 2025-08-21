import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import api from '../api'
import Swal from 'sweetalert2';

function Usermessage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]); // State to store messages

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('getcontact'); // Replace with your API endpoint
        setMessages(response.data); // Set the data in state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  // Delete message handler
  const confirmAndDeleteMessage = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // 🔥 delete only if confirmed
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`contactdelete/${id}`);  
  
      if (response.status === 200) {
        alert('Message deleted successfully!');
      
      }

      setTimeout(() => {
        window.location.reload()
       }, 2000);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert('Failed to delete message. Please try again.');
    }
  };
  

  return (
    <div>
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th> {/* Add a column for the delete button */}
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <tr key={message.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.subject}</td>
                  <td>{message.message}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => confirmAndDeleteMessage(message._id)} // Pass the message ID to the delete function
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No messages available.</td> {/* Message when no data is available */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usermessage;
