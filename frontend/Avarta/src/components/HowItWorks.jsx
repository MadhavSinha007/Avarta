import React from "react";
import { FaRecycle, FaUpload, FaMapMarkerAlt } from "react-icons/fa";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUpload className="step-icon" />,
      title: "Upload Items",
      text: "Take a photo or upload images of your recyclable items and get instant AI-powered feedback and guidance.",
      buttonText: "Upload Now",
      buttonLink: "#upload"
    },
    {
      id: 2,
      icon: <FaRecycle className="step-icon" />,
      title: "Get Guidance",
      text: "Receive personalized recycling instructions and tips to ensure proper waste management for your items.",
      buttonText: "Learn More",
      buttonLink: "#guidance"
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt className="step-icon" />,
      title: "Find Recyclers",
      text: "Use our smart locator tool to discover the nearest recycling centers and drop-off points in your area.",
      buttonText: "Find Centers",
      buttonLink: "#locator"
    }
  ];

  return (
    <section className="steps-section">
      <div className="steps-container">
        {/* Header */}
        <div className="steps-header">
          <span className="steps-tag">How It Works</span>
          <h2 className="steps-title">
            Transform your waste management<br />
            in just three simple steps
          </h2>
          <p className="steps-subtext">
            Our intelligent approach simplifies recycling, making it accessible, 
            effective, and rewarding for everyone to contribute to a greener future.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              
              <div className="step-icon-container">
                {step.icon}
              </div>
              
              <h3 className="step-title">{step.title}</h3>
              
              <p className="step-text">{step.text}</p>
              
              <a href={step.buttonLink} className="step-button">
                {step.buttonText}
                <span className="button-arrow">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="steps-cta">
          <div className="steps-cta-content">
            <h3 className="steps-cta-title">Ready to Start Your Green Journey?</h3>
            <p className="steps-cta-text">
              Join thousands of users who are already making a difference with ASTRA. 
              Start recycling smarter today and contribute to a sustainable future.
            </p>
            
            <div className="steps-buttons">
              <a href="#get-started" className="steps-btn green">
                Get Started Now <span className="arrow">→</span>
              </a>
              <a href="#learn-more" className="steps-btn outline">
                Watch Demo <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;