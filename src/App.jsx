// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import AuthPage from './pages/auth.jsx';
import Profile from './pages/profile.jsx';
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { UserContextProvider } from './context/userContext.jsx';
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Dashboard from './pages/dashboard/dashboard.jsx';

const apiUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = `${apiUrl}`
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
