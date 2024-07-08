// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import AuthPage from './pages/AuthPage.jsx';
import Profile from './pages/profile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProductList from './pages/ProductList.jsx';
import CategoryList from './pages/CategoryList.jsx';
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { UserContextProvider } from './context/userContext.jsx';
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.withCredentials = true

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <UserContextProvider>
      <Toaster position='top-right' toastOptions={{duration: 2000}} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/categories' element={<CategoryList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
