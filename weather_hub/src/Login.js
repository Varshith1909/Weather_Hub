import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const token = response.data.token;

      // Store the token in local storage (or in-memory)
      localStorage.setItem('jwtToken', token);

      // Navigate to a protected route, etc.
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
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
  );
};

export default Login;