import React from 'react'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'; 
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className='footer-section contact'>
            <h3>Contact Us</h3>
            <p>
              <FiPhone style={{ marginRight: '8px' }} />+44 (0)20 1234 5678
            </p>
            <p>
              <FiMail style={{ marginRight: '8px' }} />info@budget123.com
            </p>
            <p>
              <FiMapPin style={{ marginRight: '8px' }} />123 Property Street, London
            </p>
          </div>

          <div className='footer-section quick-links'>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/property">Property</Link>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div className='footer-section newsletter'>
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates</p>
            <div className="email-field">
              <input
                type="email"
                placeholder="Enter your email"
                className="email"
              />
              <button className="email-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <p className='copyright'>&copy; 2024 BUDGET-Real Estate. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
