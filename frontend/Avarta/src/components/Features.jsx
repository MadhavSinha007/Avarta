import React from "react";

const Features = () => {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-3xl font-bold mb-10">Features</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-2">Trash Identification</h3>
          <p>Snap a photo or enter details, and ASTRA tells you the material type.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Nearby Recycle Plants</h3>
          <p>Get directions to the closest certified recycling centers.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">DIY Recycling</h3>
          <p>Learn how to creatively recycle at home with simple DIY guides.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
