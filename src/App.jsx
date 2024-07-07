import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
