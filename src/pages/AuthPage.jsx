
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', loginData);
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else {
        setLoginData({ login: '', password: '' });
        if (data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid Username or Password');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register/user', registerData);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setRegisterData({
          username: '',
          email: '',
          password: '',
          address: '',
          phoneNumber: ''
        });
        toast.success('Registration Successful');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? 'slide-right' : 'slide-left'}`}>
        <div className="auth-form">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <label>Username or Email</label>
              <input
                type="login"
                placeholder="Enter Username or Email"
                value={loginData.login}
                onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                value={registerData.address}
                onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
              />
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={registerData.phoneNumber}
                onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
              />
              <button type='submit'>Submit</button>
            </form>
          )}
          <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
