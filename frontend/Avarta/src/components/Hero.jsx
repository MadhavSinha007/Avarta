import React from "react";
import "./Hero.css";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforming <br />
            Recycling for a <br />
            Sustainable <br />
            Future
          </h1>
          <p className="hero-subtext">
            At Avarta, we believe in making recycling and waste management
            accessible for everyone. Join us in our mission to create a green
            planet, one smart choice at a time.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn green">
              Login to get started <span className="arrow">→</span>
            </button>
            <button className="hero-btn white">
              Learn more <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <div className="info-grid">
            {/* Left side */}
            <div className="info-left">
              <p className="info-tag">ECO</p>
              <h2 className="info-title">
                Empowering Smart Recycling for a Greener Future
              </h2>
            </div>

            {/* Right side */}
            <div className="info-right">
              <p className="info-text">
                At Avarta, we are dedicated to transforming the recycling
                landscape. Our mission is to make waste management simple and
                accessible for everyone, ensuring that recycling is not just a task
                but a lifestyle choice. With innovative solutions and
                user-friendly tools, we strive to create a sustainable future for
                our communities.
              </p>
              <div className="info-buttons">
                <button className="info-btn primary">
                  Login to get started <span className="arrow">→</span>
                </button>
                <button className="info-btn secondary">
                  Learn more <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;