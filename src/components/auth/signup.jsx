import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { username, email, password, address, phoneNumber } = data;
    try {
      const response = await axios.post("/register/user", {
        username,
        email,
        password,
        address,
        phoneNumber,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          username: "",
          email: "",
          password: "",
          address: "",
          phoneNumber: "",
        });
        toast.success("Registration Successful");
        navigate("/auth");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Masukkan Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Masukkan Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Masukkan Alamat"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Masukkan Nomor Telepon"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        />
        <input
          type="password"
          placeholder="Masukkan Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br></br>
        <button type="submit">Daftar</button>
      </form>
    </div>
  );
}

export default SignUpForm;
