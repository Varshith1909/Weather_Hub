import React from "react";

const Footer = () => {
    return (
        <footer>
          <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Weather Hub Website is your go-to source for accurate weather information. We are passionate about providing you with up-to-date forecasts and weather-related news.</p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>If you have any questions or feedback, please feel free to reach out to us:</p>
            <address>
              <p>Email: info@weatherhub.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </address>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>&copy; {new Date().getFullYear()} Weather Hub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
        </footer>
      );
}

export default Footer;