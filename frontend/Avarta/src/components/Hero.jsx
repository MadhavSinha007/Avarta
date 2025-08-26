import React from "react";

const Hero = () => {
  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Welcome to ASTRA</h1>
      <p style={styles.paragraph}>
        Identify your trash type instantly (paper, plastic, etc.) and get 
        nearby recycling plant locations or DIY recycling tips at home.
      </p>
      <button style={styles.button}>Get Started</button>
    </section>
  );
};

const styles = {
  section: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
    padding: "0 24px",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  paragraph: {
    fontSize: "1.125rem",
    marginBottom: "24px",
    maxWidth: "640px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#e5e5e5",
  },
};

export default Hero;
