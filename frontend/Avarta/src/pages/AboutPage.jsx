import React from "react";
import "./AboutPage.css";

// Reusable Components
const AbtCard = ({ title, children, icon }) => (
  <div className="abt-card">
    <div className="abt-card-header">
      {icon && <div className="abt-card-icon">{icon}</div>}
      <h3>{title}</h3>
    </div>
    <p>{children}</p>
  </div>
);

const AbtSdg = ({ number, title, desc }) => (
  <div className="abt-sdg">
    <div className="abt-sdg-num">{number}</div>
    <div className="abt-sdg-content">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>
);

const AbtTech = ({ title, desc, icon }) => (
  <div className="abt-tech">
    <div className="abt-tech-icon">{icon}</div>
    <div className="abt-tech-content">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="abt-page">
      <main className="abt-wrapper">
        {/* Hero */}
        <section className="abt-hero">
          <div className="abt-hero-bg">
            <img src="/public/assets/background1.svg" alt="" className="abt-hero-svg" />
          </div>
          <div className="abt-hero-content">
            <div className="abt-hero-badge">[ THE MISSION ]</div>
            <h1 className="abt-hero-title">
              Transform Waste
              <br />
              <span className="abt-hero-title-accent">Into Worth</span>
            </h1>
            <p className="abt-hero-description">
              AI knowledge should be democratizing and not for seeking an accountable, capable AI to aid AI researchers in advanced human superintelligence development.
            </p>
            <div className="abt-hero-cta">
              <button className="abt-cta-btn">JOIN US →</button>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="abt-sec abt-core">
          <div className="abt-container">
            <div className="abt-section-header">
              <div className="abt-section-badge">[ OUR PRINCIPLES ]</div>
              <h2 className="abt-section-title">At our core</h2>
              <p className="abt-section-subtitle">
                We're a focused and mighty team committed to our community, environment, and engineering excellence.
              </p>
            </div>
            <div className="abt-principles-grid">
              <AbtCard 
                title="Reasoning from First Principles" 
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
              >
                We understand environmental thinking by analyzing fundamentals to ensure sustainable and effective waste management solutions.
              </AbtCard>
              <AbtCard 
                title="No goal too ambitious" 
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="m16 10-4 4-4-4"/></svg>}
              >
                We believe the most intelligent recycling principles are those that dare to think big about environmental solutions.
              </AbtCard>
              <AbtCard 
                title="Move quickly and fix things" 
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
              >
                Our approach to rapid development and iterative improvement ensures solutions work - when faced with doubt, we build.
              </AbtCard>
            </div>
          </div>
        </section>

        {/* SDG Section */}
        <section className="abt-sec abt-sdg-sec">
          <div className="abt-container">
            <div className="abt-section-header">
              <div className="abt-section-badge">[ GLOBAL IMPACT ]</div>
              <h2 className="abt-section-title">Supporting UN SDGs</h2>
            </div>
            <div className="abt-sdg-grid">
              <AbtSdg number="11" title="Sustainable Cities" desc="Cleaner, more livable urban environments through intelligent waste management" />
              <AbtSdg number="12" title="Responsible Consumption" desc="Sustainable production & consumption patterns via AI-powered solutions" />
              <AbtSdg number="13" title="Climate Action" desc="Urgent action to combat climate change through waste reduction" />
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="abt-sec abt-tech-sec">
          <div className="abt-container">
            <div className="abt-section-header">
              <div className="abt-section-badge">[ TECHNOLOGY ]</div>
              <h2 className="abt-section-title">Collaboration across borders</h2>
              <p className="abt-section-subtitle">
                We have teams across all six offices in San Francisco, Palo Alto, and London, UK. We prioritize in-person work as it has helped our most innovative ideas from anywhere.
              </p>
            </div>
            <div className="abt-tech-grid">
              <AbtTech 
                title="Machine Learning" 
                desc="Advanced image classification for precise waste detection and categorization"
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44A2.5 2.5 0 0 1 2.5 9.5V7c0-.55.45-1 1-1h5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1a2 2 0 0 1 0-4z"/><path d="M14 2c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-4z"/><path d="M14 9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-4z"/><path d="M14 16c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-4z"/></svg>}
              />
              <AbtTech 
                title="Google Maps API" 
                desc="Real-time location services for recycling facility discovery"
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
              />
              <AbtTech 
                title="Gemini API" 
                desc="Intelligent DIY guide generation for creative reuse solutions"
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9 17 14.74 18.18 21.02 12 17.77 5.82 21.02 7 14.74 2 9 8.91 8.26 12 2"/></svg>}
              />
              <AbtTech 
                title="Computer Vision" 
                desc="State-of-the-art image processing and object recognition"
                icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              />
            </div>
          </div>
        </section>

        {/* Impact Statement */}
        <section className="abt-sec abt-impact">
          <div className="abt-container">
            <div className="abt-section-header">
              <div className="abt-section-badge">[ OUR RESPONSIBILITY ]</div>
              <h2 className="abt-section-title">Environmental Impact</h2>
            </div>
            <div className="abt-impact-content">
              <div className="abt-impact-text">
                <p>
                  Waste-to-Worth AI empowers users to manage waste responsibly by combining artificial intelligence and sustainability principles. From discovering recycling facilities to generating DIY reuse solutions, our platform fosters eco-friendly habits and environmental awareness.
                </p>
                <p>
                  Through intelligent waste classification and community-driven solutions, we're building a future where every piece of waste becomes an opportunity for environmental conservation and creative reuse.
                </p>
              </div>
              <div className="abt-impact-visual">
                <div className="abt-impact-stat">
                  <div className="abt-stat-number">90%</div>
                  <div className="abt-stat-label">Reduction in misclassified waste</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;