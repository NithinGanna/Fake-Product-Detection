import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon from react-icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast,Slide } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Update the URL for the logout request to match your backend endpoint
      const response = await axios.get('http://localhost:5000/api/logout' ,{withCredentials:true});
      // Check if the response contains the message "Logout successful"
      // console.log(response.data.message);
      if (response.data.message === 'Logout successful') {
        // If successful, clear any local user data or session data on the client-side
        localStorage.removeItem('token');
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
         // Assuming you store a token for authentication
        // Redirect to the '/' route
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.warn(error, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      }); 
    }
  };

  return (
    <>
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Logout <FaSignOutAlt /> {/* Include the logout icon */}
    </button>
    <ToastContainer/>
    </>
  );
};

export default Logout;