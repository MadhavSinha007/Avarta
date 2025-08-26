import React from "react";

const Features = () => {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "black", color: "white", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "40px" }}>Features</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", maxWidth: "800px", margin: "0 auto" }}>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Trash Identification</h3>
          <p>Snap a photo or enter details, and ASTRA tells you the material type.</p>
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Nearby Recycle Plants</h3>
          <p>Get directions to the closest certified recycling centers.</p>
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>DIY Recycling</h3>
          <p>Learn how to creatively recycle at home with simple DIY guides.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
