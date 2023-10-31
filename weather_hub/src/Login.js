import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('jwtToken', token);

      // Navigate to a protected route or take other actions here
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Define the useEffect hook at the top level of the component
  useEffect(() => {
    // Check for a token in local storage
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // User is logged in, you can take appropriate actions here.
      console.log('User is logged in');
    } else {
      // User is not logged in, redirect to the login page or display the login form.
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
