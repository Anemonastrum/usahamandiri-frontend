import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ toggleSidebar, user, setUser }) => {

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
    <header
      id="header"
      className="page-header sticky-top navbar-light bg-light"
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <button
            id="toggle-btn"
            className="btn btn-light"
            onClick={toggleSidebar}
          >
            <img
              src={`${assetUrl}/icons/list.svg`}
              alt="Menu"
              style={{ width: "25px" }}
            />
          </button>
          <div className="logo">
            <img
              src={`${assetUrl}/logo.svg`}
              alt="Header Logo"
              className="logo-img"
            />
            <h1 className="logo-text">USAHA MANDIRI MAGELANG</h1>
          </div>
          <div className="dropdown">
            <button
              className="btn bg-brand text-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-user"></i> {/* User icon */}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a
                  className="dropdown-item bg-brand2"
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                  href="#profileModal"
                  to="/profile"
                >
                  Profile
                </a>
              </li>
              <li>
                <button
                  className="dropdown-item bg-brand2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
