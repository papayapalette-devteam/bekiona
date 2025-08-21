import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import api from '../api';
import Swal from 'sweetalert2';

function Alluser() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);  // State to store users' data
  const [error, setError] = useState('');  // State to handle errors

  // Retrieve the email from localStorage
  // const userEmail = localStorage.getItem('email');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const userEmail = localStorage.getItem('email');


  const fetchuser=async()=>
  {
    try {
      const response = await api.get(`alluser`)

   
      
      setUsers(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
 
console.log(users);

  useEffect(()=>
  {
    fetchuser()
  },[])
  

  // Handle user deletion
  const confirmAndDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`deletealluser/${id}`);  // API URL for deleting user
      if (response.status === 200) {
        // Remove the deleted user from the state
        alert('User deleted successfully!');
      }
      setTimeout(() => {
        window.location.reload()
       }, 2000);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
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
        <h2>All Users</h2>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th scope="col" >#</th>
              <th scope="col" >Fist Name</th>
              <th scope="col" >Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone no.</th>
              <th scope="col">Password</th>
              <th scope="col">Address Type</th>
              <th scope="col">Apartment Number</th>
              <th scope="col">Area</th>
              <th scope="col">Landmark</th>
              <th scope="col">Pincode</th>
              <th scope="col">Select State</th>
              <th scope="col">Action</th> {/* For delete action */}
            </tr>
          </thead>
          <tbody>
  {users && Array.isArray(users) && users.map((user, index) => (
    <tr key={user._id}>
      <th scope="row">{index + 1}</th>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.password}</td>
      <td>{user.addressType}</td>
      <td>{user.apartmentNumber}</td>
      <td>{user.area}</td>
      <td>{user.landmark}</td>
      <td>{user.pincode}</td>
      <td>{user.selectstate}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => confirmAndDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default Alluser;
