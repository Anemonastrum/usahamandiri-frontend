import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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
    <div>
      <form onSubmit={loginUser}>
        <label>Username or Email</label>
        <input
          type="login"
          placeholder="Enter login"
          value={data.login}
          onChange={(e) => setData({ ...data, login: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
