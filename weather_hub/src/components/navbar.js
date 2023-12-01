import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = localStorage.getItem('jwtToken') ? true : false;

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Weather-Home</a></li>
        <li><a href="/forecast">Forecast</a></li>
        {authenticated ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li><a href="/login">Login/Signup</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
