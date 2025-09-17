// ValuesSection.js
import React from "react";
import { FaLeaf, FaRecycle, FaUsers } from "react-icons/fa";
import "./Features.css";

const Features = () => {
  return (
    <section className="values-section">
      {/* Top Heading */}
      <div className="values-header">
        <p className="values-tag">Values</p>
        <h2 className="values-title">
          Our Commitment to a Sustainable Future
        </h2>
        <p className="values-subtext">
          At Avarta, we believe in a cleaner planet. Our core values drive us to
          innovate and simplify recycling for everyone.
        </p>
      </div>

      {/* Values Grid */}
      <div className="values-grid">
        <div className="value-card">
          <FaLeaf className="value-icon" />
          <h3 className="value-title">Sustainability is at Our Core</h3>
          <p className="value-text">
            We prioritize eco-friendly practice in everything we do.
          </p>
        </div>

        <div className="value-card">
          <FaRecycle className="value-icon" />
          <h3 className="value-title">Innovation Fuels Our Solutions</h3>
          <p className="value-text">
            We use modern technology to make recycling smarter.
          </p>
        </div>

        <div className="value-card">
          <FaUsers className="value-icon" />
          <h3 className="value-title">Simplicity Makes Recycling Accessible</h3>
          <p className="value-text">
            Our user-friendly platform empowers everyone to recycle.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="values-buttons">
        <button className="hero-btn green">
          Login to get started <span className="arrow">→</span>
        </button>
        <button className="step-btn">
          Learn more <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
};

export default Features;
