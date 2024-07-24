import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: ''
  });
  const [error, setError] = useState(null);

  const [setIsUser] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const assetUrl = process.env.REACT_APP_ASSET_URL;

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`);
        const { role } = response.data;
        if (role === 'user') {
          setIsUser(true);
        } else {
          setIsUser(false);
          navigate("/");
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setIsUser(false);
        navigate("/");
      }
    };

    checkUserRole();

    if (user) {
      console.log('User object:', user);
      setFormData({
        username: user.username || '',
        email: user.email || '',
        address: user.address || '',
        phoneNumber: user.number || ''
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const profileCss = document.createElement("link");
    profileCss.rel = "stylesheet";
    profileCss.href = `${assetUrl}/css/profile.css`;
    document.head.appendChild(profileCss);

    const bsCss = document.createElement("link");
    bsCss.rel = "stylesheet";
    bsCss.href = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`;
    document.head.appendChild(bsCss);

    return () => {
      if (document.head.contains(bsCss)) {
        document.head.removeChild(bsCss);
      }
      if (document.head.contains(profileCss)) {
        document.head.removeChild(profileCss);
      }
    };
  }, [user, apiUrl, assetUrl, navigate, setIsUser]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${apiUrl}/logout`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/update`, formData, { withCredentials: true });
      if (response.status === 200) {
        setUser(prev => ({ ...prev, ...formData, number: formData.phoneNumber }));
        alert("Profile updated successfully!");
      } else {
        setError(response.data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred during profile update", error);
      setError("An error occurred during profile update");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h1 className="card-title">Profile</h1>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {user && (
                <>
                  <h2 className="card-subtitle mb-4 text-muted">
                    Hi, {user.username}
                  </h2>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Address"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                  </form>
                </>
              )}
            </>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button type="button" onClick={handleSubmit} className="btn btn-primary">Update Profile</button>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  );
}
