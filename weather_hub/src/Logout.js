

import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');
    
    // Redirect to the login page or another page
    window.location.href = '/login'; // You may use React Router for routing.
  }, []);

  return (
   console.log("logging out")
  );
}

export default Logout;
