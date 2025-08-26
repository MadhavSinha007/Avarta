import React from "react";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-black text-white px-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to ASTRA</h1>
      <p className="text-lg mb-6 max-w-2xl">
        Identify your trash type instantly (paper, plastic, etc.) and get 
        nearby recycling plant locations or DIY recycling tips at home.
      </p>
      <button className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
