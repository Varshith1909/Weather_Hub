import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/login",
        formData,
      );
      const token = response.data.token;

      localStorage.setItem("jwtToken", token);
      console.log("Logged in successfully!!!");
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error,
      );
    }
  };

  const handleGoogleLogin = async (googleData) => {
    try {
      const { tokenId } = googleData;
      const { data } = await axios.post("/api/google-login", {
        tokenId: tokenId,
      });

      const token = data.token;

      localStorage.setItem("jwtToken", token);
      console.log("Google login successfull!!!");
    } catch (error) {
      console.error(
        "Error logging in with Google:",
        error.response ? error.response.data : error,
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []);

  return (
    <div className="logindiv">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          text="continue_with"
          shape="square"
          theme="filled_blue"
        />
      </form>
    </div>
  );
};

export default Login;
