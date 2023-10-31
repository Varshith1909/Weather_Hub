import React from 'react';
import  './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Weather-Home</a></li>
        <li><a href="/forecast">Forecast</a></li>
        <li><a href="/login">Login/Signup</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;