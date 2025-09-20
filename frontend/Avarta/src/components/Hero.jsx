import React, { useState, useRef } from "react";
import "./Hero.css";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      // If playing, pause and show thumbnail
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // If not playing, start video
      setIsPlaying(true);
      // Auto-play the video when it loads
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log("Auto-play failed:", error);
          });
        }
      }, 100);
    }
  };

  const handleVideoClick = () => {
    // Allow clicking on video to pause/play
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoEnd = () => {
    // When video ends, show thumbnail again
    setIsPlaying(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforming Recycling
            <span className="hero-subtitle"> for a Sustainable Future</span>
          </h1>
          <p className="hero-description">
            At Avarta, we believe in making recycling and waste management
            accessible for everyone. Join us in our mission to create a green
            planet, one smart choice at a time.
          </p>
          <button className="hero-cta-btn">
            Get started
          </button>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <div className="video-container">
            <div className={`video-player ${isPlaying ? 'playing' : ''}`}>
              {isPlaying ? (
                <video
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  controls
                  autoPlay
                  onClick={handleVideoClick}
                  onEnded={handleVideoEnd}
                  style={{ cursor: 'pointer' }}
                >
                  <source src="public/assets/home.mp4" type="video/mp4" />
                  <source src="/public/assets/home.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <div className="video-thumbnail" onClick={togglePlay}>
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1613&q=80"
                      alt="Recycling video thumbnail"
                    />
                    <div className="play-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
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