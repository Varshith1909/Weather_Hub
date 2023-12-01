import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/'); // Redirect to home page if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const token = response.data.token;

      localStorage.setItem('jwtToken', token);
      console.log('Logged in successfully!!!');
      navigate('/')
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }, []);

  return (
    <div className='logindiv'>
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
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <Link to="/signup"><button>Sign Up</button></Link> 
      </form>
    </div>
  );
};

export default Login;
