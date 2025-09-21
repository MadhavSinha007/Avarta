import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

// Reusable Components
const AbtCard = ({ title, children }) => (
  <div className="abt-card">
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

const AbtSdg = ({ number, title, desc }) => (
  <div className="abt-sdg">
    <div className="abt-sdg-num">{number}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const AbtTech = ({ title, desc }) => (
  <div className="abt-tech">
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <main className="abt-wrapper">
        {/* Hero */}
        <section className="abt-hero">
          <div className="abt-hero-box">
            <h1 className="abt-hero-title">Waste-to-Worth AI</h1>
            <p className="abt-hero-sub">
              Transform waste into worth with intelligent AI-powered classification and sustainable solutions
            </p>
            <div className="abt-hero-tags">
              <span className="abt-tag">AI Classification</span>
              <span className="abt-tag">Smart Recycling</span>
              <span className="abt-tag">DIY Solutions</span>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="abt-sec">
          <div className="abt-container">
            <h2 className="abt-title">Project Overview</h2>
            <div className="abt-grid">
              <AbtCard title="Scope">
                The project uses AI and ML to classify waste through image recognition,
                helping users identify plastics, paper, metals, and more. Integrated with
                Google Maps, it suggests nearby recycling centers and offers practical reuse tips.
              </AbtCard>
              <AbtCard title="Motivation">
                Improper waste disposal harms the environment and cities. By making recycling
                smarter and easier, this project promotes sustainable habits, cleaner
                communities, and environmental conservation.
              </AbtCard>
            </div>
          </div>
        </section>

        {/* SDG */}
        <section className="abt-sec abt-sdg-sec">
          <div className="abt-container">
            <h2 className="abt-title">Supporting UN SDGs</h2>
            <div className="abt-sdg-grid">
              <AbtSdg number="11" title="Sustainable Cities" desc="Cleaner, more livable urban environments" />
              <AbtSdg number="12" title="Responsible Consumption" desc="Sustainable production & consumption patterns" />
              <AbtSdg number="13" title="Climate Action" desc="Urgent action to combat climate change" />
            </div>
          </div>
        </section>

        {/* Tech */}
        <section className="abt-sec abt-tech-sec">
          <div className="abt-container">
            <h2 className="abt-title">Technology Stack</h2>
            <div className="abt-tech-grid">
              <AbtTech title="Machine Learning" desc="Image classification for waste detection" />
              <AbtTech title="Google Maps API" desc="Maps and recycling facility location" />
              <AbtTech title="Gemini API" desc="DIY guide generation" />
              <AbtTech title="Computer Vision" desc="Advanced image processing" />
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="abt-sec abt-impact">
          <div className="abt-container">
            <h2 className="abt-title">Environmental Impact</h2>
            <article className="abt-impact-text">
              <p>
                Waste-to-Worth AI empowers users to manage waste responsibly by combining
                AI and sustainability. From recycling facilities to DIY reuse, it fosters
                eco-friendly habits and awareness.
              </p>
              <p>
                Smarter waste management reduces pollution, improves communities, and
                builds a sustainable culture. Every recycled item contributes to global
                conservation efforts.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;