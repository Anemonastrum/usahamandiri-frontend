import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await axios.post("logout");
      if (response.status === 200) {
        setUser(null);
        navigate("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`);
        const { role } = response.data;
        if (role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Redirect to login if not admin
          navigate("/");
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        // Handle error and redirect to login
        navigate("/");
      }
    };

    checkAdminRole();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!isAdmin) {
    return null; // or loading indicator while checking role
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </div>
        <Link to="/" className="navbar-title">Usaha Mandiri</Link>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/products">Produk</Link></li>
          <li><Link to="/categories">Kategori</Link></li>
          <li><button onClick={handleLogout} className="page-scroll">Logout</button></li>
        </ul>
      </div>
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h1>Welcome to the Dashboard</h1>
        <p>Here is your content...</p>
      </div>
    </div>
  );
};

export default Dashboard;
