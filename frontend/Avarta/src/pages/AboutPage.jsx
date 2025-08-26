import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css"; // Assuming you create a CSS file for styling

const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <section className="about-page-section">
                <h1 className="about-page-title">About ASTRA</h1>
                <p className="about-page-description">
                    ASTRA is an AI-powered platform to help you identify trash types and 
                    recycle effectively. Our mission is to make recycling simple and 
                    accessible for everyone.
                </p>
            </section>
            <Footer />
        </div>
    );
};

export default AboutPage;
