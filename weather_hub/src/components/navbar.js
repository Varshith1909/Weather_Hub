import React, {useState} from 'react';
import  './navbar.css';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
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