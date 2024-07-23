import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/dashboard/header";
import Sidebar from "../../components/dashboard/sidebar";
import Footer from "../../components/dashboard/footer";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import { RotatingLines } from "react-loader-spinner";
import ProfileModal from "../../components/dashboard/profileModal";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const assetUrl = process.env.REACT_APP_ASSET_URL;

  const navigate = useNavigate();

  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
          navigate("/");
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        navigate("/");
      }
    };

    checkAdminRole();

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductImages = async () => {
        try {
          const response = await axios.get(`${apiUrl}/productImages`);
          setProductImages(response.data);
        } catch (error) {
          console.error("Error fetching productImages:", error);
        }
      };

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchUserAdmin = async () => {
      try {
        const response = await axios.get(`${apiUrl}/alluseradmin`);
        setUserAdmin(response.data);
      } catch (error) {
        console.error("Error fetching users and admin:", error);
      }
    };

    fetchCategory();
    fetchProducts();
    fetchProductImages();
    fetchUserAdmin();

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const bsCss = document.createElement("link");
    bsCss.rel = "stylesheet";
    bsCss.href = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`;
    document.head.appendChild(bsCss);

    const dashboardCss = document.createElement("link");
    dashboardCss.rel = "stylesheet";
    dashboardCss.href = `${assetUrl}/css/db.css`;
    document.head.appendChild(dashboardCss);

    return () => {
        if (document.head.contains(bsCss)) {
            document.head.removeChild(bsCss);
        }
        if (document.head.contains(dashboardCss)) {
            document.head.removeChild(dashboardCss);
        }
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div className="bg-transparent">
          <Header toggleSidebar={toggleSidebar} user={user} setUser={setUser} />
          <Sidebar isCollapsed={isCollapsed} user={user} setUser={setUser} />
          <div
            id="content"
            className={`flex-grow-1 d-flex flex-column ${
              isCollapsed ? "expanded" : ""
            }`}
          >
            <div className="container-fluid">
            <Routes>
                <Route path="/page1" element={<Page1 user={user} setUser={setUser} products={products} categories={categories} />} />
                <Route path="/page2" element={<Page2 user={user} setUser={setUser} categories={categories} products={products} />} />
                <Route path="/page3" element={<Page3 user={user} setUser={setUser} products={products} productImages={productImages} categories={categories}/>} />
                <Route path="/page4" element={<Page4 userAdmin={userAdmin} />} />
                <Route path="/" element={<Navigate to="/dashboard/page1" />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
       <ProfileModal />
    </div>
  );
};

export default Dashboard;