import React from "react";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} ASTRA. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
