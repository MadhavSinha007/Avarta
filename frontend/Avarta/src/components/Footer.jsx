import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { userLoggedIn } = useAuth(); // Check authentication status

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email:", email);
      setEmail("");
      // Add API call or success message here
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
                  <Link to="/" className="footer-nav-link">Home</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/about" className="footer-nav-link">About Us</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/howitworks" className="footer-nav-link">How It Works</Link>
                </li>

                {/* Show Analyzer only if logged in */}
                {userLoggedIn && (
                  <li className="footer-nav-item">
                    <Link to="/analyzer" className="footer-nav-link">Analyzer</Link>
                  </li>
                )}
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

            {!userLoggedIn && (
              <Link to="/login" className="login-btn">
                Login to get started →
              </Link>
            )}
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
