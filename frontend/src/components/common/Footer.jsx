// Footer.js
import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col md:flex-row footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            Our team of dedicated professionals are committed to providing
            personalized financial planning services to individuals and
            businesses alike.
          </p>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Carrers</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Copyright</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Office Locations</h4>
          <ul>
            <li>Chennai</li>
            <li>Coimbatore</li>
            <li>Madurai</li>
            <li>Hyderabad</li>
          </ul>
        </div>
        <div className="footer-section social-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 WGP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
