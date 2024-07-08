import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { username, email, password, address, phoneNumber } = data;
    try {
      const response = await axios.post('/register/user', {
        username, email, password, address, phoneNumber
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          username: '',
          email: '',
          password: '',
          address: '',
          phoneNumber: ''
        });
        toast.success('Registration Successful');
        navigate('/login');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Username</label>
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={data.username} 
          onChange={(e) => setData({...data, username: e.target.value})} 
        />
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={data.email} 
          onChange={(e) => setData({...data, email: e.target.value})} 
        />
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={data.password} 
          onChange={(e) => setData({...data, password: e.target.value})} 
        />
        <label>Address</label>
        <input 
          type="text" 
          placeholder="Enter Address" 
          value={data.address} 
          onChange={(e) => setData({...data, address: e.target.value})} 
        />
        <label>Phone Number</label>
        <input 
          type="text" 
          placeholder="Enter Phone Number" 
          value={data.phoneNumber} 
          onChange={(e) => setData({...data, phoneNumber: e.target.value})} 
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

