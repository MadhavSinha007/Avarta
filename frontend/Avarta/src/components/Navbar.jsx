import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/index"; // Import useAuth
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth(); // Get authentication status

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      console.log('User signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo section */}
        <div className="navbar-logo">
          <img
            src="public/assets/logo.png"
            alt="Warta Logo"
            className="logo-image"
          />
        </div>

        {/* Navigation links - Desktop */}
        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/howitworks">How It Works</Link>
          </div>

          <div className="navbar-auth">
            {/* Conditionally render login or logout button */}
            {userLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
  Logout 
  <span className="logout-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8V6C14 4.89543 13.1046 4 12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H12C13.1046 20 14 19.1046 14 18V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 12H10M18 12L15 9M18 12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
</button>
            ) : (
              <Link to="/login" className="login-btn">
                Login to get started <span className="arrow">→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-links">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" onClick={closeMobileMenu}>About us</Link>
          <Link to="/howitworks" onClick={closeMobileMenu}>How It Works</Link>
          {/* Conditionally render mobile login button */}
          {!userLoggedIn && (
            <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
              Login to get started <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;