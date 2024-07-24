import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/dashboard/header";
import Sidebar from "../../components/dashboard/sidebar";
import Footer from "../../components/dashboard/footer";
import Home from "./home";
import Kategori from "./kategori";
import Produk from "./produk";
import Pengguna from "./pengguna";
import Informasi from "./informasi";
import { RotatingLines } from "react-loader-spinner";
import ProfileModal from "../../components/dashboard/profileModal";
import { UserContext } from "../../context/userContext";
import ProtectedRoute from "../../components/protectedRoute";
import axios from "axios";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);
  const [information, setInformation] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const assetUrl = process.env.REACT_APP_ASSET_URL;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
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

    const fetchInformation = async () => {
      try {
        const response = await axios.get(`${apiUrl}/information`);
        setInformation(response.data);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchCategory();
    fetchProducts();
    fetchProductImages();
    fetchUserAdmin();
    fetchInformation();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [apiUrl]);

  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href={`https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css`} />
        <link rel="stylesheet" href={`${assetUrl}/css/db.css`} />
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js' async></script>
        <script src='https://code.jquery.com/jquery-3.7.0.min.js' async></script>
      </Helmet>
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
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute role="admin">
                      <Home user={user} setUser={setUser} products={products} categories={categories} />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/kategori" 
                  element={
                    <ProtectedRoute role="admin">
                      <Kategori user={user} setUser={setUser} categories={categories} products={products} />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/produk" 
                  element={
                    <ProtectedRoute role="admin">
                      <Produk user={user} setUser={setUser} products={products} productImages={productImages} categories={categories} />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pengguna" 
                  element={
                    <ProtectedRoute role="admin">
                      <Pengguna userAdmin={userAdmin} />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/informasi" 
                  element={
                    <ProtectedRoute role="admin">
                      <Informasi information={information} />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/dashboard/home" />} />
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
