import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function SignInForm() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [data, setData] = useState({
      login: "",
      password: "",
    });
  
    const loginUser = async (e) => {
      e.preventDefault();
      const { login, password } = data;
      try {
        const response = await axios.post("/login", {
          login,
          password,
        });
        const { data } = response;
        if (data.error) {
          toast.error(data.error);
        } else {
          setData({});
          setUser(data.user); 
          if (data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Invalid Username or Password");
      }
    };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={loginUser}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="javascript:void(0)" className="social">
            <i className="fa fa-seedling" />
          </a>
          <a href="javascript:void(0)" className="social">
            <i className="fa fa-solid fa-leaf" />
          </a>
          <a href="javascript:void(0)" className="social">
            <i className="fa fa-solid fa-lemon" />
          </a>
        </div>
        <input
          type="login"
          placeholder="Masukkan Email atau Username"
          value={data.login}
          onChange={(e) => setData({ ...data, login: e.target.value })}
        />
        <input
          type="password"
          placeholder="Masukkan Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <a href="#"></a>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default SignInForm;
