import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./howitwork.css";

// Reusable Components
const HowStep = ({ step, title, items }) => (
  <div className="how-step">
    <div className="how-step-num">{step}</div>
    <div className="how-step-content">
      <h3>{title}</h3>
      <div className="how-step-details">
        {items.map((item, idx) => (
          <div className="how-step-item" key={idx}>
            <h4>{item.heading}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <div>
      <Navbar />
      <main className="how-wrapper">
        {/* Hero */}
        <section className="how-hero">
          <div className="how-hero-box">
            <h1 className="how-hero-title">How It Works</h1>
            <p className="how-hero-sub">
              Discover how our AI-powered system transforms waste management through intelligent classification and sustainable solutions
            </p>
            <div className="how-hero-tags">
              <span className="how-tag">Simple Process</span>
              <span className="how-tag">Smart Technology</span>
              <span className="how-tag">Sustainable Impact</span>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="how-sec">
          <div className="how-container">
            <h2 className="how-title">Our Process</h2>
            <div className="how-workflow">
              <HowStep
                step="1"
                title="Waste Classification & User Interaction"
                items={[
                  { heading: "User Interface & Registration", text: "Users register or log in to upload waste images." },
                  { heading: "Image Upload & Classification", text: "ML model classifies the waste type (plastic, paper, etc.)." },
                  { heading: "User Choice", text: "Users pick between recycling or DIY reuse." },
                ]}
              />
              <HowStep
                step="2"
                title="Recycling & Plant Recommendation"
                items={[
                  { heading: "Plant Finder", text: "Redirects to recycling facility recommendations." },
                  { heading: "Google Maps API", text: "Finds nearby facilities using live location." },
                  { heading: "Facility Info", text: "Shows directions, hours, and contacts." },
                ]}
              />
              <HowStep
                step="3"
                title="DIY Solutions & Creative Reuse"
                items={[
                  { heading: "DIY Assessment", text: "Checks waste type, size, and complexity for DIY use." },
                  { heading: "Size Analysis", text: "Determines if item is fit for projects." },
                  { heading: "Gemini API", text: "Generates tailored DIY guides." },
                  { heading: "Step-by-Step", text: "Provides easy transformation instructions." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="how-sec how-benefits">
          <div className="how-container">
            <h2 className="how-title">Key Benefits</h2>
            <div className="how-benefits-grid">
              <div className="how-benefit">
                <div className="how-benefit-icon"></div>
                <h3>Efficient Recycling</h3>
                <p>Find the nearest recycling centers with detailed information to make recycling convenient.</p>
              </div>
              <div className="how-benefit">
                <div className="how-benefit-icon"></div>
                <h3>AI-Powered</h3>
                <p>Advanced machine learning accurately classifies waste materials from simple images.</p>
              </div>
              <div className="how-benefit">
                <div className="how-benefit-icon"></div>
                <h3>Sustainable Solutions</h3>
                <p>Get creative DIY ideas to repurpose waste items instead of discarding them.</p>
              </div>
              <div className="how-benefit">
                <div className="how-benefit-icon"></div>
                <h3>Track Progress</h3>
                <p>Monitor your environmental impact with personalized statistics and achievements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="how-sec how-cta">
          <div className="how-container">
            <h2 className="how-title">Ready to Get Started?</h2>
            <p className="how-cta-text">
              Join thousands of users already transforming their waste management habits with our AI-powered platform.
            </p>
            <div className="how-cta-buttons">
              <Link to="/classify" className="how-cta-btn primary">Start Classifying</Link>
              <Link to="/about" className="how-cta-btn secondary">Learn More</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;