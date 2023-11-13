import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/login', formData);
      const token = response.data.token;

      localStorage.setItem('jwtToken', token);
      console.log('Logged in successfully!!!');

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
