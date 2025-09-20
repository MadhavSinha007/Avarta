import React from "react";
import "./About.css";

const About = () => {
  const features = [
    { text: "Smart recycling guidance" },
    { text: "Waste reduction strategies" },
    { text: "Eco-friendly community" }
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Image on the left */}
        <div className="about-image">
          <img 
            src="/assets/aboutus.jpg" 
            alt="ASTRA Recycling" 
          />
          
          {/* Decorative elements */}
          <div className="image-decoration decoration-tl"></div>
          <div className="image-decoration decoration-br"></div>
        </div>

        {/* Text on the right */}
        <div className="about-content">
          <span className="about-tag">
            Our Mission
          </span>
          
          <h2 className="about-title">
            About <span className="highlight">ASTRA</span>
            <div className="title-underline"></div>
          </h2>
          
          <p className="about-text">
            ASTRA is your eco-friendly assistant. We help reduce waste by guiding 
            you on how to recycle smartly and responsibly, while also making 
            recycling accessible and fun.
          </p>
          
          <div className="about-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path 
                      d="M1 5L4 8L11 1" 
                      stroke="#25a92a" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <button className="about-button">
            Learn More
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="button-arrow"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;