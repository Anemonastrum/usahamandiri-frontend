import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isCollapsed, user, setUser }) => {

  const navigate = useNavigate();
  const assetUrl = process.env.REACT_APP_ASSET_URL;

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
    <div
      id="sidebar"
      className={`bg-light sticky-top ${isCollapsed ? "collapsed" : ""}`}
    >
      <div className="p-3 profile">
        <a
          className="mb-3 w-75"
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
          href="#profileModal"
        >
          <img
            src={`${assetUrl}/admin.webp`}
            className="img-fluid"
            alt="admim guys"
            style={{ borderRadius: "100px", border: "0.5px solid #d9d9d9" }}
          />
        </a>
        <h5 className="mb-1">{user?.username}</h5>
        <p className="text-muted mb-1">Admin</p>
      </div>
      <ul className="flex-column d-block list-group w-100 align-items-center justify-content-center">
        <NavLink
          to="/dashboard/home"
          className="list-group-item list-group-item-action sidebar-item"
          activeClassName="active"
        >
          <i className="fas fa-home fa-fw me-4"></i>Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/kategori"
          className="list-group-item list-group-item-action sidebar-item"
          activeClassName="active"
        >
          <i className="fas fa-plus fa-fw me-4"></i>Kategori
        </NavLink>
        <NavLink
          to="/dashboard/produk"
          className="list-group-item list-group-item-action sidebar-item"
          activeClassName="active"
        >
          <i className="fas fa-list fa-fw me-4"></i>Produk
        </NavLink>
        <NavLink
          to="/dashboard/pengguna"
          className="list-group-item list-group-item-action sidebar-item"
          activeClassName="active"
        >
          <i className="fas fa-user fa-fw me-4"></i>Pengguna
        </NavLink>
        <NavLink
          to="/dashboard/informasi"
          className="list-group-item list-group-item-action sidebar-item"
          activeClassName="active"
        >
          <i className="fas fa-info-circle fa-fw me-4"></i>Informasi
        </NavLink>
        <button
          onClick={handleLogout}
          className="list-group-item list-group-item-action sidebar-item"
        >
          <i className="fas fa-sign-out fa-fw me-4"></i><NavLink className="text-dark">Logout</NavLink>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
