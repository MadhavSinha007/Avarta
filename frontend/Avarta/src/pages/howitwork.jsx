import React from "react";
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
            <div className="how-step-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="how-step-item-content">
              <h4>{item.heading}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HowBenefit = ({ title, description, icon }) => (
  <div className="how-benefit">
    <div className="how-benefit-icon">{icon}</div>
    <div className="how-benefit-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <div className="how-page">
      <main className="how-wrapper">
        {/* Hero */}
        <section className="how-hero">
          <div className="how-hero-bg">
            <img src="/public/assets/background2.svg" alt="" className="how-hero-svg" />
          </div>
          <div className="how-hero-content">
            <div className="how-hero-badge">[ THE PROCESS ]</div>
            <h1 className="how-hero-title">
              How It
              <br />
              <span className="how-hero-title-accent">Works</span>
            </h1>
            <p className="how-hero-description">
              Discover how our AI-powered system transforms waste management through intelligent classification, sustainable solutions, and community-driven environmental impact.
            </p>
            <div className="how-hero-cta">
              <button className="how-cta-btn">GET STARTED →</button>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="how-sec how-workflow-sec">
          <div className="how-container">
            <div className="how-section-header">
              <div className="how-section-badge">[ THE JOURNEY ]</div>
              <h2 className="how-section-title">Our Process</h2>
              <p className="how-section-subtitle">
                A streamlined approach to waste management that combines artificial intelligence with practical sustainability solutions.
              </p>
            </div>
            <div className="how-workflow">
              <HowStep
                step="01"
                title="Waste Classification & User Interaction"
                items={[
                  { heading: "User Interface & Registration", text: "Seamless onboarding process with secure user authentication and profile creation." },
                  { heading: "Image Upload & Classification", text: "Advanced ML model instantly identifies waste materials from uploaded images with 95% accuracy." },
                  { heading: "User Choice", text: "Intelligent recommendation system helps users choose between recycling or creative DIY reuse options." },
                ]}
              />
              <HowStep
                step="02"
                title="Recycling & Plant Recommendation"
                items={[
                  { heading: "Plant Finder", text: "Smart facility matching algorithm connects users with appropriate recycling centers." },
                  { heading: "Google Maps API", text: "Real-time location services provide optimal routing and facility information." },
                  { heading: "Facility Info", text: "Comprehensive details including operating hours, accepted materials, and contact information." },
                ]}
              />
              <HowStep
                step="03"
                title="DIY Solutions & Creative Reuse"
                items={[
                  { heading: "DIY Assessment", text: "Intelligent evaluation of waste suitability for creative transformation projects." },
                  { heading: "Size Analysis", text: "Automated measurement and feasibility assessment for optimal project matching." },
                  { heading: "Gemini API", text: "AI-generated personalized DIY guides tailored to specific materials and user skill level." },
                  { heading: "Step-by-Step", text: "Detailed instructions with visual aids and material lists for successful transformations." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="how-sec how-benefits-sec">
          <div className="how-container">
            <div className="how-section-header">
              <div className="how-section-badge">[ THE IMPACT ]</div>
              <h2 className="how-section-title">Key Benefits</h2>
              <p className="how-section-subtitle">
                Transforming waste management through intelligent technology and sustainable practices.
              </p>
            </div>
            <div className="how-benefits-grid">
              <HowBenefit
                title="Efficient Recycling"
                description="Find the nearest recycling centers with real-time data, detailed information, and optimal routing to make recycling convenient and accessible."
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>}
              />
              <HowBenefit
                title="AI-Powered Classification"
                description="Advanced machine learning algorithms accurately identify and classify waste materials from simple images with industry-leading precision."
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>}
              />
              <HowBenefit
                title="Sustainable Solutions"
                description="Get creative DIY ideas and step-by-step guides to repurpose waste items into useful products, reducing environmental impact."
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              />
              <HowBenefit
                title="Track Progress"
                description="Monitor your environmental impact with personalized analytics, achievements, and community leaderboards to gamify sustainability."
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="how-sec how-cta-sec">
          <div className="how-container">
            <div className="how-cta-content">
              <div className="how-section-header">
                <div className="how-section-badge">[ JOIN THE MOVEMENT ]</div>
                <h2 className="how-section-title">Ready to Get Started?</h2>
                <p className="how-section-subtitle">
                  Join thousands of users already transforming their waste management habits with our AI-powered platform and make a meaningful impact on the environment.
                </p>
              </div>
              <div className="how-cta-buttons">
                <Link to="/classify" className="how-cta-btn primary">Start Classifying →</Link>
                <Link to="/about" className="how-cta-btn secondary">Learn More</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;