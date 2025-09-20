import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log("Subscribing email:", email);
      setEmail("");
      // You can add success message or API call here
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <img 
              src="/assets/logo.png" 
              alt="ASTRA Logo" 
              className="footer-logo"
            />
            <p className="footer-tagline">
              Your eco-friendly assistant for smart recycling and sustainable living.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="footer-nav">
            <nav>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <a href="#home" className="footer-nav-link">Home</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#about" className="footer-nav-link">About Us</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#how-it-works" className="footer-nav-link">How It Works</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Actions Section */}
          <div className="footer-actions">
            <div className="footer-subscribe">
              <span className="subscribe-text">Stay updated with ASTRA</span>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="subscribe-input"
                  required
                />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </form>
            </div>
            
            <a href="#login" className="login-btn">
              Login to get started →
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <span className="highlight">ASTRA</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;