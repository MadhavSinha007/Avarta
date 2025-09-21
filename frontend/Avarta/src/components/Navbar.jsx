import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/login');
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
            <Link to="/login" className="login-btn">Login to get started <span className="arrow">→</span> </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout <span className="arrow">→</span> </button>
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
          <Link to="/how-it-works" onClick={closeMobileMenu}>How It Works</Link>
          <button className="mobile-login-btn" onClick={closeMobileMenu}>
            Login to get started <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;