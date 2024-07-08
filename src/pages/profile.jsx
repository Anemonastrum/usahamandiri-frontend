import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

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

  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && <h2>Hi {user.username}</h2>}
      <button onClick={handleLogout} className="page-scroll">
        Logout
      </button>
    </div>
  );
}
