import React from "react";
import { FaRecycle, FaUpload, FaMapMarkerAlt } from "react-icons/fa";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUpload className="eco-step-icon" />,
      title: "Upload Items",
      text: "Take a photo or upload images of your recyclable items and get instant AI-powered feedback and guidance.",
      buttonText: "Upload Now",
      buttonLink: "#upload"
    },
    {
      id: 2,
      icon: <FaRecycle className="eco-step-icon" />,
      title: "Get Guidance",
      text: "Receive personalized recycling instructions and tips to ensure proper waste management for your items.",
      buttonText: "Learn More",
      buttonLink: "#guidance"
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt className="eco-step-icon" />,
      title: "Find Recyclers",
      text: "Use our smart locator tool to discover the nearest recycling centers and drop-off points in your area.",
      buttonText: "Find Centers",
      buttonLink: "#locator"
    }
  ];

  return (
    <section className="eco-adventure-section">
      <div className="planet-protector-container">
        {/* Floating decorative elements */}
        <div className="floating-leaf floating-leaf-1">🍃</div>
        <div className="floating-leaf floating-leaf-2">🌿</div>
        <div className="floating-leaf floating-leaf-3">🌱</div>
        
        {/* Header */}
        <div className="eco-wizard-header">
          <span className="green-badge">How It Works</span>
          <h2 className="earth-lover-title">
            Transform your waste into<br />
            <span className="title-highlight">planet-saving power</span>
          </h2>
          <p className="eco-whisper-text">
            Our intelligent approach simplifies recycling, making it accessible, 
            effective, and rewarding for everyone to contribute to a greener future.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="recycle-rainbow-grid">
          {steps.map((step) => (
            <div key={step.id} className="eco-wonder-card">
              <div className="icon-garden">
                {step.icon}
                <div className="pulse-ring"></div>
              </div>
              
              <h3 className="step-magic-title">{step.title}</h3>
              
              <p className="eco-wisdom-text">{step.text}</p>
              
              <a href={step.buttonLink} className="green-glow-button">
                {step.buttonText}
                <span className="magic-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;