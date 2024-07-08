import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Navigation = (props) => {
  
  const { user } = useContext(UserContext);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a
            className="navbar-brand page-scroll"
            href="#home"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="logo.svg"
              alt="Logo"
              style={{ height: "30px", marginRight: "15px" }}
            />
            Usaha Mandiri
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Layanan
              </a>
            </li>
            <li>
              <a href="#gallery" className="page-scroll">
                Produk
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>

            {user && user.username ? (
              <li>
                {user.role === "admin" ? (
                  <a href="/dashboard" className="page-scroll">
                    Dashboard
                  </a>
                ) : (
                  <a href="/profile" className="page-scroll">
                    {user.username}
                  </a>
                )}
              </li>
            ) : (
              <li>
                <a href="/auth" className="page-scroll">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
