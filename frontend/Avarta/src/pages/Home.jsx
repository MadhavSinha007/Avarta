import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
    </div>
  );
};

export default Home;
