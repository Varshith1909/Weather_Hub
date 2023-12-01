import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      // Handle success
      setRegistrationMessage('User registered successfully!!!');
      console.log('User registered successfully!!!', response.data);
      navigate('/')
    } catch (error) {
      
      if (error.response && error.response.data) {
        setRegistrationError(JSON.stringify(error.response.data));
        console.error('Error signing up:', error.response.data);
      } else {
        setRegistrationError(error.message);
        console.error('Error signing up:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='signup-div'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
      {registrationMessage && <p>{registrationMessage}</p>}
    </div>
  );
};

export default SignUp;
