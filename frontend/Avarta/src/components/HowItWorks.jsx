// StepsSection.js
import React from "react";
import { FaRecycle, FaUpload, FaMapMarkerAlt } from "react-icons/fa";
import "./Steps.css";

const HowItWorks = () => {
  return (
    <section className="steps-section">
      {/* Heading */}
      <div className="steps-header">
        <h2 className="steps-title">
          Transform your waste management <br /> experience in just three simple steps
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="steps-grid">
        <div className="step-card">
          <FaRecycle className="step-icon" />
          <h3 className="step-title">
            Discover how easy recycling can be with our streamlined process.
          </h3>
          <p className="step-text">
            Our approach simplifies recycling making it accessible for everyone.
          </p>
          <button className="hero-btn white">
            Learn more <span className="arrow">→</span>
          </button>
        </div>

        <div className="step-card">
          <FaUpload className="step-icon" />
          <h3 className="step-title">
            Step 1: Upload your recyclable items for instant feedback.
          </h3>
          <p className="step-text">
            Easily upload images of your items to get started.
          </p>
          <button className="hero-btn white">
            Upload <span className="arrow">→</span>
          </button>
        </div>

        <div className="step-card">
          <FaMapMarkerAlt className="step-icon" />
          <h3 className="step-title">
            Step 2: Find the nearest recycler with our locator tool.
          </h3>
          <p className="step-text">
            Use our maps feature to locate the recycling center nearby.
          </p>
          <button className="hero-btn white">
            Upload <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
